import userModel from "../../../../DB/model/User.model.js";
import { createToken } from "../../../utils/createAndverifyToken.js";
import { compare, hash } from "../../../utils/HashAndCompare.js";
export const getAuthModule = (req, res) => {
  return res.redirect("/sign-up");
};
// 01- Sign-Up
export const signUp = async (req, res) => {
  try {
    // Destructing Data From Body
    const { userName, email, password, cPassword } = req.body;
    // console.log({ userName, email, password, cPassword });
    // Check Confirmation Password
    if (password != cPassword) {
      return res.json({ message: "Password MisMatch Confirmation Password" });
    }
    // Check User In  DataBase
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.json({ message: "Email Allready Exist !" });
    }
    // Hashing Password
    const hashPassword = hash({ plainText: password, saltRound: 9 });
    // console.log(hashPassword);
    const user = await userModel.create({
      userName,
      email: email,
      password: hashPassword,
    });
    return res.json({ message: "Success", user });
  } catch (error) {
    return res.json({ message: "Error!", error });
  }
};
// 02- Sign-In
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "In-Valid Email!" });
    }
    const matchPassword = compare({
      plainText: password,
      hasedValue: user.password,
    });
    // console.log({ matchPassword });
    if (!matchPassword) {
      return res.json({ message: "In-Valid Password!" });
    }
    const token = createToken({
      payload: { id: user._id, isLoggedIn: true },
      signature: process.env.TOKEN_SEGNATURE,
      expiresIn: 60 * 60 * 24 * 30,
    });

    return res.json({ message: "Success", token });
  } catch (error) {
    return res.json({ message: "Error!", error });
  }
};
