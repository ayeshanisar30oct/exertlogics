// import User from '../models/User';
import { validate } from "../../utils/validation";
import { loginSchema } from "../../utils/schemas";
import { generateAccessToken } from "../../utils/JWT/token";
import connectDB from "../../db/connectDB";
import { User } from "../../models";

export async function login(req, res) {
  // Validate the request body
  const { isValid, errors, value } = validate(loginSchema, req.body);
  if (!isValid) {
    return res.status(400).json({
      msg: "Validation error",
      errors,
    });
  }

  const { email, password } = value;

  // Connect to the database
  await connectDB();

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    // Compare the password
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ staus : 'fail', msg: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      id: user.id,
    };
    const token = generateAccessToken(payload);

    res.status(200).json({ status: "success", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}
