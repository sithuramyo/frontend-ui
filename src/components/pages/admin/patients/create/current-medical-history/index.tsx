import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const hivStatusOptions = ["Positive", "Negative", "Unknown"];
const hepCStatusOptions = ["Positive", "Negative", "Unknown"];
const hepBStatusOptions = ["Positive", "Negative", "Unknown"];

const CurrentMedicalHistory = () => {
  const [recordDate, setRecordDate] = useState("2025-07-03");

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Card>
        <CardContent className="pt-6">
          <form className="space-y-8">
            {/* Top Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="patient-no">Patient No</Label>
                <Input id="patient-no" value="001/000001" readOnly className="font-mono" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="record-date">Record Date</Label>
                <Input id="record-date" type="date" value={recordDate} onChange={(e) => setRecordDate(e.target.value)} />
              </div>
            </div>

            {/* HIV Section */}
            <div className="border rounded p-4 space-y-4">
              <Label className="text-lg font-semibold">HIV Status</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>HIV Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="-- Select HIV Status of Last Visit --" />
                    </SelectTrigger>
                    <SelectContent>
                      {hivStatusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>ART Receive or not?</Label>
                  <RadioGroup defaultValue="no" className="flex flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="art-yes" />
                      <Label htmlFor="art-yes">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="art-no" />
                      <Label htmlFor="art-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Input type="date" placeholder="ART Start Date" />
                <Input placeholder="ART Regimen" />
                <Input placeholder="ART Code" />
                <div className="flex flex-col gap-2">
                  <Label>ART get this clinic or not?</Label>
                  <RadioGroup defaultValue="no" className="flex flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="art-clinic-yes" />
                      <Label htmlFor="art-clinic-yes">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="art-clinic-no" />
                      <Label htmlFor="art-clinic-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Input placeholder="ART Clinic" />
              </div>
            </div>

            {/* Hep C Section */}
            <div className="border rounded p-4 space-y-4">
              <Label className="text-lg font-semibold">Hepatitis C Status</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Hep C Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="-- Select Hep C Status of Last Visit --" />
                    </SelectTrigger>
                    <SelectContent>
                      {hepCStatusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Hep C treatment Receive or not?</Label>
                  <RadioGroup defaultValue="no" className="flex flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="hepc-yes" />
                      <Label htmlFor="hepc-yes">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="hepc-no" />
                      <Label htmlFor="hepc-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Input type="date" placeholder="Hep C Start Date" />
                <Input type="date" placeholder="Hep C Complete Date" />
              </div>
            </div>

            {/* Hep B Section */}
            <div className="border rounded p-4 space-y-4">
              <Label className="text-lg font-semibold">Hepatitis B Status</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Hep B Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="-- Select Hep B Status of Last Visit --" />
                    </SelectTrigger>
                    <SelectContent>
                      {hepBStatusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* TB and Mental Health Section */}
            <div className="border rounded p-4 space-y-4">
              <Label className="text-lg font-semibold">TB and Mental Health</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Current TB treatment received or not?</Label>
                  <RadioGroup defaultValue="no" className="flex flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="tb-yes" />
                      <Label htmlFor="tb-yes">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="tb-no" />
                      <Label htmlFor="tb-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>TB Screening</Label>
                  <RadioGroup defaultValue="no" className="flex flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="tb-screening-yes" />
                      <Label htmlFor="tb-screening-yes">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="tb-screening-no" />
                      <Label htmlFor="tb-screening-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Input placeholder="TB Regimen" />
                <div className="flex flex-col gap-2">
                  <Label>Mental Health Screening</Label>
                  <RadioGroup defaultValue="no" className="flex flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="mh-yes" />
                      <Label htmlFor="mh-yes">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="mh-no" />
                      <Label htmlFor="mh-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t mt-8">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentMedicalHistory;
