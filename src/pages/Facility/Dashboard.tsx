import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming these are available from shadcn/ui
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming these are available from shadcn/ui
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Pill, LineChart, Worm, CalendarCheck, Skull } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Dummy data for the "DRUG TREATMENT (NEW)" chart
const newTreatmentData = [
  { name: 'Sep 2024', MMT: 4, Buprenorphin: 5, Detox: 2, Symptomatic: 1 },
  { name: 'Oct 2024', MMT: 8, Buprenorphin: 4, Detox: 0, Symptomatic: 0 },
  { name: 'Nov 2024', MMT: 6, Buprenorphin: 8, Detox: 0, Symptomatic: 0 },
  { name: 'Dec 2024', MMT: 1, Buprenorphin: 0, Detox: 0, Symptomatic: 0 },
  { name: 'Jan 2025', MMT: 0, Buprenorphin: 0, Detox: 0, Symptomatic: 0 },
  { name: 'Feb 2025', MMT: 0, Buprenorphin: 0, Detox: 0, Symptomatic: 0 },
  { name: 'Mar 2025', MMT: 0, Buprenorphin: 0, Detox: 0, Symptomatic: 0 },
  { name: 'Apr 2025', MMT: 0, Buprenorphin: 0, Detox: 0, Symptomatic: 0 },
  { name: 'May 2025', MMT: 0, Buprenorphin: 0, Detox: 0, Symptomatic: 0 },
  { name: 'Jun 2025', MMT: 0, Buprenorphin: 0, Detox: 0, Symptomatic: 0 },
  { name: 'Jul 2025', MMT: 0, Buprenorphin: 0, Detox: 0, Symptomatic: 0 },
  { name: 'Aug 2025', MMT: 0, Buprenorphin: 0, Detox: 0, Symptomatic: 0 },
];

// Dummy data for the "DRUG TREATMENT (ACTIVE)" chart
const activeTreatmentData = [
  { name: 'Sep 2024', MMT: 574, Buprenorphin: 51, Detox: 62, Symptomatic: 12 },
  { name: 'Oct 2024', MMT: 559, Buprenorphin: 50, Detox: 62, Symptomatic: 12 },
  { name: 'Nov 2024', MMT: 547, Buprenorphin: 58, Detox: 62, Symptomatic: 14 },
  { name: 'Dec 2024', MMT: 549, Buprenorphin: 58, Detox: 62, Symptomatic: 12 },
  { name: 'Jan 2025', MMT: 549, Buprenorphin: 58, Detox: 62, Symptomatic: 12 },
  { name: 'Feb 2025', MMT: 549, Buprenorphin: 58, Detox: 62, Symptomatic: 12 },
  { name: 'Mar 2025', MMT: 549, Buprenorphin: 58, Detox: 62, Symptomatic: 12 },
  { name: 'Apr 2025', MMT: 549, Buprenorphin: 58, Detox: 62, Symptomatic: 12 },
  { name: 'May 2025', MMT: 549, Buprenorphin: 58, Detox: 62, Symptomatic: 12 },
  { name: 'Jun 2025', MMT: 549, Buprenorphin: 58, Detox: 62, Symptomatic: 12 },
  { name: 'Jul 2025', MMT: 549, Buprenorphin: 58, Detox: 62, Symptomatic: 12 },
  { name: 'Aug 2025', MMT: 549, Buprenorphin: 58, Detox: 62, Symptomatic: 12 },
];

const cardData = [
  { title: 'Drug Treatment', value: '123', icon: Pill, path: "/drugs-treatment" },
  { title: 'MMT-ART Cascade', value: '45', icon: LineChart, path: "/mmt-art-cascade" },
  { title: 'B-C Co-Infection', value: '7', icon: Worm, path: "/b-c-co-infection" },
  { title: 'Six Months Retention', value: '90%', icon: CalendarCheck, path: "/six-months-retention" },
  { title: 'Expired and Cause of Death', value: '2', icon: Skull, path: "/expired-and-cause-of-death" },
];

const FacilityDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('August');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Local Facility</h1>
          <p className="text-sm text-gray-600">Welcome to Drug Treatment Information System</p>
        </div>
      </div>

      {/* Top Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cardData.map((card, index) => (
          // Wrap the Card with Link for navigation
          <Link key={index} to={card.path} className="block no-underline">
            <Card className="rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">{card.title}</CardTitle>
                {card.icon && <card.icon className="h-5 w-5 text-gray-500" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="month-select" className="text-sm font-medium text-gray-700">Month</label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger id="month-select" className="w-[180px] rounded-md shadow-sm">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent className="rounded-md shadow-lg">
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="text-sm font-medium text-gray-700">Year</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger id="year-select" className="w-[120px] rounded-md shadow-sm">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="rounded-md shadow-lg">
              {['2023', '2024', '2025', '2026'].map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* DRUG TREATMENT (NEW) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">DRUG TREATMENT (NEW)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={newTreatmentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total New Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="MMT" stackId="a" fill="#60A5FA" name="MMT" radius={[4, 4, 0, 0]} /> {/* Blue */}
                <Bar dataKey="Buprenorphin" stackId="a" fill="#3B82F6" name="Buprenorphin" radius={[4, 4, 0, 0]} /> {/* Darker Blue */}
                <Bar dataKey="Detox" stackId="a" fill="#FBBF24" name="Detox" radius={[4, 4, 0, 0]} /> {/* Yellow */}
                <Bar dataKey="Symptomatic" stackId="a" fill="#EF4444" name="Symptomatic" radius={[4, 4, 0, 0]} /> {/* Red */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* DRUG TREATMENT (ACTIVE) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">DRUG TREATMENT (ACTIVE)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={activeTreatmentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Active Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-600" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="MMT" stackId="b" fill="#60A5FA" name="MMT" radius={[4, 4, 0, 0]} /> {/* Blue */}
                <Bar dataKey="Buprenorphin" stackId="b" fill="#3B82F6" name="Buprenorphin" radius={[4, 4, 0, 0]} /> {/* Darker Blue */}
                <Bar dataKey="Detox" stackId="b" fill="#FBBF24" name="Detox" radius={[4, 4, 0, 0]} /> {/* Yellow */}
                <Bar dataKey="Symptomatic" stackId="b" fill="#EF4444" name="Symptomatic" radius={[4, 4, 0, 0]} /> {/* Red */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacilityDashboard;
