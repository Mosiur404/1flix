const pool = require("../../util/database");

const getMovies = async () => {
  const [movies, fields] = await pool.query("SELECT * FROM movies LIMIT 10;");
  return movies;
};

const getMovie = async (parent, args) => {
  const { ID } = args;
  const Connection = await pool.getConnection();
  const [result, fields] = await Connection.query(
    "SELECT * FROM movies WHERE ID = ? LIMIT 1;",
    [ID]
  );
  Connection.release();
  const movie = result.length ? result.shift() : {};
  return movie;
};

module.exports = {
  getMovies,
  getMovie,
};
