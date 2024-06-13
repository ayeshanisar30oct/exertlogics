import connectDB from "../../../backend/db/connectDB";
import { Logo } from "../../models";
import catchAsync from "backend/utils/catchAsync";

const formidable = require("formidable");
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

export const getLogo = catchAsync(async (req, res) => {
  // Connect to the database
  await connectDB();

  const logos = await Logo.find();
  res.status(200).json({ status: "success", logos });
});

export const updateLogo = catchAsync(async (req, res) => {
  const uploadDir = path.join(process.cwd(), "/public/uploads"); // Define your upload directory

  if (!fs.existsSync(uploadDir)) {
    await fsPromises.mkdir(uploadDir, { recursive: true }); // Create the upload directory if it doesn't exist, using async/await
  }
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

    // Find the existing document or create a new one if it doesn't exist
    let logo = await Logo.findOne();
    if (!logo) {
      logo = new Logo();
    }

    // Update the appropriate logo URL based on the type
    const relativePath = `/uploads/${uploadedFile.newFilename}`; // Relative path for public access
    if (relativePath && logo) {
      let fileUrl = {};
      fileUrl[type[0] + "Url"] = relativePath;

      Object.assign(logo, fileUrl);
      await logo.save();
    }

    res
      .status(200)
      .json({ message: "File uploaded successfully", path: relativePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "File upload failed" });
  }
});
