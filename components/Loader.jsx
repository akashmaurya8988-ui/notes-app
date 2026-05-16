"use client";

export default function Loader() {

  return (

    <div className="flex items-center justify-center min-h-screen bg-black">

      <div className="flex flex-col items-center gap-5">

        {/* SPINNER */}

        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* TEXT */}

        <h1 className="text-white text-2xl font-bold tracking-wide">

          Loading...

        </h1>

      </div>

    </div>
  );
}