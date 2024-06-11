import connectDB from '../../../backend/db/connectDB';
import User from '../../../backend/models/User';
import { validate } from '../../../backend/utils/validation';
import { registerSchema } from '../../../backend/utils/schemas';
import { generateAccessToken } from 'backend/utils/JWT/token';

export async function signup(req, res) {
    // Validate the request body
    const { isValid, errors, value } = validate(registerSchema, req.body);
    if (!isValid) {
      return res.status(400).json({
        msg: 'Validation error',
        errors,
      });
    }
  
    const { name, email, password } = value;
  
    // Connect to the database
    await connectDB();
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create new user
      user = new User({
        name,
        email,
        password,
      });
  
      await user.save();
      console.log("USER ID :",user.id)
      const token = await generateAccessToken({id : user.id});

  
      res.status(200).json({ msg: 'User registered successfully', token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({status:'fail',message: err.message});
    }
  }