// pages/api/auth/login.js
import { login } from '../../../backend/controllers/auth/loginController';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await login(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
