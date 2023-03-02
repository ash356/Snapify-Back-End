import userModel from "../../DB/model/User.model.js";
import { VerifyToken } from "../utils/createAndverifyToken.js";
const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // console.log({ authorization });
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      return res.json({ message: "In-Valid Bearer Key !" });
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    // console.log({ token });
    if (!token) {
      return res.json({ message: "Token Is Required!" });
    }
    const decoded = VerifyToken({
      token,
      signature: process.env.TOKEN_SIGNATURE,
    });
    // console.log({ decoded });
    const authUser = await userModel
      .findById(decoded.id)
      .select("userName email");
    if (!authUser) {
      return res.json({ message: "Account Not Found !" });
    }
    req.user = authUser;
    return next();
  } catch (error) {
    return res.json({ message: "Error!", error });
  }
};

export default auth;
