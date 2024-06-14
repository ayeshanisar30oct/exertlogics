import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
const formidable = require("formidable");

// Helper function to parse the form data
export const parseForm = async(req) => {
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
  
     return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
            return;
          }
          resolve({ fields, files });
        });
      });
  };



