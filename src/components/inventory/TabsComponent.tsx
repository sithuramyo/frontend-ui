import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockLedger from "./StockLedger";
import MainStock from "./MainStock";
import SubStock from "./SubStock";

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState("stockLedger");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-2 flex h-full ">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full  ">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stockLedger">Stock Ledger</TabsTrigger>
          <TabsTrigger value="mainStock">Main Stock</TabsTrigger>
          <TabsTrigger value="subStock">Sub Stock</TabsTrigger>
        </TabsList>
        <TabsContent value="stockLedger">
          <StockLedger />
        </TabsContent>
        <TabsContent value="mainStock">
          <MainStock />
        </TabsContent>
        <TabsContent value="subStock">
          <SubStock />
        </TabsContent>
      </Tabs>
    </div>
  );
}