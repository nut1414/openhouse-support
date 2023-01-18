import { errorHandler, StatusError } from "@/middlewares/errorHandler";
import { dbCollections } from "@/utils/db";

async function handler(req, res){
  const { users } = await dbCollections(["users"]);
  let email = req.query?.email;
  if (!email) throw new StatusError(400,'Bad Request');

  if (req.method == "GET"){
    const user = await users.findOne({email});
    if (!user) throw new StatusError(404, 'Not Found');
    return res.status(200).json({
      name: user.name,
      email: user.email,
      giftRecieved: user.giftRecieved ? true : false,
      _id: user._id
    });
  }else if (req.method == "POST"){
    const giftRecieved = req.body?.giftRecieved;
    if (!(giftRecieved === true || giftRecieved === false)) throw new StatusError(400,'Bad Request');
    
    const user = await users.findOneAndUpdate(
      { email }, 
      { $set: { giftRecieved } }, 
      { returnDocument: "after" }
    );
    return res.status(200).json({
      name: user.name,
      email: user.email,
      giftRecieved: giftRecieved,
      _id: user._id
    });
  }

}

export default errorHandler(handler);