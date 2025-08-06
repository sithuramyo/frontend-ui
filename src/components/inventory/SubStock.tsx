
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "./DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type SubStockItem = {
  batchNo: string;
  category: string;
  code: string;
  item: string;
  qty: number;
  unit: string;
  counter: string;
  expDate: string;
};

const columns: ColumnDef<SubStockItem>[] = [
  { accessorKey: "batchNo", header: "BatchNo" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "code", header: "Code" },
  { accessorKey: "item", header: "Item" },
  { accessorKey: "qty", header: "Qty" },
  { accessorKey: "unit", header: "Unit" },
  { accessorKey: "counter", header: "Counter" },
  { accessorKey: "expDate", header: "ExpDate" },
  // {
  //   id: "actions",
  //   header: "Action",
  //   cell: ({ row }) => (
  //     <Button variant="secondary" size="sm">Remove</Button>
  //   ),
  // },
];

const subStockData: SubStockItem[] = [
  {
    batchNo: "2405L597",
    category: "MMT",
    code: "EM0674",
    item: "Methadone",
    qty: 48000.00,
    unit: "ml",
    counter: "Y1",
    expDate: "01-02-2026",
  },
];

export default function SubStock() {
  return (
    <div className="p-4 space-y-4">
      {/* Create form section */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-2 items-end">
              {/* Row 1 */}
              <div className="space-y-2">
                <Label htmlFor="assign-date">Assign Date</Label>
                <Input type="date" id="assign-date" defaultValue="2025-08-06" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch-no">Batch No</Label>
                <Input id="batch-no" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expired-date">Expired Date</Label>
                <Input type="date" id="expired-date" defaultValue="2025-08-06" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="counter">Counter</Label>
                <Select>
                  <SelectTrigger id="counter">
                    <SelectValue placeholder="Y1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y1">Y1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="remark">Remark</Label>
                <Textarea id="remark" className="min-h-[2.5rem]" />
              </div>

              {/* Row 2 */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="--Select Category--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MMT">MMT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item">Item</Label>
                <Select>
                  <SelectTrigger id="item">
                    <SelectValue placeholder="--Select Item--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="methadone">Methadone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <div className="space-y-2 w-full">
                  <Label htmlFor="unit">Unit</Label>
                  <Select>
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="ml" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ml">ml</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="qty">Qty</Label>
                  <Input id="qty" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-no">Log No</Label>
                <Input id="log-no" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="received-date">Received Date</Label>
                <Input type="date" id="received-date" defaultValue="2025-08-06" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serial-no">Serial No</Label>
                <Input id="serial-no" />
              </div>

              <div className="flex justify-end col-span-full mt-4">
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* End of create form section */}

      <h2 className="text-lg font-semibold my-4">Sub Stock Details</h2>
      <DataTable columns={columns} data={subStockData} />
    </div>
  );
}