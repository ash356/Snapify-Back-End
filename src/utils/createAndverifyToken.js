import jwt from "jsonwebtoken";
export const createToken = ({
  payload = {},
  signature = process.env.TOKEN_SIGNATURE,
  expiresIn = 60 * 60 * 24 * 30,
} = {}) => {
  const token = jwt.sign(payload, signature, { expiresIn });
  return token;
};
export const VerifyToken = ({
  token = {},
  signature = process.env.TOKEN_SIGNATURE,
} = {}) => {
  const decoded = jwt.verify(token, signature);
  return decoded;
};
