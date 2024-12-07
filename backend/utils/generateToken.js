import jwt from "jsonwebtoken";

const generateJwtToken = (res, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET, // Secret key for signing the token
    {
      expiresIn: "30d", // Token expiration time
    }
  );

  // Set the token as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === "production", // Set 'secure' to true in production
  });

  return token;
};

export default generateJwtToken;
