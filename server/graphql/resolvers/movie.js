const { AuthenticationError } = require("apollo-server-express");
const pool = require("../../util/database");

const getMovies = async (_, __, context) => {
  if (!context?.user) throw new AuthenticationError("You are not logged in");
  const [movies, fields] = await pool.query("SELECT * FROM movies LIMIT 4;");
  return movies;
};

const getMovie = async (parent, args, context) => {
  if (!context?.user) throw new AuthenticationError("You are not logged in");

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
