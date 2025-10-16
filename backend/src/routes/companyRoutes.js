const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const {
  registerCompany,
  getCompanyById,
  getAllCompanies,
  updateCompanyStatus,
} = require('../controllers/companyController');

router.post('/register', protect, registerCompany);
router.get('/', protect, admin, getAllCompanies);
router.get('/:id', protect, getCompanyById);
router.put('/:id/status', protect, admin, updateCompanyStatus);

module.exports = router;
