import { errorHandler, StatusError } from "@/middlewares/errorHandler";
import { verifyUserToken } from "@/utils/auth";
import { dbCollections } from "@/utils/db";

async function handler(req, res) {
  const { forms } = await dbCollections(["forms"]);
  const token = req.headers["access-token"];

  if ((await verifyUserToken(token)) == false)
    throw new StatusError(401, "Unauthorized");

  const allForms = await forms.find({}).toArray();
  return res.status(200).json({ forms: allForms });
}

export default errorHandler(handler);
