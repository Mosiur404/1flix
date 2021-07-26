const pool = require("../../util/database");
const crypto = require("crypto");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const config = require("config");

const createUser = async (_, payload) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
      .required(),
  });
  const { error, value } = schema.validate(payload);
  // if invalid then return data
  if (error)
    throw new UserInputError("Failed to insert due to validation", {
      validationErrors: error.details,
    });

  const [userExist] = await pool.query(
    "SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1;",
    [value.email, value.username]
  );
  //if userExist then return error
  if (userExist.length) {
    const mathingData =
      userExist[0].email === value.email ? value.email : value.username;
    throw new UserInputError(`User ${mathingData} Already Exists`, {
      validationErrors: [
        { message: `User ${mathingData} is already registered` },
      ],
    });
  }

  //if not then create new user
  const [newUser, fields] = await pool.query(
    "INSERT INTO users (`username`, `email`, `password`) VALUES ( ?, ?, ? );",
    [
      value.username,
      value.email.toLocaleLowerCase(),
      hashPassword(value.password),
    ]
  );
  if (newUser.insertId) {
    return {
      access_token: createToken({
        username: value.username,
        isAdmin: false,
      }),
      refresh_token: "111",
    };
  }
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
  console.log(payload);
  if (user.password !== hashPassword(payload.password))
    throw new UserInputError("Password not match", {
      validationErrors: [{ message: `User ${payload.email}, check password.` }],
    });
  return {
    access_token: createToken({
      username: user.username,
      isAdmin: user.role === 0,
    }),
    refresh_token: "111",
  };
};

//helpers
function createToken(data) {
  return jwt.sign(data, config.get("privateKey"), { expiresIn: "24h" });
}
function hashPassword(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

module.exports = { createUser, login };
