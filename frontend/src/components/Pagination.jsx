import React from 'react'

export default function Pagination({ page = 1, pageSize = 10, total = 0, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize) || 1
  return (
    <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>Previous</button>
      <div>Page {page} of {totalPages}</div>
      <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>Next</button>
    </div>
  )
}
