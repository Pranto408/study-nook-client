"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Clock, Pencil, Trash2, Plus } from "lucide-react";
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

export default function MyListingsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editRoom, setEditRoom] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editAmenities, setEditAmenities] = useState([]);
  const [editLoading, setEditLoading] = useState(false);

  // Delete modal state
  const [deleteRoom, setDeleteRoom] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getToken = async () => {
    const { data } = await authClient.token();
    return data?.token;
  };

  const fetchMyRooms = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      toast.error("Failed to load your listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyRooms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Edit ──
  const openEdit = (room) => {
    setEditRoom(room);
    setEditForm({
      name: room.name,
      description: room.description,
      image: room.image,
      floor: room.floor,
      capacity: room.capacity,
      hourlyRate: room.hourlyRate,
    });
    setEditAmenities(room.amenities || []);
  };

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
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/${editRoom._id}`,
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
      setEditRoom(null);
      fetchMyRooms();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setEditLoading(false);
    }
  };

  // ── Delete ──
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/${deleteRoom._id}`,
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
      setDeleteRoom(null);
      fetchMyRooms();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              My Listings
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage your study rooms
            </p>
          </div>
          <Link
            href="/add-room"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors no-underline"
          >
            <Plus size={16} />
            Add Room
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-100" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && rooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-5xl mb-4">🏠</p>
            <h3 className="text-base font-semibold text-gray-700">
              No listings yet
            </h3>
            <p className="text-sm text-gray-400 mt-1 mb-6">
              Add your first study room to start earning.
            </p>
            <Link
              href="/add-room"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors no-underline"
            >
              <Plus size={15} />
              Add Room
            </Link>
          </div>
        )}

        {/* Room grid */}
        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-white text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    ${room.hourlyRate}/hr
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {room.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-blue-400" />
                      Floor {room.floor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} className="text-blue-400" />
                      {room.capacity} people
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-blue-400" />
                      {room.bookingCount || 0} bookings
                    </span>
                  </div>

                  {/* Amenity chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {(room.amenities || []).slice(0, 3).map((a) => (
                      <span
                        key={a}
                        className="text-[11px] font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full border border-blue-100"
                      >
                        {a}
                      </span>
                    ))}
                    {(room.amenities || []).length > 3 && (
                      <span className="text-[11px] font-medium bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full border border-gray-100">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-2">
                    <button
                      onClick={() => openEdit(room)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 py-2 rounded-xl transition-colors"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteRoom(room)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold border border-red-100 text-red-500 hover:bg-red-50 py-2 rounded-xl transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editRoom && (
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
                  onClick={() => setEditRoom(null)}
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

      {/* ── Delete Confirmation Modal ── */}
      {deleteRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <Trash2 size={22} className="text-red-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Delete Room?</h2>
              <p className="text-sm text-gray-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-700">
                  {deleteRoom.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteRoom(null)}
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
    </div>
  );
}
