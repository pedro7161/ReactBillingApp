"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/requisitos", label: "Requisitos" },
    { href: "/simulador", label: "Simulação" },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-wrap justify-center gap-4">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
              isActive ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
