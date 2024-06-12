import connectDB from "../../../backend/db/connectDB";
import { validate } from "../../../backend/utils/validation";
import { footerSchema } from "backend/utils/schemas";
import { Footer } from "../../models";
import catchAsync from "backend/utils/catchAsync";

export const getFooter = catchAsync(async (req, res) => {
  // Connect to the database
  await connectDB();

  const footer = await Footer.find({});
  res.status(200).json({ status: "success", footer });
});

export const createFooter = catchAsync(async(req, res) => {
  // Validate the request body
  const { isValid, errors, value } = validate(footerSchema, req.body);
  if (!isValid) {
    return res.status(400).json({
      msg: "Validation error",
      errors,
    });
  }

  // const { name, email, password } = value;

  // Connect to the database
  await connectDB();

    console.log("BODY DATA :", value);
    const footer = new Footer(value);

    await footer.save();

    res.status(200).json({
      status: "success",
      message: "Footer data created successfully!",
      footer,
    });

});

// Update Header data
export const updateFooter = catchAsync(async (req, res) => {
    // Validate the request body
    const { isValid, errors, value } = validate(footerSchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        msg: "Validation error",
        errors,
      });
    }
  
    // Connect to the database
    await connectDB();
  
    // console.log("BODY DATA :", value);
    const footer = await Footer.findById(value.id);
    if(!footer){
      throw new Error("No data against the ID")
    }
    Object.assign(footer, value);
    await footer.save();
  
    res.status(200).json({
      status: "success",
      message: "Footer updated successfully!",
      footer,
    });
  });