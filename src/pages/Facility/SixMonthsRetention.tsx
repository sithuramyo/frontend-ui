import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';

// Dummy data for Retention chart
const retentionData = [
  { name: 'Sep 2024', 'New Client 6 Months Ago': 32, Retention: 65, '6 Months Retention': 20 },
  { name: 'Oct 2024', 'New Client 6 Months Ago': 13, Retention: 68, '6 Months Retention': 9 },
  { name: 'Nov 2024', 'New Client 6 Months Ago': 13, Retention: 48, '6 Months Retention': 7 },
  { name: 'Dec 2024', 'New Client 6 Months Ago': 20, Retention: 80, '6 Months Retention': 16 },
  { name: 'Jan 2025', 'New Client 6 Months Ago': 24, Retention: 65, '6 Months Retention': 18 },
  { name: 'Feb 2025', 'New Client 6 Months Ago': 19, Retention: 95, '6 Months Retention': 19 },
  { name: 'Mar 2025', 'New Client 6 Months Ago': 13, Retention: 100, '6 Months Retention': 13 },
  { name: 'Apr 2025', 'New Client 6 Months Ago': 7, Retention: 90, '6 Months Retention': 3 },
  { name: 'May 2025', 'New Client 6 Months Ago': 13, Retention: 100, '6 Months Retention': 13 },
  { name: 'Jun 2025', 'New Client 6 Months Ago': 0, Retention: 0, '6 Months Retention': 0 },
  { name: 'Jul 2025', 'New Client 6 Months Ago': 0, Retention: 0, '6 Months Retention': 0 },
  { name: 'Aug 2025', 'New Client 6 Months Ago': 0, Retention: 0, '6 Months Retention': 0 },
];


const SixMonthsRetention = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('August');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Retention</h1>
        </div>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          <span className="text-gray-500">|</span>
          <span className="text-gray-800 font-semibold">Retention</span>
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
        {/* Retention Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                data={retentionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'New Client 6 Months Ago', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Retention', angle: 90, position: 'insideRight', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="New Client 6 Months Ago" fill="#60A5FA" name="New Client 6 Months Ago" radius={[4, 4, 0, 0]} />
                <Bar dataKey="6 Months Retention" fill="#82ca9d" name="6 Months Retention" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="Retention" stroke="#FF8C00" name="Retention" yAxisId="right" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SixMonthsRetention;
