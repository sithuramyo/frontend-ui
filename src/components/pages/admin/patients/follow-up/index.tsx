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

// const hivStatusOptions = ["Positive", "Negative", "Unknown"];
// const hepCStatusOptions = ["Positive", "Negative", "Unknown"];
// const hepBStatusOptions = ["Positive", "Negative", "Unknown"];
const testOptions = ["-- Select --", "Reactive", "Non-Reactive", "Invalid"];
const urineTests = ["Morphine", "Amphetamine", "Cannabis", "Diazepam", "Methadone"];
const outcomeOptions = [
  "Completed Treatment",
  "Transferred Out",
  "Change to other treatment",
  "Exipred",
  "Completely discharged from hospital",
  "Continue the same treatment",
  "Treatment interruption",
];

//Transferout Center Option 
/* const transferoutCenterOptions = ["-- Select Transferout Center --", "Pulmonary", "Gastrointestinal", "Genitourinary", "Neurology", "Other"];

const expiredOptions = ["-- Select Cause of death --", "Fatal Overdose", "Accident(intoxicated)", "Drugs related HIV/AIDS Death", "Others"];

const treatmentInterruptionOptions = ["-- Select Reason of Interruption --", "Loss of follow-up", "Incarcreation", "Psychosis", "Hyper Sensitivity"]; */

const transferoutCenterOptions = [
  {
    id: 0,
    "name": "-- Select Transferout Center --"
  },
  {
    id: 1,
    "name": "Pulmonary"
  },
  {
    id: 2,
    "name": "Gastrointestinal"
  },
  {
    id: 3,
    "name": "Genitourinary"
  },
  {
    id: 4,
    "name": "Neurology"
  },
  {
    id: 5,
    "name": "Other"
  }
]

const expiredOptions = [
  {
    id: 0,
    "name": "-- Select Cause of death --"
  },
  {
    id: 1,
    "name": "Fatal Overdose"
  },
  {
    id: 2,
    "name": "Accident(intoxicated)"
  },
  {
    id: 3,
    "name": "Drugs related HIV/AIDS Death"
  },
  {
    id: 4,
    "name": "Others"
  }
]

const treatmentInterruptionOptions = [
  {
    id: 0,
    "name": "-- Select Reason of Interruption --"
  },
  {
    id: 1,
    "name": "Loss of follow-up"
  },
  {
    id: 2,
    "name": "Incarcreation"
  },
  {
    id: 3,
    "name": "Psychosis"
  },
  {
    id: 4,
    "name": "Hyper Sensitivity"
  }
]

