"use client";

import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  ArrowLeft,
  FilePenLine,
  Save,
  Sparkles,
  Trash2
} from "lucide-react";

import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import {
  db,
  firebaseConfigError
} from "@/firebase/config.js";

import { AuthContext } from "@/context/AuthContext.jsx";

import { useParams, useRouter }
from "next/navigation";

export default function NoteDetailsPage() {

  const params = useParams();

  const router = useRouter();

  const noteId = params.id;

  const {
    user,
    loading: authLoading
  } = useContext(AuthContext);

  const [title, setTitle] =
  useState("");

  const [content, setContent] =
  useState("");

  const [loading, setLoading] =
  useState(true);

  const [saving, setSaving] =
  useState(false);

  // GET SINGLE NOTE
  useEffect(() => {

    const getNote = async () => {

      if (authLoading) {
        return;
      }

      if (!user) {
        router.push("/login");
        setLoading(false);
        return;
      }

      if (!db) {
        console.error(firebaseConfigError);
        setLoading(false);
        return;
      }

      try {

        const docRef =
        doc(db, "notes", noteId);

        const docSnap =
        await getDoc(docRef);

        if (docSnap.exists()) {

          const data =
          docSnap.data();

          if (data.ownerUid !== user.uid) {
            alert("You do not have access to this note.");
            router.push("/dashboard");
            return;
          }

          setTitle(data.title);
          setContent(data.content);
        } else {

          router.push("/dashboard");

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    if (noteId && !authLoading) {
      getNote();
    }

  }, [authLoading, noteId, router, user]);

  // UPDATE NOTE
  const updateNote = async () => {

    try {

      if (!db) {
        return alert(firebaseConfigError);
      }

      if (!user) {
        return router.push("/login");
      }

      setSaving(true);

      await updateDoc(
        doc(db, "notes", noteId),
        {
          title,
          content,
          ownerUid: user.uid,
          ownerEmail: user.email,
          updatedAt: Date.now(),
        }
      );

      alert("Note Updated");

    } catch (error) {

      console.log(error);

    } finally {

      setSaving(false);

    }
  };

  // DELETE NOTE
  const deleteNote = async () => {

    try {

      if (!db) {
        return alert(firebaseConfigError);
      }

      if (!user) {
        return router.push("/login");
      }

      await deleteDoc(
        doc(db, "notes", noteId)
      );

      alert("Note Deleted");

      router.push("/dashboard");

    } catch (error) {

      console.log(error);

    }
  };

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.2),_transparent_35%),linear-gradient(135deg,_#030712,_#020617)] text-white">

        <div className="rounded-2xl border border-cyan-300/20 bg-white/[0.06] px-6 py-4 font-bold text-cyan-200 shadow-[0_0_45px_rgba(34,211,238,0.18)] backdrop-blur-xl">
          Loading editor...
        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(244,63,94,0.16),_transparent_30%),linear-gradient(135deg,_#030712,_#0f172a_48%,_#020617)] px-4 py-10 text-white sm:px-6 lg:px-10">

      <main className="mx-auto flex w-full max-w-4xl flex-col items-center">

        <section className="mb-8 w-full">

          <button
            onClick={() => router.push("/dashboard")}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-slate-300 transition-all hover:border-cyan-300/40 hover:text-cyan-200">

            <ArrowLeft size={16} />

            Dashboard

          </button>

          <div className="text-center">

            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-2 text-sm font-semibold text-fuchsia-200 shadow-[0_0_35px_rgba(217,70,239,0.16)]">

              <Sparkles size={16} />

              Edit mode active

            </div>

            <h1 className="text-4xl font-black tracking-wide sm:text-6xl">
              Edit Note
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Refine your title and content inside a focused futuristic writing panel.
            </p>

          </div>

        </section>

        <section className="w-full rounded-[2rem] border border-cyan-200/20 bg-slate-950/70 p-6 shadow-[0_0_90px_rgba(34,211,238,0.16)] backdrop-blur-2xl sm:p-8">

          <div className="mb-6 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
                <FilePenLine size={24} />
              </div>

              <div>

                <h2 className="text-xl font-black tracking-wide">
                  Note Console
                </h2>

                <p className="text-sm text-slate-400">
                  Live document update panel
                </p>

              </div>

            </div>

            <div className="hidden rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-200 sm:block">
              Synced
            </div>

          </div>

          <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-cyan-200">
            Title
          </label>

          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e)=>
              setTitle(e.target.value)}
            className="mb-5 w-full rounded-2xl border border-white/10 bg-black/35 p-4 text-xl font-bold text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
          />

          <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-fuchsia-200">
            Content
          </label>

          <textarea
            placeholder="Write note..."
            value={content}
            onChange={(e)=>
              setContent(e.target.value)}
            className="mb-6 min-h-[360px] w-full resize-none rounded-2xl border border-white/10 bg-black/35 p-5 text-base leading-7 text-white outline-none transition-all placeholder:text-slate-500 focus:border-fuchsia-300/70 focus:ring-2 focus:ring-fuchsia-300/20"
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <button
              onClick={deleteNote}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-500/15 px-6 py-3 font-black text-red-100 transition-all hover:bg-red-500/25">

              <Trash2 size={20} />

              Delete Note

            </button>

            <button
              onClick={updateNote}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-black text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.28)] transition-all hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70">

              <Save size={20} />

              {
                saving
                ? "Saving..."
                : "Update Note"
              }

            </button>

          </div>

        </section>

      </main>

    </div>
  );
}
