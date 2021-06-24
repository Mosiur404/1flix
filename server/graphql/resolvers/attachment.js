const pool = require("../../util/database");

const getAttachment = async (parent, args) => {
  console.log(parent, args);
  const ID = args.ID || parent.cover_ID;
  const [result, fields] = await pool.query(
    "SELECT * FROM attachments WHERE ID = ? LIMIT 1",
    [ID]
  );
  const attachment = result.length ? result.shift() : {};
  return attachment;
};

module.exports = {
  getAttachment,
};
