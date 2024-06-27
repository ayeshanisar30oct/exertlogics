import connectDB from "../../db/connectDB";
import { validate } from "../validation";
import catchAsync from "../catchAsync";
import { isEmptyObject, hasReferencedPath } from "../helpers";

export const getFactory = (model, pop = "", isRefrenced = false,limit = 0,page = 1,) =>
  catchAsync(async (req, res) => {
    const id = req.query?.id;
    // const page = parseInt(req.query?.page) || 1;
    // const limit = parseInt(req.query?.limit) ;
    const skip = (page - 1) * limit;

    let filter = {};

    //console.log("FUNCTION TRIGGERED :",pop,isRefrenced)

    // If the collection has a reference, dynamically build the filter
    filter = isRefrenced ? await hasReferencedPath(model, id) : id ? { _id: id } : {};
    //console.log("FILTER OBJECT IS :",filter,id)

    // Connect to the database
    await connectDB();

    const docs = await model.find(filter).populate(pop).skip(skip).limit(limit).select("-__v");
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
    //console.log("Filter and Query :", id, filter);

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

    let document;

    if (isMultiple) {
      if (!isFilterEmpty) {
        // If isMultiple is true and filter is not empty
        document = await model.findById(filter);
      } else {
        // If isMultiple is true and filter is empty
        document = new model();
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
