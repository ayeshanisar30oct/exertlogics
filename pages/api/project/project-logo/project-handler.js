import { updateProjectLogos } from "../../../../backend/controllers/project/projectController";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "PATCH") {
     updateProjectLogos(req, res);
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res
      .status(405)
      .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
  }
}
