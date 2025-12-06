# Architecture

## Backend architecture
- Node.js + Express server located in `backend/src`.
- Responsibilities: load and cache CSV dataset, expose filtered/search/sorted/paginated REST endpoint at `GET /api/sales`.

## Frontend architecture
- React (Vite) single-page app in `frontend/src`.
- Components: SearchBar, FilterPanel, TransactionTable, SortDropdown, Pagination.
- Services: `services/api.js` handles HTTP requests to backend.

## Data flow
1. Frontend sends query params (search, filters, sort, page) to `GET /api/sales`.
2. Backend loads dataset from `backend/data/sales.csv` (cached in memory), applies search, filters, sorting and pagination, then returns JSON { total, page, pageSize, results }.
3. Frontend renders results and maintains state for search, filters, sorting and pagination.

## Folder structure
See repository README. Key folders:
- `backend/` - API server
- `frontend/` - React UI
- `docs/` - architecture and notes

## Module responsibilities
- `backend/src/controllers` - parse request and call service
- `backend/src/services` - core filtering/sorting/pagination logic
- `backend/src/utils` - CSV loader and helpers
- `frontend/src/components` - UI components
- `frontend/src/services` - API client
