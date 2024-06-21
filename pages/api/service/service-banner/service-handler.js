import { updateServiceBanner } from "../../../../backend/controllers/service/serviceController";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "PATCH") {
     updateServiceBanner(req, res);
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res
      .status(405)
      .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
  }
}
