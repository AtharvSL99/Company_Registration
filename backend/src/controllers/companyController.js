const { query, run } = require('../models/companyModel');

const registerCompany = async (req, res) => {
  const { company_name, registration_number, address } = req.body;
  const { id: user_id } = req.user;

  if (!company_name || !registration_number || !address) {
    return res.status(400).json({ message: 'Please provide company name, registration number, and address.' });
  }

  try {
    const companyExists = await query('SELECT * FROM companies WHERE registration_number = ?', [registration_number]);

    if (companyExists.rows.length > 0) {
      return res.status(400).json({ message: 'Company with this registration number already exists.' });
    }

    const result = await run(
      'INSERT INTO companies (user_id, company_name, registration_number, address) VALUES (?, ?, ?, ?)',
      [user_id, company_name, registration_number, address]
    );

    const newCompany = await query('SELECT * FROM companies WHERE id = ?', [result.lastID]);

    res.status(201).json(newCompany.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await query('SELECT * FROM companies WHERE id = ?', [id]);

    if (company.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    res.json(company.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await query('SELECT * FROM companies');
    res.json(companies.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCompanyStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['verified', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Please provide either \'verified\' or \'rejected\'.' });
  }

  try {
    await run(
      'UPDATE companies SET status = ? WHERE id = ?',
      [status, id]
    );

    const updatedCompany = await query('SELECT * FROM companies WHERE id = ?', [id]);

    if (updatedCompany.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    res.json(updatedCompany.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerCompany,
  getCompanyById,
  getAllCompanies,
  updateCompanyStatus,
};