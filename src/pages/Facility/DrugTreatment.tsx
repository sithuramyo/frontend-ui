import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

// Dummy data for DRUG TREATMENT (NEW)
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

// Dummy data for PWUD/PWID (NEW)
const pwudPwidNewData = [
  { name: 'Sep 2024', PWUD: 4, PWID: 5, Unknown: 2 },
  { name: 'Oct 2024', PWUD: 8, PWID: 4, Unknown: 0 },
  { name: 'Nov 2024', PWUD: 11, PWID: 3, Unknown: 0 },
  { name: 'Dec 2024', PWUD: 1, PWID: 0, Unknown: 0 },
  { name: 'Jan 2025', PWUD: 0, PWID: 0, Unknown: 0 },
  { name: 'Feb 2025', PWUD: 0, PWID: 0, Unknown: 0 },
  { name: 'Mar 2025', PWUD: 0, PWID: 0, Unknown: 0 },
  { name: 'Apr 2025', PWUD: 0, PWID: 0, Unknown: 0 },
  { name: 'May 2025', PWUD: 0, PWID: 0, Unknown: 0 },
  { name: 'Jun 2025', PWUD: 0, PWID: 0, Unknown: 0 },
  { name: 'Jul 2025', PWUD: 0, PWID: 0, Unknown: 0 },
  { name: 'Aug 2025', PWUD: 0, PWID: 0, Unknown: 0 },
];

