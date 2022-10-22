const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
  try {
    const sign = jwt.sign(
      {
        _id: user._id,
        // role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    return sign;
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

/* const decodeSign = (token) => {
  return jwt.decode(token, null);
}; */

module.exports = { tokenSign, verifyToken };
