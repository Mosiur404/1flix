const pool = require("../../util/database");
const crypto = require("crypto");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const config = require("config");

const createUser = async (_, payload) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$")),
  });
  const { error, value } = schema.validate(payload);
  // if invalid then return data
  if (error)
    throw new UserInputError("Failed to insert due to validation", {
      validationErrors: error.details,
    });

  const [userExist] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1;",
    [value.email]
  );
  //if userExist then return error
  if (userExist.length) {
    throw new UserInputError("User Already Exists", {
      validationErrors: [
        { message: `User ${value.email} is already registered` },
      ],
    });
  }

  //if not then create new user
  const [newUser, fields] = await pool.query(
    "INSERT INTO users (`email`, `password`) VALUES ( ?, ? );",
    [value.email.toLocaleLowerCase(), hashPassword(value.password)]
  );

  return { ID: newUser.insertId, email: value.email, created_at: new Date() };
};

const login = async (_, payload) => {
  const [userExist, field] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1;",
    [payload.email]
  );
  //if user not exisst then return error
  if (userExist.length == 0) {
    throw new UserInputError("User doesn't Exist, please sign up", {
      validationErrors: [{ message: `User ${payload.email} doesn't exist.` }],
    });
  }
  const user = userExist.shift();
  // user exists so match password

  if (user.password !== hashPassword(payload.password))
    throw new UserInputError("Password not match", {
      validationErrors: [{ message: `User ${payload.email}, check password.` }],
    });
  return {
    username: user.username,
    access_token: createToken({ email: user.email, isAdmin: !user.role }),
    refresh_token: "111",
  };
};

//helpers
function createToken(data) {
  return jwt.sign(data, config.get("privateKey"));
}
function hashPassword(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

module.exports = { createUser, login };
