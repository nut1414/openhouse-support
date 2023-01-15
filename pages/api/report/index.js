import { errorHandler, StatusError } from "@/middlewares/errorHandler";
import { verifyUserToken } from "@/utils/auth";
import { dbCollections } from "@/utils/db";

async function handler(req, res) {
  const { reports } = await dbCollections(["reports"]);
  const token = req.headers["access-token"];
  

  if (await verifyUserToken(token) == false)
    throw new StatusError(401, "Unauthorized");
  
  const allreports = await reports.find({}).toArray();
  return res.status(200).json({ reports: allreports });
}

export default errorHandler(handler)