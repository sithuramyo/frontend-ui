import { useState } from "react";
import ClientInformation from "./patient-information";
import DrugHistory from "./drug-history";
import RiskBehaviour from "./risk-behaviour";
import CurrentMedicalHistory from "./current-medical-history";
import VitalSign from "./vital-sign";
import LabInvestigation from "./lab-investigation";
import Treatment from "./treatment";
import OutcomeList from "./outcome-list";
import BPNSideEffect from "./bpn-side-effect";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { key: "patient-info", label: "Client Information", component: <ClientInformation /> },
  { key: "drug-history", label: "Drug History", component: <DrugHistory /> },
  { key: "risk-behaviour", label: "Risk Behaviour", component: <RiskBehaviour /> },
  { key: "current-medical-history", label: "Client Medical History", component: <CurrentMedicalHistory /> },
  { key: "vital-sign", label: "Vital Sign", component: <VitalSign /> },
  { key: "lab-investigation", label: "Lab Investigation", component: <LabInvestigation /> },
  { key: "treatment", label: "Treatment", component: <Treatment /> },
  { key: "outcome-list", label: "Outcome", component: <OutcomeList /> },
  { key: "bpn-side-effect", label: "BPN Side Effect", component: <BPNSideEffect /> },
];

export default function CreatePatient() {
  const allKeys = menuItems.map(item => item.key);
  const [expanded, setExpanded] = useState<string[]>(allKeys);
  const allExpanded = expanded.length === allKeys.length;
  const [mode, setMode] = useState<'new' | 'follow'>('new');
  const [filter, setFilter] = useState({ userId: '', nrc: '', name: '' });
  const [searchResult, setSearchResult] = useState<any>(null); 
  const [searching, setSearching] = useState(false);

  const handleToggleAll = () => {
    setExpanded(allExpanded ? [] : allKeys);
  };

  // Simulate search (replace with real API call)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    // Simulate: if any field is filled, "find" a user
    if (filter.userId || filter.nrc || filter.name) {
      setTimeout(() => {
        setSearchResult({
          userId: filter.userId || '001/000001',
          nrc: filter.nrc || '12/YGN(N)123456',
          name: filter.name || 'John Doe',
        });
        setSearching(false);
      }, 700);
    } else {
      setSearchResult(null);
      setSearching(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary mb-1">Client Registration</h1>
        <p className="text-muted-foreground text-base mb-6 max-w-2xl">Register a new patient or find an existing patient for follow up. Please fill in all required information accurately.</p>
        <div className="flex flex-col gap-4 mb-4">
          <RadioGroup
            className="flex flex-row gap-8"
            value={mode}
            onValueChange={val => setMode(val as 'new' | 'follow')}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="new" id="new-register" />
              <Label htmlFor="new-register" className="text-base font-medium">New</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="follow" id="follow-up" />
              <Label htmlFor="follow-up" className="text-base font-medium">Transfer In</Label>
            </div>
          </RadioGroup>
        </div>
        <Separator className="mb-6" />
        {/* Filter Section for Follow Up */}
        {mode === 'follow' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Find Existing Patient</CardTitle>
              <CardDescription>Search by User ID, NRC, or Name. At least one field is required.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-wrap gap-4 items-end" onSubmit={handleSearch}>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="user-id">User ID</Label>
                  <Input
                    id="user-id"
                    value={filter.userId}
                    onChange={e => setFilter(f => ({ ...f, userId: e.target.value }))}
                    placeholder="001/000001"
                    className="w-40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="nrc">NRC</Label>
                  <Input
                    id="nrc"
                    value={filter.nrc}
                    onChange={e => setFilter(f => ({ ...f, nrc: e.target.value }))}
                    placeholder="12/YGN(N)123456"
                    className="w-48"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={filter.name}
                    onChange={e => setFilter(f => ({ ...f, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-40"
                  />
                </div>
                <Button type="submit" className="h-10 px-6" disabled={searching} variant="default">
                  {searching ? 'Searching...' : 'Search'}
                </Button>
              </form>
              {searchResult && (
                <div className="mt-2 text-green-700 text-sm">
                  Found: <span className="font-semibold">{searchResult.userId}</span> / <span>{searchResult.nrc}</span> / <span>{searchResult.name}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      {/* Sticky Expand/Collapse All Button */}
      <div className="sticky top-16 z-20 w-full bg-muted/50 border-b">
        <div className="w-full max-w-7xl mx-auto flex justify-end px-4 py-2">
          <Button
            type="button"
            onClick={handleToggleAll}
            className="px-4 py-2 rounded-full transition"
            disabled={mode === 'follow' && !searchResult}
            variant="outline"
          >
            {allExpanded ? "Collapse All" : "Expand All"}
          </Button>
        </div>
      </div>
      {/* Accordion Form Content */}
      {(mode === 'new' || (mode === 'follow' && searchResult)) && (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 pb-10">
          <Accordion type="multiple" value={expanded} onValueChange={setExpanded} className="w-full">
            {menuItems.map((item, idx) => (
              <AccordionItem value={item.key} key={item.key}>
                <Card className="mb-6">
                  <AccordionTrigger className="text-lg font-semibold px-6 py-4 hover:bg-accent/40 focus:bg-accent/50 transition rounded-t-xl">
                    <span className="text-primary/80 mr-2">{idx + 1}.</span> {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0">
                    <CardContent className="pt-0 pb-6">{item.component}</CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
