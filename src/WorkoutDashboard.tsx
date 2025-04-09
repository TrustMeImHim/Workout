import { useState } from 'react'

export default function WorkoutDashboard() {
    const [selectedFilter, setSelectedFilter] = useState('all')
    const workouts = [
        { id: 1, name: 'Cardio Workout', date: '2025-04-09', status: 'finished', type: 'cardio' },
        { id: 2, name: 'Chest Press', date: '2025-04-07', status: 'unfinished', type: 'strength' },
        { id: 3, name: 'Yoga Routine', date: '2025-04-05', status: 'finished', type: 'flexibility' },
    ]

    const filtered = selectedFilter === 'all'
        ? workouts
        : workouts.filter(w => w.status === selectedFilter)

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">🏋️ My Tracker</h1>
                <div className="flex gap-2">
                    {['all', 'finished', 'unfinished'].map(f => (
                        <button
                            key={f}
                            onClick={() => setSelectedFilter(f)}
                            className={`px-3 py-1 rounded-md text-sm font-medium border ${
                                selectedFilter === f
                                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                                    : 'border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map(w => (
                    <div key={w.id} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
                        <h2 className="text-lg font-semibold mb-1">{w.name}</h2>
                        <p className="text-sm text-gray-500">{w.date}</p>
                        <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                            w.status === 'finished' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                        }`}>
              {w.status}
            </span>
                    </div>
                ))}
            </section>
        </div>
    )
}
