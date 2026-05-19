import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Clock } from "lucide-react";

const RoomCard = ({ room }) => {
  const {
    _id,
    image,
    name,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;

  const visibleAmenities = amenities.slice(0, 3);
  const extraCount = amenities.length - 3;

  const truncated =
    description?.length > 100
      ? description.slice(0, 100).trimEnd() + "..."
      : description;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Hourly rate badge */}
        <div className="absolute top-3 right-3 bg-white text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-blue-50">
          {hourlyRate}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name */}
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">{truncated}</p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-blue-400 shrink-0" />
            Floor {floor}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-blue-400 shrink-0" />
            {capacity} people
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-blue-400 shrink-0" />
            {hourlyRate}
          </span>
        </div>

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-1.5">
          {visibleAmenities.map((amenity) => (
            <span
              key={amenity}
              className="text-[11px] font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full border border-blue-100"
            >
              {amenity}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-[11px] font-medium bg-gray-50 text-gray-500 px-2.5 py-1 rounded-full border border-gray-100">
              +{extraCount} more
            </span>
          )}
        </div>

        {/* View Details button */}
        <div className="mt-auto pt-2">
          <Link
            href={`/rooms/${_id}`}
            className="block w-full text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 py-2.5 rounded-lg transition-colors no-underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
