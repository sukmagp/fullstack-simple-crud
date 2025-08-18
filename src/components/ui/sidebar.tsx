"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AlignLeft } from "lucide-react";

const NavItem = ({ href, label }: { href: string; label: string }) => {
  const path = usePathname();
  const active = path === href || path.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-xl mb-1 hover:bg-gray-100 hover:text-[#120c20] ${
        active ? "bg-gray-100 text-[#120c20] font-semibold" : "text-white"
      }`}
    >
      {label}
    </Link>
  );
};

export default function Sidebar() {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );
  const [openMenu, setOpenMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/auth/login");
  };

  return (
    <div className="flex">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-50 text-white bg-[#120c20] p-2 rounded-lg lg:hidden"
      >
        <AlignLeft size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 shrink-0 h-screen sticky top-0 p-4 bg-[#120c20] border-r flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="text-2xl text-white font-bold mb-6">Simply Crud</div>

        {/* Nav */}
        <nav className="text-sm text-white flex-1">
          <NavItem href="/dashboard" label="Dashboard" />
          <NavItem href="/profile" label="Profile" />
        </nav>

        {/* Bottom user */}
        {user && (
          <div className="relative mt-auto">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 hover:text-[#120c20] text-white transition"
            >
              <img
                src={user.avatar || "https://ui-avatars.com/api/?name=" + user.name}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <span className="font-medium">{user.name}</span>
            </button>

            {openMenu && (
              <div className="absolute bottom-14 left-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
