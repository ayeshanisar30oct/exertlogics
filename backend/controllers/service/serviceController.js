import { serviceSchema } from "backend/utils/schemas";
import { Service } from "../../models";
import updateFactory, { getFactory } from "backend/utils/factory/updateFactory";
import { fileUpload } from "../../utils/fileUpload";
import catchAsync from "backend/utils/catchAsync";
import connectDB from "../../../backend/db/connectDB";

// Get About data
export const getService = getFactory(Service);

// Create or update Service data
export const updateServiceBanner = catchAsync(async (req, res) => {
  const id = req.query?.id;
  let filter = id ? { _id: id } : {};

  const { fileUrl, err } = await fileUpload(req, res);
  if (err)
    return res.status(500).json({ status: "fail", message: "File upload failed!" });

  // Check if the filter object is empty
  const isFilterEmpty = isEmptyObject(filter);

  // Connect to the database
  await connectDB();
  let service = !isFilterEmpty ? await Service.findById(filter) : service = new Service();

  if (!service) {
    throw new Error("No document found with the given ID.");
  }

  if (fileUrl) {
    Object.assign(service, fileUrl);
    await service.save();
  }
  res.status(200).json({
      status: "success",
      message: "File uploaded successfully",
      path: fileUrl,
    });
});

// Create or update Service data
export const updateService = updateFactory(Service, serviceSchema,true);

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
