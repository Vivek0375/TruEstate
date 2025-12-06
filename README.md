# TruEstate — Retail Sales Management System

This repository contains a small Retail Sales Management System built for the TruEstate SDE Intern assignment. It includes a Node/Express backend that loads sales from a CSV and a React + Vite frontend that provides search, multi-select filters, sorting and pagination.

## 1. Project Title

TruEstate Retail Sales Management System — CSV-backed search & analytics demo

## 2. Problem Statement

Given a dataset of retail sales transactions (CSV), build a web application that allows fast full-text search, multi-select filters, sorting and pagination over the transactions so recruiters can evaluate system design and implementation skills.

## 3. Solution Overview

The backend loads the CSV into memory and exposes a single paginated API endpoint (`GET /api/sales`) supporting:
- Full-text search across customer name and phone number
- Multi-select filters (region, category, tags, payment method, gender, age range)
- Date range filtering
- Sorting by date, quantity, customer name, etc.
- Pagination (page, pageSize)

The frontend is a small React + Vite app that provides a search bar, filter panel, sortable table, and pagination controls. It queries the backend and renders results.

## 4. Tech Stack

- Backend: Node.js, Express
- CSV parsing: csv-parse
- Frontend: React 18 + Vite
- Dev tooling: npm

## 5. How to Run Locally

Prerequisites: Node.js (v16+ recommended) and npm.

1. Place the dataset CSV at `backend/data/sales.csv` (see section 6).
2. Start the backend:

   Open a terminal in the repository root and run:

   ```powershell
   cd /c/Users/yadav/OneDrive/Desktop/trustate/backend
   npm install
   npm start
   ```

   The backend listens on http://127.0.0.1:4000 and exposes `/api/sales`.

3. Start the frontend in a second terminal:

   ```powershell
   cd /c/Users/yadav/OneDrive/Desktop/trustate/frontend
   npm install
   npm run dev
   ```

4. Open the UI at the address printed by Vite (usually http://localhost:5173).

## 6. Dataset Location

Place the provided CSV file at:

```
backend/data/sales.csv
```

The backend will read that file on startup. For large datasets, the service currently holds data in memory for simplicity — replace or extend this with a database for production.

## 7. Project Structure

- `backend/` — Express server and CSV loader
- `frontend/` — React + Vite app
- `docs/` — architecture notes and deployment guidance

---

If you want, I can now:
- update this README further, or
- run local smoke tests (start backend & frontend here), or
- prepare deployment manifests and deploy the apps.
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

