import { aboutSchema } from "backend/utils/schemas";
import { About } from "../../models";
import updateFactory, { getFactory } from "backend/utils/factory/updateFactory";
import {parseForm} from '../../utils/fileUpload';
import catchAsync from "backend/utils/catchAsync";

let reqBody = {
    subTitle : '',
    description : '',
    employeesCount : null,
    clientsCount : null,
    projectsCount : null,
    aboutBannerUrl : null,
}

// Get About data
export const getAbout = getFactory(About);

// Create or update About data
export const updateAbout = catchAsync(async(req,res) => {
        const { fields, files } =  parseForm(req);

        const { type,subTitle,description,employeesCount,projectsCount,clientsCount
         } = fields; // Get the type from the form fields
        const uploadedFile = files?.file[0]; // Assuming the form field name is 'file'
    console.log("FIELDS REC ARE :",fields);
        if (!uploadedFile) {
          throw new Error("No file uploaded");
        }
        const newPath = path.join(uploadDir, uploadedFile.newFilename);
    
        // Validate file type (optional, add based on your requirements)
        const allowedTypes = ["image/jpeg", "image/png"]; // Example allowed types
        if (!allowedTypes.includes(uploadedFile.mimetype)) {
          throw new Error("Invalid file type");
        }
    
        await fsPromises.rename(uploadedFile.filepath, newPath);

    // Update the appropriate logo URL based on the type
    const relativePath = `/uploads/${uploadedFile.newFilename}`; // Relative path for public access
    if (relativePath) {
    //   let fileUrl = {};
    //   fileUrl[type[0] + "Url"] = relativePath;
      reqBody.aboutBannerUrl = relativePath;
      reqBody.subTitle = subTitle
      reqBody.description = description
      reqBody.employeesCount = employeesCount
      reqBody.clientsCount = clientsCount
      reqBody.projectsCount = projectsCount
      req.body = reqBody;
    //   updateFactory(About,aboutSchema);
    }
    console.log("REQ BODY IS : ",req.body)
    res
      .status(200)
      .json({ message: "File uploaded successfully", path: relativePath });

});