import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import TransactionTable from './components/TransactionTable'
import Pagination from './components/Pagination'
import SortDropdown from './components/SortDropdown'
import UploadForm from './components/UploadForm'
import { fetchSales } from './services/api'

export default function App() {
  const [query, setQuery] = useState({ page: 1, pageSize: 10 })
  const [data, setData] = useState({ results: [], total: 0 })

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchSales(query)
      setData(res)
    }
    fetchData()
  }, [query])

  const onUploaded = () => {
    // refresh data after a new CSV is uploaded
    setQuery({ ...query, page: 1 })
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Retail Sales Management</h2>
  <UploadForm onUploaded={onUploaded} />
  <SearchBar onSearch={q => setQuery({ ...query, q, page: 1 })} />
      <div style={{ display: 'flex', gap: 20, marginTop: 10 }}>
        <FilterPanel onChange={filters => setQuery({ ...query, ...filters, page: 1 })} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SortDropdown onChange={sort => setQuery({ ...query, sort, page: 1 })} />
            <div>Showing {data.total} results</div>
          </div>
          <TransactionTable rows={data.results} />
          <Pagination
            page={query.page}
            pageSize={query.pageSize}
            total={data.total}
            onPageChange={p => setQuery({ ...query, page: p })}
          />
        </div>
      </div>
    </div>
  )
}
