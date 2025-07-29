import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Card, CardContent } from "@/components/ui/card";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
  import { Checkbox } from "@/components/ui/checkbox";
  import { useState } from "react";
  
  const testOptions = ["-- Select --", "Reactive", "Non-Reactive", "Invalid"];
  const urineTests = ["Morphine", "Amphetamine", "Cannabis", "Diazepam", "Methadone"];
  
  const LabInvestigation = () => {
    const [recordDate, setRecordDate] = useState("2025-07-03");
  
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <form className="space-y-8">
              {/* HIV Testing */}
              <div className="space-y-2">
                <Label className="font-bold text-lg">HIV Testing</Label>
                {"Self,Partner 1,Partner 2".split(",").map((role, index) => (
                  <div key={role} className="grid grid-cols-1 md:grid-cols-9 gap-2 items-end">
                    <Input placeholder={index === 0 ? "001/000001" : role} readOnly={index === 0} />
                    <RadioGroup className="col-span-2 flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="M" id={`${role}-male`} />
                        <Label htmlFor={`${role}-male`}>M</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="F" id={`${role}-female`} />
                        <Label htmlFor={`${role}-female`}>F</Label>
                      </div>
                    </RadioGroup>
                    <Input placeholder="Age" type="number" />
                    <Input type="date" defaultValue="1900-01-01" />
                    {[1, 2, 3].map((i) => (
                      <Select key={i}>
                        <SelectTrigger><SelectValue placeholder={`Test ${i}`} /></SelectTrigger>
                        <SelectContent>
                          {testOptions.map((opt) => (
                            <SelectItem key={opt + i} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ))}
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Final Result" /></SelectTrigger>
                      <SelectContent>
                        {testOptions.map((opt) => (
                          <SelectItem key={opt + "final"} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <RadioGroup className="flex gap-2">
                      <RadioGroupItem value="yes" id={`counselling-yes-${role}`} />
                      <Label htmlFor={`counselling-yes-${role}`}>Yes</Label>
                      <RadioGroupItem value="no" id={`counselling-no-${role}`} />
                      <Label htmlFor={`counselling-no-${role}`}>No</Label>
                    </RadioGroup>
                    <RadioGroup className="flex gap-2">
                      <RadioGroupItem value="yes" id={`artreferral-yes-${role}`} />
                      <Label htmlFor={`artreferral-yes-${role}`}>Yes</Label>
                      <RadioGroupItem value="no" id={`artreferral-no-${role}`} />
                      <Label htmlFor={`artreferral-no-${role}`}>No</Label>
                    </RadioGroup>
                  </div>
                ))}
              </div>
  
              {/* Hep B/C Testing */}
              <div className="grid md:grid-cols-2 gap-6">
                {["Hep B Testing", "Hep C Testing"].map((label) => (
                  <div key={label} className="flex flex-col gap-2">
                    <Label className="font-semibold">{label}</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="-- Select --" /></SelectTrigger>
                      <SelectContent>
                        {testOptions.map((opt) => (
                          <SelectItem key={opt + label} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input type="date" defaultValue="1900-01-01" />
                  </div>
                ))}
              </div>
  
              {/* Urine Testing */}
              <div className="space-y-2">
                <Label className="font-bold">Urine Testing</Label>
                <RadioGroup>
                  <div className="grid grid-cols-1 gap-2">
                    {urineTests.map((drug) => (
                      <div key={drug} className="grid grid-cols-5 gap-2 items-center">
                        <Checkbox id={`checkbox-${drug}`} />
                        <Label htmlFor={`checkbox-${drug}`} className="col-span-1">{drug}</Label>
                        <Input type="date" defaultValue="1900-01-01" className="col-span-1" />
                        <div className="flex items-center space-x-4 col-span-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="positive" id={`${drug}-pos`} />
                            <Label htmlFor={`${drug}-pos`}>Positive</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="negative" id={`${drug}-neg`} />
                            <Label htmlFor={`${drug}-neg`}>Negative</Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
  
              <div className="flex justify-end gap-4 pt-4 border-t mt-8">
                <Label htmlFor="final-date" className="mt-2">Record Date</Label>
                <Input id="final-date" type="date" value={recordDate} onChange={(e) => setRecordDate(e.target.value)} className="w-48" />
                <Button type="submit">Save</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default LabInvestigation;