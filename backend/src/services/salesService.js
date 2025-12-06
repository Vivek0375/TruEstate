const moment = require('moment');

function parseNumber(value) {
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

function textMatch(field = '', q = '') {
  if (!q) return true;
  return String(field).toLowerCase().includes(String(q).toLowerCase());
}

function applyFilters(rows, q) {
  // q is an object with possible fields from query params
  return rows.filter(r => {
    // Full-text search on Customer Name and Phone Number
    if (q.q) {
      const ok = textMatch(r['Customer Name'], q.q) || textMatch(r['Phone Number'], q.q);
      if (!ok) return false;
    }

    if (q.region) {
      const regions = String(q.region).split(',').map(s => s.trim().toLowerCase());
      if (!regions.includes(String(r['Customer Region']).toLowerCase())) return false;
    }

    if (q.gender) {
      const genders = String(q.gender).split(',').map(s => s.trim().toLowerCase());
      if (!genders.includes(String(r['Gender']).toLowerCase())) return false;
    }

    if (q.ageMin || q.ageMax) {
      const age = parseNumber(r['Age']);
      const min = parseNumber(q.ageMin);
      const max = parseNumber(q.ageMax);
      if (min !== null && age !== null && age < min) return false;
      if (max !== null && age !== null && age > max) return false;
    }

    if (q.category) {
      const cats = String(q.category).split(',').map(s => s.trim().toLowerCase());
      if (!cats.includes(String(r['Product Category']).toLowerCase())) return false;
    }

    if (q.tags) {
      const wanted = String(q.tags).split(',').map(s => s.trim().toLowerCase());
      const actual = String(r['Tags'] || '').toLowerCase();
      // require that at least one tag matches
      const any = wanted.some(t => actual.includes(t));
      if (!any) return false;
    }

    if (q.paymentMethod) {
      const payments = String(q.paymentMethod).split(',').map(s => s.trim().toLowerCase());
      if (!payments.includes(String(r['Payment Method']).toLowerCase())) return false;
    }

    if (q.dateFrom || q.dateTo) {
      const rowDate = moment(r['Date'], moment.ISO_8601, true).isValid()
        ? moment(r['Date'])
        : moment(r['Date'], 'DD/MM/YYYY');
      if (q.dateFrom) {
        const df = moment(q.dateFrom);
        if (rowDate.isBefore(df, 'day')) return false;
      }
      if (q.dateTo) {
        const dt = moment(q.dateTo);
        if (rowDate.isAfter(dt, 'day')) return false;
      }
    }

    return true;
  });
}

function applySort(rows, sortBy) {
  if (!sortBy) return rows;
  const [field, order] = sortBy.split(':'); // e.g. date:desc
  const dir = (order || 'asc').toLowerCase() === 'desc' ? -1 : 1;
  const mapper = r => {
    if (field === 'date') {
      const m = moment(r['Date'], moment.ISO_8601, true).isValid() ? moment(r['Date']) : moment(r['Date'], 'DD/MM/YYYY');
      return m.valueOf();
    }
    if (field === 'quantity') return parseNumber(r['Quantity']) || 0;
    if (field === 'customer') return String(r['Customer Name'] || '').toLowerCase();
    return r[field] || '';
  };
  return rows.slice().sort((a, b) => {
    const va = mapper(a);
    const vb = mapper(b);
    if (va < vb) return -1 * dir;
    if (va > vb) return 1 * dir;
    return 0;
  });
}

function paginate(rows, page = 1, pageSize = 10) {
  const p = Math.max(1, Number(page) || 1);
  const ps = Math.max(1, Number(pageSize) || 10);
  const total = rows.length;
  const start = (p - 1) * ps;
  const results = rows.slice(start, start + ps);
  return { total, page: p, pageSize: ps, results };
}

exports.querySales = (rows, query) => {
  // Query is req.query object. We do filtering -> sorting -> pagination
  const filtered = applyFilters(rows, query || {});
  // Sorting
  let sorted = filtered;
  if (query.sort) sorted = applySort(filtered, query.sort);
  // Default sort: date desc
  if (!query.sort) sorted = applySort(filtered, 'date:desc');
  const paged = paginate(sorted, query.page || 1, query.pageSize || 10);
  return paged;
};
