const pool = require("../../util/database");
const cloudinary = require("../../util/cloudinary");
const {
  AuthenticationError,
  UserInputError,
  ApolloError,
} = require("apollo-server-express");
const Joi = require("joi");

const getVideo = async (parent, payload) => {
  const ID = payload.ID || parent.cover_ID;
  const [result, fields] = await pool.query(
    "SELECT * FROM videos WHERE ID = ? LIMIT 1;",
    [ID]
  );
  const video = result.length ? result.shift() : {};
  return video;
};

const getVideos = async (parent, payload) => {
  const offset = payload.offset || 0;
  const limit = payload.limit || 24;

  const [result, fields] = await pool.query(
    "SELECT * FROM videos ORDER BY ID DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );
  const videos = result.length ? result : [];
  return videos;
};

const getVideoCount = async () => {
  const [total] = await pool.query("SELECT COUNT(*) as number FROM videos");
  return { count: total.shift().number };
};

const uploadVideo = async (_, payload, context) => {
  if (!context?.user) throw new AuthenticationError("You are not logged in");
  const { createReadStream, filename, mimetype, encoding } = await payload.file;

  const schema = Joi.object({
    filename: Joi.string().min(3).max(255).required(),
    mimetype: Joi.string().required(),
  });
  const { error, value } = schema.validate({ filename, mimetype });
  if (error)
    throw new UserInputError("Failed to insert due to validation", {
      validationErrors: error.details,
    });

  const folderPath = "1flix/videos/";
  const [newFilePath, newFilename] = await generateNewFileName(
    value.filename,
    folderPath
  );

  try {
    const res = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { public_id: newFilePath, resource_type: "video" },
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
      "INSERT INTO `videos` ( `video_title`, `video_slug`, `size`, `file_extension`) VALUES ( ?, ?, ?, ?)",
      [newFilename, res.public_id, res.bytes, res.format]
    );

    return {
      ID: result.insertId,
      parent_ID: 0,
      video_title: newFilename,
      video_slug: res.public_id,
      size: res.bytes,
      file_extension: res.format,
    };
  } catch (error) {
    throw new ApolloError(error);
  }
};
async function editVideo(_, payload, context) {
  if (!context?.user) throw new AuthenticationError("You are not logged in");

  const schema = Joi.object({
    ID: Joi.number().min(1).max(255).required(),
    video_title: Joi.string().min(3).max(255).required(),
    video_slug: Joi.string().min(3).max(255).required(),
  });

  const { error, value } = schema.validate(payload);
  if (error)
    throw new UserInputError("Failed to insert due to validation", {
      validationErrors: error.details,
    });

  const { ID, video_title, video_slug } = value;
  const oldVideo = await getVideo({}, { ID });

  try {
    if (oldVideo.video_slug !== video_slug) {
      const response = await cloudinary.uploader.rename(
        oldVideo.video_slug,
        video_slug
      );
      if (!response) throw "Something went wrong.";
    }
    //if some value was changed
    if (
      oldVideo.video_title !== video_title ||
      oldVideo.video_slug !== video_slug
    ) {
      const [result] = await pool.query(
        "UPDATE videos SET video_title = ?, video_slug = ? WHERE ID = ?;",
        [video_title, video_slug, ID]
      );
      if (!result?.affectedRows) throw "Something went wrong.";
    }
  } catch (e) {
    throw new ApolloError(e);
  }

  return {
    ID: ID,
    parent_ID: oldVideo.parent_ID,
    video_title,
    video_slug: video_slug,
    size: oldVideo.size,
    file_extension: oldVideo.file_extension,
  };
}

async function deleteVideo(_, payload, context) {
  if (!context?.user) throw new AuthenticationError("You are not logged in");
  const { ID, slug } = payload;

  const response = await cloudinary.uploader.destroy(slug, {
    resource_type: "video",
  });
  if (response.result !== "ok") throw new ApolloError("Failed to delete.");

  const [result] = await pool.query("DELETE FROM videos WHERE ID = ?;", ID);
  if (!result.affectedRows) throw new ApolloError("Failed to delete.");

  return { result: true };
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
  while (await doesVideoExistBySlug(tempFilePath)) {
    tempFilePath = folderPath + parsedFilename + "_" + ++i;
  }
  //return filepath, filename
  const tempFilename = i == 0 ? parsedFilename : parsedFilename + "_" + i;
  return [tempFilePath, tempFilename];
}
async function doesVideoExistBySlug(slug) {
  const [result] = await pool.query(
    "SELECT COUNT(*) as total FROM videos WHERE video_slug = ? LIMIT 1;",
    slug
  );
  return !!result[0].total;
}
module.exports = {
  getVideo,
  getVideos,
  getVideoCount,
  uploadVideo,
  editVideo,
  deleteVideo,
};
