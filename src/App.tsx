import Sidebar from './components/Sidebar';
import WorkoutDashboard from './WorkoutDashboard';

export default function App(): JSX.Element {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans flex">
            {/* Sidebar (no longer fixed, uses layout flow) */}
            <aside className="w-60 bg-gray-800 h-screen shadow-lg flex-shrink-0">
                <Sidebar />
            </aside>

            {/* Main content takes remaining space */}
            <main className="flex-1 overflow-y-auto p-6">
                <WorkoutDashboard />
            </main>
        </div>
    );
}
