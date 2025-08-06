import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

// Dummy data for NEW HIV PATIENT (INTERNAL)
const newHivInternalData = [
  { name: 'New', 'Total Patient': 17 },
  { name: 'Tested', 'Total Patient': 6 },
  { name: 'Known', 'Total Patient': 6 },
  { name: 'Positive', 'Total Patient': 0 },
  { name: 'ART', 'Total Patient': 0 },
];

// Dummy data for ACTIVE HIV PATIENT (INTERNAL)
const activeHivInternalData = [
  { name: 'Active', 'Total Patient': 725 },
  { name: 'Tested', 'Total Patient': 195 },
  { name: 'Known', 'Total Patient': 192 },
  { name: 'Positive', 'Total Patient': 62 },
  { name: 'ART', 'Total Patient': 25 },
];

// Dummy data for NEW HIV PATIENT (INTERNAL + EXTERNAL)
const newHivInternalExternalData = [
  { name: 'New Patient Tested', Internal: 6, External: 0 },
  { name: 'Known Result', Internal: 6, External: 0 },
  { name: 'Positive', Internal: 0, External: 0 },
  { name: 'ART Received', Internal: 0, External: 0 },
];

// Dummy data for ACTIVE HIV PATIENT (INTERNAL + EXTERNAL)
const activeHivInternalExternalData = [
  { name: 'Active Patient Tested', Internal: 195, External: 0 },
  { name: 'Known Result', Internal: 192, External: 0 },
  { name: 'Positive', Internal: 62, External: 3 },
  { name: 'ART Received', Internal: 25, External: 0 },
];

const MMTARTCascade = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('December');
  const [selectedYear, setSelectedYear] = useState<string>('2022');

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">MMT-ART</h1>
        </div>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          <span className="text-gray-500">|</span>
          <span className="text-gray-800 font-semibold">MMT-ART</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
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
              {['2022', '2023', '2024', '2025', '2026'].map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NEW HIV PATIENT (INTERNAL) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">NEW HIV PATIENT (INTERNAL)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={newHivInternalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="Total Patient" fill="#60A5FA" name="Total Patient" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ACTIVE HIV PATIENT (INTERNAL) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">ACTIVE HIV PATIENT (INTERNAL)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={activeHivInternalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="Total Patient" fill="#60A5FA" name="Total Patient" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* NEW HIV PATIENT (INTERNAL + EXTERNAL) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">NEW HIV PATIENT (INTERNAL + EXTERNAL)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={newHivInternalExternalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="Internal" stackId="a" fill="#60A5FA" name="Internal" radius={[4, 4, 0, 0]} />
                <Bar dataKey="External" stackId="a" fill="#3B82F6" name="External" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ACTIVE HIV PATIENT (INTERNAL + EXTERNAL) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">ACTIVE HIV PATIENT (INTERNAL + EXTERNAL)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={activeHivInternalExternalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="Internal" stackId="a" fill="#60A5FA" name="Internal" radius={[4, 4, 0, 0]} />
                <Bar dataKey="External" stackId="a" fill="#3B82F6" name="External" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MMTARTCascade;
