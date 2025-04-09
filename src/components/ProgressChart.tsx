import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useEffect, useState } from 'react';

type Workout = {
  id: number;
  date: string;
};

type Props = {
  workouts: Workout[];
};

export default function ProgressChart({ workouts }: Props): JSX.Element {
  const [data, setData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const counts: Record<string, number> = {};
    workouts.forEach((w) => {
      counts[w.date] = (counts[w.date] || 0) + 1;
    });

    const chartData = Object.entries(counts).map(([date, count]) => ({
      date,
      count,
    }));

    setData(chartData);
  }, [workouts]);

  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-md text-white">
      <h2 className="text-lg font-semibold mb-2">Workouts Per Day</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis allowDecimals={false} stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="count" fill="#4ade80" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}