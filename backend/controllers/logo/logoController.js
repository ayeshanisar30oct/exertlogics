import connectDB from "../../../backend/db/connectDB";
import { Logo } from "../../models";
import catchAsync from "backend/utils/catchAsync";
import { fileUpload } from "../../utils/fileUpload";

export const getLogo = catchAsync(async (req, res) => {
  // Connect to the database
  await connectDB();

  const logos = await Logo.find();
  res.status(200).json({ status: "success", logos });
});

export const updateLogo = catchAsync(async (req, res) => {
  console.log("API HIT=====")

  const { fileUrl, err } = await fileUpload(req, res);
  if(err) return res.status(500).json({status:'fail',message:'File upload failed!'})

  // Connect to the database
  await connectDB();
  let logo = await Logo.findOne({});
  if (!logo) {
    logo = new Logo();
  }
  if (fileUrl && logo) {
    Object.assign(logo, fileUrl);
    await logo.save();
  }
  res.status(200).json({ message: "File uploaded successfully", path: fileUrl });
});
