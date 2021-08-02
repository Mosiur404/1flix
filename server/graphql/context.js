const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();
const context = ({ req }) => {
  const context = {};
  const authorization = req.headers?.authorization || false;
  if (authorization) {
    const parts = authorization.split(" ");
    if (parts.length !== 2) return context;
    try {
      const token =
        parts.length === 2 && parts[0].toLowerCase() === "bearer"
          ? parts[1]
          : undefined;
      const key = process.env.privateKey;
      const isValid = jwt.verify(token, key);

      if (isValid) {
        const user = jwt.decode(token, key);
        context.user = {
          username: user.username,
          isAdmin: user.isAdmin,
        };
      }
    } catch (e) {
      throw new AuthenticationError("Login failed");
    }
  }

  return context;
};

module.exports = context;
