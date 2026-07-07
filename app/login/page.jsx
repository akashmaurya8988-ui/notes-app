"use client";

import Link from "next/link";
import {
  LogIn
} from "lucide-react";

import { useRef, useState } from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  firebaseConfigError,
  getFirebaseAuthErrorMessage,
  googleProvider
} from "@/firebase/config.js";

import { useRouter } from "next/navigation";

const githubUrl = "https://github.com/akashmaurya8988-ui/noted";

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] fill-current"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.95c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.15 10.15 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const popupInProgress = useRef(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Fill all fields");
    if (loading) return;
    if (!auth) return alert(firebaseConfigError);

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful ✅");
      router.push("/dashboard");
    } catch (error) {
      alert(getFirebaseAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    if (loading || popupInProgress.current) return;
    if (!auth || !googleProvider) return alert(firebaseConfigError);

    try {
      popupInProgress.current = true;
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      alert("Google Login Successful ✅");
      router.push("/dashboard");
    } catch (error) {
      if (error.code !== "auth/cancelled-popup-request") {
        alert(getFirebaseAuthErrorMessage(error));
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

        <footer className="mt-8 border-t border-white/10 pt-5 text-center">
          <p className="text-sm text-gray-400">
            Made by Akash Maurya
          </p>

          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <GithubIcon />
            GitHub
          </a>
        </footer>

      </div>

    </div>
  );
}
