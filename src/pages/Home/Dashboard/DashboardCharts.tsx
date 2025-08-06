import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// --- Sample Data for the Charts ---
const barChartData = [
  { name: 'Jan', MMT: 4000, BPN: 2400 },
  { name: 'Feb', MMT: 3000, BPN: 1398 },
  { name: 'Mar', MMT: 2000, BPN: 3800 },
  { name: 'Apr', MMT: 2780, BPN: 3908 },
  { name: 'May', MMT: 1890, BPN: 4800 },
  { name: 'Jun', MMT: 2390, BPN: 3800 },
  { name: 'Jul', MMT: 3490, BPN: 4300 },
];

const DashboardCharts = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 ">
      {/* Stacked Bar Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Clients on OST</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Added stackId prop to create a stacked bar chart */}
              <Bar dataKey="MMT" fill="#8884d8" name="MMT" stackId="a" />
              <Bar dataKey="BPN" fill="#FFA500" name="BPN" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Stacked Bar Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>New Initiation</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Added stackId prop to create a stacked bar chart */}
              <Bar dataKey="MMT" fill="#8884d8" name="MMT" stackId="a" />
              <Bar dataKey="BPN" fill="#FFA500" name="BPN" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;