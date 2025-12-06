const express = require('express');
const cors = require('cors');
const path = require('path');
const salesRoutes = require('./routes/sales');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sales', salesRoutes);

const PORT = process.env.PORT || 4000;
const HOST = '127.0.0.1';
app.listen(PORT, HOST, () => {
  console.log(`Backend listening on http://${HOST}:${PORT}`);
  console.log('Make sure dataset is at backend/data/sales.csv');
});
