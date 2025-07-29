import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Calendar, IdCard, Phone, Home, MapPin, UserPlus, Ruler } from 'lucide-react';
import { useNavigate } from "react-router-dom";

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
  { id: "Cocaine", label: "Cocaine" },
  { id: "amphetamine", label: "Amphetamine" },
  { id: "methamphetamine(pills)", label: "Methamphetamine (Pills)" },
  { id: "methamphetamine(crystals)", label: "Methamphetamine (Crystals)" },
  { id: "ecstasy", label: "Ecstasy" },
  { id: "Benzodiazepines", label: "Benzodiazepines" },
  { id: "Hallucinogens", label: "Hallucinogens" },
  { id: "solventsandinhalants", label: "Solvents and Inhalants" },
  { id: "others", label: "Others" },
];

function calculateAge(dob: string) {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > 0 ? age.toString() : "";
}

function calculateDOBFromAge(age: string) {
  const n = parseInt(age, 10);
  if (!n || n < 0) return "";
  const today = new Date();
  const dob = new Date(today.getFullYear() - n, today.getMonth(), today.getDate());
  return dob.toISOString().split("T")[0];
}

export default function CreatePatient() {
  const navigate = useNavigate();
  const [entryType, setEntryType] = useState<"new" | "transfer">("new");
  const [transferDate, setTransferDate] = useState("");
  const [transferCenter, setTransferCenter] = useState("");
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [nrcPrefix, setNrcPrefix] = useState<string>("");
  const [nrcTownship, setNrcTownship] = useState<string>("");
  const [nrcType, setNrcType] = useState<string>("");
  const [nrcNumber, setNrcNumber] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [convertedHeight, setConvertedHeight] = useState<string | null>(null);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
    setAge(calculateAge(e.target.value));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
    setDob(calculateDOBFromAge(e.target.value));
  };

  const handleNrcPrefixChange = (val: string) => setNrcPrefix(String(val));
  const handleNrcTownshipChange = (val: string) => setNrcTownship(String(val));
  const handleNrcTypeChange = (val: string) => setNrcType(String(val));

  const nrcFinal =
    nrcPrefix && nrcTownship && nrcType && nrcNumber
      ? `${nrcPrefix}/${nrcTownship}(${nrcType})${nrcNumber}`
      : "";

  const transferCenters = [
    { value: "", label: "Select center" },
    { value: "center1", label: "Center 1" },
    { value: "center2", label: "Center 2" },
    { value: "center3", label: "Center 3" },
  ];

  const toggleDrug = (id: string, checked: boolean) => {
    setSelectedDrugs((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleMainBlur = () => setNrcNumber(nrcNumber.padStart(6, "0"));

  // Before rendering (inside the component)
  const nrcPrefixValue = typeof nrcPrefix === 'string' ? nrcPrefix : (Array.isArray(nrcPrefix) ? nrcPrefix[0] ?? '' : '');
  const nrcTownshipValue = typeof nrcTownship === 'string' ? nrcTownship : (Array.isArray(nrcTownship) ? nrcTownship[0] ?? '' : '');
  const nrcTypeValue = typeof nrcType === 'string' ? nrcType : (Array.isArray(nrcType) ? nrcType[0] ?? '' : '');

  const handleHeightConvert = () => {
    const feet = parseFloat(heightFeet) || 0;
    const inches = parseFloat(heightInches) || 0;
    const totalInches = feet * 12 + inches;
    const cm = totalInches * 2.54;
    setConvertedHeight(cm.toFixed(2));
  };

  const handleClick = () => {
    const href = '/home/patients/follow-up';
    navigate(href);
  }

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

        <Card className="shadow-xl rounded-2xl border-0 bg-white/90">
          <CardContent className="pt-0">
            {/* Card Header with blue gradient and icon */}
            <div className="rounded-t-2xl bg-gradient-to-r from-[#051463] via-blue-700 to-blue-400 px-8 py-6 flex items-center gap-3 mb-6 shadow-md">
              <UserPlus className="w-8 h-8 text-white drop-shadow" />
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Client Information</h2>
            </div>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                {/* General Info */}
                <InputGroup label={<span className="flex items-center gap-2"><IdCard className="w-4 h-4 text-[#051463]" />Client Id</span>} id="client-id" value="001/000001" readOnly />
                <InputGroup label={<span className="flex items-center gap-2"><IdCard className="w-4 h-4 text-[#051463]" />Old Client Id</span>} id="old-client-id" />
                <InputGroup label={<span className="flex items-center gap-2"><User className="w-4 h-4 text-[#051463]" />Client Name</span>} id="client-name" />
                <InputGroup label={<span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#051463]" />Registration Date</span>} id="register-date" type="date" />
                {/* Transfer In (conditional) */}
                {entryType === "transfer" && (
                  <>
                    <InputGroup
                      label={<span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#051463]" />Transfer In Date</span>}
                      id="transfer-date"
                      type="date"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                    />
                    <div className="flex flex-col gap-2">
                      <Label className="font-semibold text-base text-primary mb-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#051463]" />Transfer In Center
                      </Label>
                      <select
                        id="transfer-center"
                        className="w-full border rounded px-2 py-1 focus:ring-2 focus:ring-[#051463] transition"
                        value={transferCenter}
                        onChange={(e) => setTransferCenter(e.target.value)}
                      >
                        {transferCenters.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                {/* Gender */}
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-base text-primary mb-1 flex items-center gap-2"><User className="w-4 h-4 text-[#051463]" />Gender</Label>
                  <RadioGroup defaultValue="male" className="flex flex-row gap-4">
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
                {/* Select Fields */}
                {[['Race', races], ['Occupation', occupations], ['Education', educations], ['Marital Status', maritalStatuses], ['State/Region', states], ['Township', townships]].map(
                  ([label, options]) => (
                    <div key={label as string} className="flex flex-col gap-2">
                      <Label className="font-semibold text-base text-primary mb-1 flex items-center gap-2"><User className="w-4 h-4 text-[#051463]" />{label}</Label>
                      <Select>
                        <SelectTrigger className="w-full focus:ring-2 focus:ring-[#051463] transition"><SelectValue placeholder={`Select ${label}`} /></SelectTrigger>
                        <SelectContent>
                          {(options as string[]).map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )
                )}
                {/* Contact & Address */}
                <InputGroup label={<span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#051463]" />Phone Number</span>} id="phone" type="tel" />
                <InputGroup label={<span className="flex items-center gap-2"><User className="w-4 h-4 text-[#051463]" />Father Name</span>} id="father-name" />
                <InputGroup label={<span className="flex items-center gap-2"><Home className="w-4 h-4 text-[#051463]" />Address No</span>} id="address-no" />
                <InputGroup label={<span className="flex items-center gap-2"><Home className="w-4 h-4 text-[#051463]" />Street</span>} id="street" />
                <InputGroup label={<span className="flex items-center gap-2"><Home className="w-4 h-4 text-[#051463]" />Wards</span>} id="wards" />
                {/* DOB + Age */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="flex flex-col flex-1 gap-2">
                      <Label className="font-semibold text-base text-primary mb-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-[#051463]" />Date of Birth</Label>
                      <Input type="date" value={dob} onChange={handleDobChange} />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                      <Label className="font-semibold text-base text-primary mb-1 flex items-center gap-2"><User className="w-4 h-4 text-[#051463]" />Age</Label>
                      <Input type="number" value={age} onChange={handleAgeChange} min={0} />
                    </div>
                  </div>
                </div>
                {/* Height Section */}
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
                      className="w-20"
                    />
                    <Input
                      id="height-inches"
                      type="number"
                      min={0}
                      max={11}
                      placeholder="Inches"
                      value={heightInches}
                      onChange={e => setHeightInches(e.target.value)}
                      className="w-20"
                    />
                    <Button
                      type="button"
                      onClick={handleHeightConvert}
                      className="px-4 py-2 rounded-md bg-gradient-to-r from-[#051463] via-blue-700 to-blue-400 text-white font-semibold shadow transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#051463]"
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
              {/* NRC Block, Height Converter, and Client History Section can be styled similarly if desired */}
              {/* NRC Block */}
              <div className="flex flex-col gap-2 mt-4">
                <Label className="font-semibold text-base text-primary mb-1 flex items-center gap-2"><IdCard className="w-4 h-4 text-[#051463]" />NRC</Label>
                <div className="flex flex-wrap gap-2 items-center">
                  <Select value={nrcPrefixValue} onValueChange={handleNrcPrefixChange}>
                    <SelectTrigger className="w-full max-w-[110px]"><SelectValue placeholder="1-14" /></SelectTrigger>
                    <SelectContent>
                      {nrcPrefixes.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={nrcTownshipValue} onValueChange={handleNrcTownshipChange}>
                    <SelectTrigger className="w-full max-w-[110px]"><SelectValue placeholder="Township" /></SelectTrigger>
                    <SelectContent>
                      {nrcTownships.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={nrcTypeValue} onValueChange={handleNrcTypeChange}>
                    <SelectTrigger className="w-full max-w-[110px]"><SelectValue placeholder="N/E" /></SelectTrigger>
                    <SelectContent>
                      {nrcTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input
                    className="w-full max-w-[110px]"
                    value={nrcNumber}
                    onChange={e => setNrcNumber(e.target.value)}
                    onBlur={handleMainBlur}
                    maxLength={6}
                  />
                  <Input readOnly value={nrcFinal} className="w-full max-w-[180px]" />
                </div>
              </div>


              {/* ✅ Client History Section here */}
              <div className="md:col-span-2 lg:col-span-3">
                <Card className="mt-4 shadow-lg rounded-2xl border-0 bg-white/95">
                  {/* Client History Header with blue accent and icon */}
                  <div className="flex items-center gap-3 px-8 py-4 rounded-t-2xl bg-gradient-to-r from-[#051463] via-blue-700 to-blue-400 mb-4 shadow">
                    <User className="w-6 h-6 text-white drop-shadow" />
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Client History</h2>
                  </div>
                  <CardContent className="pt-0 pb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputGroup label={<span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#051463]" />Age of First Drug Used</span>} id="first-drug-age" type="number" />
                      <div>
                        <Label className="flex items-center gap-2 font-semibold text-base text-primary mb-1"><User className="w-4 h-4 text-[#051463]" />Ever shared needle and syringe with anyone?</Label>
                        <RadioGroup defaultValue="no" className="flex gap-4 mt-1">
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
                        <RadioGroup defaultValue="no" className="flex gap-4 mt-1">
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
                            />
                            <Label htmlFor={`checkbox-${drug.id}`} className="text-sm">
                              {drug.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ✅ Submit Button at the end */}
              <div className="lg:col-span-3 md:col-span-2 flex justify-center lg:justify-end gap-4 pt-4 border-t mt-8 bg-blue-50 rounded-xl shadow-sm px-6 py-6">
                <Button
                  onClick={handleClick}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[#051463] via-blue-700 to-blue-400 text-white font-bold text-lg shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:from-blue-800 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-[#051463]"
                >
                  <UserPlus className="w-5 h-5 text-white" />
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )

}

// ✅ Reusable input field
function InputGroup({
  label,
  id,
  type = "text",
  value,
  onChange,
  readOnly = false,
}: {
  label: string | React.ReactNode;
  id: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="font-semibold text-base text-primary mb-1">
        {label}
      </Label>
      <Input id={id} type={type} value={value} onChange={onChange} readOnly={readOnly} />
    </div>
  );
}
