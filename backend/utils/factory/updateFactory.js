import connectDB from '../../db/connectDB' // Assume you have a module for connecting to your database
import { validate } from '../validation'; // Assume you have a module for validation
import catchAsync from '../catchAsync'; // Assume you have a utility function for handling async errors


export const getFactory = (model) => catchAsync(async (req, res) => {
    // Connect to the database
    await connectDB();
  
    const docs = await model.find({}).select('-__v');
    if (!docs.length) {
      return res
        .status(200)
        .json({ status: "success", message: "No data found!" });
    }
    const modelName = model.modelName.toLowerCase();
    res.status(200).json({ status: "success", [modelName]:docs });
    });
    
    const updateFactory = (model, schema) => catchAsync(async (req, res) => {
  // Validate the request body
  const { isValid, errors, value } = validate(schema, req.body);
  if (!isValid) {
    return res.status(400).json({
      msg: "Validation error",
      errors,
    });
    }

  // Connect to the database
  await connectDB();

  // Find the existing document or create a new one if it doesn't exist
  let document = await model.findOne();
  if (!document) {
    document = new model();
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
