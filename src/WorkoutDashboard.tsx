import { useState } from 'react';
import WorkoutForm from './components/WorkoutForm';
import ProgressChart from './components/ProgressChart';

type Workout = {
  id: number;
  name: string;
  date: string;
  time: string;
  reps: number;
  sets: number;
  weight: number;
  status: 'finished' | 'unfinished';
  type: string;
  progress: number;
};

export default function WorkoutDashboard(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'finished' | 'unfinished'>('all');
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const filtered = selectedFilter === 'all'
      ? workouts
      : workouts.filter(w => w.status === selectedFilter);

  const handleAddWorkout = (workout: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now(),
    };
    setWorkouts([newWorkout, ...workouts]);
  };

  const handleDelete = (id: number) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const handleMarkComplete = (id: number) => {
    setWorkouts(prev =>
        prev.map(w =>
            w.id === id ? { ...w, progress: 100, status: 'finished' } : w
        )
    );
  };

  return (
      <div className="p-6 min-w-0 w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            {['all', 'finished', 'unfinished'].map(f => (
                <button
                    key={f}
                    onClick={() => setSelectedFilter(f as 'all' | 'finished' | 'unfinished')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-all ${
                        selectedFilter === f
                            ? 'bg-blue-500 text-white border-blue-600'
                            : 'border-gray-600 hover:bg-gray-700'
                    }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
          </div>
        </header>

        <WorkoutForm onAdd={handleAddWorkout} />

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {filtered.map(w => (
              <div
                  key={w.id}
                  className="bg-gray-800 rounded-2xl shadow p-5 hover:shadow-lg transition-all transform hover:scale-[1.02] duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{w.name}</h2>
                  <button
                      onClick={() => handleDelete(w.id)}
                      className="text-red-400 hover:text-red-600 text-sm"
                  >
                    ✖
                  </button>
                </div>
                <p className="text-sm text-gray-400 mb-1">{w.date} at {w.time}</p>

                <div className="text-sm space-y-1 text-gray-200 mb-3">
                  <div><span className="font-medium text-white">Sets:</span> {w.sets}</div>
                  <div><span className="font-medium text-white">Reps:</span> {w.reps}</div>
                  <div><span className="font-medium text-white">Weight:</span> {w.weight} lbs</div>
                </div>

                <div className="mb-1 text-xs text-gray-300 font-semibold">Progress: {w.progress}%</div>
                <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                  <div
                      className={`h-full ${
                          w.progress === 100 ? 'bg-green-400' : 'bg-yellow-400'
                      }`}
                      style={{ width: `${w.progress}%` }}
                  />
                </div>

                {w.progress < 100 && (
                    <button
                        onClick={() => handleMarkComplete(w.id)}
                        className="mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                    >
                      Mark as Complete
                    </button>
                )}

                <span
                    className={`text-xs px-2 py-1 rounded-full mt-3 inline-block ${
                        w.status === 'finished'
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/20 text-red-400'
                    }`}
                >
              {w.status}
            </span>
              </div>
          ))}
        </section>

        <ProgressChart workouts={workouts} />
      </div>
  );
}