// Dummy data for CURRENT DRUG USE (NEW)
const currentDrugUseNewData = [
  { name: 'Sep 2024', Cannabis: 1, MethamphetaminePills: 10, Benzodiazepines: 1, OpioidHeroin: 1, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Oct 2024', Cannabis: 1, MethamphetaminePills: 8, Benzodiazepines: 1, OpioidHeroin: 1, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Nov 2024', Cannabis: 1, MethamphetaminePills: 12, Benzodiazepines: 1, OpioidHeroin: 1, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Dec 2024', Cannabis: 0, MethamphetaminePills: 1, Benzodiazepines: 0, OpioidHeroin: 0, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Jan 2025', Cannabis: 0, MethamphetaminePills: 0, Benzodiazepines: 0, OpioidHeroin: 0, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Feb 2025', Cannabis: 0, MethamphetaminePills: 0, Benzodiazepines: 0, OpioidHeroin: 0, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Mar 2025', Cannabis: 0, MethamphetaminePills: 0, Benzodiazepines: 0, OpioidHeroin: 0, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Apr 2025', Cannabis: 0, MethamphetaminePills: 0, Benzodiazepines: 0, OpioidHeroin: 0, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'May 2025', Cannabis: 0, MethamphetaminePills: 0, Benzodiazepines: 0, OpioidHeroin: 0, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Jun 2025', Cannabis: 0, MethamphetaminePills: 0, Benzodiazepines: 0, OpioidHeroin: 0, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Jul 2025', Cannabis: 0, MethamphetaminePills: 0, Benzodiazepines: 0, OpioidHeroin: 0, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Aug 2025', Cannabis: 0, MethamphetaminePills: 0, Benzodiazepines: 0, OpioidHeroin: 0, Crystals: 0, HallucinogensLSD: 0, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
];

// Dummy data for AGE GROUP (NEW)
const ageGroupNewData = [
  { name: 'Sep 2024', '<15': 1, '15-19': 2, '20-24': 3, '25-29': 3, '30-34': 2, '35-39': 1, '40-49': 1, '50-59': 1, '60 and above': 0 },
  { name: 'Oct 2024', '<15': 1, '15-19': 1, '20-24': 2, '25-29': 5, '30-34': 2, '35-39': 1, '40-49': 0, '50-59': 0, '60 and above': 0 },
  { name: 'Nov 2024', '<15': 1, '15-19': 2, '20-24': 1, '25-29': 4, '30-34': 2, '35-39': 1, '40-49': 1, '50-59': 1, '60 and above': 1 },
  { name: 'Dec 2024', '<15': 0, '15-19': 0, '20-24': 0, '25-29': 1, '30-34': 0, '35-39': 0, '40-49': 0, '50-59': 0, '60 and above': 0 },
  { name: 'Jan 2025', '<15': 0, '15-19': 0, '20-24': 0, '25-29': 0, '30-34': 0, '35-39': 0, '40-49': 0, '50-59': 0, '60 and above': 0 },
  { name: 'Feb 2025', '<15': 0, '15-19': 0, '20-24': 0, '25-29': 0, '30-34': 0, '35-39': 0, '40-49': 0, '50-59': 0, '60 and above': 0 },
  { name: 'Mar 2025', '<15': 0, '15-19': 0, '20-24': 0, '25-29': 0, '30-34': 0, '35-39': 0, '40-49': 0, '50-59': 0, '60 and above': 0 },
  { name: 'Apr 2025', '<15': 0, '15-19': 0, '20-24': 0, '25-29': 0, '30-34': 0, '35-39': 0, '40-49': 0, '50-59': 0, '60 and above': 0 },
  { name: 'May 2025', '<15': 0, '15-19': 0, '20-24': 0, '25-29': 0, '30-34': 0, '35-39': 0, '40-49': 0, '50-59': 0, '60 and above': 0 },
  { name: 'Jun 2025', '<15': 0, '15-19': 0, '20-24': 0, '25-29': 0, '30-34': 0, '35-39': 0, '40-49': 0, '50-59': 0, '60 and above': 0 },
  { name: 'Jul 2025', '<15': 0, '15-19': 0, '20-24': 0, '25-29': 0, '30-34': 0, '35-39': 0, '40-49': 0, '50-59': 0, '60 and above': 0 },
  { name: 'Aug 2025', '<15': 0, '15-19': 0, '20-24': 0, '25-29': 0, '30-34': 0, '35-39': 0, '40-49': 0, '50-59': 0, '60 and above': 0 },
];

// Dummy data for DRUG TREATMENT (ACTIVE)
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

// Dummy data for PWUD/PWID (ACTIVE)
const pwudPwidActiveData = [
  { name: 'Sep 2024', PWUD: 524, PWID: 176, Unknown: 9 },
  { name: 'Oct 2024', PWUD: 510, PWID: 176, Unknown: 7 },
  { name: 'Nov 2024', PWUD: 509, PWID: 176, Unknown: 3 },
  { name: 'Dec 2024', PWUD: 511, PWID: 176, Unknown: 3 },
  { name: 'Jan 2025', PWUD: 511, PWID: 176, Unknown: 3 },
  { name: 'Feb 2025', PWUD: 511, PWID: 176, Unknown: 3 },
  { name: 'Mar 2025', PWUD: 511, PWID: 176, Unknown: 3 },
  { name: 'Apr 2025', PWUD: 511, PWID: 176, Unknown: 3 },
  { name: 'May 2025', PWUD: 511, PWID: 176, Unknown: 3 },
  { name: 'Jun 2025', PWUD: 511, PWID: 176, Unknown: 3 },
  { name: 'Jul 2025', PWUD: 511, PWID: 176, Unknown: 3 },
  { name: 'Aug 2025', PWUD: 511, PWID: 176, Unknown: 3 },
];

// Dummy data for CURRENT DRUG USE (ACTIVE)
const currentDrugUseActiveData = [
  { name: 'Sep 2024', Cannabis: 70, MethamphetaminePills: 197, Benzodiazepines: 129, OpioidHeroin: 187, Crystals: 89, HallucinogensLSD: 27, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Oct 2024', Cannabis: 66, MethamphetaminePills: 191, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 88, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Nov 2024', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Dec 2024', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Jan 2025', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Feb 2025', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Mar 2025', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Apr 2025', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'May 2025', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Jun 2025', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Jul 2025', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
  { name: 'Aug 2025', Cannabis: 66, MethamphetaminePills: 192, Benzodiazepines: 133, OpioidHeroin: 179, Crystals: 89, HallucinogensLSD: 30, Ecstasy: 0, SolventsAndInhalants: 0, Unknown: 0, Others: 0 },
];

// Dummy data for AGE GROUP (ACTIVE)
const ageGroupActiveData = [
  { name: 'Sep 2024', '<15': 70, '15-19': 66, '20-24': 197, '25-29': 129, '30-34': 187, '35-39': 89, '40-49': 27, '50-59': 0, '60 and above': 0 },
  { name: 'Oct 2024', '<15': 66, '15-19': 66, '20-24': 191, '25-29': 133, '30-34': 179, '35-39': 88, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'Nov 2024', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'Dec 2024', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'Jan 2025', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'Feb 2025', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'Mar 2025', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'Apr 2025', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'May 2025', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'Jun 2025', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'Jul 2025', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
  { name: 'Aug 2025', '<15': 66, '15-19': 66, '20-24': 192, '25-29': 133, '30-34': 179, '35-39': 89, '40-49': 30, '50-59': 0, '60 and above': 0 },
];

// Dummy data for ATTENDENCE (OST METHADONE)
const attendanceData = [
  { name: 'Sep 2024', Daily: 455, TakeHome: 91, Absent: 18 },
  { name: 'Oct 2024', Daily: 530, TakeHome: 18, Absent: 12 },
  { name: 'Nov 2024', Daily: 455, TakeHome: 86, Absent: 17 },
  { name: 'Dec 2024', Daily: 549, TakeHome: 0, Absent: 0 },
  { name: 'Jan 2025', Daily: 549, TakeHome: 0, Absent: 0 },
  { name: 'Feb 2025', Daily: 549, TakeHome: 0, Absent: 0 },
  { name: 'Mar 2025', Daily: 549, TakeHome: 0, Absent: 0 },
  { name: 'Apr 2025', Daily: 549, TakeHome: 0, Absent: 0 },
  { name: 'May 2025', Daily: 549, TakeHome: 0, Absent: 0 },
  { name: 'Jun 2025', Daily: 549, TakeHome: 0, Absent: 0 },
  { name: 'Jul 2025', Daily: 549, TakeHome: 0, Absent: 0 },
  { name: 'Aug 2025', Daily: 549, TakeHome: 0, Absent: 0 },
];

const DrugTreatment = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('August');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Drug Treatment</h1>
        </div>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          <span className="text-gray-500">|</span>
          <span className="text-gray-800 font-semibold">Drug Treatment</span>
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
                <Bar dataKey="MMT" stackId="a" fill="#60A5FA" name="MMT" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Buprenorphin" stackId="a" fill="#3B82F6" name="Buprenorphin" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Detox" stackId="a" fill="#FBBF24" name="Detox" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Symptomatic" stackId="a" fill="#EF4444" name="Symptomatic" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* PWUD/PWID (NEW) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">PWUD/PWID (NEW)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={pwudPwidNewData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total New Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="PWUD" stackId="a" fill="#60A5FA" name="PWUD" radius={[4, 4, 0, 0]} />
                <Bar dataKey="PWID" stackId="a" fill="#3B82F6" name="PWID" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Unknown" stackId="a" fill="#FBBF24" name="Unknown" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CURRENT DRUG USE (NEW) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">CURRENT DRUG USE (NEW)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={currentDrugUseNewData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total New Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} layout="vertical" align="right" verticalAlign="middle" />
                <Bar dataKey="Cannabis" stackId="a" fill="#8884d8" name="Cannabis" />
                <Bar dataKey="MethamphetaminePills" stackId="a" fill="#82ca9d" name="Methamphetamine Pills" />
                <Bar dataKey="Benzodiazepines" stackId="a" fill="#ffc658" name="Benzodiazepines" />
                <Bar dataKey="OpioidHeroin" stackId="a" fill="#d0ed57" name="Opioid (Heroin)" />
                <Bar dataKey="Crystals" stackId="a" fill="#a4de6c" name="Crystals" />
                <Bar dataKey="HallucinogensLSD" stackId="a" fill="#d0a4de" name="Hallucinogens (LSD)" />
                <Bar dataKey="Ecstasy" stackId="a" fill="#de8a8a" name="Ecstasy" />
                <Bar dataKey="SolventsAndInhalants" stackId="a" fill="#8d6d9d" name="Solvents and Inhalants" />
                <Bar dataKey="Unknown" stackId="a" fill="#5a5255" name="Unknown" />
                <Bar dataKey="Others" stackId="a" fill="#e2e2e2" name="Others" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AGE GROUP (NEW) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">AGE GROUP (NEW)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={ageGroupNewData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total New Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} layout="vertical" align="right" verticalAlign="middle" />
                <Bar dataKey="<15" stackId="a" fill="#8884d8" name="< 15" />
                <Bar dataKey="15-19" stackId="a" fill="#82ca9d" name="15-19" />
                <Bar dataKey="20-24" stackId="a" fill="#ffc658" name="20-24" />
                <Bar dataKey="25-29" stackId="a" fill="#d0ed57" name="25-29" />
                <Bar dataKey="30-34" stackId="a" fill="#a4de6c" name="30-34" />
                <Bar dataKey="35-39" stackId="a" fill="#d0a4de" name="35-39" />
                <Bar dataKey="40-49" stackId="a" fill="#de8a8a" name="40-49" />
                <Bar dataKey="50-59" stackId="a" fill="#8d6d9d" name="50-59" />
                <Bar dataKey="60 and above" stackId="a" fill="#5a5255" name="60 and above" />
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
                <Bar dataKey="MMT" stackId="b" fill="#60A5FA" name="MMT" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Buprenorphin" stackId="b" fill="#3B82F6" name="Buprenorphin" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Detox" stackId="b" fill="#FBBF24" name="Detox" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Symptomatic" stackId="b" fill="#EF4444" name="Symptomatic" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* PWUD/PWID (ACTIVE) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">PWUD/PWID (ACTIVE)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={pwudPwidActiveData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Active Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="PWUD" stackId="a" fill="#60A5FA" name="PWUD" radius={[4, 4, 0, 0]} />
                <Bar dataKey="PWID" stackId="a" fill="#3B82F6" name="PWID" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Unknown" stackId="a" fill="#FBBF24" name="Unknown" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CURRENT DRUG USE (ACTIVE) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">CURRENT DRUG USE (ACTIVE)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={currentDrugUseActiveData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Active Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} layout="vertical" align="right" verticalAlign="middle" />
                <Bar dataKey="Cannabis" stackId="a" fill="#8884d8" name="Cannabis" />
                <Bar dataKey="MethamphetaminePills" stackId="a" fill="#82ca9d" name="Methamphetamine Pills" />
                <Bar dataKey="Benzodiazepines" stackId="a" fill="#ffc658" name="Benzodiazepines" />
                <Bar dataKey="OpioidHeroin" stackId="a" fill="#d0ed57" name="Opioid (Heroin)" />
                <Bar dataKey="Crystals" stackId="a" fill="#a4de6c" name="Crystals" />
                <Bar dataKey="HallucinogensLSD" stackId="a" fill="#d0a4de" name="Hallucinogens (LSD)" />
                <Bar dataKey="Ecstasy" stackId="a" fill="#de8a8a" name="Ecstasy" />
                <Bar dataKey="SolventsAndInhalants" stackId="a" fill="#8d6d9d" name="Solvents and Inhalants" />
                <Bar dataKey="Unknown" stackId="a" fill="#5a5255" name="Unknown" />
                <Bar dataKey="Others" stackId="a" fill="#e2e2e2" name="Others" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AGE GROUP (ACTIVE) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">AGE GROUP (ACTIVE)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={ageGroupActiveData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Active Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} layout="vertical" align="right" verticalAlign="middle" />
                <Bar dataKey="<15" stackId="a" fill="#8884d8" name="< 15" />
                <Bar dataKey="15-19" stackId="a" fill="#82ca9d" name="15-19" />
                <Bar dataKey="20-24" stackId="a" fill="#ffc658" name="20-24" />
                <Bar dataKey="25-29" stackId="a" fill="#d0ed57" name="25-29" />
                <Bar dataKey="30-34" stackId="a" fill="#a4de6c" name="30-34" />
                <Bar dataKey="35-39" stackId="a" fill="#d0a4de" name="35-39" />
                <Bar dataKey="40-49" stackId="a" fill="#de8a8a" name="40-49" />
                <Bar dataKey="50-59" stackId="a" fill="#8d6d9d" name="50-59" />
                <Bar dataKey="60 and above" stackId="a" fill="#5a5255" name="60 and above" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ATTENDENCE (OST METHADONE) Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">ATTENDENCE (OST METHADONE)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={attendanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" className="text-xs text-gray-600" />
                <YAxis label={{ value: 'Total Active Patient', angle: -90, position: 'insideLeft', offset: -10, className: 'text-sm text-gray-700' }} className="text-xs text-gray-700" />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="Daily" stackId="a" fill="#60A5FA" name="Daily" />
                <Bar dataKey="TakeHome" stackId="a" fill="#3B82F6" name="Take Home" />
                <Bar dataKey="Absent" stackId="a" fill="#EF4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Placeholder for "No data to display" card if needed */}
        <Card className="rounded-lg shadow-sm flex items-center justify-center p-4">
          <CardContent className="text-center text-gray-500">
            - There is no data to display !
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DrugTreatment;
