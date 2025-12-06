const path = require('path');
const multer = require('multer');
const fs = require('fs');

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dataDir),
  filename: (req, file, cb) => cb(null, 'sales.csv'),
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.csv'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Only CSV files are allowed')); 
};

const upload = multer({ storage, fileFilter }).single('file');

exports.uploadCsv = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    if (!req.file) return res.status(400).json({ success: false, error: 'No file provided' });
    return res.json({ success: true, path: `/data/${req.file.filename}` });
  });
};
