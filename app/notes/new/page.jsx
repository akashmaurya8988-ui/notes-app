"use client";
import Editor from "@/components/Editor";

import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  addDoc,
  collection
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

export default function NewNotePage() {

  const router = useRouter();

  const {
    user,
    loading: authLoading
  } = useContext(AuthContext);

  const [title, setTitle] =
  useState("");

  const [content, setContent] =
  useState("");

  const [loading, setLoading] =
  useState(false);

  useEffect(() => {

    if (!authLoading && !user) {
      router.push("/login");
    }

  }, [authLoading, router, user]);

  // CREATE NOTE
  const createNote = async () => {

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

      setLoading(true);

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

      alert("Note Created ✅");

      router.push("/dashboard");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10">

      <div className="max-w-3xl mx-auto bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">

        <h1 className="text-5xl font-bold mb-8">
          Create New Note 🚀
        </h1>

        {/* TITLE */}

        <Editor

  title={title}
  setTitle={setTitle}

  content={content}
  setContent={setContent}

  onSave={createNote}

  loading={loading}

/>

      </div>

    </div>
  );
}
