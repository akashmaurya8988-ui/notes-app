"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  PlusSquare,
  StickyNote,
  Sparkles,
  Settings,
  LogOut,
  NotebookPen
} from "lucide-react";

export default function Sidebar() {

  return (

    <aside className="w-[280px] h-screen bg-black/40 border-r border-white/10 backdrop-blur-lg fixed left-0 top-0 p-6 flex flex-col justify-between">

      {/* TOP SECTION */}

      <div>

        {/* LOGO */}

        <div className="flex items-center gap-3 mb-12">

          <NotebookPen
            size={38}
            className="text-blue-400"
          />

          <h1 className="text-3xl font-bold text-white">
            NotesAI
          </h1>

        </div>

        {/* MENU */}

        <div className="flex flex-col gap-4">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-white hover:bg-white/10 transition-all p-4 rounded-2xl"
          >

            <LayoutDashboard size={22} />

            Dashboard

          </Link>

          <Link
            href="/notes/new"
            className="flex items-center gap-3 text-white hover:bg-white/10 transition-all p-4 rounded-2xl"
          >

            <PlusSquare size={22} />

            New Note

          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-white hover:bg-white/10 transition-all p-4 rounded-2xl"
          >

            <StickyNote size={22} />

            All Notes

          </Link>

          <Link
            href="/ai"
            className="flex items-center gap-3 text-white hover:bg-white/10 transition-all p-4 rounded-2xl"
          >

            <Sparkles size={22} />

            AI Assistant

          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 text-white hover:bg-white/10 transition-all p-4 rounded-2xl"
          >

            <Settings size={22} />

            Settings

          </Link>

        </div>

      </div>

      {/* BOTTOM */}

      <button
        className="flex items-center gap-3 bg-red-500 hover:bg-red-600 transition-all p-4 rounded-2xl text-white font-semibold"
      >

        <LogOut size={22} />

        Logout

      </button>

    </aside>
  );
}