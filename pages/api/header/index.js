import {
  getHeader,
  createHeader,
  updateHeader,
} from "../../../backend/controllers/navbar/navbarController";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getHeader(req, res);
  }
  //   else if (req.method === "POST") {
  //     await createHeader(req, res);
  //   }
  else if (req.method === "PATCH") {
    await updateHeader(req, res);
  } else {
    res.setHeader("Allow", ["GET", "PATCH"]);
    res
      .status(405)
      .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
  }
}
