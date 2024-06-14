import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      res.status(400).send("Unauthorized Access! Please login to continue!");
    } else {
      req._id = data._id;
      req.user = data.user;
      next();
    }
  });
};
