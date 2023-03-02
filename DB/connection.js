import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_LOCAL)
    .then((result) => {
      console.log(`DB Connected...`);
      //   console.log(result);
    })
    .catch((err) => {
      console.log(`Fail To Connect! ${err}`);
    });
};
export default connectDB;
