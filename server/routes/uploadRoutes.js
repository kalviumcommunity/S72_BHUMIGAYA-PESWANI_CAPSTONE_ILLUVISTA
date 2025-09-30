const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { handleSingleUpload } = require('../controllers/uploadController');

// POST /api/upload - single file under field name 'file'
router.post('/', upload.single('file'), handleSingleUpload);

module.exports = router; 