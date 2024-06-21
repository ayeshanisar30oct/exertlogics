import { aboutSchema } from "backend/utils/schemas";
import { About } from "../../models";
import updateFactory, { getFactory } from "backend/utils/factory/updateFactory";
import { fileUpload } from "../../utils/fileUpload";
import catchAsync from "backend/utils/catchAsync";
import connectDB from "../../../backend/db/connectDB";

// Get About data
export const getAbout = getFactory(About);

// Create or update About data
export const updateAboutBanner = catchAsync(async (req, res) => {
  const { fileUrl, err } = await fileUpload(req, res);
  if(err) return res.status(500).json({status:'fail',message:''})

  // Connect to the database
  await connectDB();
  let about = await About.findOne({});
  if (!about) {
    about = new About();
  }
  if (fileUrl && about) {
    Object.assign(about, fileUrl);
    await about.save();
  }
  res.status(200).json({ message: "File uploaded successfully", path: fileUrl, about });
});

// Create or update about data
export const updateAbout = updateFactory(About, aboutSchema);
