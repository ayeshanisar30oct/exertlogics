import {
    getService,
    updateService
  } from "../../../backend/controllers/service/serviceController";
  
  export default async function handler(req, res) {
    if (req.method === "GET") {
      getService(req, res);
    }  else if(req.method === "POST" || req.method === "PATCH") {
        updateService(req, res);
    }
    else {
        res.setHeader("Allow", ["GET","POST","PATCH"]);
        res
          .status(405)
          .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
      
    }
  }
  