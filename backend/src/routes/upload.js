const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// POST /api/upload - form field: file
router.post('/', uploadController.uploadCsv);

module.exports = router;
