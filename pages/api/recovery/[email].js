import { errorHandler, StatusError } from "@/middlewares/errorHandler";
import { dbCollections } from "@/utils/db";
import { verifyUserToken } from "@/utils/auth";

async function handler(req, res){
  const { users } = await dbCollections(["users"]);
  const email = req.query?.email;
  const token = req.headers["access-token"];
  if ((await verifyUserToken(token)) == false)
    throw new StatusError(401, "Unauthorized");
  
  const user = await users.findOne({email})
  if (!user) throw new StatusError(404, 'Not Found');

  if (req.method == "GET"){
    return res.status(200).json({
      email: user.email,
      phone: user.phone,
      name: user.name,
    });
  }else if (req.method == "POST"){
    const { password } = req.body;
    if (!password) throw new StatusError(400,'Bad Request');
    const encryptedpass = await bcrypt.hash(password, 10);
    const user = await users.findOneAndUpdate(
      { email },
      { $set: { password: encryptedpass } },
      { returnDocument: "after" } 
    );
    return res.status(200).json({
      email: user.email,
      phone: user.phone,
      name: user.name,
    });
  }
  throw new StatusError(405, 'Method Not Allowed');
}

export default errorHandler(handler);