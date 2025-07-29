import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const RiskBehaviour = () => {
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

            <div className="md:col-span-2">
              <Label>Have you shared needle and syringe with anyone last month?</Label>
              <RadioGroup defaultValue="na" className="flex flex-row gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="shared-yes" value="yes" />
                  <Label htmlFor="shared-yes">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="shared-no" value="no" />
                  <Label htmlFor="shared-no">No</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="shared-na" value="na" />
                  <Label htmlFor="shared-na">N/A</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="md:col-span-2">
              <Label>Have you used condom at last sex?</Label>
              <RadioGroup defaultValue="na" className="flex flex-row gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="condom-yes" value="yes" />
                  <Label htmlFor="condom-yes">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="condom-no" value="no" />
                  <Label htmlFor="condom-no">No</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="condom-na" value="na" />
                  <Label htmlFor="condom-na">N/A</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="md:col-span-2">
              <Label>Have you experienced overdose within 6 months?</Label>
              <RadioGroup defaultValue="na" className="flex flex-row gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="overdose-yes" value="yes" />
                  <Label htmlFor="overdose-yes">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="overdose-no" value="no" />
                  <Label htmlFor="overdose-no">No</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="overdose-na" value="na" />
                  <Label htmlFor="overdose-na">N/A</Label>
                </div>
              </RadioGroup>
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

export default RiskBehaviour;