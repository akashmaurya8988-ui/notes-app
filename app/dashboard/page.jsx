"use client";

import NoteCard from "@/components/NoteCard";

import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  Plus,
  Search,
  Sparkles,
  StickyNote,
  X
} from "lucide-react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

import {
  db,
  firebaseConfigError
} from "@/firebase/config.js";

import {
  AuthContext
} from "@/context/AuthContext.jsx";

import { useRouter }
from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  const {
    user,
    loading: authLoading
  } = useContext(AuthContext);

  const [title, setTitle] =
  useState("");

  const [content, setContent] =
  useState("");

  const [notes, setNotes] =
  useState([]);

  const [searchQuery, setSearchQuery] =
  useState("");

  const filteredNotes =
  notes.filter((note) => {

    const query =
    searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      note.title?.toLowerCase().includes(query) ||
      note.content?.toLowerCase().includes(query)
    );

  });

  // ADD NOTE
  const addNote = async () => {

    if (!title || !content) {
      return alert("Fill all fields");
    }

    if (!db) {
      return alert(firebaseConfigError);
    }

    if (!user) {
      return router.push("/login");
    }

    try {

      await addDoc(
        collection(db, "notes"),
        {
          title,
          content,
          ownerUid: user.uid,
          ownerEmail: user.email,
          createdAt: Date.now(),
        }
      );

      setTitle("");
      setContent("");

    } catch (error) {

      console.log(error);

    }
  };

  // GET NOTES REALTIME
  useEffect(() => {

    if (authLoading) {
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    if (!db) {
      console.error(firebaseConfigError);
      return;
    }

    const unsubscribe =
    onSnapshot(
      query(
        collection(db, "notes"),
        where("ownerUid", "==", user.uid)
      ),
      (snapshot) => {

        const data =
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) =>
            (b.createdAt || 0) - (a.createdAt || 0)
          );

        setNotes(data);
      }
    );

    return () => unsubscribe();

  }, [authLoading, router, user]);

  // DELETE NOTE
  const deleteNote = async (id) => {

    try {

      if (!db) {
        return alert(firebaseConfigError);
      }

      if (!user) {
        return router.push("/login");
      }

      await deleteDoc(
        doc(db, "notes", id)
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(135deg,_#030712,_#0f172a_48%,_#020617)] px-4 py-10 text-white sm:px-6 lg:px-10">

      <main className="mx-auto flex w-full max-w-6xl flex-col items-center">

        {/* HEADER */}

        <section className="mb-8 w-full text-center">

          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.18)]">

            <Sparkles size={16} />

            Neural notes workspace

          </div>

          <h1 className="text-4xl font-black tracking-wide text-white sm:text-6xl">
            Notes Dashboard
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Capture ideas, scan saved notes, and keep your writing system centered in one clean command deck.
          </p>

        </section>

        {/* STATS */}

        <section className="mb-8 grid w-full gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 text-center shadow-[0_20px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">

            <p className="text-sm text-slate-400">
              Total Notes
            </p>

            <p className="mt-2 text-3xl font-black text-cyan-300">
              {notes.length}
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 text-center shadow-[0_20px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">

            <p className="text-sm text-slate-400">
              Draft Title
            </p>

            <p className="mt-2 truncate text-2xl font-black text-fuchsia-300">
              {title || "Ready"}
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 text-center shadow-[0_20px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">

            <p className="text-sm text-slate-400">
              Signal
            </p>

            <p className="mt-2 text-2xl font-black text-emerald-300">
              Live Sync
            </p>

          </div>

        </section>

        {/* ADD NOTE FORM */}

        <section className="mb-10 w-full max-w-3xl rounded-[2rem] border border-cyan-200/20 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(34,211,238,0.16)] backdrop-blur-2xl sm:p-8">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
              <StickyNote size={22} />
            </div>

            <div>

              <h2 className="text-xl font-black tracking-wide">
                Create Note
              </h2>

              <p className="text-sm text-slate-400">
                Add a new thought to your dashboard.
              </p>

            </div>

          </div>

          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e)=>
              setTitle(e.target.value)}
            className="mb-4 w-full rounded-2xl border border-white/10 bg-black/35 p-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e)=>
              setContent(e.target.value)}
            className="mb-4 h-40 w-full resize-none rounded-2xl border border-white/10 bg-black/35 p-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-fuchsia-300/70 focus:ring-2 focus:ring-fuchsia-300/20"
          />

          <button
            onClick={addNote}
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-black text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.28)] transition-all hover:bg-cyan-300">

            <Plus size={20} />

            Add Note

          </button>

        </section>

        {/* NOTES GRID */}

        <section className="w-full">

          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-2xl font-black tracking-wide">
                Saved Notes
              </h2>

              <p className="text-sm text-slate-400">
                Your latest synced ideas.
              </p>

            </div>

            <div className="flex w-full items-center gap-3 rounded-2xl border border-cyan-300/20 bg-white/[0.06] px-4 py-3 text-sm text-slate-300 shadow-[0_0_35px_rgba(34,211,238,0.08)] backdrop-blur-xl lg:max-w-md">

              <Search
                size={18}
                className="shrink-0 text-cyan-200"
              />

              <input
                type="text"
                placeholder="Search saved notes..."
                value={searchQuery}
                onChange={(e)=>
                  setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />

              {searchQuery && (
                <button
                  onClick={() =>
                    setSearchQuery("")}
                  className="shrink-0 rounded-full p-1 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                  aria-label="Clear search">

                  <X size={16} />

                </button>
              )}

            </div>

          </div>

          {notes.length > 0 ? (
            filteredNotes.length > 0 ? (
              <>

                {searchQuery && (
                  <p className="mb-4 text-sm font-semibold text-cyan-200">
                    Found {filteredNotes.length} of {notes.length} notes
                  </p>
                )}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredNotes.map((note) => (
                    <NoteCard key={note.id} note={note} deleteNote={deleteNote} />
                  ))}
                </div>

              </>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-fuchsia-300/30 bg-white/[0.05] p-10 text-center text-slate-300 backdrop-blur-xl">

                <p className="text-lg font-bold text-white">
                  No matching notes
                </p>

                <p className="mt-2 text-sm">
                  Try another title or word from your note content.
                </p>

              </div>
            )
          ) : (
            <div className="rounded-[2rem] border border-dashed border-cyan-300/30 bg-white/[0.05] p-10 text-center text-slate-300 backdrop-blur-xl">

              <p className="text-lg font-bold text-white">
                No notes yet
              </p>

              <p className="mt-2 text-sm">
                Create your first note above and it will appear here instantly.
              </p>

            </div>
          )}

        </section>

      </main>

    </div>
  );
}
