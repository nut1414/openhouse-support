import jwt from "jsonwebtoken";

export function verifyUserToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) resolve(false);
      resolve(true);
    });
  });
}