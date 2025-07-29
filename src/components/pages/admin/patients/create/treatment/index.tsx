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
  
  const Treatment = () => {
    const [recordDate, setRecordDate] = useState("2025-07-03");
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <form className="space-y-8">
              {/* Section 1: Patient Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Patient No</Label>
                  <Input value="001/000001" readOnly className="font-mono" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Record Date</Label>
                  <Input type="date" value={recordDate} onChange={e => setRecordDate(e.target.value)} />
                </div>
              </div>
  
              {/* Section 2: Refer For */}
              <div className="space-y-2">
                <Label className="font-semibold">Refer For:</Label>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "ART Treatment",
                    "TB Treatment",
                    "Mental Health",
                    "STI Treatment",
                    "Rehabilitation",
                    "Hep C Treatment"
                  ].map(item => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox id={`refer-${item}`} />
                      <Label htmlFor={`refer-${item}`}>{item}</Label>
                    </div>
                  ))}
                  <div className="md:col-span-3 flex items-center space-x-2">
                    <Checkbox id="refer-other" />
                    <Label htmlFor="refer-other">Others</Label>
                    <Input className="flex-1" />
                  </div>
                </div>
              </div>
  
              {/* Section 3: Treatment Option */}
              <div className="space-y-2">
                <Label className="font-semibold">Treatment Option:</Label>
                <RadioGroup defaultValue="OutPatient" className="flex flex-row gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="InPatient" id="in-patient" />
                    <Label htmlFor="in-patient">InPatient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="OutPatient" id="out-patient" />
                    <Label htmlFor="out-patient">OutPatient</Label>
                  </div>
                </RadioGroup>
              </div>
  
              {/* Section 4: Treatment Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Treatment Type <span className="text-red-500">*</span></Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select Treatment Type" /></SelectTrigger>
                    <SelectContent>
                      {["OST", "Psychosocial", "Detox", "Other"].map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Treatment Start Date <span className="text-red-500">*</span></Label>
                  <Input type="date" value="2025-07-03" />
                </div>
              </div>
  
              {/* Section 5: Medication */}
              <div className="space-y-2">
                <Label className="font-semibold">Medication <span className="text-red-500">*</span></Label>
                <RadioGroup defaultValue="Methadone" className="space-y-3">
                  {[
                    { label: "Methadone", doses: true },
                    { label: "Buprenorphine", unit: "2mg" },
                    { label: "Tincture Opium", doses: true },
                    { label: "Other", input: true }
                  ].map(option => (
                    <div key={option.label} className="flex flex-wrap items-center gap-2">
                      <RadioGroupItem value={option.label} id={option.label} />
                      <Label htmlFor={option.label} className="w-32">{option.label}</Label>
                      {option.doses && (
                        <>
                          <Input placeholder="Dose" className="w-24" />
                          <span>ml</span>
                          <Input placeholder="Dose (mg)" className="w-28" />
                          <span>mg</span>
                        </>
                      )}
                      {option.unit && (
                        <>
                          <Input placeholder="Dose" className="w-28" />
                          <span>{option.unit}</span>
                        </>
                      )}
                      {option.input && (
                        <Input className="flex-1" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
  
              {/* Section 6: Hep B Vaccination */}
              <div className="space-y-2">
                <Label className="font-semibold">Hep B Vaccination</Label>
                <div className="grid md:grid-cols-3 gap-6">
                  {["1st Dose Date", "2nd Dose Date", "3rd Dose Date"].map(label => (
                    <div key={label} className="flex flex-col gap-2">
                      <Label>{label}</Label>
                      <Input type="date" defaultValue="1900-01-01" />
                    </div>
                  ))}
                  <div className="flex flex-col gap-2">
                    <Label>Next Appointment Date</Label>
                    <Input type="date" defaultValue="1900-01-01" />
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
  
  export default Treatment;
  