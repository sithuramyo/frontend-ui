import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const outcomeOptions = [
  "Completed Treatment",
  "Dropped Out",
  "Transferred Out",
  "Deceased",
  "Other"
];

const OutcomeList = () => {
  const [outcomeDate, setOutcomeDate] = useState("2023-09-14");

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Card>
        <CardContent className="pt-6">
          <form className="grid grid-cols-1 gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label>Patient No</Label>
                <Input value="001/000001" readOnly className="font-mono" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Current Status</Label>
                <Input value="" readOnly />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label>Outcome Date</Label>
                <Input
                  type="date"
                  value={outcomeDate}
                  onChange={(e) => setOutcomeDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>
                  Outcome Status <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Select Outcome Type --" />
                  </SelectTrigger>
                  <SelectContent>
                    {outcomeOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Additional Notes</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Follow-up required">Follow-up required</SelectItem>
                  <SelectItem value="Referred">Referred</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end pt-4 border-t mt-8">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutcomeList;
