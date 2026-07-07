"use client";

import Image from "next/image";

import useAuth from "@/hooks/useAuth.js";

export default function ProfilePage() {

  const {
    user
  } = useAuth();

  const profileImage =
  user?.photoURL || "/avatar.png";

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-md mx-auto bg-zinc-900 rounded-2xl p-6 shadow-lg">

        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.png"
            alt="Notes App"
            width={64}
            height={64}
            className="h-16 w-16 rounded-2xl"
          />
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">
          Profile
        </h1>

        <div className="flex flex-col items-center">

          {
            user?.photoURL
            ? (
              <div
                role="img"
                aria-label="Profile"
                className="mb-4 h-24 w-24 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${profileImage})`
                }}
              />
            )
            : (
              <Image
                src={profileImage}
                alt="Profile"
                width={96}
                height={96}
                className="mb-4 h-24 w-24 rounded-full"
              />
            )
          }

          <h2 className="text-xl font-semibold">
            {user?.displayName || "User"}
          </h2>

          <p className="text-gray-400 mt-2">
            {user?.email}
          </p>

        </div>

      </div>

    </div>
  );
}
