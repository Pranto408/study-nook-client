
import React from "react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[9999] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-5">
        {/* Centered Modern Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating gradient ring */}
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-100 border-t-indigo-600 border-r-indigo-600"></div>
          {/* Inner pulsing steady core */}
          <div className="absolute h-8 w-8 rounded-full bg-indigo-50 border border-indigo-100 animate-pulse"></div>
        </div>

        {/* Loading Text & Status Indicators */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-800 tracking-wide animate-pulse">
            Connecting to StudyNook...
          </h3>
          <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">
            Synchronizing room slots
          </p>
        </div>
      </div>
    </div>
  );
}
