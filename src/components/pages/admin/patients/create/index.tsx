import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Calendar, IdCard, Phone, Home, MapPin, UserPlus, Ruler } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker"; // Assuming this is your shadcn DatePicker

const hivStatusOptions = ["Positive", "Negative", "Unknown"];
const hepCStatusOptions = ["Positive", "Negative", "Unknown"];
const hepBStatusOptions = ["Positive", "Negative", "Unknown"];

// NRC option arrays
const nrcPrefixes = Array.from({ length: 14 }, (_, i) => (i + 1).toString());
const nrcTownships = ["YGN", "MDY", "NPT", "BGO", "MGW", "Other"];
const nrcTypes = ["N", "E"];

const races = ["Bamar", "Shan", "Karen", "Rakhine", "Chinese", "Indian", "Other"];
const occupations = ["Farmer", "Teacher", "Doctor", "Engineer", "Student", "Other"];
const educations = ["None", "Primary", "Secondary", "High School", "Graduate", "Postgraduate"];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const states = ["Yangon", "Mandalay", "Naypyitaw", "Bago", "Magway", "Other"];
const townships = ["Ahlone", "Sanchaung", "Hlaing", "Kamayut", "Other"];

const drugs = [
  { id: "cannabis", label: "Cannabis" },
  { id: "heroin", label: "Heroin" },
  { id: "opium", label: "Opium" },
  { id: "cocaine", label: "Cocaine" },
  { id: "amphetamine", label: "Amphetamine" },
  { id: "methamphetamine-pills", label: "Methamphetamine (Pills)" },
  { id: "methamphetamine-crystals", label: "Methamphetamine (Crystals)" },
  { id: "ecstasy", label: "Ecstasy" },
  { id: "benzodiazepines", label: "Benzodiazepines" },
  { id: "hallucinogens", label: "Hallucinogens" },
  { id: "solvents-inhalants", label: "Solvents and Inhalants" },
  { id: "others", label: "Others" },
];

// CORRECTED InputGroup Helper Component
interface InputGroupProps {
  label: React.ReactNode; // Can be a string or JSX element
  id: string;
  type?: React.HTMLInputTypeAttribute; // More specific type for input type
  value: string | number | readonly string[] | undefined; // Accept broader types
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional and correctly typed
  readOnly?: boolean; // Optional
  min?: number; // Optional
  max?: number; // Optional
  placeholder?: string; // Optional
}

const InputGroup = ({ label, id, type = "text", value, onChange, readOnly, min, max, placeholder }: InputGroupProps) => (
  <div className="flex flex-col gap-2">
    <Label htmlFor={id} className="font-semibold text-base text-primary mb-1 flex items-center gap-2">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      min={min}
      max={max}
      placeholder={placeholder}
      className="bg-white"
    />
  </div>
);

