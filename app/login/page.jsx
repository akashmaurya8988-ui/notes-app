"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

import { useRef, useState } from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  googleProvider
} from "@/firebase/config";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const popupInProgress = useRef(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Fill all fields");
    if (loading) return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful ✅");
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    if (loading || popupInProgress.current) return;

    try {
      popupInProgress.current = true;
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      alert("Google Login Successful ✅");
      router.push("/dashboard");
    } catch (error) {
      if (error.code !== "auth/cancelled-popup-request") {
        alert(error.message);
      }
    } finally {
      popupInProgress.current = false;
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="w-[400px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold mb-8 text-center">

          Login

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
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 transition-all p-4 rounded-xl font-bold disabled:cursor-not-allowed disabled:opacity-70"
        >

          {
            loading
            ? "Loading..."
            : "Login"
          }

        </button>
         <button
          onClick={googleLogin}
          disabled={loading}
          className="mt-[5px] w-full flex items-center justify-center gap-3 bg-purple-600 text-yellow-300 hover:bg-purple-700 transition-all p-4 rounded-xl font-serif font-bold tracking-wide disabled:cursor-not-allowed disabled:opacity-70"
        >

          <LogIn size={22} />

          Continue with Google

        </button>

        {/* SIGNUP LINK */}

        <p className="text-center mt-6 text-gray-300">

          Don&apos;t have an account?

          <Link
            href="/signup"
            className="text-green-400 ml-2"
          >

            Signup

          </Link>

        </p>

      </div>

    </div>
  );
}
