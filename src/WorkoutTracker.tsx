import { useEffect, useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';

type Workout = {
    id: number;
    name: string;
    reps: string;
    sets: string;
    date: string;
};

export default function WorkoutTracker() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [newWorkout, setNewWorkout] = useState<Omit<Workout, 'id'>>({
        name: '',
        reps: '',
        sets: '',
        date: '',
    });

    useEffect(() => {
        const saved = localStorage.getItem('workouts');
        if (saved) setWorkouts(JSON.parse(saved));
        document.documentElement.classList.add('dark');
    }, []);

    const addWorkout = () => {
        if (!newWorkout.name || !newWorkout.reps || !newWorkout.sets || !newWorkout.date) return;
        const workout: Workout = {
            ...newWorkout,
            id: Date.now(),
        };
        const updated = [...workouts, workout];
        setWorkouts(updated);
        localStorage.setItem('workouts', JSON.stringify(updated));
        setNewWorkout({ name: '', reps: '', sets: '', date: '' });
    };

    const deleteWorkout = (id: number) => {
        const updated = workouts.filter(w => w.id !== id);
        setWorkouts(updated);
        localStorage.setItem('workouts', JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-[#0d0d11] text-white px-4 py-6 font-sans transition-all">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">🏋️ My Tracker</h1>
                </div>

                {/* Chart */}
                <div className="bg-[#1a1a1f] rounded-2xl p-6 shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Workout Progress</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart
                            data={[...workouts]
                                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                .map((w, i) => ({
                                    date: format(new Date(w.date), 'MMM dd'),
                                    count: i + 1,
                                }))
                            }
                        >
                            <defs>
                                <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#aaa" />
                            <YAxis stroke="#aaa" allowDecimals={false} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#workoutGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Workout Input */}
                <div className="bg-[#1a1a1f] rounded-2xl p-6 shadow-lg space-y-4">
                    <h2 className="text-xl font-semibold mb-2">New Workout</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="bg-[#2a2a31] text-white p-3 rounded-lg placeholder-gray-400"
                            placeholder="Workout Name"
                            value={newWorkout.name}
                            onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                        />
                        <input
                            className="bg-[#2a2a31] text-white p-3 rounded-lg placeholder-gray-400"
                            placeholder="Reps"
                            value={newWorkout.reps}
                            onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
                        />
                        <input
                            className="bg-[#2a2a31] text-white p-3 rounded-lg placeholder-gray-400"
                            placeholder="Sets"
                            value={newWorkout.sets}
                            onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
                        />
                        <input
                            type="date"
                            className="bg-[#2a2a31] text-white p-3 rounded-lg"
                            value={newWorkout.date}
                            onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
                        />
                    </div>
                    <button
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                        onClick={addWorkout}
                    >
                        ➕ Add Workout
                    </button>
                </div>

                {/* Workout Log */}
                <div className="space-y-4">
                    {workouts.length > 0 ? (
                        workouts.map((w) => (
                            <div
                                key={w.id}
                                className="bg-[#1a1a1f] rounded-xl p-5 shadow-md flex justify-between items-start"
                            >
                                <div>
                                    <div className="text-lg font-semibold">{w.name}</div>
                                    <div className="text-sm text-gray-400">Reps: {w.reps} | Sets: {w.sets}</div>
                                    <div className="text-xs text-gray-500 mt-1">📅 {w.date}</div>
                                </div>
                                <button
                                    className="text-red-500 text-sm hover:underline"
                                    onClick={() => deleteWorkout(w.id)}
                                >
                                    ✖ Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No workouts yet. Let’s go 💪</div>
                    )}
                </div>
            </div>
        </div>
    );
}
