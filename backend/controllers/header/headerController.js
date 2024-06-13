import connectDB from "../../db/connectDB";
import { validate } from "../../utils/validation";
import { headerSchema } from "backend/utils/schemas";
import { Header } from "../../models";
import catchAsync from "backend/utils/catchAsync";

export const getHeader = catchAsync(async (req, res) => {
  // Connect to the database
  await connectDB();

  const header = await Header.find({});
  if (!header.length) {
    return res
      .status(200)
      .json({ status: "success", message: "No data found!" });
  }
  res.status(200).json({ status: "success", header });
});

// export async function createHeader(req, res) {
//   // Validate the request body
// const { isValid, errors, value } = validate(headerSchema, req.body);
//   if (!isValid) {
//     return res.status(400).json({
//       msg: "Validation error",
//       errors,
//     });
//   }

//   // const { name, email, password } = value;

//   // Connect to the database
//   await connectDB();

//   try {
//     console.log("BODY DATA :", value);
//     const navBar = new NavBar(value);

//     await navBar.save();
//     console.log("Navigation bar created");

//     res.status(200).json({
//       status: "success",
//       message: "Header data created successfully!",
//       navBar,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send({ status: "fail", message: err.message });
//   }
// }

// Update Header data
export const updateHeader = catchAsync(async (req, res) => {
  // Validate the request body
  const { isValid, errors, value } = validate(headerSchema, req.body);
  if (!isValid) {
    return res.status(400).json({
      msg: "Validation error",
      errors,
    });
  }

  // Connect to the database
  await connectDB();

  // console.log("BODY DATA :", value);
  // Find the existing document or create a new one if it doesn't exist
  let header = await Header.findOne();
  if (!header) {
    header = new Header();
  }
  Object.assign(header, value);
  await header.save();

  res.status(200).json({
    status: "success",
    message: "Header updated successfully!",
    header,
  });
});
