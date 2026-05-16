"use client";

import Link from "next/link";

import {
  Trash2,
  Pencil,
  Clock3
} from "lucide-react";

export default function NoteCard({
  note,
  deleteNote
}) {

  return (

    <div className="border border-cyan-200/15 bg-slate-950/65 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]">

      {/* TOP */}

      <div className="flex items-start justify-between mb-4">

        <h2 className="line-clamp-1 text-2xl font-black tracking-wide text-white">
          {note.title}
        </h2>

        <button
          onClick={() =>
            deleteNote(note.id)}
          className="rounded-xl bg-red-500/90 p-2 transition-all hover:bg-red-400"
        >

          <Trash2 size={18} />

        </button>

      </div>

      {/* CONTENT */}

      <p className="mb-6 line-clamp-4 text-slate-300">
        {note.content}
      </p>

      {/* FOOTER */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2 text-sm text-slate-400">

          <Clock3 size={16} />

          {
            new Date(
              note.createdAt
            ).toLocaleDateString()
          }

        </div>

        <Link
          href={`/notes/${note.id}`}
          className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 font-bold text-slate-950 transition-all hover:bg-cyan-300"
        >

          <Pencil size={16} />

          Open

        </Link>

      </div>

    </div>
  );
}
