import { errorHandler, StatusError } from "@/middlewares/errorHandler";
import { dbCollections } from "@/utils/db";
import { verifyUserToken } from "@/utils/auth";

async function handler(req, res){
  const collections = await dbCollections(["users", "e-stamp"]);
  let email = req.query?.email;

  const token = req.headers["access-token"];
  if ((await verifyUserToken(token)) == false)
    throw new StatusError(401, "Unauthorized");

  if (!email) throw new StatusError(400,'Bad Request');
  const user = await collections.users.findOne({email});
  if (!user) throw new StatusError(404, 'Not Found');

  if (req.method == "GET"){
    const stamps = await collections['e-stamp'].findOne({_id: user._id});
    if (!stamps) throw new StatusError(404, 'Not Found');
    return res.status(200).json({
      stamps: stamps.stamp,
      email: user.email,
      _id: user._id,
      name: user.name
    });

  }else if (req.method == "POST"){
    const estamp = req.body?.estamp;
    if (!(estamp.length)) throw new StatusError(400,'Bad Request');
    
    const stamps = await collections['e-stamp'].findOneAndUpdate(
      { _id: user._id },
      { $set: { stamp:estamp } },
      { returnDocument: "after" }
    );
    return res.status(200).json({
      stamps: stamps.stamp,
      email: user.email,
      _id: user._id,
      name: user.name
    });
  }
  throw new StatusError(405, 'Method Not Allowed');
}

export default errorHandler(handler);