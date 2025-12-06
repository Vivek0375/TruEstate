const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

let cache = null;

exports.loadCSV = () => {
  return new Promise((resolve, reject) => {
    if (cache) return resolve(cache);
    const dataPath = path.join(__dirname, '..', '..', 'data', 'sales.csv');
    if (!fs.existsSync(dataPath)) return reject(new Error(`CSV not found at ${dataPath}`));
    const rows = [];
    fs.createReadStream(dataPath)
      .pipe(parse({ columns: true, skip_empty_lines: true, trim: true }))
      .on('data', row => {
        rows.push(row);
      })
      .on('end', () => {
        cache = rows;
        resolve(rows);
      })
      .on('error', err => reject(err));
  });
};
