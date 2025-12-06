import React, { useState } from 'react'

export default function FilterPanel({ onChange }) {
  const [region, setRegion] = useState('')
  const [gender, setGender] = useState('')
  const [ageMin, setAgeMin] = useState('')
  const [ageMax, setAgeMax] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const apply = () => {
    onChange({ region, gender, ageMin, ageMax, category, tags, paymentMethod, dateFrom, dateTo })
  }

  const clear = () => {
    setRegion(''); setGender(''); setAgeMin(''); setAgeMax(''); setCategory(''); setTags(''); setPaymentMethod(''); setDateFrom(''); setDateTo('');
    onChange({})
  }

  return (
    <div style={{ width: 280, border: '1px solid #ddd', padding: 12 }}>
      <h4>Filters</h4>
      <div>
        <label>Region</label>
        <input value={region} onChange={e => setRegion(e.target.value)} placeholder="Comma-separated" />
      </div>
      <div>
        <label>Gender</label>
        <input value={gender} onChange={e => setGender(e.target.value)} placeholder="Male,Female" />
      </div>
      <div>
        <label>Age Min / Max</label>
        <input style={{ width: '45%' }} value={ageMin} onChange={e => setAgeMin(e.target.value)} placeholder="Min" />
        <input style={{ width: '45%', marginLeft: 6 }} value={ageMax} onChange={e => setAgeMax(e.target.value)} placeholder="Max" />
      </div>
      <div>
        <label>Category</label>
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Comma-separated" />
      </div>
      <div>
        <label>Tags</label>
        <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Comma-separated" />
      </div>
      <div>
        <label>Payment Method</label>
        <input value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} placeholder="Comma-separated" />
      </div>
      <div>
        <label>Date From</label>
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
      </div>
      <div>
        <label>Date To</label>
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={apply}>Apply</button>
        <button onClick={clear} style={{ marginLeft: 8 }}>Clear</button>
      </div>
    </div>
  )
}
