import { Router } from 'express';
// import { register, login } from '../controllers/authController.js';

const router = Router();

router.post('/register', (req, res) => {
  res.status(200).json({ message: 'Register endpoint' });
});
router.post('/login', (req, res) => {
  res.status(200).json({ message: 'Login endpoint' });
});

export default router;
