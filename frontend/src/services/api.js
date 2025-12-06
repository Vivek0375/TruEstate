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
