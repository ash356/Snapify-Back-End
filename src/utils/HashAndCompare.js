import bcrypt from "bcryptjs";

export const hash = ({plainText = "",saltRound = process.env.SALT_ROUND} = {}) => {
  const hashResult = bcrypt.hashSync(plainText, parseInt(saltRound));
  return hashResult;
};
export const compare = ({ plainText = "", hasedValue } = {}) => {
  const match = bcrypt.compareSync(plainText, hasedValue);
  return match;
};
