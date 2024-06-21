import connectDB from "../../db/connectDB"; // Assume you have a module for connecting to your database
import { validate } from "../validation"; // Assume you have a module for validation
import catchAsync from "../catchAsync"; // Assume you have a utility function for handling async errors

export const getFactory = (model) =>
  catchAsync(async (req, res) => {
    const id = req.query?.id;
    let filter = id ? { _id: id } : {};
    // Connect to the database
    await connectDB();

    const docs = await model.find(filter).select("-__v");
    if (!docs.length) {
      return res
        .status(200)
        .json({ status: "success", message: "No data found!" });
    }
    const modelName = model.modelName.toLowerCase();
    res.status(200).json({ status: "success", [modelName]: docs });
  });

const updateFactory = (model, schema, isMultiple = false) =>
  catchAsync(async (req, res) => {
    const id = req.query?.id;
    let filter = id ? { _id: id } : {};
    console.log("Filter and Query :", id, filter);

    // Validate the request body
    const { isValid, errors, value } = validate(schema, req.body);
    if (!isValid) {
      return res.status(400).json({
        msg: "Validation error",
        errors,
      });
    }

    // Check if the filter object is empty
    const isFilterEmpty = isEmptyObject(filter);

    // Connect to the database
    await connectDB();
    // let document = !isFilterEmpty ? isMultiple ? document = await model.findById(filter) : await model.findOne(filter) : document = new model();

    let document;

    if (isMultiple) {
      if (!isFilterEmpty) {
        // If isMultiple is true and filter is not empty
        document = await model.findById(filter);
      } else {
        // If isMultiple is true and filter is empty
        document = document = new model();
      }
    } else {
        document = await model.findOne(filter);
        if (!document) {
          document = new model();
        }
      }

    if (!document) {
      throw new Error("No document found with the given ID.");
    }

    Object.assign(document, value);
    await document.save();

    const modelName = model.modelName.toLowerCase();
    res.status(200).json({
      status: "success",
      message: `${model.modelName} updated successfully!`,
      [modelName]: document,
    });
  });

export default updateFactory;

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
