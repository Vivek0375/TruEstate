import React from 'react'

export default function TransactionTable({ rows = [] }) {
  if (!rows || rows.length === 0) return <div style={{ marginTop: 12 }}>No results found.</div>
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Date</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Customer</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Phone</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Product</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Category</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Quantity</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Final Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td style={{ padding: '8px 4px' }}>{r['Date']}</td>
            <td style={{ padding: '8px 4px' }}>{r['Customer Name']}</td>
            <td style={{ padding: '8px 4px' }}>{r['Phone Number']}</td>
            <td style={{ padding: '8px 4px' }}>{r['Product Name']}</td>
            <td style={{ padding: '8px 4px' }}>{r['Product Category']}</td>
            <td style={{ padding: '8px 4px' }}>{r['Quantity']}</td>
            <td style={{ padding: '8px 4px' }}>{r['Final Amount']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
