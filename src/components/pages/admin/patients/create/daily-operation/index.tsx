import {
    Card,
    CardContent,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Checkbox } from "@/components/ui/checkbox";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
  import { useState } from "react";
  
  const DailyOperation = () => {
    const [recordDate, setRecordDate] = useState("2025-07-03");
  
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <form className="space-y-8">
              {/* Search Section */}
              <section className="grid md:grid-cols-3 gap-4 items-end">
                <div className="flex flex-col gap-2">
                  <Label>Patient</Label>
                  <Input placeholder="Search patient..." />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Total</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Stock Qty" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Forward" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forward">Forward</SelectItem>
                      <SelectItem value="reverse">Reverse</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button">Prime</Button>
                </div>
                <div className="flex items-center gap-4">
                  <Label>Dispenser</Label>
                  <RadioGroup defaultValue="on" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="on" id="on" />
                      <Label htmlFor="on" className="text-green-600">ON</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="off" id="off" />
                      <Label htmlFor="off" className="text-red-600">OFF</Label>
                    </div>
                  </RadioGroup>
                </div>
              </section>
  
              {/* Counter and Dosage */}
              <section className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2">
                  <Label>Counter *</Label>
                  <Select>
                    <SelectTrigger className="w-32"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label>Batch No *</Label>
                  <Input className="w-32" placeholder="00-00" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Label>Treatment Dosages *</Label>
                  <Input placeholder="Current Medicine" className="w-40" />
                  <Input placeholder="Treatment Type" className="w-40" />
                  <Input placeholder="Dosage" className="w-24" />
                  <Input placeholder="Unit" className="w-20" />
                  <Button variant="outline">Change Dose</Button>
                </div>
              </section>
  
              {/* Status & Notes */}
              <section className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Current Status</Label>
                  <Input className="w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Next Appointment</Label>
                  <Input type="date" value={recordDate} onChange={e => setRecordDate(e.target.value)} />
                </div>
              </section>
  
              <section className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="condom" />
                  <Label htmlFor="condom">Condom</Label>
                </div>
                <textarea className="border rounded w-full p-2 h-28" placeholder="Additional notes or remarks" />
                <Select>
                  <SelectTrigger className="w-60"><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="urine-test" />
                    <Label htmlFor="urine-test">Show Last Urine Test</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="outcome" />
                    <Label htmlFor="outcome">Outcome</Label>
                  </div>
                </div>
              </section>
  
              <div className="flex gap-4 justify-end pt-4 border-t mt-8">
                <Button className="bg-green-600 hover:bg-green-700">Treat</Button>
                <Button className="bg-pink-500 hover:bg-pink-600">TakeHome</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default DailyOperation;
  