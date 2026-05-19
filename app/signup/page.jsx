"use client";

import Link from "next/link";

import { useState } from "react";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  auth,
  firebaseConfigError,
  getFirebaseAuthErrorMessage
} from "@/firebase/config.js";

import { useRouter }
from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [email, setEmail] =
  useState("");

  const [password, setPassword] =
  useState("");

  const [loading, setLoading] =
  useState(false);

  const signup = async () => {

    if (!email || !password) {
      return alert("Fill all fields");
    }

    if (!auth) {
      return alert(firebaseConfigError);
    }

    try {

      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account Created ✅");

      // REDIRECT LOGIN PAGE
      router.push("/login");

    } catch (error) {

      alert(getFirebaseAuthErrorMessage(error));

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="w-[400px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold mb-8 text-center">

          Signup

        </h1>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-black/30 mb-4 outline-none"
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-black/30 mb-6 outline-none"
        />

        {/* BUTTON */}

        <button
          onClick={signup}
          className="w-full bg-green-500 hover:bg-green-600 transition-all p-4 rounded-xl font-bold"
        >

          {
            loading
            ? "Creating..."
            : "Create Account"
          }

        </button>

        {/* LOGIN LINK */}

        <p className="text-center mt-6 text-gray-300">

          Already have an account?

          <Link
            href="/login"
            className="text-blue-400 ml-2"
          >

            Login

          </Link>

        </p>

      </div>

    </div>
  );
}
