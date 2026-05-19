import React from "react";
import RoomCard from "../roomspage/RoomCard";
import { fetchFeaturedRooms } from "@/lib/rooms/data";




const FeaturedRooms = async () => {
  const rooms = await fetchFeaturedRooms();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Section header */}
      <div className="mb-8">
        <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-1">
          Available Now
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Featured Study Rooms
        </h2>
      </div>

      {/* Room grid */}
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-3">📚</p>
          <h3 className="text-base font-semibold text-gray-700">
            No rooms available yet
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Be the first to list a study room.
          </p>
        </div>
      )}
    </section>
  );
};

export default FeaturedRooms;
