const pool = require("../../util/database");
const { AuthenticationError, UserInputError } = require("apollo-server");
const Joi = require("joi");

const getAttachment = async (parent, args) => {
  const ID = args.ID || parent.cover_ID;
  const [result, fields] = await pool.query(
    "SELECT * FROM attachments WHERE ID = ? LIMIT 1",
    [ID]
  );
  const attachment = result.length ? result.shift() : {};
  return attachment;
};

const getAttachments = async (parent, args) => {
  const offset = args.offset || 0;
  const limit = args.limit || 24;
  console.log(offset, limit);
  const [total, fields1] = await pool.query(
    "SELECT COUNT(*) as number FROM attachments"
  );
  const [result, fields] = await pool.query(
    "SELECT * FROM attachments ORDER BY ID DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );
  const attachments = result.length ? result : [];
  return {
    items: attachments,
    total: total.shift().number,
  };
};

const createAttachment = async (_, payload, context) => {
  if (!context?.user) throw new AuthenticationError("You are not logged in");
  //validate
  const schema = Joi.object({
    attachment_title: Joi.string().min(3).max(50).required(),
    attachment_slug: Joi.string().min(3).max(50).required(),
    size: Joi.number().min(1).required(),
    file_extension: Joi.string().min(3).max(10).required(),
  });
  const {
    error,
    value: { attachment_title, attachment_slug, size, file_extension },
  } = schema.validate(payload);
  if (error)
    throw new UserInputError("Failed to insert due to validation", {
      validationErrors: error.details,
    });

  const slugWithInteger =
    attachment_slug +
    "_" +
    Math.floor(Math.random() * 90 + 10) +
    "." +
    file_extension;

  const [result, fields] = await pool.query(
    "INSERT INTO `attachments` ( `attachment_title`, `attachment_slug`, `size`, `file_extension`) VALUES ( ?, ?, ?, ?)",
    [attachment_title, slugWithInteger, size, file_extension]
  );

  if (result.insertId) {
    return {
      ID: result.insertId,
      attachment_title,
      attachment_slug: slugWithInteger,
      size,
      file_extension,
    };
  }
};

module.exports = {
  getAttachment,
  getAttachments,
  createAttachment,
};
