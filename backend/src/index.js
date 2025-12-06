const express = require('express');
const cors = require('cors');
const path = require('path');
const salesRoutes = require('./routes/sales');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sales', salesRoutes);
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);
const healthRoutes = require('./routes/health');
app.use('/api/health', healthRoutes);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Backend listening on http://${HOST}:${PORT}`);
  console.log('Make sure dataset is at backend/data/sales.csv');
});
