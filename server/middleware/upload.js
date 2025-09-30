const multer = require('multer');
const path = require('path');

// Storage configuration: store files in server/uploads with original filename prefixed by timestamp
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename(req, file, cb) {
    const timestamp = Date.now();
    const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${timestamp}-${sanitizedOriginal}`);
  },
});

// Basic file filter that accepts common image types; adjust as needed
function fileFilter(req, file, cb) {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter });

module.exports = upload; 