import {
    getCategory,
    updateCategory,
  } from "../../../backend/controllers/category/categoryController";
  
  export default async function handler(req, res) {
    if (req.method === "GET") {
      getCategory(req, res);
    } else if (req.method === "PATCH") {
      updateCategory(req, res);
    } else {
      res.setHeader("Allow", ["GET", "PATCH"]);
      res
        .status(405)
        .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
    }
  }
  