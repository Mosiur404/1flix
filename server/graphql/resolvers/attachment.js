const pool = require("../../util/database");
const cloudinary = require("../../util/cloudinary");
const {
  AuthenticationError,
  UserInputError,
  ApolloError,
} = require("apollo-server-express");
const Joi = require("joi");

const getAttachment = async (parent, payload) => {
  const ID = payload.ID || parent.cover_ID;
  const [result, fields] = await pool.query(
    "SELECT * FROM attachments WHERE ID = ? LIMIT 1",
    [ID]
  );
  const attachment = result.length ? result.shift() : {};
  return attachment;
};

const getAttachments = async (parent, payload) => {
  const offset = payload.offset || 0;
  const limit = payload.limit || 24;
  const search = payload.search || "";

  const SQL = `SELECT * FROM attachments WHERE attachment_title LIKE '%${search}%' OR attachment_slug LIKE '%${search}%' ORDER BY ID DESC LIMIT ? OFFSET ?;`;

  try {
    const [result, fields] = await pool.query(SQL, [limit, offset]);
    const attachments = result.length ? result : [];
    return attachments;
  } catch (e) {
    throw new ApolloError(e);
  }
};

const getAttachmentCount = async () => {
  const [total] = await pool.query(
    "SELECT COUNT(*) as number FROM attachments"
  );
  return { count: total.shift().number };
};

const uploadAttachment = async (_, payload, context) => {
  if (!context?.user) throw new AuthenticationError("You are not logged in");
  const { createReadStream, filename, mimetype, encoding } = await payload.file;
  //validate
  const schema = Joi.object({
    filename: Joi.string().min(3).max(255).required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
  });

  const { error, value } = schema.validate({ filename, mimetype });
  if (error)
    throw new UserInputError("Failed to insert due to validation", {
      validationErrors: error.details,
    });

  const folderPath = "1flix/potsers/";
  const [newFilePath, newFilename] = await generateNewFileName(
    value.filename,
    folderPath
  );
  try {
    const res = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { public_id: newFilePath },
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
      createReadStream().pipe(stream);
    });

    const [result, fields] = await pool.query(
      "INSERT INTO `attachments` ( `attachment_title`, `attachment_slug`, `size`, `file_extension`) VALUES ( ?, ?, ?, ?)",
      [newFilename, res.public_id, res.bytes, res.format]
    );

    return {
      ID: result.insertId,
      attachment_title: newFilename,
      attachment_slug: res.public_id,
      size: res.bytes,
      file_extension: res.format,
    };
  } catch (error) {
    throw new ApolloError(error);
  }
};

async function editAttachment(_, payload, context) {
  if (!context?.user) throw new AuthenticationError("You are not logged in");

  const schema = Joi.object({
    ID: Joi.number().min(1).max(255).required(),
    attachment_title: Joi.string().min(3).max(255).required(),
    attachment_slug: Joi.string().min(3).max(255).required(),
  });
  const { error, value } = schema.validate(payload);
  if (error)
    throw new UserInputError("Failed to insert due to validation", {
      validationErrors: error.details,
    });

  const { ID, attachment_title, attachment_slug } = value;
  const oldAttachment = await getAttachment({}, { ID });

  try {
    if (oldAttachment.attachment_slug !== attachment_slug) {
      const response = await cloudinary.uploader.rename(
        oldAttachment.attachment_slug,
        attachment_slug
      );
      if (!response) throw "Something went wrong.";
    }
    //if some value was changed
    if (
      oldAttachment.attachment_title !== attachment_title ||
      oldAttachment.attachment_slug !== attachment_slug
    ) {
      const [result] = await pool.query(
        "UPDATE attachments SET attachment_title = ?, attachment_slug = ? WHERE ID = ?;",
        [attachment_title, attachment_slug, ID]
      );
      if (!result?.affectedRows) throw "Something went wrong.";
    }
  } catch (e) {
    throw new ApolloError(e);
  }

  return {
    ID: ID,
    attachment_title,
    attachment_slug: attachment_slug,
    size: oldAttachment.size,
    file_extension: oldAttachment.file_extension,
  };
}

async function deleteAttachment(_, payload, context) {
  if (!context?.user) throw new AuthenticationError("You are not logged in");
  const { ID, slug } = payload;
  const [result] = await pool.query(
    "DELETE FROM attachments WHERE ID = ?;",
    ID
  );

  const response = await cloudinary.uploader.destroy(slug);
  if (result.affectedRows && response.result === "ok") return { result: true };
  else throw new ApolloError("Failed to delete.");
}

async function generateNewFileName(filename, folderPath) {
  //parse file into filename without extension
  const parsedFilename = filename
    .split(".")
    .slice(0, -1)
    .join(".")
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  let tempFilePath = folderPath + parsedFilename;
  let i = 0;
  // while tempFilePath exists
  while (await doesAttachmentExistBySlug(tempFilePath)) {
    tempFilePath = folderPath + parsedFilename + "_" + ++i;
  }
  //return filepath, filename
  const tempFilename = i == 0 ? parsedFilename : parsedFilename + "_" + i;
  return [tempFilePath, tempFilename];
}
async function doesAttachmentExistBySlug(slug) {
  const [result] = await pool.query(
    "SELECT COUNT(*) as total FROM attachments WHERE attachment_slug = ? LIMIT 1;",
    slug
  );
  return !!result[0].total;
}

module.exports = {
  getAttachment,
  getAttachments,
  uploadAttachment,
  editAttachment,
  deleteAttachment,
  getAttachmentCount,
};
