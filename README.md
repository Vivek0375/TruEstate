4. Open the frontend dev URL shown by Vite (default: `http://localhost:5173`) and ensure the backend is running on port 4000.

Deployment
- Backend: Deploy to Heroku, Railway, or Render with the same npm start command.
- Frontend: Deploy to Vercel or Netlify; set environment variable VITE_API_BASE to backend URL.
- Ensure CORS is enabled (backend already has it via cors middleware).


Overview
This project is a Retail Sales Management System built as a full-stack demo for the TruEstate SDE Intern assignment. It includes a Node/Express backend that loads a CSV dataset and a React (Vite) frontend implementing search, multi-select filters, sorting and pagination. Place the dataset at `backend/data/sales.csv` and follow the setup steps below.

Tech Stack
- Backend: Node.js, Express, csv-parse
- Frontend: React + Vite
- Dev: npm

Search Implementation Summary
- Full-text search implemented on `Customer Name` and `Phone Number` fields.
- Case-insensitive search using string lowercasing in backend service; search parameter `q` can be provided alongside filters and sorting.

Filter Implementation Summary
- Multi-select and range filters supported via query params: `region`, `gender`, `ageMin`, `ageMax`, `category`, `tags`, `paymentMethod`, `dateFrom`, `dateTo`.
- Filters are combinable and handled server-side in a single service to avoid duplicated logic.

Sorting Implementation Summary
- Sorting handled server-side with `sort` query param. Supported values:
  - `date:desc` (Newest First, default)
  - `quantity:desc`
  - `customer:asc` (A–Z)
- Sorting preserves active filters and search since all logic runs in the service pipeline.

Pagination Implementation Summary
- Page size default is 10 and controlled via `pageSize` query param; `page` is 1-based.
- API returns `{ total, page, pageSize, results }` so frontend can render Previous/Next controls and retain state.

Setup Instructions
1. Place the provided CSV at `backend/data/sales.csv`.
2. Start backend:

	PowerShell

	cd backend; npm install; npm start

3. Start frontend (in a new terminal):

	PowerShell

	cd frontend; npm install; npm run dev

4. Open the frontend dev URL shown by Vite (default: `http://localhost:5173`) and ensure the backend is running on port 4000.

