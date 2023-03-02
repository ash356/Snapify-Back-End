import userModel from "../../../../DB/model/User.model.js";
import { hash } from "../../../utils/HashAndCompare.js";

// 01- Update User
export const updateUser = async (req, res) => {
  try {
    // I used the spread operator (...) to create a new object
    // that contains
    // all the fields in the body object except for the password
    const { ...body } = req.body;
    delete body.password;
    const user = await userModel
      .findByIdAndUpdate({ _id: req.user._id }, { ...body }, { new: true })
      .select("-password");
    return res.json({ message: "Success", user });
  } catch (error) {
    return res.json({ message: "Error!", error, stack: error.stack });
  }
};
// 02- Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.user._id);
    return user
      ? res.json({ message: "Success", user })
      : res.json({ message: "User Not Found!" });
  } catch (error) {
    return res.json({ message: "Error!", error });
  }
};
// 03- Get User Data
export const getUserData = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select("userName email gender");
    return res.json({ message: "Success", user });
  } catch (error) {
    return res.json({ message: "Error", error });
  }
};
// 04- Update Password
export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    // Hashing Password
    const hashPassword = hash({ plainText: password, saltRound: 9 });
    const user = await userModel.findByIdAndUpdate(
      { _id: req.user._id },
      { password: hashPassword },
      { new: true }
    );
    return res.json({ message: "Success", user });
  } catch (error) {
    return res.json({ message: "Error!", error, stack: error.stack });
  }
};
// 05- User Profile
export const profile = async (req, res) => {
  try {
    console.log({ user: req.user });
    const user = await userModel.findById(req.user._id);
    return user
      ? res.json({ message: "Success", user })
      : res.json({ message: "User Not Found!" });
  } catch (error) {
    return res.json({ message: "Error!", error });
  }

  // try {
  //     console.log({ user: req.user });

  //     const user = await userModel.findById(req.user._id)
  //     return res.json({ message: "Done", user})
  // } catch (error) {
  //     return res.json({ message: "Catch error", error, stack: error.stack })

  // }
};
// 06- Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json({ message: "Users", users });
  } catch (error) {
    return res.json({ message: "Error", error });
  }
};
