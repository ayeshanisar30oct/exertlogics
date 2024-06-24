import {
    getExpertise,
    updateExpertise,
  } from "../../../backend/controllers/expertise/expertiseController";
  
  export default async function handler(req, res) {
    if (req.method === "GET") {
      getExpertise(req, res);
    } else if (req.method === "PATCH") {
      updateExpertise(req, res);
    } else {
      res.setHeader("Allow", ["GET", "PATCH"]);
      res
        .status(405)
        .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
    }
  }
  