const salesService = require('../services/salesService');
const csvLoader = require('../utils/csvLoader');

exports.getSales = async (req, res) => {
  try {
    const data = await csvLoader.loadCSV();
    const query = req.query;
    const result = salesService.querySales(data, query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load sales data. Ensure backend/data/sales.csv exists.' });
  }
};
