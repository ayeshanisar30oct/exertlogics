import { getProject } from "backend/controllers/project/projectController";

export default async function (req, res) {
    if(req.method === 'GET'){
         getProject(true)(req, res);
    }
    else {
        res.setHeader("Allow", "GET");
        res.status(405).json({ status: "fail", message: `Method ${method} Not Allowed` });
      }
}