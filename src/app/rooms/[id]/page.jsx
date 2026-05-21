// import React from "react";
// import { MapPin, Users, Clock, Wifi, ChevronLeft } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// const fetchRoom = async (id,token) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
//       headers: {
//         authorization: `Bearer ${token}` || "",
//       },
//     });
//     if (!res.ok) return null;
//     return await res.json();
//   } catch (error) {
//     console.error("Failed to fetch room:", error);
//     return null;
//   }
// };
// export const metadata = {
//   title: "StudyNook – Room Details",

// };

// const RoomDetails = async ({ params }) => {
//   const { id } = await params;
//       const {token} = await auth.api.getToken({
//           headers: await headers(),
//       });
//   console.log(token);
//       const room = await fetchRoom(id,token);

//   if (!room) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
//         <p className="text-5xl mb-4">🚪</p>
//         <h2 className="text-xl font-bold text-gray-800 mb-2">Room Not Found</h2>
//         <p className="text-gray-500 text-sm mb-6">
//           This room may have been removed or doesn&apos;t exist.
//         </p>
//         <Link
//           href="/rooms"
//           className="text-sm font-semibold text-blue-600 hover:text-blue-700 no-underline"
//         >
//           ← Back to Rooms
//         </Link>
//       </div>
//     );
//   }

//   const {
//     image,
//     name,
//     description,
//     floor,
//     capacity,
//     hourlyRate,
//     amenities = [],
//   } = room;

//   return (
//     <div className="min-h-screen bg-[#f8f9fc]">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
//         {/* Back link */}
//         <Link
//           href="/rooms"
//           className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors no-underline mb-6"
//         >
//           <ChevronLeft size={16} />
//           Back to Rooms
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
//           {/* ── Left: Image + details ── */}
//           <div className="lg:col-span-3 flex flex-col gap-6">
//             {/* Image */}
//             <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-200 relative">
//               <Image
//                 src={image}
//                 alt={name}
//                 fill
//                 className="object-cover"
//                 sizes="(max-width: 1024px) 100vw, 60vw"
//                 priority
//               />
//             </div>

//             {/* Room info card */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
//               {/* Name + rate */}
//               <div className="flex items-start justify-between gap-4">
//                 <h1 className="text-2xl font-bold text-gray-900 leading-tight">
//                   {name}
//                 </h1>
//                 <span className="shrink-0 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
//                   {hourlyRate}
//                 </span>
//               </div>

//               {/* Description */}
//               <p className="text-gray-500 text-sm leading-relaxed">
//                 {description}
//               </p>

//               {/* Divider */}
//               <hr className="border-gray-100" />

//               {/* Stats row */}
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-4">
//                   <MapPin size={18} className="text-blue-500" />
//                   <span className="text-xs text-gray-400 font-medium">
//                     Floor
//                   </span>
//                   <span className="text-sm font-bold text-gray-800">
//                     {floor}
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-4">
//                   <Users size={18} className="text-blue-500" />
//                   <span className="text-xs text-gray-400 font-medium">
//                     Capacity
//                   </span>
//                   <span className="text-sm font-bold text-gray-800">
//                     {capacity} people
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-4">
//                   <Clock size={18} className="text-blue-500" />
//                   <span className="text-xs text-gray-400 font-medium">
//                     Rate
//                   </span>
//                   <span className="text-sm font-bold text-gray-800">
//                     {hourlyRate}
//                   </span>
//                 </div>
//               </div>

//               {/* Amenities */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">
//                   Amenities
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {amenities.map((amenity) => (
//                     <span
//                       key={amenity}
//                       className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full"
//                     >
//                       <Wifi size={11} />
//                       {amenity}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Right: Booking card ── */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5 sticky top-20">
//               <div>
//                 <h2 className="text-lg font-bold text-gray-900">
//                   Reserve This Room
//                 </h2>
//                 <p className="text-xs text-gray-400 mt-0.5">
//                   Instant booking · No double-booking
//                 </p>
//               </div>

//               <hr className="border-gray-100" />

//               {/* Pricing breakdown */}
//               <div className="flex flex-col gap-2 text-sm">
//                 <div className="flex justify-between text-gray-500">
//                   <span>Hourly rate</span>
//                   <span className="font-semibold text-gray-800">
//                     {hourlyRate}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-gray-500">
//                   <span>Capacity</span>
//                   <span className="font-semibold text-gray-800">
//                     {capacity} people
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-gray-500">
//                   <span>Location</span>
//                   <span className="font-semibold text-gray-800">
//                     Floor {floor}
//                   </span>
//                 </div>
//               </div>

//               <hr className="border-gray-100" />

//               {/* Book Now button */}
//               <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold py-3.5 rounded-xl transition-colors">
//                 Book Now
//               </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomDetails;

import React from "react";
import { MapPin, Users, Clock, Wifi, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RoomActions from "@/components/RoomActions";

const fetchRoom = async (id, token) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
      headers: {
        authorization: `Bearer ${token}` || "",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch room:", error);
    return null;
  }
};

const RoomDetails = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  // Get current user to check ownership
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUserId = session?.user?.id ?? null;

  const room = await fetchRoom(id, token);

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-5xl mb-4">🚪</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Room Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">
          This room may have been removed or doesn&apos;t exist.
        </p>
        <Link
          href="/rooms"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 no-underline"
        >
          ← Back to Rooms
        </Link>
      </div>
    );
  }

  const {
    image,
    name,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;

  // Serialize for client component (_id is ObjectId, must be string)
  const serializedRoom = { ...room, _id: room._id.toString() };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link
          href="/rooms"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors no-underline mb-6"
        >
          <ChevronLeft size={16} />
          Back to Rooms
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* ── Left: Image + details ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Image */}
            <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-200 relative">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>

            {/* Room info card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
              {/* Name + rate */}
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {name}
                </h1>
                <span className="shrink-0 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  ${hourlyRate}/hr
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {description}
              </p>

              <hr className="border-gray-100" />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-4">
                  <MapPin size={18} className="text-blue-500" />
                  <span className="text-xs text-gray-400 font-medium">
                    Floor
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {floor}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-4">
                  <Users size={18} className="text-blue-500" />
                  <span className="text-xs text-gray-400 font-medium">
                    Capacity
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {capacity} people
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-4">
                  <Clock size={18} className="text-blue-500" />
                  <span className="text-xs text-gray-400 font-medium">
                    Rate
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    ${hourlyRate}/hr
                  </span>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full"
                    >
                      <Wifi size={11} />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Booking card ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-20">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Reserve This Room
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Instant booking · No double-booking
                </p>
              </div>

              <hr className="border-gray-100 mb-4" />

              <RoomActions
                room={serializedRoom}
                currentUserId={currentUserId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;