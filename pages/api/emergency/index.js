import { errorHandler } from "@/middlewares/errorHandler";
import { dbCollections } from "@/utils/db";

async function handler(req, res) {
  const { users } = await dbCollections(["users"]);
  const email = req.query?.email;
  if (!email) throw new StatusError(400, "Bad Request");

}