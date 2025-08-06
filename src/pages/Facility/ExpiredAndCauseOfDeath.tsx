import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

// Dummy data for EXPIRED STRATIFIED BY (Cause of Death)
const expiredStratifiedByCauseData = [
  { name: 'Sep 2024', 'Fatal Overdose': 2, 'Accident (Intoxicated)': 1, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'Oct 2024', 'Fatal Overdose': 1, 'Accident (Intoxicated)': 0, Other: 1, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'Nov 2024', 'Fatal Overdose': 0, 'Accident (Intoxicated)': 1, Other: 0, 'Drug Related HIV / AIDS Death': 1 },
  { name: 'Dec 2024', 'Fatal Overdose': 1, 'Accident (Intoxicated)': 0, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'Jan 2025', 'Fatal Overdose': 0, 'Accident (Intoxicated)': 0, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'Feb 2025', 'Fatal Overdose': 0, 'Accident (Intoxicated)': 0, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'Mar 2025', 'Fatal Overdose': 0, 'Accident (Intoxicated)': 0, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'Apr 2025', 'Fatal Overdose': 0, 'Accident (Intoxicated)': 0, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'May 2025', 'Fatal Overdose': 0, 'Accident (Intoxicated)': 0, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'Jun 2025', 'Fatal Overdose': 0, 'Accident (Intoxicated)': 0, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'Jul 2025', 'Fatal Overdose': 0, 'Accident (Intoxicated)': 0, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
  { name: 'Aug 2025', 'Fatal Overdose': 0, 'Accident (Intoxicated)': 0, Other: 0, 'Drug Related HIV / AIDS Death': 0 },
];

// Dummy data for EXPIRED STRATIFIED BY (Drug Type)
const expiredStratifiedByDrugData = [
  { name: 'Sep 2024', 'Heroin/Opium': 2, ATS: 1, Other: 0 },
  { name: 'Oct 2024', 'Heroin/Opium': 1, ATS: 0, Other: 1 },
  { name: 'Nov 2024', 'Heroin/Opium': 0, ATS: 1, Other: 1 },
  { name: 'Dec 2024', 'Heroin/Opium': 1, ATS: 0, Other: 0 },
  { name: 'Jan 2025', 'Heroin/Opium': 0, ATS: 0, Other: 0 },
  { name: 'Feb 2025', 'Heroin/Opium': 0, ATS: 0, Other: 0 },
  { name: 'Mar 2025', 'Heroin/Opium': 0, ATS: 0, Other: 0 },
  { name: 'Apr 2025', 'Heroin/Opium': 0, ATS: 0, Other: 0 },
  { name: 'May 2025', 'Heroin/Opium': 0, ATS: 0, Other: 0 },
  { name: 'Jun 2025', 'Heroin/Opium': 0, ATS: 0, Other: 0 },
  { name: 'Jul 2025', 'Heroin/Opium': 0, ATS: 0, Other: 0 },
  { name: 'Aug 2025', 'Heroin/Opium': 0, ATS: 0, Other: 0 },
];

const ExpiredAndCauseOfDeath = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('August');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Cause Of Dead</h1>
        </div>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          <span className="text-gray-500">|</span>
          <span className="text-gray-800 font-semibold">Cause Of Dead</span>
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
      <div className="grid grid-cols-1 gap-8">
        {/* EXPIRED STRATIFIED BY (Cause of Death) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">EXPIRED STRATIFIED BY</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={expiredStratifiedByCauseData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Expired Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} layout="horizontal" align="center" verticalAlign="bottom" />
                <Bar dataKey="Fatal Overdose" stackId="a" fill="#8884d8" name="Fatal Overdose" />
                <Bar dataKey="Accident (Intoxicated)" stackId="a" fill="#82ca9d" name="Accident (Intoxicated)" />
                <Bar dataKey="Other" stackId="a" fill="#ffc658" name="Other" />
                <Bar dataKey="Drug Related HIV / AIDS Death" stackId="a" fill="#d0ed57" name="Drug Related HIV / AIDS Death" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* EXPIRED STRATIFIED BY (Drug Type) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">EXPIRED STRATIFIED BY</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={expiredStratifiedByDrugData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Expired Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} layout="horizontal" align="center" verticalAlign="bottom" />
                <Bar dataKey="Heroin/Opium" stackId="a" fill="#8884d8" name="Heroin/Opium" />
                <Bar dataKey="ATS" stackId="a" fill="#82ca9d" name="ATS" />
                <Bar dataKey="Other" stackId="a" fill="#ffc658" name="Other" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpiredAndCauseOfDeath;
