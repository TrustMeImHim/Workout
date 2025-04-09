import { useState } from 'react';

type WorkoutInput = {
    name: string;
    type: string;
    reps: number;
    sets: number;
    weight: number;
    date: string;
    time: string;
    progress: number;
    status: 'unfinished';
};

type Props = {
    onAdd: (workout: WorkoutInput) => void;
};

export default function WorkoutForm({ onAdd }: Props): JSX.Element {
    const [name, setName] = useState('');
    const [type, setType] = useState('cardio');
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [weight, setWeight] = useState(0);
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const now = new Date();
        const time = now.toLocaleTimeString();

        onAdd({
            name,
            type,
            reps,
            sets,
            weight,
            date,
            time,
            progress: 0, // always starts at 0
            status: 'unfinished',
        });

        setName('');
        setReps(0);
        setSets(0);
        setWeight(0);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-xl shadow mb-6">
            <h3 className="text-lg font-semibold mb-3">Log New Workout</h3>

            <input
                className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Workout name..."
            />

            <select
                className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
                <option value="flexibility">Flexibility</option>
            </select>

            <input
                type="date"
                className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-2 mb-3">
                <input
                    type="number"
                    min={0}
                    className="px-3 py-2 rounded bg-gray-700 text-white"
                    value={sets}
                    onChange={(e) => setSets(parseInt(e.target.value))}
                    placeholder="Sets"
                />
                <input
                    type="number"
                    min={0}
                    className="px-3 py-2 rounded bg-gray-700 text-white"
                    value={reps}
                    onChange={(e) => setReps(parseInt(e.target.value))}
                    placeholder="Reps"
                />
                <input
                    type="number"
                    min={0}
                    className="px-3 py-2 rounded bg-gray-700 text-white"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    placeholder="Weight (lbs)"
                />
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
                Add Workout
            </button>
        </form>
    );
}