export default function CreatePatient() {
  const navigate = useNavigate();

  const [clientId, setClientId] = useState("");
  // --- Client Information States ---
  const [entryType, setEntryType] = useState<"new" | "transfer">("new");
  // const [clientId, setClientId] = useState("001/000001"); 
  const [oldClientId, setOldClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [registrationDate, setRegistrationDate] = useState<Date | undefined>(undefined); // Use Date type for DatePicker
  const [transferDate, setTransferDate] = useState<Date | undefined>(undefined); // Use Date type for DatePicker
  const [transferCenter, setTransferCenter] = useState("");
  const [gender, setGender] = useState("male");
  const [race, setRace] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [township, setTownship] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [addressNo, setAddressNo] = useState("");
  const [street, setStreet] = useState("");
  const [wards, setWards] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined); // Use Date type for DatePicker
  const [age, setAge] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [convertedHeight, setConvertedHeight] = useState<string | null>(null);

  // --- NRC States ---
  const [nrcPrefix, setNrcPrefix] = useState<string>("");
  const [nrcTownship, setNrcTownship] = useState<string>("");
  const [nrcType, setNrcType] = useState<string>("");
  const [nrcNumber, setNrcNumber] = useState("");
  const [nrcFinal, setNrcFinal] = useState("");

  // --- Client History States ---
  const [firstDrugAge, setFirstDrugAge] = useState("");
  const [sharedNeedle, setSharedNeedle] = useState("no");
  const [overdosed, setOverdosed] = useState("no");
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);

  // --- Current Medical History States ---
  const [hivStatus, setHivStatus] = useState("");
  const [artReceived, setArtReceived] = useState("no");
  const [artStartDate, setArtStartDate] = useState<Date | undefined>(undefined);
  const [artRegimen, setArtRegimen] = useState("");
  const [artCode, setArtCode] = useState("");
  const [artClinicHere, setArtClinicHere] = useState("no");
  const [artClinic, setArtClinic] = useState("");

  const [hepCStatus, setHepCStatus] = useState("");
  const [hepcTreatmentReceived, setHepcTreatmentReceived] = useState("no");
  const [hepcStartDate, setHepcStartDate] = useState<Date | undefined>(undefined);
  const [hepcCompleteDate, setHepcCompleteDate] = useState<Date | undefined>(undefined);

  const [hepBStatus, setHepBStatus] = useState("");
  const [hepbTreatmentReceived, setHepbTreatmentReceived] = useState("");
  // const [hepbStartDate, setHepbStartDate] = useState<Date | undefined>(undefined);



  // --- Helper functions for DOB and Age ---
  const handleDobChange = (date: Date | undefined) => {
    setDob(date);
    if (date) {
      const today = new Date();
      let calculatedAge = today.getFullYear() - date.getFullYear();
      const m = today.getMonth() - date.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge.toString());
    } else {
      setAge("");
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = e.target.value;
    setAge(newAge);
    const n = parseInt(newAge, 10);
    if (!isNaN(n) && n >= 0) {
      const today = new Date();
      const calculatedDob = new Date(today.getFullYear() - n, today.getMonth(), today.getDate());
      setDob(calculatedDob);
    } else {
      setDob(undefined);
    }
  };

  // --- Helper function for Height Conversion ---
  const handleHeightConvert = () => {
    const feet = parseFloat(heightFeet) || 0;
    const inches = parseFloat(heightInches) || 0;
    const totalInches = (feet * 12) + inches;
    const cm = totalInches * 2.54;
    setConvertedHeight(cm.toFixed(2));
  };

  // --- Helper function for NRC ---
  const updateNrcFinal = () => {
    if (nrcPrefix && nrcTownship && nrcType && nrcNumber) {
      setNrcFinal(`${nrcPrefix}/${nrcTownship}(${nrcType})${nrcNumber.padStart(6, "0")}`);
    } else {
      setNrcFinal("");
    }
  };

  useEffect(() => {
    updateNrcFinal();
  }, [nrcPrefix, nrcTownship, nrcType, nrcNumber]);

  const handleMainBlur = () => {
    setNrcNumber(prev => prev.padStart(6, "0"));
  };


  const transferCenters = [
    // Placeholder for shadcn Select
    { value: "center1", label: "Center 1" },
    { value: "center2", label: "Center 2" },
    { value: "center3", label: "Center 3" },
  ];

  const toggleDrug = (id: string, checked: boolean) => {
    setSelectedDrugs((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleClick = () => {
    navigate('regfollowup');
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary mb-1">
          Client Registration
        </h1>
        <p className="text-muted-foreground text-base mb-6 max-w-2xl">
          Register a new patient or find an existing patient for follow up. Please fill in all required information accurately.
        </p>

        {/* Entry Type */}
        <div className="mb-6 rounded-xl border-l-4 border-[#051463] bg-blue-50 px-6 py-5 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <UserPlus className="w-5 h-5 text-[#051463]" />
            <Label className="text-lg font-bold text-[#051463]">Entry Type</Label>
          </div>
          <RadioGroup
            value={entryType}
            onValueChange={(val) => setEntryType(val as "new" | "transfer")}
            className="flex gap-8"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="new" id="entry-type-new" className="w-5 h-5 border-2 border-[#051463] focus:ring-2 focus:ring-[#051463] transition" />
              <Label htmlFor="entry-type-new" className="text-base font-medium text-[#051463] cursor-pointer transition-colors hover:text-blue-700">New</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="transfer" id="entry-type-transfer" className="w-5 h-5 border-2 border-[#051463] focus:ring-2 focus:ring-[#051463] transition" />
              <Label htmlFor="entry-type-transfer" className="text-base font-medium text-[#051463] cursor-pointer transition-colors hover:text-blue-700">Transfer In</Label>
            </div>
          </RadioGroup>
        </div>

        <Card className="shadow-xl rounded-2xl border-0 bg-blue-50">
          <CardContent className="pt-0">
            {/* Card Header with blue gradient and icon */}
            <div className="rounded-t-2xl bg-[#051463] px-8 py-6 flex items-center gap-3 mb-6 shadow-md">
              <UserPlus className="w-8 h-8 text-white drop-shadow" />
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Client Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 ">
              {/* General Info */}
              {/* Added readOnly: true and empty placeholder for static inputs */}
              <InputGroup label={<span className="flex items-center gap-2"><IdCard className="w-4 h-4 text-[#051463]" />Client ID</span>} id="client-id" value={clientId}  placeholder="" onChange={(e) => setClientId(e.target.value)} />
              <InputGroup label={<span className="flex items-center gap-2"><IdCard className="w-4 h-4 text-[#051463]" />Old Client Id</span>} id="old-client-id" value={oldClientId} onChange={(e) => setOldClientId(e.target.value)} placeholder="Enter old client ID" />
              <InputGroup label={<span className="flex items-center gap-2"><User className="w-4 h-4 text-[#051463]" />Client Name</span>} id="client-name" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Enter client name" />

              {/* Registration Date using DatePicker - no change needed as it's not InputGroup */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="registration-date" className="font-semibold text-base text-primary mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#051463]" />Registration Date
                </Label>
                <DatePicker
                  date={registrationDate}
                  setDate={setRegistrationDate}
                  placeholder="Select Registration Date"
                />
              </div>

              {/* Transfer In (conditional) */}
              {entryType === "transfer" && (
                <>
                  {/* Transfer In Date using DatePicker - no change needed */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="transfer-date" className="font-semibold text-base text-primary mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#051463]" />Transfer In Date
                    </Label>
                    <DatePicker
                      date={transferDate}
                      setDate={setTransferDate}
                      placeholder="Select Transfer In Date"
                    />
                  </div>
                  {/* Transfer In Center using shadcn Select - no change needed */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="transfer-center-select" className="font-semibold text-base text-primary mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#051463]" />Transfer In Center
                    </Label>
                    <Select value={transferCenter} onValueChange={setTransferCenter}>
                      <SelectTrigger id="transfer-center-select" className="w-full bg-white">
                        <SelectValue placeholder="Select Transfer In Center" />
                      </SelectTrigger>
                      <SelectContent>
                        {transferCenters.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              {/* Gender - no change needed */}
              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-base text-primary mb-1 flex items-center gap-2"><User className="w-4 h-4 text-[#051463]" />Gender</Label>
                <RadioGroup
                  defaultValue="male"
                  className="flex flex-row gap-4"
                  value={gender}
                  onValueChange={setGender}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="gender-male" />
                    <Label htmlFor="gender-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="gender-female" />
                    <Label htmlFor="gender-female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
              {/* Select Fields - no change needed */}
              {[
                ['Race', races, race, setRace],
                ['Occupation', occupations, occupation, setOccupation],
                ['Education', educations, education, setEducation],
                ['Marital Status', maritalStatuses, maritalStatus, setMaritalStatus],
                ['State/Region', states, stateRegion, setStateRegion],
                ['Township', townships, township, setTownship]
              ].map(([label, options, value, setter]) => (
                <div key={label as string} className="flex flex-col gap-2">
                  <Label htmlFor={`${(label as string).toLowerCase().replace(/\s+/g, '-')}-select`} className="font-semibold text-base text-primary mb-1 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#051463]" />{label as string}
                  </Label>
                  <Select value={value as string} onValueChange={setter as (value: string) => void}>
                    <SelectTrigger id={`${(label as string).toLowerCase().replace(/\s+/g, '-')}-select`} className="w-full bg-white">
                      <SelectValue placeholder={`Select ${label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {(options as string[]).map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              {/* Contact & Address - updated to pass all InputGroup props */}
              <InputGroup label={<span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#051463]" />Phone Number</span>} id="phone" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="e.g., 09xxxxxxxxx" />
              <InputGroup label={<span className="flex items-center gap-2"><User className="w-4 h-4 text-[#051463]" />Father Name</span>} id="father-name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} placeholder="Enter father's name" />
              <InputGroup label={<span className="flex items-center gap-2"><Home className="w-4 h-4 text-[#051463]" />Address No</span>} id="address-no" value={addressNo} onChange={(e) => setAddressNo(e.target.value)} placeholder="e.g., 123" />
              <InputGroup label={<span className="flex items-center gap-2"><Home className="w-4 h-4 text-[#051463]" />Street</span>} id="street" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Enter street name" />
              <InputGroup label={<span className="flex items-center gap-2"><Home className="w-4 h-4 text-[#051463]" />Wards</span>} id="wards" value={wards} onChange={(e) => setWards(e.target.value)} placeholder="Enter ward name" />
              {/* DOB + Age - no change needed as they are direct Input or DatePicker */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex flex-col flex-1 gap-2">
                    <Label htmlFor="dob-date" className="font-semibold text-base text-primary mb-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#051463]" />Date of Birth</Label>
                    <DatePicker date={dob} setDate={handleDobChange} placeholder="Select Date of Birth" />
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <Label htmlFor="age" className="font-semibold text-base text-primary mb-1 flex items-center gap-2"><User className="w-4 h-4 text-[#051463]" />Age</Label>
                    <Input id="age" type="number" value={age} onChange={handleAgeChange} min={0} className="bg-white" placeholder="Age" />
                  </div>
                </div>
              </div>
              {/* Height Section - no change needed */}
              <div className="flex flex-col gap-2">
                <Label className="font-semibold text-base text-primary flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#051463]" />Height
                </Label>
                <div className="flex gap-2 items-end">
                  <Input
                    id="height-feet"
                    type="number"
                    min={0}
                    placeholder="Feet"
                    value={heightFeet}
                    onChange={e => setHeightFeet(e.target.value)}
                    className="w-20 bg-white"
                  />
                  <Input
                    id="height-inches"
                    type="number"
                    min={0}
                    max={11}
                    placeholder="Inches"
                    value={heightInches}
                    onChange={e => setHeightInches(e.target.value)}
                    className="w-20 bg-white"
                  />
                  <Button
                    type="button"
                    onClick={handleHeightConvert}
                    className="px-4 py-2 rounded-md bg-[#051463] text-white font-semibold shadow transition hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#051463] focus:outline-none focus:ring-2 focus:ring-[#051463]"
                  >
                    Convert to cm
                  </Button>
                  {convertedHeight && (
                    <div className="flex gap-1">
                      <Input id="height-cm" value={convertedHeight} readOnly className="w-28 bg-blue-50 text-[#051463] font-bold" placeholder="Centimeters" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* NRC Block - no change needed as NRC inputs are not InputGroup */}
            <div className="flex flex-col gap-2 mt-4">
              <Label className="font-semibold text-base text-primary mb-1 flex items-center gap-2"><IdCard className="w-4 h-4 text-[#051463]" />NRC</Label>
              <div className="flex flex-wrap gap-2 items-center">
                <Select value={nrcPrefix} onValueChange={setNrcPrefix}>
                  <SelectTrigger className="w-full max-w-[110px] bg-white"><SelectValue placeholder="1-14" /></SelectTrigger>
                  <SelectContent>
                    {nrcPrefixes.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={nrcTownship} onValueChange={setNrcTownship}>
                  <SelectTrigger className="w-full max-w-[110px] bg-white"><SelectValue placeholder="Township" /></SelectTrigger>
                  <SelectContent>
                    {nrcTownships.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={nrcType} onValueChange={setNrcType}>
                  <SelectTrigger className="w-full max-w-[110px] bg-white"><SelectValue placeholder="N/E" /></SelectTrigger>
                  <SelectContent>
                    {nrcTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input
                  className="w-full max-w-[110px] bg-white"
                  value={nrcNumber}
                  onChange={e => setNrcNumber(e.target.value)}
                  onBlur={handleMainBlur}
                  maxLength={6}
                  placeholder="Number"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-base bg-gray-100 px-2 py-1 rounded-md">
                    {nrcFinal || "NRC Final"}
                  </span>
                </div>


              </div>
            </div>

            {/* Client History Section */}
            <div className="md:col-span-2 lg:col-span-3">
              <Card className="mt-4 shadow-lg rounded-2xl border-0 bg-white/95">
                {/* Client History Header with blue accent and icon */}
                <div className="flex items-center gap-3 px-8 py-4 rounded-t-2xl bg-[#051463] to-blue-400 mb-4 shadow">
                  <User className="w-6 h-6 text-white drop-shadow" />
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Client History</h2>
                </div>
                <CardContent className="pt-0 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Age of First Drug Used using InputGroup - updated to pass all InputGroup props */}
                    <InputGroup
                      label={<span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#051463]" />Age of First Drug Used</span>}
                      id="first-drug-age"
                      type="number"
                      value={firstDrugAge}
                      onChange={(e) => setFirstDrugAge(e.target.value)}
                      min={0}
                      placeholder="e.g., 18"
                      readOnly={false} // Explicitly set to false
                    />
                    <div>
                      <Label className="flex items-center gap-2 font-semibold text-base text-primary mb-1"><User className="w-4 h-4 text-[#051463]" />Ever shared needle and syringe with anyone?</Label>
                      <RadioGroup
                        value={sharedNeedle}
                        onValueChange={setSharedNeedle}
                        className="flex gap-4 mt-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="shared-yes" />
                          <Label htmlFor="shared-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="shared-no" />
                          <Label htmlFor="shared-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label className="flex items-center gap-2 font-semibold text-base text-primary mb-1"><User className="w-4 h-4 text-[#051463]" />Ever overdosed?</Label>
                      <RadioGroup
                        value={overdosed}
                        onValueChange={setOverdosed}
                        className="flex gap-4 mt-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="overdose-yes" />
                          <Label htmlFor="overdose-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="overdose-no" />
                          <Label htmlFor="overdose-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-8">
                    <Label className="flex items-center gap-2 font-semibold text-base text-primary mb-1"><User className="w-4 h-4 text-[#051463]" />Types of drugs used:</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {drugs.map((drug) => (
                        <div key={drug.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`checkbox-${drug.id}`}
                            checked={selectedDrugs.includes(drug.id)}
                            onCheckedChange={(checked) => toggleDrug(drug.id, Boolean(checked))}
                            className="w-4 h-4"
                          />
                          <Label htmlFor={`checkbox-${drug.id}`} className="text-sm cursor-pointer">
                            {drug.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Medical History Section - updated to pass all InputGroup props where used */}
            <div className="md:col-span-2 lg:col-span-3">
              <Card className="mt-4 shadow-lg rounded-2xl border-0 bg-white/95">
                <div className="flex items-center gap-3 px-8 py-4 rounded-t-2xl bg-[#051463] to-blue-400 mb-4 shadow">
                  <User className="w-6 h-6 text-white drop-shadow" />
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Current Medical History
                  </h2>
                </div>
                <CardContent className="pt-0 pb-6">
                  {/* --- HIV Section --- */}
                  <div className="border rounded-lg p-4 space-y-4 bg-gray-50 mb-6">
                    <Label className="text-lg font-semibold">HIV Status <span className="text-red-500 text-lg">*</span></Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="hiv-status-select">HIV Status</Label>
                        <Select onValueChange={setHivStatus} value={hivStatus}>
                          <SelectTrigger id="hiv-status-select" className="bg-white">
                            <SelectValue placeholder="-- Select HIV Status of Last Visit --" />
                          </SelectTrigger>
                          <SelectContent>
                            {hivStatusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Conditionally rendered ART Receive or not field */}
                      {hivStatus === "Positive" && (
                        <div className="flex flex-col gap-2">
                          <Label>ART Receive or not?</Label>
                          <RadioGroup
                            value={artReceived}
                            onValueChange={setArtReceived}
                            className="flex flex-row gap-4"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="yes" id="art-yes" />
                              <Label htmlFor="art-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="art-no" />
                              <Label htmlFor="art-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {/* Conditionally rendered ART-related fields when ART is received */}
                      {hivStatus === "Positive" && artReceived === "yes" && (
                        <>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="art-start-date">ART Started Date</Label>
                            <DatePicker
                              date={artStartDate}
                              setDate={setArtStartDate}
                              placeholder="Select ART Started Date"
                            />
                          </div>
                          {/* Updated to use InputGroup with all props */}
                          <InputGroup id="art-regimen" label="ART Regimen" placeholder="ART Regimen" value={artRegimen} onChange={(e) => setArtRegimen(e.target.value)} />
                          <InputGroup id="art-code" label="ART Code" placeholder="ART Code" value={artCode} onChange={(e) => setArtCode(e.target.value)} />
                          <div className="flex flex-col gap-2">
                            <Label>ART get this clinic or not?</Label>
                            <RadioGroup
                              value={artClinicHere}
                              onValueChange={setArtClinicHere}
                              className="flex flex-row gap-4"
                            >
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
                          {/* Updated to use InputGroup with all props */}

                          {
                            artClinicHere === "no" && (
                              <div className="flex flex-col gap-2">
                                <Label htmlFor="art-clinic-name">ART Clinic Name</Label>
                                <Input id="art-clinic-name" placeholder="ART Clinic Name" value={artClinic} onChange={(e) => setArtClinic(e.target.value)} />
                              </div>
                            )
                          }
                        </>
                      )}
                      {/* This div handles the full width for other statuses */}
                      {hivStatus !== "Positive" && <div className="md:col-span-2" />}
                    </div>
                  </div>

                  {/* --- Hep C Section --- */}
                  <div className="border rounded-lg p-4 space-y-4 bg-gray-50 mb-6">
                    <Label className="text-lg font-semibold">Hepatitis C Status <span className="text-red-500 text-lg">*</span></Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="hepc-status-select">Hep C Status</Label>
                        <Select onValueChange={setHepCStatus} value={hepCStatus}>
                          <SelectTrigger id="hepc-status-select" className="bg-white">
                            <SelectValue placeholder="-- Select Hep C Status of Last Visit --" />
                          </SelectTrigger>
                          <SelectContent>
                            {hepCStatusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Conditionally rendered Hep C treatment Receive or not field */}
                      {hepCStatus === "Positive" && (
                        <div className="flex flex-col gap-2">
                          <Label>Hep C treatment Receive or not?</Label>
                          <RadioGroup
                            value={hepcTreatmentReceived}
                            onValueChange={setHepcTreatmentReceived}
                            className="flex flex-row gap-4"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="yes" id="hepc-treatment-yes" />
                              <Label htmlFor="hepc-treatment-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="hepc-treatment-no" />
                              <Label htmlFor="hepc-treatment-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {/* Conditionally rendered Hep C date pickers when treatment is received */}
                      {hepCStatus === "Positive" && hepcTreatmentReceived === "yes" && (
                        <>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="hepc-start-date">Hep C Treatment Started Date</Label>
                            <DatePicker
                              date={hepcStartDate}
                              setDate={setHepcStartDate}
                              placeholder="Select Hep C Started Date"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="hepc-complete-date">Hep C Treatment Completed Date</Label>
                            <DatePicker
                              date={hepcCompleteDate}
                              setDate={setHepcCompleteDate}
                              placeholder="Select Hep C Completed Date"
                            />
                          </div>
                        </>
                      )}
                      {/* This div handles the full width for other statuses */}
                      {hepCStatus !== "Positive" && <div className="md:col-span-2" />}
                    </div>
                  </div>

                  {/* --- Hep B Section --- */}
                  <div className="border rounded-lg p-4 space-y-4 bg-gray-50 mb-6">
                    <Label className="text-lg font-semibold">Hepatitis B Status <span className="text-red-500 text-lg">*</span></Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="hepb-status-select">Hep B Status</Label>
                        <Select onValueChange={setHepBStatus} value={hepBStatus}>
                          <SelectTrigger id="hepb-status-select" className="bg-white">
                            <SelectValue placeholder="-- Select Hep B Status of Last Visit --" />
                          </SelectTrigger>
                          <SelectContent>
                            {hepBStatusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Conditionally rendered Hep B treatment Receive or not field */}
                      {hepBStatus === "Negative" && (
                        <div className="flex flex-col gap-2">
                          <Label>Hep B Vaccinated or not?</Label>
                          <RadioGroup
                            value={hepbTreatmentReceived}
                            onValueChange={setHepbTreatmentReceived}
                            className="flex flex-row gap-4"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="yes" id="hepb-treatment-yes" />
                              <Label htmlFor="hepb-treatment-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="hepb-treatment-no" />
                              <Label htmlFor="hepb-treatment-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {/* Conditionally rendered Hep B date picker when treatment is received */}
                      {/* {hepBStatus === "Negative" && hepbTreatmentReceived === "yes" && (
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="hepb-start-date">Hep B Start Date</Label>
                          <DatePicker
                            date={hepbStartDate}
                            setDate={setHepbStartDate}
                            placeholder="Select Hep B Start Date"
                          />
                        </div>
                      )} */}
                      {/* This div handles the full width for other statuses */}
                      {hepBStatus !== "Positive" && <div className="md:col-span-2" />}
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>

            {/* TB & Mental Health */}
            {/* <div className="md:col-span-2 lg:col-span-3">
              <Card className="mt-4 shadow-lg rounded-2xl border-0 bg-white/95">
                <div className="flex items-center gap-3 px-8 py-4 rounded-t-2xl bg-[#051463] mb-4 shadow">
                  <User className="w-6 h-6 text-white drop-shadow" />
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    TB & Mental Health
                  </h2>
                </div>
                <CardContent className="pt-0 pb-6">
                  <div className="flex flex-col gap-8">
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
                          <>
                            <InputGroup id="tb-regimen" label="TB Regimen" placeholder="TB Regimen" value={tbRegimen} onChange={(e) => setTbRegimen(e.target.value)} />
                          </>
                        )
                      }

                    </div>
                    <div className="flex items-center gap-[340px]">
                      <div className="flex gap-2">
                        <Label>Mental Health Screening</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tb-screening-checkbox"
                            checked={tbScreeningChecked}
                            onCheckedChange={(checked) => setTbScreeningChecked(Boolean(checked))}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="tb-screening-checkbox">Refer For Mental Health Treatment</Label>
                          <Checkbox id="tb-screening-checkbox" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> */}

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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}