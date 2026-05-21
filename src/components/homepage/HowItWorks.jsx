import React from "react";
import { Search, Key, BookmarkCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Explore & Filter Nooks",
      description:
        "Filter by date, exact time slots, location, or amenities (like whiteboards or display monitors) to find the perfect ecosystem for your focus session.",
      icon: Search,
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      id: "02",
      title: "Reserve Instantly",
      description:
        "Log in via secure JWT cookies, choose your time block, and secure the room. Our architecture handles the synchronization backend so double-booking is physically impossible.",
      icon: Key,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      id: "03",
      title: "Manage Your Hub",
      description:
        "Track active bookings, view room access details, or list your own spaces on a dedicated user-centric dashboard engineered for clean data visibility.",
      icon: BookmarkCheck,
      iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-slate-50 rounded-3xl my-12 border border-slate-100 shadow-inner">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-indigo-700 bg-indigo-50 uppercase mb-4">
          Seamless Workflow
        </span>
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Secure your spot in 3 easy steps
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          From discovery to reservation, StudyNook cuts the friction out of
          finding campus study spaces.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative max-w-5xl mx-auto">
        {/* Dynamic vertical track line */}
        <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-slate-200" />

        {/* Steps Loop */}
        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 1;

            return (
              <div
                key={step.id}
                className={`relative flex flex-col lg:flex-row items-start ${
                  isEven ? "lg:flex-row-reverse" : ""
                } justify-between w-full pl-16 lg:pl-0`}
              >
                {/* Timeline Node/Badge */}
                <div className="absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 top-0 z-10 flex items-center justify-center w-16 h-16 bg-white rounded-2xl border border-slate-100 shadow-md transition-transform duration-300 hover:scale-110">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${step.iconBg}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Block */}
                <div
                  className={`w-full lg:w-[44%] ${isEven ? "lg:text-left" : "lg:text-right"}`}
                >
                  <div className="inline-flex items-center space-x-2 mb-2">
                    {isEven ? (
                      <>
                        <span className="text-indigo-600 font-extrabold text-lg">
                          {step.id}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden lg:inline-block" />
                        <span className="text-indigo-600 font-extrabold text-lg lg:order-last">
                          {step.id}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p
                    className={`text-slate-600 leading-relaxed text-base ${!isEven ? "lg:ml-auto" : ""} max-w-lg`}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Empty visual spacing node for large screens layout alignment */}
                <div className="hidden lg:block w-[44%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
