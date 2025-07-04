// components/Sidebar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUsers, FiSettings, FiCloud } from "react-icons/fi";

const links = [
  {
    href: "/dashboard/users",
    label: "Users",
    icon: <FiUsers className="w-5 h-5" />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <FiSettings className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white shadow-xl">
      <div className="p-6 flex items-center space-x-3">
        <FiCloud className="w-8 h-8" />
        <h1 className="text-xl font-bold">WeatherNext</h1>
      </div>
      <nav className="flex flex-col space-y-1 px-4 py-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              pathname === link.href
                ? "bg-white/10 backdrop-blur-sm"
                : "hover:bg-white/5"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-white/10 mt-auto">
        <div className="text-sm text-white/70">WeatherNext v1.0</div>
      </div>
    </aside>
  );
}
