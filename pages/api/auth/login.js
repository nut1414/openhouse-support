import { errorHandler, StatusError } from "@/middlewares/errorHandler";
import { dbCollections } from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  const { admins } = await dbCollections(["admins"]);
  const { email, password } = req.body;

  const account = await admins.findOne({email: email});
  if (account == null || !bcrypt.compareSync(password, account?.password)) 
    throw new StatusError(403, "Invalid email or password");
  
  const token = jwt.sign({ 
    user_id: account._id,
    email: account.email
  }, process.env.TOKEN_KEY, { expiresIn: "1d" });

  return res.status(200).json([{
    name: account.name,
    email: account.email,
    accountType: account.accountType,
    _id: account._id,
    token: token
  }]);
}

export default errorHandler(handler);