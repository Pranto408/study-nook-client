
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, ShieldCheck } from "lucide-react";

const STATS = [
  { icon: <BookOpen size={15} />, label: "Study Rooms Listed" },
  { icon: <Clock size={15} />, label: "Instant Booking" },
  { icon: <ShieldCheck size={15} />, label: "No Double Bookings" },
];

export default function Banner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Soft Background Glow */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-100 blur-[120px] opacity-70" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-indigo-100 blur-[100px] opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-10 lg:py-15">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              University Library Booking Platform
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
              Find Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600">Perfect</span>
                
              </span>{" "}
              Study Room
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-xl">
              Browse and book quiet, private study rooms in your library.
              <span className="text-gray-700 font-medium">
                {" "}
                List your own room.
              </span>
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 hover:-translate-y-0.5"
              >
                Explore Rooms
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>

              <Link
                href="/add-room"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                List Your Room
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-gray-200">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-gray-500 text-sm"
                >
                  <span className="text-blue-500">{stat.icon}</span>
                  {stat.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative flex justify-center">
            {/* Image Container */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-2xl shadow-gray-200/70">
              <Image
                src="/banner.jpg"
                alt="Study Room"
                width={620}
                height={720}
                className="object-cover w-full h-[620px]"
                priority
              />
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}