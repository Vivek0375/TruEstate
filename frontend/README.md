Frontend

1. Install and run:

```powershell
cd frontend; npm install; npm run dev
```

2. The dev server expects the backend at `http://localhost:4000` (CORS enabled by backend). The frontend will call `/api/sales` on the same host; if you run frontend on a different port, adjust `frontend/src/services/api.js` base URL.
