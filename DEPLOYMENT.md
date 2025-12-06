# Deployment Guide

## Local Setup

### 1. Download Dataset
- Download the provided CSV from Google Drive
- Place it at `backend/data/sales.csv`

### 2. Install and Run Backend
```powershell
cd backend
npm install
npm start
```
Backend runs on `http://127.0.0.1:4000`

### 3. Install and Run Frontend (new terminal)
```powershell
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` with proxy to backend

### 4. Use the App
- Open `http://localhost:5173` in your browser
- Use search, filters, sorting, and pagination

---

## Production Deployment

### Backend (Heroku / Railway / Render)

1. Create a new project on your chosen platform
2. Connect your GitHub repository
3. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=4000` (or platform default)
4. Add build command: `npm install`
5. Add start command: `npm start`
6. Upload `backend/data/sales.csv` to the platform's file system or use environment-based data loading

### Frontend (Vercel / Netlify)

1. Connect your GitHub repository to Vercel/Netlify
2. Set build directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `frontend/dist`
5. Environment variables:
   - `VITE_API_BASE=https://your-backend-url.com` (replace with actual backend URL)

---

## Architecture Notes

- Backend: Stateless Node/Express server; CSV is loaded and cached in memory on first request
- Frontend: React SPA with client-side state management for filters, search, sort, pagination
- Communication: JSON over HTTP with CORS enabled
- No database required; data is served from CSV file

---

## Testing

### API Endpoints

```bash
# Basic fetch (default sort by date:desc, page 1)
curl http://127.0.0.1:4000/api/sales

# Search by customer name
curl http://127.0.0.1:4000/api/sales?q=Rajesh

# Filter by region
curl http://127.0.0.1:4000/api/sales?region=North

# Multiple filters (combine with &)
curl http://127.0.0.1:4000/api/sales?region=North&gender=Male

# Sort by quantity (descending)
curl http://127.0.0.1:4000/api/sales?sort=quantity:desc

# Pagination
curl http://127.0.0.1:4000/api/sales?page=2&pageSize=10

# Combined query
curl http://127.0.0.1:4000/api/sales?q=Kumar&region=North&sort=customer:asc&page=1
```

---

## Troubleshooting

1. **Backend won't start**: Ensure `backend/data/sales.csv` exists
2. **Frontend can't reach backend**: Check Vite proxy in `frontend/vite.config.js`
3. **CORS errors**: Backend CORS middleware should handle all origins; if not, update `backend/src/index.js`
4. **Search not working**: Verify CSV has `Customer Name` and `Phone Number` columns
5. **Filters not applied**: Check filter field names match CSV headers

