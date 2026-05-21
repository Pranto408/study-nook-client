
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const AMENITIES_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoomPage = () => {
    const router = useRouter();
    useEffect(() => {
      document.title = "StudyNook – Add Room";
    }, []);
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data: tokenData, error: tokenError } = await authClient.token();
    if (tokenError || !tokenData?.token) {
      toast.error("You must be logged in");
      return;
    }
    const token = tokenData.token;

    if (!token) {
      toast.error("You must be logged in");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        amenities: selectedAmenities,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to add room");
      return;
    }

    toast.success("Room added successfully");
    router.push("/my-listings");
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Add a Study Room
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Fill in the details below to list your room on StudyNook
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Room Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Room Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Tech Hub Room"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your room — features, environment, ideal use..."
                required
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white resize-none"
              />
            </div>

            {/* Image URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/room.jpg"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
              />
              {/* Image preview */}
              {form.image && (
                <div className="mt-2 rounded-xl overflow-hidden h-40 bg-gray-100">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>

            {/* Floor + Capacity + Hourly Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Floor
                </label>
                <input
                  type="text"
                  name="floor"
                  value={form.floor}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  placeholder="e.g. 4"
                  min={1}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  min={1}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Amenities
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AMENITIES_OPTIONS.map((amenity) => {
                  const checked = selectedAmenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none ${
                        checked
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-colors mt-2"
            >
              {loading ? "Adding Room..." : "Add Room"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
