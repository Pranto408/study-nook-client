"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { CalendarDays, Clock, DollarSign, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Framer-motion animation variations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", duration: 0.4, bounce: 0.15 },
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelBooking, setCancelBooking] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const getToken = async () => {
    const { data } = await authClient.token();
    return data?.token;
  };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
  }, [fetchBookings]);

  const isFuture = (date) => {
    return new Date(date) >= new Date(new Date().toDateString());
  };

  const handleCancel = async () => {
    setCancelLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${cancelBooking._id}/cancel`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = (await res.ok) ? await res.json() : null;
      if (!res.ok) {
        toast.error(data?.message || "Failed to cancel booking");
        return;
      }

      toast.success("Booking cancelled");
      setCancelBooking(null);
      fetchBookings();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-10 px-4 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your study room reservations
          </p>
        </div>

        {/* Outer AnimatePresence captures shifting list layouts */}
        <AnimatePresence mode="wait">
          {/* Loading skeleton */}
          {loading && (
            <motion.div
              key="loading-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 animate-pulse"
                >
                  <div className="w-24 h-24 rounded-xl bg-gray-100 shrink-0" />
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && bookings.length === 0 && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <motion.p
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="text-5xl mb-4"
              >
                📅
              </motion.p>
              <h3 className="text-base font-semibold text-gray-700">
                No bookings yet
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                You haven&apos;t booked any study rooms yet.
              </p>
            </motion.div>
          )}

          {/* Bookings list */}
          {!loading && bookings.length > 0 && (
            <motion.div
              key="bookings-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-4"
            >
              <AnimatePresence mode="popLayout">
                {bookings.map((booking) => {
                  const canCancel =
                    booking.status === "confirmed" && isFuture(booking.date);

                  return (
                    <motion.div
                      key={booking._id}
                      variants={cardVariants}
                      layout
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-row gap-4 overflow-hidden"
                    >
                      {/* Room image — fixed size */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {booking.roomImage ? (
                          <Image
                            src={booking.roomImage}
                            alt={booking.roomName}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            🏫
                          </div>
                        )}
                      </div>

                      {/* Booking info */}
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {booking.roomName}
                          </h3>
                          <span
                            className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-green-50 text-green-600 border border-green-100"
                                : "bg-red-50 text-red-500 border border-red-100"
                            }`}
                          >
                            {booking.status === "confirmed"
                              ? "Confirmed"
                              : "Cancelled"}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <CalendarDays
                              size={11}
                              className="text-blue-400 shrink-0"
                            />
                            {new Date(booking.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock
                              size={11}
                              className="text-blue-400 shrink-0"
                            />
                            {booking.startTime} – {booking.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign
                              size={11}
                              className="text-blue-400 shrink-0"
                            />
                            ${booking.totalCost} total
                          </span>
                        </div>

                        {booking.specialNote && (
                          <p className="text-xs text-gray-400 italic truncate">
                            Note: {booking.specialNote}
                          </p>
                        )}

                        {canCancel && (
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setCancelBooking(booking)}
                            className="mt-1 self-start inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 border border-red-100 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <X size={11} />
                            Cancel Booking
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Cancel Confirmation Modal ── */}
      <AnimatePresence>
        {cancelBooking && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              variants={modalVariants}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <X size={22} className="text-red-500" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  Cancel Booking?
                </h2>
                <p className="text-sm text-gray-400">
                  Are you sure you want to cancel your booking for{" "}
                  <span className="font-semibold text-gray-700">
                    {cancelBooking.roomName}
                  </span>{" "}
                  on{" "}
                  <span className="font-semibold text-gray-700">
                    {new Date(cancelBooking.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  ?
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCancelBooking(null)}
                  className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Keep It
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelLoading}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                >
                  {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
