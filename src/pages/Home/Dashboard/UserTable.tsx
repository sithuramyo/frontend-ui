// src/components/ui/DataTableWithExport.tsx

import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import DataTable, { type Column } from '@/components/ui/data-table';
import { toast } from 'sonner';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

// Define a generic type for the table data
interface TableData {
  [key: string]: any;
}

// Props for the reusable component
interface UserTableProps<T extends TableData> {
  cardTitle: string;
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

const UserTable = <T extends TableData>({
  cardTitle,
  data,
  columns,
  onRowClick,
}: UserTableProps<T>) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      toast.error("No data to export.");
      return;
    }

    // This converts the data array into a worksheet.
    // The keys of the objects in the array will become the column headers.
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, cardTitle);
    XLSX.writeFile(wb, `${cardTitle.toLowerCase().replace(/\s/g, '_')}_data.xlsx`);
    toast.success(`${cardTitle} exported successfully!`);
  };

  return (
    <div className="p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{cardTitle} - User List</h2>
        <Button
          onClick={handleExport}
          variant="outline"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-green-600"
        > 
          <PiMicrosoftExcelLogoFill />
          Export to Excel
        </Button>
      </div>
      <DataTable<T> data={data} columns={columns} onRowClick={onRowClick} />
    </div>
  );
};

export default UserTable;