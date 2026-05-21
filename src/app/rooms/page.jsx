"use client";

import RoomCard from "@/components/roomspage/RoomCard";
import React, { useState, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

const AMENITIES_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter state
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedAmenities.length > 0)
        params.append("amenities", selectedAmenities.join(","));
      if (minRate) params.append("minRate", minRate);
      if (maxRate) params.append("maxRate", maxRate);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms?${params.toString()}`,
      );
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedAmenities, minRate, maxRate]);

  // Debounce — waits 400ms after user stops typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchRooms();
    }, 400);
    return () => clearTimeout(timeout);
  }, [fetchRooms]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedAmenities([]);
    setMinRate("");
    setMaxRate("");
  };

  const hasActiveFilters =
    search || selectedAmenities.length > 0 || minRate || maxRate;

  const activeFilterCount =
    selectedAmenities.length + (minRate ? 1 : 0) + (maxRate ? 1 : 0);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          All Study Rooms
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {loading
            ? "Loading..."
            : `${rooms.length} room${rooms.length !== 1 ? "s" : ""} available to book`}
        </p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex gap-3 mb-4">
        {/* Search input */}
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rooms by name..."
            className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-xl outline-none hover:border-blue-300 focus:border-blue-500 transition-colors bg-white"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors shrink-0 ${
            filtersOpen || activeFilterCount > 0
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
          }`}
        >
          <SlidersHorizontal size={15} />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-white text-blue-600 text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {filtersOpen && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 mb-5 flex flex-col gap-5">
          {/* Amenities */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2.5">
              Amenities
            </p>
            <div className="flex flex-wrap gap-2">
              {AMENITIES_OPTIONS.map((amenity) => {
                const active = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                      active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rate range */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2.5">
              Hourly Rate ($)
            </p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={minRate}
                onChange={(e) => setMinRate(e.target.value)}
                placeholder="Min"
                min={0}
                className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none hover:border-blue-300 focus:border-blue-500 transition-colors"
              />
              <span className="text-gray-400 text-sm">to</span>
              <input
                type="number"
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
                placeholder="Max"
                min={0}
                className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none hover:border-blue-300 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="self-start text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1.5 transition-colors"
            >
              <X size={12} />
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Active filter chips — shown when panel is closed */}
      {hasActiveFilters && !filtersOpen && (
        <div className="flex flex-wrap gap-2 mb-5">
          {search && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full">
              &quot;{search}&quot;
              <button
                onClick={() => setSearch("")}
                className="hover:text-blue-900"
              >
                <X size={11} />
              </button>
            </span>
          )}
          {selectedAmenities.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full"
            >
              {a}
              <button
                onClick={() => toggleAmenity(a)}
                className="hover:text-blue-900"
              >
                <X size={11} />
              </button>
            </span>
          ))}
          {minRate && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full">
              Min ${minRate}
              <button
                onClick={() => setMinRate("")}
                className="hover:text-blue-900"
              >
                <X size={11} />
              </button>
            </span>
          )}
          {maxRate && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full">
              Max ${maxRate}
              <button
                onClick={() => setMaxRate("")}
                className="hover:text-blue-900"
              >
                <X size={11} />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-100" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
                <div className="h-8 bg-gray-100 rounded-xl mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Room grid */}
      {!loading && rooms.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && rooms.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-4xl mb-3">📚</p>
          <h3 className="text-base font-semibold text-gray-700">
            No rooms found
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search or filters.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </section>
  );
}
