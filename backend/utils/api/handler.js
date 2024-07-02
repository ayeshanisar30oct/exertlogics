const controllers = {
  service: import("../../../backend/controllers/service/serviceController"),
  project: import("../../../backend/controllers/project/projectController"),
  category: import("../../../backend/controllers/category/categoryController"),
  contact: import("../../../backend/controllers/contact/contactController"),
  about: import("../../../backend/controllers/about/aboutController"),
  expertise: import("../../../backend/controllers/expertise/expertiseController"),
  footer: import("../../../backend/controllers/footer/footerController"),
  header: import("../../../backend/controllers/header/headerController"),
  home: import("../../../backend/controllers/home/homeController"),
  // Add more endpoints and corresponding controllers here
};

export default async function handler(req, res) {
  const { method, url } = req;
  const endpoint = url.split("/")[2]; // Get the endpoint name from URL

  if (!controllers[endpoint]) {
    res.status(404).json({ status: "fail", message: "Endpoint not found" });
    return;
  }

  const controller = await controllers[endpoint];
  const methodNames = Object.keys(controller).filter(
    (key) => typeof controller[key] === "function"
  );

  if (!methodNames.length) {
    res.status(405).json({
      status: "fail",
      message: "No valid methods found for this endpoint",
    });
    return;
  }

  try {
    if (method === "GET") {

      const methodName = method.toLowerCase() + endpoint.charAt(0).toUpperCase() + endpoint.slice(1);
      const methodToExecute = controller[methodName];
  
      if (methodToExecute && typeof methodToExecute === "function") {

      
      const methodName = method.toLowerCase() + endpoint.charAt(0).toUpperCase() + endpoint.slice(1);
      const methodToExecute = controller[methodName];
      //console.log("GET IFF METHOD NAME",methodName,methodToExecute);
  
      if (methodToExecute && typeof methodToExecute === "function") {
      

        await methodToExecute()(req, res);
      }
    } else if (method === "PATCH") {

      const methodName = "update" + endpoint.charAt(0).toUpperCase() + endpoint.slice(1);
      const methodToExecute = controller[methodName];
  
      if (methodToExecute && typeof methodToExecute === "function") {
        await methodToExecute(req, res);
      }
    } else {
      res.setHeader("Allow", methodNames);
      res.status(405).json({ status: "fail", message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}
