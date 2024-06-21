// import {
//     updateServiceBanner,
//   } from "../../../../backend/controllers/service/serviceController";
  
//   // Ensure Next.js parses the request body as multipart/form-data
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

//   export default async function handler(req, res) {
//    if (req.method === "PATCH") {
//     updateServiceBanner(req, res);
//     } else {
//       res.setHeader("Allow", ["PATCH"]);
//       res
//         .status(405)
//         .json({ status: "fail", message: `Method ${req.method} Not Allowed` });
//     }
//   }

import handler, { config } from './service-handler';

export { config };

export default async function(req, res) {
  await handler(req, res);
}

  