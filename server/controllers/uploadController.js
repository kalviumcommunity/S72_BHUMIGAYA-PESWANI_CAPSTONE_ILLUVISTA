// Respond with uploaded file metadata
exports.handleSingleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  return res.status(201).json({
    message: 'File uploaded successfully',
    file: {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
    },
  });
}; 