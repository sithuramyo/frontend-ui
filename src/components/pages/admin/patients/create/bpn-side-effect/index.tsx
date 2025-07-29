import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const sideEffects = [
  "Sedation", "Drowsiness", "Diplopia", "Incoordination",
  "Giddiness", "Slurred Speech", "Headaches", "Itching",
  "Confusion", "Oral Ulceration", "Light headedness", "Constipation",
  "Blurred Vision", "Weakness", "Hallucination", "Sexual Problem"
];

const BPNSideEffect = () => {
  const [recordDate, setRecordDate] = useState("2025-07-03");

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label>Patient No</Label>
                <Input value="001/000001" readOnly className="font-mono" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Record Date</Label>
                <Input
                  type="date"
                  value={recordDate}
                  onChange={(e) => setRecordDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Side Effect:</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sideEffects.map((effect) => (
                  <div key={effect} className="flex items-center space-x-2">
                    <Checkbox id={effect} />
                    <Label htmlFor={effect}>{effect}</Label>
                  </div>
                ))}
                <div className="col-span-full flex items-center gap-2">
                  <Checkbox id="others" />
                  <Label htmlFor="others">Others</Label>
                  <Input className="flex-1" />
                </div>
              </div>
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

export default BPNSideEffect;
