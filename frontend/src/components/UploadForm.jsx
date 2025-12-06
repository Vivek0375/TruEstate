import React, { useState } from 'react'
import { uploadCsv } from '../services/api'

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (!file) return setStatus('Please choose a CSV file')
    setStatus('Uploading...')
    const res = await uploadCsv(file)
    if (res && res.success) {
      setStatus('Upload successful')
      if (onUploaded) onUploaded()
    } else {
      setStatus(`Upload failed: ${res && res.error ? res.error : 'unknown'}`)
    }
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload CSV</button>
      </label>
      {status && <div style={{ marginTop: 8 }}>{status}</div>}
    </form>
  )
}
