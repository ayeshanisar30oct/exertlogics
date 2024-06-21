import {
    updateAboutBanner,
  } from "../../../backend/controllers/about/aboutController";
  
  // Ensure Next.js parses the request body as multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

  export default async function handler(req, res) {
   if (req.method === "PATCH") {
    updateAboutBanner(req, res);
    } else {
      res.setHeader("Allow", ["PATCH"]);
      res
        .status(405)
        .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
    }
  }
  