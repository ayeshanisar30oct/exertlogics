import connectDB from "../../../backend/db/connectDB";
import { validate } from "../../../backend/utils/validation";
import { homeSchema } from "backend/utils/schemas";
import { Home } from "../../models";
import catchAsync from "backend/utils/catchAsync";

export const getHome = catchAsync(async (req, res) => {
  // Connect to the database
  await connectDB();

  const home = await Home.findOne({});
  res.status(200).json({ status: "success", home });
});

export const createHome = catchAsync(async(req, res) => {
  // Validate the request body
  const { isValid, errors, value } = validate(homeSchema, req.body);
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
    const home = new Home(value);

    await home.save();

    res.status(200).json({
      status: "success",
      message: "Home data created successfully!",
      home,
    });

});