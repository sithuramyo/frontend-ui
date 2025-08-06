import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { format, addMonths, subMonths, eachDayOfInterval, subDays, addDays, startOfMonth } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MonthlyCalendar } from "@/components/ui/month-timeline";
import { DatePicker } from "@/components/ui/date-picker";

// Type definition for patient data
interface PatientInfo {
    name: string;
    age: number;
    sex: string;
    nrc: string;
    fatherName: string;
    registrationDate: string;
    transferInDate: string;
}

// Updated type definition for treatment records to include 'count'
interface TreatmentRecord {
    [date: string]: {
        status: 'untreated' | 'treated' | 'double_treated' | 'missed' | 'take_home';
        reason?: string;
        count?: number; // Added count property
    };
}

const DailyOperation = () => {
    // Patient & Timeline State
    const [patientId, setPatientId] = useState("");
    const [patientFound, setPatientFound] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // New patientInfo state
    const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

    // Treatment & Modal State
    const [treatmentRecord, setTreatmentRecord] = useState<TreatmentRecord>({});
    const [treatModalOpen, setTreatModalOpen] = useState(false);
    const [takeHomeModalOpen, setTakeHomeModalOpen] = useState(false);
    const [reason, setReason] = useState("");

    // NEW STATE for Take Home Date Range
    const [takeHomeStartDate, setTakeHomeStartDate] = useState<Date | undefined>(new Date());
    const [takeHomeEndDate, setTakeHomeEndDate] = useState<Date | undefined>(addDays(new Date(), 1));

    // NEW STATE to manage patient's overall status
    const [patientStatus, setPatientStatus] = useState<'Active' | 'Treatment Interruption'>('Active');

    // NEW STATE for reactivation date
    const [reactivationDate, setReactivationDate] = useState<Date | null>(null);

    const isDispenserOn = false;
    const [nextAppointmentDate, setNextAppointmentDate] = useState<Date | undefined>(new Date());

    useEffect(() => {
        const today = new Date();
        const pastMonthsStart = startOfMonth(subMonths(today, 4));

        const pastDays = eachDayOfInterval({
            start: pastMonthsStart,
            end: subDays(today, 1)
        });

        const initialRecords: TreatmentRecord = {};
        pastDays.forEach(day => {
            initialRecords[format(day, 'yyyy-MM-dd')] = { status: 'missed' };
        });

        setTreatmentRecord(initialRecords);
    }, []);

    const handleSearch = () => {
        if (patientId.trim() !== "") {
            setPatientFound(true);
            setSelectedDate(new Date());
            setPatientStatus('Treatment Interruption'); // Example: Set to 'Treatment Interruption' on search for demonstration
            setReactivationDate(null); // Reset reactivation date on new search

            // Populate patientInfo with real data based on the search
            // In a real app, you'd fetch this data from an API
            setPatientInfo({
                name: "Aung Aung",
                age: 45,
                sex: "Male",
                nrc: "12/AABC(N)123456",
                fatherName: "U Ba",
                registrationDate: "2024-01-15",
                transferInDate: "2024-03-20"
            });
        }
    };

    // HANDLER to change status to Active and set the reactivation date
    const handleReactivate = () => {
        setPatientStatus('Active');
        setReactivationDate(new Date());
    };

    const handleCalendarClick = (date: Date) => {
        const dayString = format(date, 'yyyy-MM-dd');
        const currentRecord = treatmentRecord[dayString];

        if (currentRecord?.status === 'take_home') {
            setTreatmentRecord(prev => {
                const newCount = (currentRecord.count || 0) + 1;
                return {
                    ...prev,
                    [dayString]: {
                        ...currentRecord,
                        count: newCount,
                    },
                };
            });
        }
        setSelectedDate(date);
    };

    const handleTreat = () => {
        const dayString = format(selectedDate, 'yyyy-MM-dd');
        const currentStatus = treatmentRecord[dayString]?.status;

        if (currentStatus === 'treated') {
            setTreatModalOpen(true);
        } else {
            setTreatmentRecord(prev => ({
                ...prev,
                [dayString]: { status: 'treated' }
            }));
        }
    };

    const handleConfirmTreat = () => {
        const dayString = format(selectedDate, 'yyyy-MM-dd');
        setTreatmentRecord(prev => ({
            ...prev,
            [dayString]: { status: 'double_treated', reason }
        }));
        setReason("");
        setTreatModalOpen(false);
    };

    const handleConfirmTakeHome = () => {
        if (!takeHomeStartDate || !takeHomeEndDate) {
            return; // Exit if dates are not selected
        }

        const dateRange = eachDayOfInterval({
            start: takeHomeStartDate,
            end: takeHomeEndDate,
        });

        setTreatmentRecord(prev => {
            const newRecords = { ...prev };
            dateRange.forEach(day => {
                newRecords[format(day, 'yyyy-MM-dd')] = { status: 'take_home', count: 1 };
            });
            return newRecords;
        });

        setTakeHomeModalOpen(false);
    };

    const monthsToShow = [
        subMonths(new Date(), 4),
        subMonths(new Date(), 3),
        subMonths(new Date(), 2),
        subMonths(new Date(), 1),
        new Date(),
        addMonths(new Date(), 1),
    ];

    const legendItems = [
        { color: "bg-yellow-400", label: "Active not treated yet" },
        { color: "bg-red-500", label: "Absent" },
        { color: "bg-green-500", label: "Treated" },
        { color: "bg-green-500 relative after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-full after:h-[2px] after:bg-white after:-translate-y-1/2  after:rotate-45 ", label: "Daily more than one time" },
        { color: "bg-pink-500", label: "Takehome" },
        { color: "bg-pink-500 line-through relative after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-full after:h-[2px] after:bg-white after:-translate-y-1/2  after:rotate-45 ", label: "Takehome more than one time" },
        { color: "bg-gray-400", label: "Outcome" },
        { color: "bg-white line-through", label: "Inactive" },
    ];

    return (
        <div className="w-full max-w-9xl mx-auto p-6 flex items-center justify-center h-full col-span-3">
            <Card className="bg-blue-50">
                <CardContent className="pt-6 space-y-6">
                    <form className="space-y-8">
                        {/* Search Section */}
                        <section className="grid grid-cols-5 gap-4 w-full">
                            <div className="flex flex-col gap-1 col-span-1">
                                <Label>Client ID</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Search Client..."
                                        value={patientId}
                                        onChange={(e) => setPatientId(e.target.value)}
                                        className="bg-white"
                                    />
                                    <Button onClick={handleSearch} type="button">
                                        <Search className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="w-full col-span-4 ">
                                <Card className="w-full shadow-none p-2 bg-transparent">
                                    <CardContent className="w-full flex flex-wrap gap-x-6 gap-y-2 p-0">
                                        {legendItems.map((item, index) => (
                                            <div
                                                key={item.label}
                                                className={`flex items-center gap-2 ${index < 8 ? "w-[22%]" : "w-full"
                                                    }`}
                                            >
                                                <span
                                                    className={`w-4 h-4 rounded-full border border-muted ${item.color}`}
                                                ></span>
                                                <span className="text-sm">{item.label}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Timeline Section */}
                        {patientFound && (
                            <section className="flex gap-4">
                                {/* New User Info Box with real data */}
                                <Card className="p-4 bg-white shadow-md w-[25%] flex flex-col">
                                    <h3 className="font-semibold text-lg mb-4">User Info</h3>
                                    {patientInfo && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Name:</span>
                                                <span className="font-medium">{patientInfo.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Age:</span>
                                                <span className="font-medium">{patientInfo.age}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Sex:</span>
                                                <span className="font-medium">{patientInfo.sex}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">NRC:</span>
                                                <span className="font-medium">{patientInfo.nrc}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Father Name:</span>
                                                <span className="font-medium">{patientInfo.fatherName}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Registration Date:</span>
                                                <span className="font-medium">{patientInfo.registrationDate}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Transfer In Date:</span>
                                                <span className="font-medium">{patientInfo.transferInDate}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-end justify-end w-full">
                                        <Button className="bg-gray-500">Edit</Button>
                                    </div>
                                </Card>

                                {/* Calendar Section */}
                                <div className="space-y-4 flex-1">
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {monthsToShow.map((month) => (
                                            <MonthlyCalendar
                                                key={month.toISOString()}
                                                month={month}
                                                selectedDate={selectedDate}
                                                onDateClick={handleCalendarClick}
                                                treatmentRecord={treatmentRecord}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        <section>
                            <div className="flex items-center gap-4">
                                <Label>Dispenser Status:</Label>
                                <span className={`font-semibold ${isDispenserOn ? 'text-green-600' : 'text-red-600'}`}>
                                    {isDispenserOn ? 'ON' : 'OFF'}
                                </span>
                            </div>
                        </section>
                        {/* Counter and Dosage */}
                        <section className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-2">
                                <Label>Counter *</Label>
                                <Select>
                                    <SelectTrigger className="w-32 bg-white"><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Label>Batch No *</Label>
                                <Input className="w-32 bg-white" placeholder="00-00" />
                                <div className="flex items-center gap-2">
                                    <Label>Total</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white"><SelectValue placeholder="Stock Qty" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Label>Treatment Dosages *</Label>
                                <Input placeholder="Current Medicine" className="w-40 bg-white" />
                                <Input placeholder="Treatment Type" className="w-40 bg-white" />
                                <Input placeholder="Dosage" className="w-24 bg-white" />
                                <Input placeholder="Unit" className="w-20 bg-white" />
                                <Button variant="outline">Change Dose</Button>
                            </div>

                        </section>

                        {/* Status & Notes */}
                        <section className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <Label>Current Status</Label>
                                <Input className="w-full bg-white" value={patientStatus} readOnly />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Next Appointment</Label>
                                <DatePicker
                                    date={nextAppointmentDate}
                                    setDate={(date) => setNextAppointmentDate(date)}
                                    placeholder="Select date"
                                    className="w-full bg-white"
                                />
                            </div>
                        </section>

                        <div className="flex justify-between items-center">
                            <section className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="condom" />
                                    <Label htmlFor="condom">Condom</Label>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="urine-test" />
                                        <Label htmlFor="urine-test">Show Last Urine Test</Label>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Select onValueChange={handleReactivate} disabled={patientStatus !== 'Treatment Interruption'}>
                                        <SelectTrigger className="w-60 bg-white">
                                            <SelectValue placeholder="Action" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="reactivate">Reactivate</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {/* Conditionally display the reactivation date */}
                                    {patientStatus === 'Active' && reactivationDate && (
                                        <span className="text-sm font-medium text-gray-600">
                                            Reactivated: {format(reactivationDate, 'MM/dd/yyyy')}
                                        </span>
                                    )}
                                </div>
                            </section>
                            <div className="flex gap-4 justify-end pt-4 border-t mt-8">
                                <Button onClick={handleTreat} type="button" className="bg-green-600 hover:bg-green-700" disabled={patientStatus !== 'Active'}>Treat</Button>
                                <Button onClick={() => setTakeHomeModalOpen(true)} type="button" className="bg-pink-500 hover:bg-pink-600" disabled={patientStatus !== 'Active'}>TakeHome</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Treat Modal */}
            <Dialog open={treatModalOpen} onOpenChange={setTreatModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Treatment Already Given</DialogTitle>
                        <DialogDescription>
                            This patient has already received medicine for today. Please provide a reason to treat again.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Label htmlFor="reason">Reason for retreatment:</Label>
                        <Textarea id="reason" placeholder="Type your reason here..." value={reason} onChange={(e) => setReason(e.target.value)} />
                    </div>
                    <DialogFooter>
                        <Button onClick={handleConfirmTreat} disabled={!reason}>Confirm Treat</Button>
                        <Button variant="outline" onClick={() => setTreatModalOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* TakeHome Modal with Date Pickers */}
            <Dialog open={takeHomeModalOpen} onOpenChange={setTakeHomeModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Take Home Medicine</DialogTitle>
                        <DialogDescription>
                            Please specify the start and end dates for the take-home medicine.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 flex gap-4 items-center">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <DatePicker
                                date={takeHomeStartDate}
                                setDate={setTakeHomeStartDate}
                                placeholder="Select start date"
                                className="w-full bg-white"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="end-date">End Date</Label>
                            <DatePicker
                                date={takeHomeEndDate}
                                setDate={setTakeHomeEndDate}
                                placeholder="Select end date"
                                className="w-full bg-white"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleConfirmTakeHome}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DailyOperation;