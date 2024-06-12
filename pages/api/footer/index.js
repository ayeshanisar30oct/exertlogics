import {
    getFooter,
    createFooter,
    updateFooter,
  } from "../../../backend/controllers/footer/footerController";
  
  export default async function handler(req, res) {
    if (req.method === "GET") {
      await getFooter(req, res);
    }
    //   else if (req.method === "POST") {
    //     await createFooter(req, res);
    //   }
    else if (req.method === "PATCH") {
      await updateFooter(req, res);
    } else {
      res.setHeader("Allow", ["GET", "PATCH"]);
      res
        .status(405)
        .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
    }
  }
  