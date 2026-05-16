"use client";

import {
  Save,
  FileText
} from "lucide-react";

export default function Editor({

  title,
  setTitle,

  content,
  setContent,

  onSave,

  loading

}) {

  return (

    <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-8">

        <FileText
          size={32}
          className="text-blue-400"
        />

        <h1 className="text-4xl font-bold text-white">
          Note Editor
        </h1>

      </div>

      {/* TITLE INPUT */}

      <input
        type="text"
        placeholder="Enter note title..."
        value={title}
        onChange={(e)=>
          setTitle(e.target.value)}
        className="w-full p-4 rounded-2xl bg-black/30 text-white outline-none mb-5 text-2xl border border-white/10 focus:border-blue-500"
      />

      {/* TEXTAREA */}

      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e)=>
          setContent(e.target.value)}
        className="w-full p-5 rounded-2xl bg-black/30 text-white outline-none min-h-[400px] border border-white/10 focus:border-blue-500 resize-none text-lg"
      />

      {/* SAVE BUTTON */}

      <div className="mt-6 flex justify-end">

        <button
          onClick={onSave}
          className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 transition-all px-6 py-4 rounded-2xl text-white font-bold text-lg"
        >

          <Save size={22} />

          {
            loading
            ? "Saving..."
            : "Save Note"
          }

        </button>

      </div>

    </div>
  );
}