import {
    getHome,
    updateHome
  } from "../../../backend/controllers/home/homeController";
  
  export default async function handler(req, res) {
    if (req.method === "GET") {
       getHome(req, res);
    }
    else if (req.method === "PATCH") {
       updateHome(req, res);
    } else {
      res.setHeader("Allow", ["GET", "PATCH"]);
      res
        .status(405)
        .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
    }
  }
  