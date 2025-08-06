import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "./DataTable";
import type { ColumnDef } from "@tanstack/react-table";

type MainStockItem = {
  batchNo: string;
  category: string;
  code: string;
  item: string;
  qty: number;
  unit: string;
  counter: string;
  expDate: string;
};

const columns: ColumnDef<MainStockItem>[] = [
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
  //   cell: ({ row }) => <Button variant="secondary" size="sm">Assign</Button>,
  // },
];

const mainStockData: MainStockItem[] = [
  {
    batchNo: "2405L597",
    category: "MMT",
    code: "EM0674",
    item: "Methadone",
    qty: 852000.00,
    unit: "ml",
    counter: "Y1",
    expDate: "01-02-2026",
  },
];

export default function MainStock() {
  return (
    <div className="p-4 space-y-4">
      {/* Create form section */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="received-date">Received Date</Label>
                <Input type="date" id="received-date" defaultValue="2025-08-06" />
              </div>
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
              <div className="space-y-2 col-span-2">
                <Label htmlFor="remark">Remark</Label>
                <Textarea id="remark" className="min-h-[2.5rem]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="--Select Status--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
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
                <Label htmlFor="batch-no">Batch No</Label>
                <Input id="batch-no" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expired-date">Expired Date</Label>
                <Input type="date" id="expired-date" defaultValue="2025-08-06" />
              </div>
              <div className="flex justify-start">
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* End of create form section */}

      <h2 className="text-lg font-semibold my-4">Main Stock Details</h2>
      <DataTable columns={columns} data={mainStockData} />
    </div>
  );
}