const sideEffects = [
  "Sedation", "Drowsiness", "Diplopia", "Incoordination",
  "Giddiness", "Slurred Speech", "Headaches", "Itching",
  "Confusion", "Oral Ulceration", "Light headedness", "Constipation",
  "Blurred Vision", "Weakness", "Hallucination", "Sexual Problem"
];
const FollowUp = () => {
  const drugTypes = ["Opioid", "Stimulant", "Depressant", "Hallucinogen", "Other"];
  const routesOfAdmin = ["Oral", "Inhalation", "Injection", "Smoking", "Other"];
  const frequencies = ["Daily", "Weekly", "Monthly", "Occasionally", "Stopped"];
  const lastUse = ["Less than 1 month", "1-3 months", "3-6 months", "More than 6 months", "Never"];

  // const [recordDate, setRecordDate] = useState("");
  const [currentDrugUse, setCurrentDrugUse] = useState("no");
  const [typeOfDrugUseMajor, setTypeOfDrugUseMajor] = useState("");
  const [mostRecentRoutesOfAdmin, setMostRecentRoutesOfAdmin] = useState("");
  const [durationYears, setDurationYears] = useState("");
  const [durationMonths, setDurationMonths] = useState("");
  const [frequencyOfDrugUse, setFrequencyOfDrugUse] = useState("");
  const [whenLastUse, setWhenLastUse] = useState("");
  const [outcomeDate, setOutcomeDate] = useState("2025-09-14");
  const [selectedOutcome, setSelectedOutcome] = useState(""); 

  // Accordion expand/collapse all logic
  const accordionKeys = [
    "item-1", // Drug History
    "item-2", // Risk Behaviour
    "item-3", // Current Medical History
    "item-4", // Vital Sign
    "item-5", // Lab Investigation
    "item-6", // Treatment
    "item-7", // Outcome
    "item-8", // BPN Side Effect
  ];
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const handleExpandAll = () => setOpenAccordions(accordionKeys);
  const handleCollapseAll = () => setOpenAccordions([]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2 flex items-center gap-2">
          <UserCheck className="w-7 h-7 text-[#051463]" /> Client Follow-Up
        </h1>
        <p className="text-muted-foreground text-base mb-8 max-w-2xl">
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
            <div className="rounded-t-2xl bg-gradient-to-r from-[#051463] via-blue-700 to-blue-400 px-8 py-6 flex items-center gap-3 mb-8 shadow-md">
              <UserCheck className="w-8 h-8 text-white drop-shadow" />
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Follow-Up Form</h2>
            </div>
            {/* Visit Date Section */}
            <div className="flex flex-col md:flex-row w-full justify-between gap-8 px-6 pb-8">
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <Label className="font-semibold text-base text-primary flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#051463]" />
                  Visit Date <span className="text-red-500">*</span>
                </Label>
                <Input type="date" className="max-w-xs" />
              </div>
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <Label htmlFor="patient-no" className="font-semibold text-base text-primary">
                  Patient No
                </Label>
                <Input id="patient-no" value="001/000001" readOnly className="font-mono bg-gray-100" />
                <span className="text-xs text-muted-foreground">Auto-generated</span>
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
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                  Drug Use History
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* This radio group is always visible */}
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

                    {/* Conditionally render the rest of the fields */}
                    {currentDrugUse === "yes" && (
                      <>
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
                      </>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* Risk Behaviour */}
              <AccordionItem value="item-2">
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
              {/* Current Medical History */}
              {/* <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">Current Medical History</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-6">
                  
                  <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
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
                      <Input type="date" placeholder="ART Start Date" className="bg-white" />
                      <Input placeholder="ART Regimen" className="bg-white" />
                      <Input placeholder="ART Code" className="bg-white" />
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
                      <Input placeholder="ART Clinic" className="bg-white" />
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
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
                      <Input type="date" placeholder="Hep C Start Date" className="bg-white" />
                      <Input type="date" placeholder="Hep C Complete Date" className="bg-white" />
                    </div>
                  </div>
                 
                  <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
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
                  
                  <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
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
                      <Input placeholder="TB Regimen" className="bg-white" />
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
                </AccordionContent>
              </AccordionItem> */}
              {/* Vital Sign */}
              <AccordionItem value="item-3">
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
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">Lab Investigation</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-6">
                  {/* HIV Testing */}
                  <div className="space-y-2">
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
                        <Input type="date" defaultValue="1900-01-01" className="bg-white" />
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
                      <div key={label} className="flex flex-col gap-2 bg-gray-50 rounded-lg p-4">
                        <Label className="font-semibold">{label}</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="-- Select --" /></SelectTrigger>
                          <SelectContent>
                            {testOptions.map((opt) => (
                              <SelectItem key={opt + label} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input type="date" defaultValue="1900-01-01" className="bg-white" />
                      </div>
                    ))}
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
                            <Input type="date" defaultValue="1900-01-01" className="col-span-1 bg-white" />
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
              <AccordionItem value="item-5">
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
                      <Input type="date" value="2025-07-03" className="bg-white" />
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
                              <Input placeholder="Dose" className="w-28 bg-white" />
                              <span>{option.unit}</span>
                            </>
                          )}
                          {option.input && (
                            <Input className="flex-1 bg-white" />
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
                          <Input type="date" defaultValue="1900-01-01" className="bg-white" />
                        </div>
                      ))}
                      <div className="flex flex-col gap-2">
                        <Label>Next Appointment Date</Label>
                        <Input type="date" defaultValue="1900-01-01" className="bg-white" />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* Outcome */}
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-semibold">
                  Outcome
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Main Outcome Selection */}
                    <div className="flex flex-col gap-2">
                      <Label>Outcome <span className="text-red-500">*</span></Label>
                      <Select value={selectedOutcome} onValueChange={setSelectedOutcome}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="-- Select Outcome --" />
                        </SelectTrigger>
                        <SelectContent>
                          {outcomeOptions.map((outcome) => (
                            <SelectItem key={outcome} value={outcome}>
                              {outcome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Outcome Date */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="outcome-date">Date of Outcome</Label>
                      <Input id="outcome-date" type="date" value={outcomeDate} onChange={(e) => setOutcomeDate(e.target.value)} className="bg-white" />
                    </div>

                    {/* Dynamic Select box based on selectedOutcome */}
                    {selectedOutcome === "Transferred Out" && (
                      <div className="flex flex-col gap-2 md:col-span-2"> {/* span 2 columns to make it full width on md screens */}
                        <Label>Transferout Center</Label>
                        <Select>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="-- Select Transferout Center --" />
                          </SelectTrigger>
                          <SelectContent>
                            {transferoutCenterOptions.map((option) => (
                              <SelectItem key={option.id} value={option.name}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {selectedOutcome === "Exipred" && (
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <Label>Cause of Death</Label>
                        <Select>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="-- Select Cause of death --" />
                          </SelectTrigger>
                          <SelectContent>
                            {expiredOptions.map((option) => (
                              <SelectItem key={option.id} value={option.name}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {selectedOutcome === "Treatment interruption" && (
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <Label>Reason of Interruption</Label>
                        <Select>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="-- Select Reason of Interruption --" />
                          </SelectTrigger>
                          <SelectContent>
                            {treatmentInterruptionOptions.map((option) => (
                              <SelectItem key={option.id} value={option.name}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* BPN Side Effect */}
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-semibold">BPN Side Effect</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
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
                        <Input className="flex-1 bg-white" />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* Submit Section */}
            <div className="flex justify-end pt-8 border-t mt-10 bg-blue-50 rounded-xl shadow-sm px-6 py-6">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[#051463] via-blue-700 to-blue-400 text-white font-bold text-lg shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:from-blue-800 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-[#051463] disabled:opacity-60"
              >
                <UserCheck className="w-5 h-5 text-white" />
                Save
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FollowUp;
