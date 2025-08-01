import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Calendar, UserCheck, AlertTriangle, Syringe, Shield, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// This is your DatePicker component
import { DatePicker } from "@/components/ui/date-picker";
import { IconlessDatePicker } from "@/components/ui/iconless-date-picker";

const testOptions = ["-- Select --", "Reactive", "Non-Reactive", "Invalid"];
const urineTests = ["Morphine", "Amphetamine", "Cannabis", "Diazepam", "Methadone"];

const Reg_followup = () => {
  const drugTypes = ["Opioid", "Stimulant", "Depressant", "Hallucinogen", "Other"];
  const routesOfAdmin = ["Oral", "Inhalation", "Injection", "Smoking", "Other"];
  const frequencies = ["Daily", "Weekly", "Monthly", "Occasionally", "Stopped"];
  const lastUse = ["Less than 1 month", "1-3 months", "3-6 months", "More than 6 months", "Never"];

  // --- Date States for the new DatePickers ---
  const [visitDate, setVisitDate] = useState<Date | undefined>(undefined);
  const [hivTestDate, setHivTestDate] = useState<Date | undefined>(undefined);
  const [testDateHepB, setTestDateHepB] = useState<Date | undefined>(undefined);
  const [testDateHepC, setTestDateHepC] = useState<Date | undefined>(undefined);
  const [treatmentStartDate, setTreatmentStartDate] = useState<Date | undefined>(undefined);
  const [urineTestDates, setUrineTestDates] = useState<{ [key: string]: Date | undefined }>({});

  // --- Helper function to handle urine test dates ---
  const handleUrineTestDateChange = (drug: string, date: Date | undefined) => {
    setUrineTestDates(prev => ({ ...prev, [drug]: date }));
  };

  // --- Other states from your original code ---
  const [currentDrugUse, setCurrentDrugUse] = useState("yes");
  const [typeOfDrugUseMajor, setTypeOfDrugUseMajor] = useState("");
  const [mostRecentRoutesOfAdmin, setMostRecentRoutesOfAdmin] = useState("");
  const [durationYears, setDurationYears] = useState("");
  const [durationMonths, setDurationMonths] = useState("");
  const [frequencyOfDrugUse, setFrequencyOfDrugUse] = useState("");
  const [whenLastUse, setWhenLastUse] = useState("");

  // Accordion expand/collapse all logic
  const accordionKeys = [
    "item-1", // Drug History
    "item-2", // Risk Behaviour
    "item-3", // Vital Sign
    "item-4", // Lab Investigation
    "item-5", // Treatment
  ];
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const handleExpandAll = () => setOpenAccordions(accordionKeys);
  const handleCollapseAll = () => setOpenAccordions([]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2 hidden items-center gap-2">
          <UserCheck className="w-7 h-7 text-[#051463]" /> Client Follow-Up
        </h1>
        <p className="text-muted-foreground text-base mb-8 max-w-2xl hidden">
          Record and manage follow-up information for clients. Complete all relevant sections accurately.
        </p>
        <div className="flex gap-2 mb-4 justify-end">
          <Button
            type="button"
            className="px-4 py-2 rounded-md font-semibold"
            onClick={handleExpandAll}
          >
            Expand All
          </Button>
          <Button
            type="button"
            className="px-4 py-2 rounded-md font-semibold"
            onClick={handleCollapseAll}
          >
            Collapse All
          </Button>
        </div>
        <Card className="shadow-2xl rounded-2xl border-0 bg-white/95">
          <CardContent className="pt-0">
            <div className="rounded-t-2xl bg-[#051463] px-8 py-6 flex items-center gap-3 mb-8 shadow-md">
              <UserCheck className="w-8 h-8 text-white drop-shadow hidden" />
              <h2 className="text-3xl font-extrabold text-white tracking-tight hidden">Follow-Up Form</h2>
            </div>
            {/* Visit Date Section */}
            <div className="flex flex-col md:flex-row w-full justify-between gap-8 px-6 pb-8">
              <div className="flex-col gap-2 w-full md:w-1/2 hidden">
                <Label className="font-semibold text-base text-primary flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#051463]" />
                  Visit Date <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  date={visitDate}
                  setDate={setVisitDate}
                  placeholder="Select Visit Date"
                />
              </div>
              <div className="flex items-start gap-2 w-full justify-end">
                <Label htmlFor="patient-no" className="font-semibold text-base text-primary">
                  Patient No
                </Label>

                <div className="flex flex-col items-center gap-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAFAFA] text-sm text-gray-600 font-mono">
                    001/000001
                  </div>
                  <span className="text-xs text-muted-foreground">Auto-generated</span>
                </div>
              </div>
            </div>
            {/* Accordion */}
            <Accordion
              type="multiple"
              className="px-6 space-y-4"
              value={openAccordions}
              onValueChange={setOpenAccordions}
            >
              {/* Drug History */}
              <AccordionItem value="item-1" className="bg-[#f9f7f7] p-4">
                <AccordionTrigger className="text-lg font-semibold text-primary">
                  Drug Use History
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col gap-2">
                      <Label>Current Drug Use Within 6 Month <span className="text-red-500">*</span></Label>
                      <RadioGroup value={currentDrugUse} onValueChange={setCurrentDrugUse} className="flex flex-row gap-4">
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
                      <Select value={typeOfDrugUseMajor} onValueChange={setTypeOfDrugUseMajor}>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="-- Type of Drug Use (Major) --" /></SelectTrigger>
                        <SelectContent>
                          {drugTypes.map((drug) => (
                            <SelectItem key={drug} value={drug}>{drug}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Most Recent Routes Of Admin <span className="text-red-500">*</span></Label>
                      <Select value={mostRecentRoutesOfAdmin} onValueChange={setMostRecentRoutesOfAdmin}>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="-- Most Recent Routes Of Admin --" /></SelectTrigger>
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
                        <Input id="duration-years" placeholder="Years" type="number" value={durationYears} onChange={(e) => setDurationYears(e.target.value)} className="bg-white" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="duration-months">(Months)</Label>
                        <Input id="duration-months" placeholder="Months" type="number" value={durationMonths} onChange={(e) => setDurationMonths(e.target.value)} className="bg-white" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Frequency of Drug Use</Label>
                      <Select value={frequencyOfDrugUse} onValueChange={setFrequencyOfDrugUse}>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="-- Frequency of Drug Use --" /></SelectTrigger>
                        <SelectContent>
                          {frequencies.map((f) => (
                            <SelectItem key={f} value={f}>{f}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>When was your last use of drugs</Label>
                      <Select value={whenLastUse} onValueChange={setWhenLastUse}>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="-- When was your last use of drugs --" /></SelectTrigger>
                        <SelectContent>
                          {lastUse.map((l) => (
                            <SelectItem key={l} value={l}>{l}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* Risk Behaviour */}
              <AccordionItem value="item-2" className="bg-[#f9f7f7] p-4">
                <AccordionTrigger className="text-lg font-semibold">
                  Risk Behaviour
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <TooltipProvider>
                    <div className="space-y-8 divide-y">
                      {/* Shared Needle */}
                      <div className="mb-2 pb-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Syringe className="w-4 h-4" aria-hidden />
                          <Label className="font-medium">
                            Have you shared needle and syringe with anyone last month?
                            <span className="ml-1">*</span>
                          </Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 cursor-pointer" aria-label="More info" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              Sharing needles increases risk of infection.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <RadioGroup defaultValue="na" className="flex flex-row gap-6 mt-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" aria-hidden />
                            <RadioGroupItem id="shared-yes" value="yes" />
                            <Label htmlFor="shared-yes">Yes</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4" aria-hidden />
                            <RadioGroupItem id="shared-no" value="no" />
                            <Label htmlFor="shared-no">No</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" aria-hidden />
                            <RadioGroupItem id="shared-na" value="na" />
                            <Label htmlFor="shared-na">N/A</Label>
                          </div>
                        </RadioGroup>
                        <span className="text-xs text-muted-foreground">This helps us assess risk behaviour.</span>
                      </div>
                      {/* Condom Use */}
                      <div className="mb-2 pt-6 pb-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" aria-hidden />
                          <Label className="font-medium">Have you used condom at last sex?</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 cursor-pointer" aria-label="More info" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              Condom use reduces risk of STIs.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <RadioGroup defaultValue="na" className="flex flex-row gap-6 mt-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" aria-hidden />
                            <RadioGroupItem id="condom-yes" value="yes" />
                            <Label htmlFor="condom-yes">Yes</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4" aria-hidden />
                            <RadioGroupItem id="condom-no" value="no" />
                            <Label htmlFor="condom-no">No</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" aria-hidden />
                            <RadioGroupItem id="condom-na" value="na" />
                            <Label htmlFor="condom-na">N/A</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      {/* Overdose */}
                      <div className="mb-2 pt-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" aria-hidden />
                          <Label className="font-medium">Have you experienced overdose within 6 months?</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 cursor-pointer" aria-label="More info" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              Overdose is a serious health risk. Please answer honestly.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <RadioGroup defaultValue="na" className="flex flex-row gap-6 mt-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" aria-hidden />
                            <RadioGroupItem id="overdose-yes" value="yes" />
                            <Label htmlFor="overdose-yes">Yes</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4" aria-hidden />
                            <RadioGroupItem id="overdose-no" value="no" />
                            <Label htmlFor="overdose-no">No</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" aria-hidden />
                            <RadioGroupItem id="overdose-na" value="na" />
                            <Label htmlFor="overdose-na">N/A</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </TooltipProvider>
                </AccordionContent>
              </AccordionItem>
              {/* Vital Sign */}
              <AccordionItem value="item-3" className="bg-[#f9f7f7] p-4">
                <AccordionTrigger className="text-lg font-semibold">Vital Sign</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="weight">Body Weight (lb) <span className="text-red-500">*</span></Label>
                    <Input id="weight" type="number" placeholder="Enter weight in lb" className="bg-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="respiratory">Respiratory Rate (per min)</Label>
                    <Input id="respiratory" type="number" className="bg-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="temperature">Temperature (°F)</Label>
                    <Input id="temperature" type="number" className="bg-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pupil-size">Pupil Size (mm)</Label>
                    <Input id="pupil-size" type="number" className="bg-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="blood-pressure">Blood Pressure (mmHg)</Label>
                    <Input id="blood-pressure" type="text" placeholder="e.g. 120/80" className="bg-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cows">COWS Scores (marks)</Label>
                    <Input id="cows" type="number" className="bg-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pulse">Pulse Rate (per min)</Label>
                    <Input id="pulse" type="number" className="bg-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="who">WHO Assist Scores (marks)</Label>
                    <Input id="who" type="number" className="bg-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="dsm">DSM 5 Scores</Label>
                    <Input id="dsm" type="number" className="bg-white" />
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* Lab Investigation */}
              <AccordionItem value="item-4" className="bg-[#f9f7f7] p-4 w-[100%]">
                <AccordionTrigger className="text-lg font-semibold w-full">Lab Investigation</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-6">
                  {/* HIV Testing */}
                  <div className="space-y-2 w-full ">
                    <Label className="font-bold text-lg">HIV Testing</Label>
                    {"Self,Partner 1,Partner 2".split(",").map((role, index) => (
                      <div key={role} className="grid grid-cols-1 md:grid-cols-9 gap-2 items-end bg-gray-50 rounded-lg p-2 mb-2">
                        <Input placeholder={index === 0 ? "001/000001" : role} readOnly={index === 0} className="bg-gray-100" />
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
                        <Input placeholder="Age" type="number" className="bg-white" />
                          <IconlessDatePicker
                            date={hivTestDate}
                            setDate={setHivTestDate}
                            placeholder="Test Date"
                          />
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
                    {/* Hep B */}
                    <div className="flex flex-col gap-2 bg-gray-50 rounded-lg p-4">
                      <Label className="font-semibold">Hep B Testing</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="-- Select --" /></SelectTrigger>
                        <SelectContent>
                          {testOptions.map((opt) => (
                            <SelectItem key={opt + "hepb"} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <DatePicker
                        date={testDateHepB}
                        setDate={setTestDateHepB}
                        placeholder="Test Date"
                      />
                    </div>
                    {/* Hep C */}
                    <div className="flex flex-col gap-2 bg-gray-50 rounded-lg p-4">
                      <Label className="font-semibold">Hep C Testing</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="-- Select --" /></SelectTrigger>
                        <SelectContent>
                          {testOptions.map((opt) => (
                            <SelectItem key={opt + "hepc"} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <DatePicker
                        date={testDateHepC}
                        setDate={setTestDateHepC}
                        placeholder="Test Date"
                      />
                    </div>
                  </div>
                  {/* Urine Testing */}
                  <div className="space-y-2">
                    <Label className="font-bold">Urine Testing</Label>
                    <RadioGroup>
                      <div className="grid grid-cols-1 gap-2">
                        {urineTests.map((drug) => (
                          <div key={drug} className="grid grid-cols-5 gap-2 items-center bg-gray-50 rounded-lg p-2 mb-1">
                            <Checkbox id={`checkbox-${drug}`} />
                            <Label htmlFor={`checkbox-${drug}`} className="col-span-1">{drug}</Label>
                            <DatePicker
                              date={urineTestDates[drug]}
                              setDate={(date) => handleUrineTestDateChange(drug, date)}
                              placeholder="Test Date"
                            />
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
                </AccordionContent>
              </AccordionItem>
              {/* Treatment */}
              <AccordionItem value="item-5" className="bg-[#f9f7f7] p-4">
                <AccordionTrigger className="text-lg font-semibold">Treatment</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-6">
                  <div className="space-y-2">
                    <Label className="font-semibold">Refer For:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        "ART Treatment",
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
                        <Input className="flex-1 bg-white" />
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
                      <DatePicker
                        date={treatmentStartDate}
                        setDate={setTreatmentStartDate}
                        placeholder="Select Start Date"
                      />
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
                              <Input placeholder="Dose" className="w-24 bg-white" />
                              <span>ml</span>
                              <Input placeholder="Dose (mg)" className="w-28 bg-white" />
                              <span>mg</span>
                            </>
                          )}
                          {option.unit && (
                            <>
                              <Input placeholder="Dose" className="w-24 bg-white" />
                              <span>{option.unit}</span>
                            </>
                          )}
                          {option.input && (
                            <Input placeholder="Specify other" className="flex-1 bg-white" />
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reg_followup;