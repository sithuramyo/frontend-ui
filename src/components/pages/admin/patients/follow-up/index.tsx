import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { UserCheck, AlertTriangle, Syringe, Shield, HelpCircle, CheckCircle2, XCircle, UserPlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { IconlessDatePicker } from "@/components/ui/iconless-date-picker";
import { toast } from "sonner";
// import { PastDatePicker } from "@/components/ui/pastDatePicker";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";



const testOptions = ["-- Select --", "Reactive", "Non-Reactive", "Invalid"];
const finalOptions = ["-- Select --", "Positive", "Negative", "Inconclusive"];
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

const transferoutCenterOptions = [
  { id: 0, name: "-- Select Transferout Center --" },
  { id: 1, name: "Pulmonary" },
  { id: 2, name: "Gastrointestinal" },
  { id: 3, name: "Genitourinary" },
  { id: 4, name: "Neurology" },
  { id: 5, name: "Other" },
];

const expiredOptions = [
  { id: 0, name: "-- Select Cause of death --" },
  { id: 1, name: "Fatal Overdose" },
  { id: 2, name: "Accident(intoxicated)" },
  { id: 3, name: "Drugs related HIV/AIDS Death" },
  { id: 4, name: "Others" },
];

const treatmentInterruptionOptions = [
  { id: 0, name: "-- Select Reason of Interruption --" },
  { id: 1, name: "Loss of follow-up" },
  { id: 2, name: "Incarcreation" },
  { id: 3, name: "Psychosis" },
  { id: 4, name: "Hyper Sensitivity" },
];

const sideEffects = [
  "Sedation", "Drowsiness", "Diplopia", "Incoordination",
  "Giddiness", "Slurred Speech", "Headaches", "Itching",
  "Confusion", "Oral Ulceration", "Light headedness", "Constipation",
  "Blurred Vision", "Weakness", "Hallucination", "Sexual Problem",
];

// --- Types for HIV results ---
type HivTestResult = "Reactive" | "Non-Reactive" | "Invalid" | null;
type HivFinalResult = "Positive" | "Negative" | "Inconclusive" | null;
type HivTestKey = 'test1' | 'test2' | 'test3';

interface HivResults {
  [key: string]: {
    test1: HivTestResult;
    test2: HivTestResult;
    test3: HivTestResult;
    final: HivFinalResult;
  };
}

const FollowUp = () => {
  const drugTypes = ["Opioid", "Stimulant", "Depressant", "Hallucinogen", "Other"];
  const routesOfAdmin = ["Oral", "Inhalation", "Injection", "Smoking", "Other"];
  const frequencies = ["Daily", "Weekly", "Monthly", "Occasionally", "Stopped"];
  const lastUse = ["Less than 1 month", "1-3 months", "3-6 months", "More than 6 months", "Never"];

  // Date states for the new DatePickers
  const [visitDate, setVisitDate] = useState<Date | undefined>(new Date());
  // const [hivTestDate, setHivTestDate] = useState<Date | undefined>(undefined);
  const [testDateHepB, setTestDateHepB] = useState<Date | undefined>(undefined);
  const [testDateHepC, setTestDateHepC] = useState<Date | undefined>(undefined);
  const [treatmentStartDate, setTreatmentStartDate] = useState<Date | undefined>(undefined);
  const [nextAppointmentDate, setNextAppointmentDate] = useState<Date | undefined>(undefined);
  const [outcomeDate, setOutcomeDate] = useState<Date | undefined>(undefined);
  const [urineTestDates, setUrineTestDates] = useState<{ [key: string]: Date | undefined }>({});

  const [tbTreatmentReceived, setTbTreatmentReceived] = useState("no");
  // const [tbScreening, setTbScreening] = useState("no");
  const [tbRegimen, setTbRegimen] = useState("");
  // const [mentalHealthScreening, setMentalHealthScreening] = useState("yes");

  const [tbScreeningChecked, setTbScreeningChecked] = useState(false);
  const [mentalHealthScreeningChecked, setMentalHealthScreeningChecked] = useState(false);

  const handleUrineTestDateChange = (drug: string, date: Date | undefined) => {
    setUrineTestDates(prev => ({ ...prev, [drug]: date }));
  };

  // Other states
  const [currentDrugUse, setCurrentDrugUse] = useState("no");
  const [typeOfDrugUseMajor, setTypeOfDrugUseMajor] = useState("");
  const [mostRecentRoutesOfAdmin, setMostRecentRoutesOfAdmin] = useState("");
  const [durationYears, setDurationYears] = useState("");
  const [durationMonths, setDurationMonths] = useState("");
  const [frequencyOfDrugUse, setFrequencyOfDrugUse] = useState("");
  const [whenLastUse, setWhenLastUse] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState("");
  const [selectedExpiredOption, setSelectedExpiredOption] = useState("");
  const [selectedInterruptionOption, setSelectedInterruptionOption] = useState("");
  const [selectedTransferoutCenter, setSelectedTransferoutCenter] = useState("");

  // --- HIV Test Dates State & Logic ---
  const [hivTestDates, setHivTestDates] = useState<{ [key: string]: Date | undefined }>({
    Self: undefined,
    "Partner 1": undefined,
    "Partner 2": undefined,
  });

  const [syphilisTestDates, setSyphilisTestDates] = useState<{ [key: string]: Date | undefined }>({
    Self: undefined,
    "Partner 1": undefined,
    "Partner 2": undefined,
  });


  // --- HIV Results State & Logic ---
  const [hivResults, setHivResults] = useState<HivResults>({
    Self: { test1: null, test2: null, test3: null, final: null },
    "Partner 1": { test1: null, test2: null, test3: null, final: null },
    "Partner 2": { test1: null, test2: null, test3: null, final: null },
  });

  const handleHivDateChange = (role: string, date: Date | undefined) => {
    setHivTestDates(prevDates => ({
      ...prevDates,
      [role]: date,
    }));
  };

  // Handler for updating Syphilis test dates
  const handleSyphilisDateChange = (role: string, date: Date | undefined) => {
    setSyphilisTestDates(prevDates => ({
      ...prevDates,
      [role]: date,
    }));
  };

  const [hepbVaccineDates, setHepbVaccineDates] = useState<{ [key: number]: Date | undefined }>({
    1: undefined,
    2: undefined,
    3: undefined,
  });

  const handleHepBVaccineChange = (doseNumber: number, date: Date | undefined) => {
    setHepbVaccineDates(prevDates => ({
      ...prevDates,
      [doseNumber]: date,
    }));
  };

  const accordionKeys = [
    "item-1", "item-2", "item-3", "item-4", "item-5", "item-6", "item-7", "item-8",
  ];
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const handleExpandAll = () => setOpenAccordions(accordionKeys);
  const handleCollapseAll = () => setOpenAccordions([]);

  const handleClick = () => {
    toast.success('Form submitted successfully!', {
      position: "top-right"
    });
  };

  // lab investigation
  const handleHivTestChange = (role: string, testNumber: number, value: string) => {
    const safeValue = value === "-- Select --" ? null : value as HivTestResult;
    setHivResults(prevResults => ({
      ...prevResults,
      [role]: { ...prevResults[role], [`test${testNumber}`]: safeValue },
    }));
  };

  const getFinalHivResult = (test1Result: HivTestResult, test2Result: HivTestResult, test3Result: HivTestResult): HivFinalResult => {
    if (test1Result === "Non-Reactive") return "Negative";
    if (test1Result === "Reactive" && test2Result === "Reactive" && test3Result === "Reactive") return "Positive";
    if (
      (test1Result === "Reactive" && test2Result === "Reactive" && test3Result === "Non-Reactive") ||
      (test1Result === "Reactive" && test2Result === "Non-Reactive" && test3Result === "Reactive")
    ) return "Inconclusive";
    if (test1Result === "Reactive" && test2Result === "Non-Reactive" && test3Result === "Non-Reactive") return "Negative";

    return null;
  };

  // Handler for updating HIV test dates


  useEffect(() => {
    ["Self", "Partner 1", "Partner 2"].forEach((role) => {
      const { test1, test2, test3 } = hivResults[role];

      if (test1 && test2 && test3) {
        const newFinalResult = getFinalHivResult(test1, test2, test3);
        if (newFinalResult !== hivResults[role].final) {
          setHivResults((prevResults) => ({
            ...prevResults,
            [role]: { ...prevResults[role], final: newFinalResult },
          }));
        }
      } else if (hivResults[role].final) {
        setHivResults((prevResults) => ({
          ...prevResults,
          [role]: { ...prevResults[role], final: null },
        }));
      }
    });
  }, [hivResults]);
  //
  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2 flex items-center gap-2">
          <UserCheck className="w-7 h-7 text-[#051463]" /> Client Follow-Up
        </h1>
        <p className="text-muted-foreground text-base mb-8 max-w-2xl">
          Record and manage follow-up information for clients. Complete all relevant sections accurately.
        </p>

        <Card className="shadow-2xl rounded-2xl border-0 bg-white/95">
          <CardContent className="pt-0">
            <div className="rounded-t-2xl bg-gray-700 px-8 py-6 flex items-center justify-between gap-3 mb-8 shadow-md" >
              {/* Patient ID */}
              <div className="flex items-start gap-2 w-full">
                <Label htmlFor="patient-no" className="font-semibold  text-white text-xl">
                  Client ID
                </Label>
                <div className="flex flex-col items-center gap-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAFAFA] text-md text-[#051463] font-bold font-mono">
                    001/000001
                  </div>
                </div>
              </div>
              {/* Expand/Collapse All */}
              <div className="flex gap-2 justify-end">
                {/* Expand All */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      className="px-2 py-2 rounded-md font-semibold"
                      onClick={handleExpandAll}
                    >
                      <IoIosArrowDown />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Expand all</TooltipContent>
                </Tooltip>

                {/* Collapse All */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      className="px-2 py-2 rounded-md font-semibold"
                      onClick={handleCollapseAll}
                    >
                      <IoIosArrowUp />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Collapse all</TooltipContent>
                </Tooltip>
              </div>
            </div>
            {/* Visit Date Section */}
            <div className="flex flex-col md:flex-row w-full justify-between gap-8 px-6 pb-8">
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                <Label className="font-semibold text-base text-primary flex items-center gap-2">
                  Visit Date <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  date={visitDate}
                  setDate={setVisitDate}
                  placeholder="Select Visit Date"
                />
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
              <AccordionItem value="item-1" className="bg-[#f9f7f7] py-4 pr-4 data-[state=open]:bg-blue-50">
                <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                  <span className="text-sm font-semibold text-white bg-[#051463] rounded-r-full px-3 py-1">Drug Use History</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 pl-4">
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
              <AccordionItem value="item-2" className="bg-[#f9f7f7] py-4 pr-4 data-[state=open]:bg-blue-50">
                <AccordionTrigger className="text-lg font-semibold">
                  <span className="text-sm font-semibold text-white bg-[#051463] rounded-r-full px-3 py-1">Risk Behaviour</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 pl-4">
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
              <AccordionItem value="item-3" className="bg-[#f9f7f7] py-4 pr-4 data-[state=open]:bg-blue-50">
                <AccordionTrigger className="text-lg font-semibold">
                  <span className="text-sm font-semibold text-white bg-[#051463] rounded-r-full px-3 py-1">Vital Sign</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 pl-4 space-y-4">
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
              <AccordionItem value="item-4" className="bg-[#f9f7f7] py-4 pr-4 data-[state=open]:bg-blue-50">
                <AccordionTrigger className="text-lg font-semibold">
                  <span className="text-sm font-semibold text-white bg-[#051463] rounded-r-full px-3 py-1">Lab Investigation & Referral</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 pl-4 space-y-6">
                  <Label className="font-bold text-lg">HIV & Syphilis Testing</Label>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {"Self,Partner 1,Partner 2".split(",").map((role, index) => (
                      <AccordionItem key={role} value={`item-${role}`}>
                        <AccordionTrigger className="bg-gray-50 rounded-lg p-4 font-bold text-base">
                          <div className="flex items-center gap-4">
                            <Input
                              placeholder={index === 0 ? "001/000001" : role}
                              readOnly={true}
                              className="bg-gray-100 w-auto"
                              onClick={(e) => e.stopPropagation()}
                            />
                            {index !== 0 && (
                              <>
                                <div className="flex items-center space-x-2">
                                  <Label htmlFor={`${role}-age`}>Age</Label>
                                  <Input
                                    id={`${role}-age`}
                                    type="number"
                                    placeholder="Age"
                                    className="w-24"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                <RadioGroup className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="M" id={`${role}-male`} />
                                    <Label htmlFor={`${role}-male`}>M</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="F" id={`${role}-female`} />
                                    <Label htmlFor={`${role}-female`}>F</Label>
                                  </div>
                                </RadioGroup>
                              </>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-gray-50 rounded-b-lg">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* HIV Testing Card */}
                            <div className="space-y-2 bg-white rounded-lg p-4 shadow-md">
                              <Label className="font-bold text-lg">HIV Testing</Label>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={`hiv-date-${role}`} className="w-1/3">HIV Test Date</Label>
                                  <IconlessDatePicker
                                    date={hivTestDates[role]}
                                    setDate={(date) => handleHivDateChange(role, date)}
                                    className="flex-1"
                                  />
                                </div>
                                {[1, 2, 3].map((i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <Label htmlFor={`hiv-test-${role}-${i}`} className="w-1/3">Test {i} Result</Label>
                                    <Select
                                      onValueChange={(value) => handleHivTestChange(role, i, value)}
                                      value={
                                        (hivResults[role] as Record<HivTestKey, HivTestResult>)?.[`test${i}` as HivTestKey] ?? ""
                                      }
                                      disabled={i > 1 && hivResults[role]?.test1 === "Non-Reactive"}
                                    >
                                      <SelectTrigger id={`hiv-test-${role}-${i}`} className="flex-1">
                                        <SelectValue placeholder={`Test ${i} Result`} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {testOptions.map((opt) => (
                                          <SelectItem key={opt + i} value={opt}>
                                            {opt}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                ))}
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={`hiv-final-result-${role}`} className="w-1/3">Final Result</Label>
                                  <Select value={hivResults[role]?.final ?? ""} disabled>
                                    <SelectTrigger id={`hiv-final-result-${role}`} className="flex-1">
                                      <SelectValue placeholder="Final Result">
                                        {hivResults[role]?.final || "Final Result"}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {finalOptions.map((opt) => (
                                        <SelectItem key={opt + "final"} value={opt}>
                                          {opt}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={`post-test-counselling-${role}`} />
                                  <Label htmlFor={`post-test-counselling-${role}`}>Post-test counseling</Label>
                                </div>
                                {hivResults[role]?.final === "Positive" && (
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id={`refer-for-art-${role}`} />
                                    <Label htmlFor={`refer-for-art-${role}`}>Refer for ART</Label>
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* Syphilis Testing Card */}
                            <div className="space-y-2 bg-white rounded-lg p-4 shadow-md">
                              <Label className="font-bold text-lg">Syphilis Testing</Label>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={`syphilis-date-${role}`} className="w-1/3">Syphilis Test Date</Label>
                                  <IconlessDatePicker
                                    date={syphilisTestDates[role]}
                                    setDate={(date) => handleSyphilisDateChange(role, date)}
                                    className="flex-1"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={`syphilis-result-${role}`} className="w-1/3">Test Result</Label>
                                  <Select>
                                    <SelectTrigger id={`syphilis-result-${role}`} className="flex-1">
                                      <SelectValue placeholder="Test Result" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {testOptions.map((opt) => (
                                        <SelectItem key={opt + "syphilis"} value={opt}>{opt}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={`refer-for-sti-${role}`} />
                                  <Label htmlFor={`refer-for-sti-${role}`}>Refer for STI treatment</Label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  {/* Hep B/C Testing */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 bg-gray-50 rounded-lg p-4">
                      <Label className="font-semibold">Hep B Testing</Label>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="hepb-result" className="w-1/3">Test Result</Label>
                        <Select>
                          <SelectTrigger id="hepb-result" className="flex-1">
                            <SelectValue placeholder="-- Select --" />
                          </SelectTrigger>
                          <SelectContent>
                            {testOptions.map((opt) => (
                              <SelectItem key={opt + "hepb"} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="hepb-date" className="w-1/3">Test Date</Label>
                        <IconlessDatePicker
                          date={testDateHepB}
                          setDate={setTestDateHepB}
                          className="flex-1"
                        />
                      </div>

                      {/* Hep B Vaccination Section */}
                      <div className="space-y-2 mt-4 pt-4 border-t border-gray-300">
                        <Label className="font-semibold">Hep B Vaccination</Label>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="hepb-vaccine-1" className="w-1/3">1st Dose Date</Label>
                            <IconlessDatePicker
                              date={hepbVaccineDates[1]}
                              setDate={(date) => handleHepBVaccineChange(1, date)}
                              className="flex-1"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor="hepb-vaccine-2" className="w-1/3">2nd Dose Date</Label>
                            <IconlessDatePicker
                              date={hepbVaccineDates[2]}
                              setDate={(date) => handleHepBVaccineChange(2, date)}
                              className="flex-1"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor="hepb-vaccine-3" className="w-1/3">3rd Dose Date</Label>
                            <IconlessDatePicker
                              date={hepbVaccineDates[3]}
                              setDate={(date) => handleHepBVaccineChange(3, date)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 bg-gray-50 rounded-lg p-4">
                      <Label className="font-semibold">Hep C Testing</Label>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="hepc-result" className="w-1/3">Test Result</Label>
                        <Select>
                          <SelectTrigger id="hepc-result" className="flex-1">
                            <SelectValue placeholder="-- Select --" />
                          </SelectTrigger>
                          <SelectContent>
                            {testOptions.map((opt) => (
                              <SelectItem key={opt + "hepc"} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="hepc-date" className="w-1/3">Test Date</Label>
                        <IconlessDatePicker
                          date={testDateHepC}
                          setDate={setTestDateHepC}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="refer-for-hepc-treatment" />
                        <Label htmlFor="refer-for-hepc-treatment">Refer for Hep C treatment</Label>
                      </div>
                    </div>
                  </div>
                  {/* Urine Testing */}
                  <div className="space-y-2">
                    <Label className="font-bold">Urine Testing</Label>
                    <RadioGroup>
                      <div className="grid grid-cols-1 gap-2">
                        {urineTests.map((drug) => (
                          <div key={drug} className="grid grid-cols-5 gap-2 items-center bg-gray-50 rounded-lg p-2 mb-1">
                            {/* Drug Checkbox & Label */}
                            <div className="flex items-center space-x-2">
                              <Checkbox id={`checkbox-${drug}`} className="border-black" />
                              <Label htmlFor={`checkbox-${drug}`}>{drug}</Label>
                            </div>

                            {/* Date Input with new Label and reduced width */}
                            <div className="col-span-2 flex items-center gap-3">
                              <Label className="text-sm font-medium mb-1">Test Date</Label>
                              <DatePicker
                                date={urineTestDates[drug]}
                                setDate={(date) => handleUrineTestDateChange(drug, date)}
                                className="w-3/4" // Width is reduced here
                              />
                            </div>

                            {/* Radio Group */}
                            <div className="flex items-center space-x-2 col-span-2">
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
              <AccordionItem value="item-5" className="bg-[#f9f7f7] py-4 pr-4 data-[state=open]:bg-blue-50">
                <AccordionTrigger className="text-lg font-semibold">
                  <span className="text-sm font-semibold text-white bg-[#051463] rounded-r-full px-3 py-1">Treatment</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 pl-4 space-y-6">
                  <div className="space-y-2">
                    <Label className="font-semibold">Refer For:</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        "Rehabilitation"
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
                        <SelectTrigger className="w-[70%]">
                          <SelectValue placeholder="Select Treatment Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {["OST", "Symptomatic", "Detox"].map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Treatment Start Date <span className="text-red-500">*</span></Label>
                      <IconlessDatePicker
                        date={treatmentStartDate}
                        setDate={setTreatmentStartDate}
                        placeholder="Select Start Date"
                        className="w-[70%]"
                      />
                    </div>
                  </div>
                  {/* Section 5: Medication */}
                  <div className="space-y-2">
                    <Label className="font-semibold">Medication <span className="text-red-500">*</span></Label>
                    <RadioGroup defaultValue="Methadone" className="space-y-3">
                      {[
                        { label: "Methadone", doses: true },
                        { label: "Buprenorphine", doses: false, radioDoses: true },
                        // { label: "Tincture Opium", doses: true }, 
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
                          {option.radioDoses && (
                            <>
                              <Input placeholder="Dose" className="w-24 bg-white" />
                              <RadioGroup className="flex flex-row flex-wrap gap-4">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="2mg" id="buprenorphine-2mg" />
                                  <Label htmlFor="buprenorphine-2mg">2mg</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="8mg" id="buprenorphine-8mg" />
                                  <Label htmlFor="buprenorphine-8mg">8mg</Label>
                                </div>
                              </RadioGroup>
                            </>
                          )}
                          {option.input && (
                            <Input placeholder="Specify other" className="flex-1 bg-white" />
                          )}
                        </div>

                      ))}
                      <div className="flex flex-col gap-2 w-[300px]">
                        <Label>Next Appointment Date</Label>
                        <IconlessDatePicker
                          date={nextAppointmentDate}
                          setDate={setNextAppointmentDate}
                          placeholder="Select Date"
                          className="w-[70%]"
                        />
                      </div>
                    </RadioGroup>
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* Outcome */}
              <AccordionItem value="item-6" className="bg-[#f9f7f7] py-4 pr-4 data-[state=open]:bg-blue-50">
                <AccordionTrigger className="text-lg font-semibold">
                  <span className="text-sm font-semibold text-white bg-[#051463] rounded-r-full px-3 py-1">Outcome</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 pl-4 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label>Outcome Date <span className="text-red-500">*</span></Label>
                      <DatePicker
                        date={outcomeDate}
                        setDate={setOutcomeDate}
                        placeholder="Select Outcome Date"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Outcome <span className="text-red-500">*</span></Label>
                      <Select value={selectedOutcome} onValueChange={setSelectedOutcome}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="-- Select Outcome --" />
                        </SelectTrigger>
                        <SelectContent>
                          {outcomeOptions.map(outcome => (
                            <SelectItem key={outcome} value={outcome}>{outcome}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Conditional fields based on selected outcome */}
                  {selectedOutcome === "Transferred Out" && (
                    <div className="flex flex-col gap-2">
                      <Label>Transferout Center <span className="text-red-500">*</span></Label>
                      <Select value={selectedTransferoutCenter} onValueChange={setSelectedTransferoutCenter}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="-- Select Transferout Center --" />
                        </SelectTrigger>
                        <SelectContent>
                          {transferoutCenterOptions.map(center => (
                            <SelectItem key={center.id} value={center.name}>
                              {center.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {selectedOutcome === "Exipred" && (
                    <div className="flex flex-col gap-2">
                      <Label>Cause of death <span className="text-red-500">*</span></Label>
                      <Select value={selectedExpiredOption} onValueChange={setSelectedExpiredOption}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="-- Select Cause of death --" />
                        </SelectTrigger>
                        <SelectContent>
                          {expiredOptions.map(option => (
                            <SelectItem key={option.id} value={option.name}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {selectedOutcome === "Treatment interruption" && (
                    <div className="flex flex-col gap-2">
                      <Label>Reason of Interruption <span className="text-red-500">*</span></Label>
                      <Select value={selectedInterruptionOption} onValueChange={setSelectedInterruptionOption}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="-- Select Reason of Interruption --" />
                        </SelectTrigger>
                        <SelectContent>
                          {treatmentInterruptionOptions.map(option => (
                            <SelectItem key={option.id} value={option.name}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
              {/* BPN Side Effect */}
              <AccordionItem value="item-7" className="bg-[#f9f7f7] py-4 pr-4 data-[state=open]:bg-blue-50">
                <AccordionTrigger className="text-lg font-semibold">
                  <span className="text-sm font-semibold text-white bg-[#051463] rounded-r-full px-3 py-1">BPN Side Effect</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 pl-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sideEffects.map(effect => (
                      <div key={effect} className="flex items-center space-x-2">
                        <Checkbox id={effect} />
                        <Label htmlFor={effect}>{effect}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* Tb & Mental Health */}
              <AccordionItem value="item-tb-mental" className="bg-[#f9f7f7] py-4 pr-4 data-[state=open]:bg-blue-50">
                <AccordionTrigger className="text-lg font-semibold">
                  <span className="text-sm font-semibold text-white bg-[#051463] rounded-r-full px-3 py-1">TB & Mental Health</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-4">
                  <div className="flex flex-col gap-8 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <Label>Current TB treatment received or not?</Label>
                        <RadioGroup value={tbTreatmentReceived} onValueChange={setTbTreatmentReceived} className="flex flex-row gap-4">
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
                      {
                        tbTreatmentReceived === "no" && (
                          <div className="flex items-center gap-5">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="tb-screening-checkbox">TB Screening</Label>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="tb-screening-checkbox"
                                  checked={mentalHealthScreeningChecked}
                                  onCheckedChange={(checked) => setMentalHealthScreeningChecked(Boolean(checked))}
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor="tb-screening-checkbox">Refer For TB Treatment</Label>
                              <Checkbox id="tb-screening-checkbox" />
                            </div>
                          </div>
                        )
                      }
                      {
                        tbTreatmentReceived === "yes" && (
                          // The InputGroup has been replaced with this div containing a Label and Input
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="tb-regimen">TB Regimen</Label>
                            <Input
                              id="tb-regimen"
                              placeholder="TB Regimen"
                              value={tbRegimen}
                              onChange={(e) => setTbRegimen(e.target.value)}
                            />
                          </div>
                        )
                      }
                    </div>
                    <div className="flex items-center gap-[363px]">
                      <div className="flex gap-2">
                        <Label>Mental Health Screening</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mental-screening-checkbox"
                            checked={tbScreeningChecked}
                            onCheckedChange={(checked) => setTbScreeningChecked(Boolean(checked))}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="mental-referral-checkbox">Refer For Mental Health Treatment</Label>
                          <Checkbox id="mental-referral-checkbox" />
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <div className="lg:col-span-3 md:col-span-2 flex justify-center lg:justify-end gap-4 pt-4 border-t mt-8 bg-blue-50 rounded-xl shadow-sm px-6 py-6">
                <Button
                  type="button"
                  onClick={handleClick}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#051463] text-white font-bold text-lg shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:bg-[#051463] focus:outline-none focus:ring-2 focus:ring-[#051463]"
                >
                  <UserPlus className="w-5 h-5 text-white" />
                  Save
                </Button>
              </div>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FollowUp;