import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token || token == undefined) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({
        success: false,
        error: error.message,
        message: "Internal Server Error",
      });
  }
};

export default isAuth;
