import RoomCard from "@/components/roomspage/RoomCard";
import { fetchRooms } from "@/lib/rooms/data";
import React from "react";



const RoomsPage = async () => {
  const rooms = await fetchRooms();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          All Study Rooms
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {rooms.length} room{rooms.length !== 1 ? "s" : ""} available to book
        </p>
      </div>

      {/* Grid */}
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-4xl mb-3">📚</p>
          <h3 className="text-base font-semibold text-gray-700">
            No rooms found
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Check back later or list your own room.
          </p>
        </div>
      )}
    </section>
  );
};

export default RoomsPage;
