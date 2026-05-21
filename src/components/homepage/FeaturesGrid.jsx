import React from "react";
import { ShieldCheck, Calendar, Users, Zap } from "lucide-react";

export default function FeaturesGrid() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto bg-white rounded-3xl my-10 border border-slate-100 shadow-sm">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Study smarter, together.
        </h2>
        <p className="mt-4 text-xl text-slate-600">
          StudyNook bridges the gap between students who need a quiet space and
          peer hosts with room access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Feature 1 */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-900">
            Zero Double-Bookings
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Our automated time-conflict engine locks slots instantly. No
            overlaps, no awkward walk-ins, no lost study time.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-900">
            Flexible Hourly Slots
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Book exactly what you need. From a quick 1-hour cram session to a
            dedicated half-day group project marathon.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-6">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-900">
            Host & Control Listings
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Control a private library room? List it when you&apos;re not using it to
            help peers out and manage listings seamlessly from your hub.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-900">
            Secure JWT Auth
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Your security matters. Enjoy rapid browsing with safe HTTP-only
            cookie authentication built directly into your session.
          </p>
        </div>
      </div>
    </section>
  );
}
