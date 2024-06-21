import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
const formidable = require("formidable");

// Helper function to parse the form data
export const fileUpload = async (req, res) => {
  let fileUrl = {};
  const uploadDir = path.join(process.cwd(), "/public/uploads"); // Define your upload directory

  if (!fs.existsSync(uploadDir)) {
    await fsPromises.mkdir(uploadDir, { recursive: true }); // Create the upload directory if it doesn't exist, using async/await
  }
  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true, // Retain file extension
    maxFileSize: 5 * 1024 * 1024, // Set a reasonable maximum file size (5MB)
    multiples: false, // Allow only a single file upload (optional)
  });

  try {
    console.log("FILE UPLOAD UTILITY ");
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
    const uploadedFile = files?.file[0]; // Assuming the form field name is 'file'

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
       fileUrl[type[0] + "Url"] = relativePath;
       return {fileUrl};
    } else {
      throw new Error("File not uploded!");
    }

  } catch (err) {
    console.error(err);
    return {err}
  }
};
