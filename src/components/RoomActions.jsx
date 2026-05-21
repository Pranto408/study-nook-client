"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const AMENITIES_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const today = new Date().toISOString().split("T")[0];

export default function RoomActions({ room, currentUserId }) {
  const router = useRouter();
  const isOwner = currentUserId && room.ownerId === currentUserId;
  const isLoggedIn = !!currentUserId;

  // ── Booking modal ──
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    specialNote: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const totalCost = (() => {
    if (!bookingForm.startTime || !bookingForm.endTime) return 0;
    const start = parseInt(bookingForm.startTime.split(":")[0]);
    const end = parseInt(bookingForm.endTime.split(":")[0]);
    if (end <= start) return 0;
    return (end - start) * room.hourlyRate;
  })();

  const endTimeOptions = bookingForm.startTime
    ? TIME_SLOTS.filter(
        (t) => parseInt(t) > parseInt(bookingForm.startTime.split(":")[0]),
      )
    : [];

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "startTime" ? { endTime: "" } : {}),
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.date || !bookingForm.startTime || !bookingForm.endTime) {
      toast.error("Please fill all required fields");
      return;
    }
    setBookingLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId: room._id,
          ...bookingForm,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Booking failed");
        return;
      }

      toast.success("Room booked successfully!");
      setBookingOpen(false);
      setBookingForm({ date: "", startTime: "", endTime: "", specialNote: "" });
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setBookingLoading(false);
    }
  };

  // ── Edit modal ──
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: room.name,
    description: room.description,
    image: room.image,
    floor: room.floor,
    capacity: room.capacity,
    hourlyRate: room.hourlyRate,
  });
  const [editAmenities, setEditAmenities] = useState(room.amenities || []);
  const [editLoading, setEditLoading] = useState(false);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAmenityToggle = (amenity) => {
    setEditAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/${room._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...editForm, amenities: editAmenities }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to update room");
        return;
      }

      toast.success("Room updated successfully");
      setEditOpen(false);
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setEditLoading(false);
    }
  };

  // ── Delete modal ──
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/${room._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to delete room");
        return;
      }

      toast.success("Room deleted successfully");
      router.push("/my-listings");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      {/* ── Booking card content ── */}
      <div className="flex flex-col gap-4">
        {/* Booking count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Total Bookings</span>
          <span className="font-semibold text-gray-800">
            {room.bookingCount || 0}
          </span>
        </div>

        <hr className="border-gray-100" />

        {/* Pricing breakdown */}
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Hourly rate</span>
            <span className="font-semibold text-gray-800">
              ${room.hourlyRate}/hr
            </span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Capacity</span>
            <span className="font-semibold text-gray-800">
              {room.capacity} people
            </span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Location</span>
            <span className="font-semibold text-gray-800">
              Floor {room.floor}
            </span>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Book Now / Login to Book */}
        {isLoggedIn ? (
          <button
            onClick={() => setBookingOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold py-3.5 rounded-xl transition-colors"
          >
            Book Now
          </button>
        ) : (
          <Link
            href="/login"
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3.5 rounded-xl transition-colors no-underline block"
          >
            Login to Book
          </Link>
        )}

        {/* Owner controls */}
        {isOwner && (
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setEditOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 py-2.5 rounded-xl transition-colors"
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold border border-red-100 text-red-500 hover:bg-red-50 py-2.5 rounded-xl transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* ── Booking Modal ── */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Book — {room.name}
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              Fill in your preferred time slot
            </p>

            <form
              onSubmit={handleBookingSubmit}
              className="flex flex-col gap-4"
            >
              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleBookingChange}
                  min={today}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Start + End time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Start Time
                  </label>
                  <select
                    name="startTime"
                    value={bookingForm.startTime}
                    onChange={handleBookingChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
                  >
                    <option value="">Select</option>
                    {TIME_SLOTS.slice(0, -1).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    End Time
                  </label>
                  <select
                    name="endTime"
                    value={bookingForm.endTime}
                    onChange={handleBookingChange}
                    required
                    disabled={!bookingForm.startTime}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white disabled:opacity-50"
                  >
                    <option value="">Select</option>
                    {endTimeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Total cost */}
              {totalCost > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex justify-between items-center">
                  <span className="text-sm text-blue-700 font-medium">
                    Total Cost
                  </span>
                  <span className="text-sm font-bold text-blue-700">
                    ${totalCost}
                  </span>
                </div>
              )}

              {/* Special note */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Special Note{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  name="specialNote"
                  value={bookingForm.specialNote}
                  onChange={handleBookingChange}
                  placeholder="Any special requests..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setBookingOpen(false)}
                  className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Edit Room</h2>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Room Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none hover:border-blue-300 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  required
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none hover:border-blue-300 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={editForm.image}
                  onChange={handleEditChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none hover:border-blue-300 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Floor
                  </label>
                  <input
                    type="text"
                    name="floor"
                    value={editForm.floor}
                    onChange={handleEditChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none hover:border-blue-300 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={editForm.capacity}
                    onChange={handleEditChange}
                    required
                    min={1}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none hover:border-blue-300 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Rate ($)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={editForm.hourlyRate}
                    onChange={handleEditChange}
                    required
                    min={1}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none hover:border-blue-300 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {AMENITIES_OPTIONS.map((amenity) => {
                    const checked = editAmenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                          checked
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-600 hover:border-blue-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="accent-blue-600 w-3.5 h-3.5"
                        />
                        {amenity}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <Trash2 size={22} className="text-red-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Delete Room?</h2>
              <p className="text-sm text-gray-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-700">{room.name}</span>
                ? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteOpen(false)}
                className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
