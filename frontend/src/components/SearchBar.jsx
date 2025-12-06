import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')
  const submit = e => {
    e.preventDefault()
    onSearch(value)
  }
  return (
    <form onSubmit={submit} style={{ marginBottom: 10 }}>
      <input
        placeholder="Search by customer name or phone"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ padding: 8, width: '60%' }}
      />
      <button type="submit" style={{ marginLeft: 8, padding: '8px 12px' }}>
        Search
      </button>
    </form>
  )
}
