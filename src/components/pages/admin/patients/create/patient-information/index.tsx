import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const items = [
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
  { id: "others", label: "Others" }
] as const;

const nrcPrefixes = Array.from({ length: 14 }, (_, i) => (i + 1).toString());
const nrcTownships = ["YGN", "MDY", "NPT", "BGO", "MGW", "Other"];
const nrcTypes = ["N", "E"];
const races = ["Bamar", "Shan", "Karen", "Rakhine", "Chinese", "Indian", "Other"];
const occupations = ["Farmer", "Teacher", "Doctor", "Engineer", "Student", "Other"];
const educations = ["None", "Primary", "Secondary", "High School", "Graduate", "Postgraduate"];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const states = ["Yangon", "Mandalay", "Naypyitaw", "Bago", "Magway", "Other"];
const townships = ["Ahlone", "Sanchaung", "Hlaing", "Kamayut", "Other"];

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

const ClientInformation = () => {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [nrcPrefix, setNrcPrefix] = useState("");
  const [nrcTownship, setNrcTownship] = useState("");
  const [nrcType, setNrcType] = useState("");
  const [nrcNumber, setNrcNumber] = useState("");
  const [height, setHeight] = useState("");
  const [convertedHeight, setConvertedHeight] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (id: string, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const nrcFinal = nrcPrefix && nrcTownship && nrcType && nrcNumber
    ? `${nrcPrefix}/${nrcTownship}(${nrcType})${nrcNumber}`
    : "";

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
    setAge(calculateAge(e.target.value));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
    setDob(calculateDOBFromAge(e.target.value));
  };

  const handleHeightConvert = () => {
    if (!height) return;
    const cm = parseFloat(height);
    if (isNaN(cm)) return;
    setConvertedHeight((cm / 2.54).toFixed(2) + " in");
  };

  const handleMainBlur = () => setNrcNumber(nrcNumber.padStart(6, "0"));

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Card>
        <CardContent className="pt-6">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* ClientID Row */}
           <div className="flex flex-col gap-2">
              <Label htmlFor="client-id-prefix">
                Client Id:
              </Label>
              <Input
                id="client-id-number"
                className=""
                readOnly
                value={"001/000001"}
              />
            </div>
            {/* Old Client ID Row */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="old-Client-id">Old Client Id</Label>
              <Input id="old-Client-id" />
            </div>
            {/* Client Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="Client-name">Client Name</Label>
              <Input id="Client-name" />
            </div>

            {/* DOB & Age */}
            <div className="flex flex-col gap-2">
              <Label>Date of Birth</Label>
              <Input type="date" value={dob} onChange={handleDobChange} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Age</Label>
              <Input type="number" value={age} onChange={handleAgeChange} min={0} />
            </div>

            {/* NRC Block */}
            <div className="md:col-span-2 space-y-2">
              <Label>NRC</Label>
              <div className="flex gap-2 items-center">
                <Select value={nrcPrefix} onValueChange={setNrcPrefix}>
                  <SelectTrigger className="w-full max-w-[110px]"><SelectValue placeholder="1-14" /></SelectTrigger>
                  <SelectContent>
                    {nrcPrefixes.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={nrcTownship} onValueChange={setNrcTownship}>
                  <SelectTrigger className="w-full max-w-[110px]"><SelectValue placeholder="Township" /></SelectTrigger>
                  <SelectContent>
                    {nrcTownships.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={nrcType} onValueChange={setNrcType}>
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

            {/* Gender, Register Date */}
            <div className="flex flex-col gap-2">
              <Label>Gender</Label>
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="register-date">Registeration Date</Label>
              <Input type="date" id="register-date" />
            </div>

            {/* Select Fields */}
            {[["Race", races], ["Occupation", occupations], ["Education", educations], ["Marital Status", maritalStatuses], ["State/Region", states], ["Township", townships]].map(
              ([label, options]) => (
                <div key={label as string}  className="flex flex-col gap-2">
                  <Label>{label}</Label>
                  <Select>
                    <SelectTrigger className="w-full"><SelectValue placeholder={`Select ${(label as string).toLowerCase()}`} /></SelectTrigger>
                    <SelectContent>
                      {(options as string[]).map(opt => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )
            )}

            {/* Contact & Address */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="father-name">Father Name</Label>
              <Input id="father-name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="address-no">Address No</Label>
              <Input id="address-no" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="street">Street</Label>
              <Input id="street" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="wards">Wards</Label>
              <Input id="wards" />
            </div>

            {/* Height Converter */}
            <div className="flex gap-2 items-end md:col-span-2">
              <div className="flex flex-col flex-1">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" value={height} onChange={e => setHeight(e.target.value)} />
              </div>
              <Button type="button" onClick={handleHeightConvert}>Convert</Button>
              {convertedHeight && (
                <Input value={convertedHeight} readOnly className="w-28" />
              )}
            </div>

            {/* Drug Use Section */}
            <Label>Client History</Label>
            <div className="md:col-span-2 space-y-6 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="first-drug-age">Age of First Drug Used</Label>
                  <Input id="first-drug-age" type="number" />
                </div>

                <div>
                  <Label>Ever shared needle and syringe with anyone?</Label>
                  <RadioGroup defaultValue="no" className="flex gap-4">
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

                <div className="flex flex-col gap-2">
                  <Label>Ever overdosed?</Label>
                  <RadioGroup defaultValue="no" className="flex gap-4">
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

              {/* Drugs Used */}
              <div className="flex flex-col gap-2">
                <Label>Types of drugs used:</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`checkbox-${item.id}`}
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => toggleItem(item.id, Boolean(checked))}
                      />
                      <Label htmlFor={`checkbox-${item.id}`} className="text-sm">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 md:col-span-2 flex justify-end gap-4 pt-4 border-t mt-8">
              <Button type="reset" variant="outline">Reset</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientInformation;
