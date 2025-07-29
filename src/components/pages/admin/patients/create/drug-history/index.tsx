import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const drugTypes = ["Heroin", "Methamphetamine", "Cocaine", "Cannabis", "Opium", "Other"];
const routesOfAdmin = ["Oral", "Injection", "Inhalation", "Smoking", "Other"];
const frequencies = ["Daily", "Weekly", "Monthly", "Occasionally", "Unknown"];
const lastUse = ["Today", "Within a week", "Within a month", "Over a month ago"];

const DrugHistory = () => {
  const [recordDate, setRecordDate] = useState("2025-07-03");

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Card>
        <CardContent className="pt-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="patient-no">Patient No</Label>
              <Input id="patient-no" value="001/000001" readOnly className="font-mono" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="record-date">Record Date</Label>
              <Input id="record-date" type="date" value={recordDate} onChange={(e) => setRecordDate(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Current Drug Use Within 6 Month <span className="text-red-500">*</span></Label>
              <RadioGroup defaultValue="yes" className="flex flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="drug-use-yes" />
                  <Label htmlFor="drug-use-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="drug-use-no" />
                  <Label htmlFor="drug-use-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Type Of Current Drug Use (Major) <span className="text-red-500">*</span></Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="-- Type of Drug Use (Major) --" /></SelectTrigger>
                <SelectContent>
                  {drugTypes.map((drug) => (
                    <SelectItem key={drug} value={drug}>{drug}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Most Recent Routes Of Admin <span className="text-red-500">*</span></Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="-- Most Recent Routes Of Admin --" /></SelectTrigger>
                <SelectContent>
                  {routesOfAdmin.map((route) => (
                    <SelectItem key={route} value={route}>{route}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="duration-years">Duration of Use (Years)</Label>
                <Input id="duration-years" placeholder="Years" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="duration-months">(Months)</Label>
                <Input id="duration-months" placeholder="Months" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Frequency of Drug Use</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="-- Frequency of Drug Use --" /></SelectTrigger>
                <SelectContent>
                  {frequencies.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>When was your last use of drugs</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="-- When was your last use of drugs --" /></SelectTrigger>
                <SelectContent>
                  {lastUse.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:col-span-3 md:col-span-2 flex justify-end gap-4 pt-4 border-t mt-8">
              <Button type="reset" variant="outline">Reset</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrugHistory;
