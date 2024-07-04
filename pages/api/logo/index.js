import {
  getLogo,
  updateLogo,
} from "../../../backend/controllers/logo/logoController";

// Ensure Next.js parses the request body as multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
     await getLogo(req, res);
  } else if (req.method === "PATCH") {
     await updateLogo(req, res);
  } else {
    res.setHeader("Allow", ["GET", "PATCH"]);
    res
      .status(405)
      .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
  }
}
