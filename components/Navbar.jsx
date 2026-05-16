"use client";

import Link from "next/link";

import {
  NotebookPen,
  LayoutDashboard,
  PlusCircle,
  LogIn,
  LogOut
} from "lucide-react";

export default function Navbar() {

  return (

    <nav className="w-full bg-black/40 backdrop-blur-lg border-b border-white/10 px-8 py-5 flex items-center justify-between sticky top-0 z-50">

      {/* LOGO */}

      <Link
        href="/dashboard"
        className="flex items-center gap-3"
      >

        <NotebookPen
          size={34}
          className="text-blue-400"
        />

        <h1 className="text-2xl font-bold text-white">
          NotesAI
        </h1>

      </Link>

      {/* NAV LINKS */}

      <div className="flex items-center gap-6">

        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-white hover:text-blue-400 transition-all"
        >

          <LayoutDashboard size={20} />

          Dashboard

        </Link>

        <Link
          href="/notes/new"
          className="flex items-center gap-2 text-white hover:text-green-400 transition-all"
        >

          <PlusCircle size={20} />

          New Note

        </Link>

        <Link
          href="/login"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all px-4 py-2 rounded-xl text-white font-semibold"
        >

          <LogIn size={18} />

          Login

        </Link>

        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-all px-4 py-2 rounded-xl text-white font-semibold"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </nav>
  );
}