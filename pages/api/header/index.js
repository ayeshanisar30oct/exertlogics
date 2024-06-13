import {
  getHeader,
  updateHeader,
} from "../../../backend/controllers/header/headerController";

export default async function handler(req, res) {
  if (req.method === "GET") {
     getHeader(req, res);
  }
  else if (req.method === "PATCH") {
     updateHeader(req, res);
  } else {
    res.setHeader("Allow", ["GET", "PATCH"]);
    res
      .status(405)
      .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
  }
}
