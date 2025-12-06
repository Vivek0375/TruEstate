import React from 'react'

export default function SortDropdown({ onChange }) {
  const handle = e => onChange(e.target.value)
  return (
    <div>
      <label>Sort:</label>
      <select onChange={handle} defaultValue="date:desc">
        <option value="date:desc">Date (Newest First)</option>
        <option value="quantity:desc">Quantity (High to Low)</option>
        <option value="customer:asc">Customer Name (A–Z)</option>
      </select>
    </div>
  )
}
