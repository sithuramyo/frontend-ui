import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "./DataTable";
import type { ColumnDef } from "@tanstack/react-table";

type StockLedgerItem = {
  date: string;
  batchNo: string;
  category: string;
  item: string;
  unit: string;
  status: string;
  inQty: number;
  outQty: number;
  patientNo: string;
  name: string;
  remark: string;
  expDate: string;
};

export const columns: ColumnDef<StockLedgerItem>[] = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "batchNo", header: "BatchNo" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "item", header: "Item" },
  { accessorKey: "unit", header: "Unit" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "inQty", header: "In_QTY" },
  { accessorKey: "outQty", header: "Out_QTY" },
  { accessorKey: "patientNo", header: "PatientNo" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "remark", header: "Remark" },
  { accessorKey: "expDate", header: "ExpDate" },
];

const stockLedgerData: StockLedgerItem[] = [
  {
    date: "25-07-2025",
    batchNo: "2405L597",
    category: "MMT",
    item: "Methadone",
    unit: "ml",
    status: "Issued",
    inQty: 0.00,
    outQty: 48000.00,
    patientNo: "P0056",
    name: "John Doe",
    remark: "Daily Dose",
    expDate: "01-02-2026",
  },
  {
    date: "24-07-2025",
    batchNo: "2405L597",
    category: "MMT",
    item: "Methadone",
    unit: "ml",
    status: "Received",
    inQty: 50000.00,
    outQty: 0.00,
    patientNo: "",
    name: "",
    remark: "New Stock",
    expDate: "01-02-2026",
  },
  // Add more mock data for pagination and filtering
];

export default function StockLedger() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap gap-4 items-end bg-gray-100 p-4 rounded-lg">
        {/* Filter inputs */}
        <div className="flex flex-col">
          <label className="text-sm">From Date:</label>
          <Input type="date" defaultValue="2025-06-01" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">To Date:</label>
          <Input type="date" defaultValue="2025-08-05" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Warehouse:</label>
          <Select defaultValue="main">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="--Select Warehouse--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Main Warehouse</SelectItem>
              <SelectItem value="sub">Sub Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Item:</label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="--Select Item--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="methadone">Methadone</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Search</Button>
      </div>

      <div className="flex justify-between items-center my-4">
        <h2 className="text-lg font-semibold">Stock Ledger Details</h2>
        <Badge variant="secondary">Total Record: {stockLedgerData.length}</Badge>
      </div>

      {/* The reusable DataTable component is used here */}
      <DataTable columns={columns} data={stockLedgerData} />
    </div>
  );
}