import { dbCollections } from "@/utils/db";
import { verifyUserToken } from "@/utils/auth";
import { errorHandler, StatusError } from "@/middlewares/errorHandler";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  const { reports } = await dbCollections(["reports"]);
  const token = req.headers["access-token"];
  const { reportid } = req.query;
  
  const id = new ObjectId(reportid);

  if (await verifyUserToken(token) == false)
    throw new StatusError(401, "Unauthorized");
  

  if (req.method === "GET"){
    let report = await reports.findOne({ _id: id });
    if (report == null) throw new StatusError(404, "Not Found");

    return res.status(200).json({ report });

  } else if (req.method === "POST"){
    const { done } = req.body;
    if (done == null) throw new StatusError(400, "Bad Request");

    let report = await reports.findOneAndUpdate(
      { _id: id }, 
      { $set: { done } }, 
      { returnDocument: "after" }
    );
    return res.status(200).json({ report, message: "Report updated" });

  } else if (req.method === "DELETE"){
    let report = await reports.findOneAndDelete({ _id: id });
    if (report.value == null) throw new StatusError(404, "Not Found");

    return res.status(200).json({ report: report.value, message: "Report deleted" });
  }
  
  throw new StatusError(405, "Method Not Allowed");
}

export default errorHandler(handler)