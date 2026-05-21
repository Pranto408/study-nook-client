import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-3xl border border-slate-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
        {/* Large Aesthetic Error Code Badge */}
        <div className="relative inline-flex items-center justify-center">
          <span className="text-9xl font-extrabold tracking-tighter text-slate-100 select-none">
            404
          </span>
          <div className="absolute text-3xl font-black text-indigo-600 tracking-wide mt-2">
            Oops!
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Study Nook Not Found
          </h1>
          <p className="text-base text-slate-600 max-w-xs mx-auto leading-relaxed">
            We searched every floor and library corner, but this specific page
            seems to have been checked out permanently.
          </p>
        </div>

        {/* Action Button - Back to Home */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 uppercase tracking-wider"
          >
            Back to Home
          </Link>
        </div>

        {/* Aesthetic Campus Subtext */}
        <p className="text-xs text-slate-400">
          Need a room instead? Head back to find active slots.
        </p>
      </div>
    </div>
  );
}
