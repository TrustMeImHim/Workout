import { Home, PlusCircle, BarChart2 } from 'lucide-react';

const navItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '#' },
    { label: 'Log Workout', icon: <PlusCircle size={20} />, path: '#' },
    { label: 'Progress', icon: <BarChart2 size={20} />, path: '#' },
];

export default function Sidebar(): JSX.Element {
    return (
        <div className="h-full w-full p-6 flex flex-col bg-gray-800 text-white">
            <h2 className="text-2xl font-bold mb-8 whitespace-nowrap">🏋️ Tracker</h2>
            <nav className="flex flex-col gap-4">
                {navItems.map((item, i) => (
                    <button
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition text-left"
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
