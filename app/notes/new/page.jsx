"use client";
import Editor from "@/components/Editor";

import { useState } from "react";

import {
  addDoc,
  collection
} from "firebase/firestore";

import {
  db,
  firebaseConfigError
} from "@/firebase/config";

import { useRouter }
from "next/navigation";

export default function NewNotePage() {

  const router = useRouter();

  const [title, setTitle] =
  useState("");

  const [content, setContent] =
  useState("");

  const [loading, setLoading] =
  useState(false);

  // CREATE NOTE
  const createNote = async () => {

    if (!title || !content) {
      return alert("Fill all fields");
    }

    if (!db) {
      return alert(firebaseConfigError);
    }

    try {

      setLoading(true);

      await addDoc(
        collection(db, "notes"),
        {
          title,
          content,
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
