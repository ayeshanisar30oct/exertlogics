// pages/api/auth/signup.js
import { singup } from '../../../backend/controllers/auth/signupController';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await singup(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({status : "fail", message : `Method ${req.method} Not Allowed`});
  }
}
