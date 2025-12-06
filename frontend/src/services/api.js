export async function fetchSales(query = {}) {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params.set(k, v)
  })
  const base = import.meta.env.VITE_API_BASE || ''
  const url = (base ? `${base}/api/sales` : '/api/sales') + '?' + params.toString()
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('API error:', err)
    return { total: 0, page: 1, pageSize: 10, results: [] }
  }
}

export async function uploadCsv(file) {
  try {
    const form = new FormData()
    form.append('file', file)
    const base = import.meta.env.VITE_API_BASE || ''
    const url = base ? `${base}/api/upload` : '/api/upload'
    const res = await fetch(url, { method: 'POST', body: form })
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('Upload error', err)
    return { success: false, error: err.message }
  }
}
