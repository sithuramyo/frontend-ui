import { useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Column<T> {
  label: string;
  accessor?: keyof T;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
};

function renderNullable(value: string | null | undefined) {
  if (!value || value.trim() === "" || value.trim().toLowerCase() === "null") {
    return (
      <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full">
        N/A
      </span>
    );
  }
  return value;
}

export default function DataTable<T>({ data, columns, onRowClick }: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof T | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter
  let filtered = data;
  if (search) {
    filtered = filtered.filter((row) => {
      if (typeof row !== 'object' || row === null) return false;
      return Object.values(row).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  // Sort
  if (sortBy) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (aVal === bVal) return 0;
      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  // Paginate
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (accessor: keyof T) => {
    if (sortBy === accessor) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(accessor);
      setSortOrder("asc");
    }
  };

  return (
    <Card className={"w-full p-6 shadow-md rounded-xl bg-white/70 backdrop-blur"}>
      {/* Search & Controls */}
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Rows per page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(+e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm border-separate border-spacing-y-1">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.accessor?.toString() ?? `col-${i}`}
                  className={`px-4 py-2 text-left ${col.sortable ? "cursor-pointer select-none" : ""}`}
                  onClick={() => col.sortable && col.accessor && handleSort(col.accessor)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortBy === col.accessor && (
                      <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={(row as any).id ?? rowIndex}
                  className={`hover:bg-gray-100 transition ${onRowClick ? "cursor-pointer" : ""}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-3">
                      {col.render
                        ? col.render(row)
                        : renderNullable(row[col.accessor as keyof T] as string)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center flex-wrap gap-2 text-sm text-gray-600">
        <span>
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, totalCount)} of {totalCount}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}