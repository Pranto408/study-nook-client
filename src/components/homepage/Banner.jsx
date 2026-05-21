
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  { icon: <BookOpen size={15} />, label: "Study Rooms Listed" },
  { icon: <Clock size={15} />, label: "Instant Booking" },
  { icon: <ShieldCheck size={15} />, label: "No Double Bookings" },
];

// This converts the standard Next.js Link into an animatable component
const MotionLink = motion(Link);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Banner() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Soft Background Glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-100 blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-indigo-100 blur-[100px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full py-10 lg:py-15">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              University Library Booking Platform
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-gray-900 leading-[1.05] tracking-tight mb-6"
            >
              Find Your{" "}
              <span className="relative inline-block text-blue-600">
                Perfect
              </span>{" "}
              Study Room
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-xl"
            >
              Browse and book quiet, private study rooms in your library.{" "}
              <span className="text-gray-700 font-medium">
                List your own room.
              </span>
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <MotionLink
                href="/rooms"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-200 cursor-pointer"
              >
                Explore Rooms
                <ArrowRight size={16} strokeWidth={2.5} />
              </MotionLink>

              <MotionLink
                href="/add-room"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                List Your Room
              </MotionLink>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-gray-200"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-gray-500 text-sm"
                >
                  <span className="text-blue-500">{stat.icon}</span>
                  {stat.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 15,
              delay: 0.4,
            }}
            className="relative flex justify-center"
          >
            {/* Image Container */}
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-3xl border border-gray-200 shadow-2xl shadow-gray-200/70 w-full"
            >
              <Image
                src="/banner.jpg"
                alt="Study Room"
                width={620}
                height={720}
                className="object-cover w-full h-[620px]"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}