import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const VitalSign = () => {
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
              <Label htmlFor="weight">Body Weight (lb) <span className="text-red-500">*</span></Label>
              <Input id="weight" type="number" placeholder="Enter weight in lb" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="respiratory">Respiratory Rate (per min)</Label>
              <Input id="respiratory" type="number" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="temperature">Temperature (°F)</Label>
              <Input id="temperature" type="number" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="pupil-size">Pupil Size (mm)</Label>
              <Input id="pupil-size" type="number" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="blood-pressure">Blood Pressure (mmHg)</Label>
              <Input id="blood-pressure" type="text" placeholder="e.g. 120/80" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="cows">COWS Scores (marks)</Label>
              <Input id="cows" type="number" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="pulse">Pulse Rate (per min)</Label>
              <Input id="pulse" type="number" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="who">WHO Assist Scores (marks)</Label>
              <Input id="who" type="number" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="dsm">DSM 5 Scores</Label>
              <Input id="dsm" type="number" />
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t mt-8">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VitalSign;
