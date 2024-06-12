// import connectDB from "../../../backend/db/connectDB";
// import { validate } from "../../../backend/utils/validation";
// import { logoSchema } from "backend/utils/schemas";
// import { Logo } from "../../models";
// import catchAsync from "backend/utils/catchAsync";

// const formidable = require("formidable");
// import fs from "fs";
// import path from "path";

// // Ensure Next.js parses the request body as multipart/form-data
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadDir = path.join(process.cwd(), "/public/uploads"); // Define your upload directory

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true }); // Create the upload directory if it doesn't exist
// }

// export const createLogo = catchAsync(async (req, res) => {
//   //   await connectDB(); // Ensure you are connected to the database

//   const form = new formidable.IncomingForm({
//     uploadDir,
//     keepExtensions: true, // Retain file extension
//   });
//   console.log("FORM :", form);
//   form.parse(req, async (err, fields, files) => {
//     console.log("PARSE BLOCK", err, fields, files);
//     if (err) {
//       console.error(err);
//       res.status(500).json({ message: "File upload failed" });
//       return;
//     }

//     const { type } = fields; // Get the type from the form fields
//     const uploadedFile = files.file; // Assuming the form field name is 'file'
//     const newPath = path.join(uploadDir, uploadedFile.newFilename);
//     console.log("FORM DATA DETAILS : ", type, uploadedFile, newPath);

//     // Move the uploaded file to the desired directory
//     fs.rename(uploadedFile.filepath, newPath, async (err) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ message: "File rename failed" });
//         return;
//       }

//       // Find the existing document or create a new one if it doesn't exist
//       let logo = await Logo.findOne();
//       if (!logo) {
//         logo = new Logo();
//       }

//       // Update the appropriate logo URL based on the type
//       const relativePath = `/uploads/${uploadedFile.newFilename}`; // Relative path for public access
//       if (type === "logoLight") {
//         logo.logoLightUrl = relativePath;
//       } else if (type === "logoDark") {
//         logo.logoDarkUrl = relativePath;
//       } else if (type === "favicon") {
//         logo.faviconUrl = relativePath;
//       } else {
//         res.status(400).json({ message: "Invalid logo type" });
//         return;
//       }

//       // Save the updated logo document
//       await logo.save();

//       res
//         .status(200)
//         .json({ message: "File uploaded successfully", path: relativePath });
//     });
//   });
// });


import connectDB from "../../../backend/db/connectDB";
import { validate } from "../../../backend/utils/validation";
import { logoSchema } from "backend/utils/schemas";
import { Logo } from "../../models";
import catchAsync from "backend/utils/catchAsync";

const formidable = require("formidable");
import fs from "fs/promises"; // Use promises for cleaner async/await syntax
import path from "path";

// Ensure Next.js parses the request body as multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "/public/uploads"); // Define your upload directory

// if (!fs.existsSync(uploadDir)) {
//   await fs.mkdir({ path: uploadDir, recursive: true }); // Create the upload directory if it doesn't exist, using async/await
// }

export const createLogo = catchAsync(async (req, res) => {
  // Connect to the database (assuming it's necessary)
  await connectDB();

  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true, // Retain file extension
    maxFileSize: 5 * 1024 * 1024, // Set a reasonable maximum file size (5MB)
    multiples: false, // Allow only a single file upload (optional)
  });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

    const { type } = fields; // Get the type from the form fields
    const uploadedFile = files.file; // Assuming the form field name is 'file'

    if (!uploadedFile) {
      throw new Error("No file uploaded");
    }

    const newPath = path.join(uploadDir, uploadedFile.newFilename);

    // Validate file type (optional, add based on your requirements)
    const allowedTypes = ["image/jpeg", "image/png"]; // Example allowed types
    if (!allowedTypes.includes(uploadedFile.mimetype)) {
      throw new Error("Invalid file type");
    }

    await fs.rename(uploadedFile.filepath, newPath);

    // Find the existing document or create a new one if it doesn't exist
    let logo = await Logo.findOne();
    if (!logo) {
      logo = new Logo();
    }

    // Update the appropriate logo URL based on the type
    const relativePath = `/uploads/${uploadedFile.newFilename}`; // Relative path for public access
    if (type === "logoLight") {
      logo.logoLightUrl = relativePath;
    } else if (type === "logoDark") {
      logo.logoDarkUrl = relativePath;
    } else if (type === "favicon") {
      logo.faviconUrl = relativePath;
    } else {
      throw new Error("Invalid logo type");
    }

    // Save the updated logo document
    await logo.save();

    res.status(200).json({ message: "File uploaded successfully", path: relativePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "File upload failed" });
  }
});



export const getLogo = catchAsync(async (req, res) => {
  // Connect to the database
  await connectDB();

  const logos = await Logo.findOne({});
  res.status(200).json({ status: "success", logos });
});
// Update Logos data
export const updateLogo = catchAsync(async (req, res) => {
  // Validate the request body
  const { isValid, errors, value } = validate(logoSchema, req.body);
  if (!isValid) {
    return res.status(400).json({
      msg: "Validation error",
      errors,
    });
  }

  // Connect to the database
  await connectDB();

  // console.log("BODY DATA :", value);
  const logo = await Logo.findById(value.id);
  if (!logo) {
    throw new Error("No data against the ID");
  }
  Object.assign(logo, value);
  await logo.save();

  res.status(200).json({
    status: "success",
    message: "Logo updated successfully!",
    logo,
  });
});
