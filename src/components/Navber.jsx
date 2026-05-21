"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { BookOpen, ChevronDown, Menu, X } from "lucide-react";
import { HiOutlineHome } from "react-icons/hi";
import { MdMeetingRoom } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { RiCalendarCheckLine } from "react-icons/ri";
import { LuLogOut, LuUser } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

const PUBLIC_LINKS = [
  { href: "/", label: "Home", icon: <HiOutlineHome className="text-base" /> },
  {
    href: "/rooms",
    label: "Rooms",
    icon: <MdMeetingRoom className="text-base" />,
  },
];

const PRIVATE_LINKS = [
  {
    href: "/add-room",
    label: "Add Room",
    icon: <IoAddCircleOutline className="text-base" />,
  },
  {
    href: "/my-listings",
    label: "My Listings",
    icon: <BsBuildings className="text-base" />,
  },
  {
    href: "/my-bookings",
    label: "My Bookings",
    icon: <RiCalendarCheckLine className="text-base" />,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Handle scroll opacity changes
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Collapse mobile burger overlay on window scaling
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Closes dropdown overlay automatically if clicking on outside elements
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinkClass = (href) => {
    const isActive = pathname === href;
    return `flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 no-underline ${
      isActive
        ? "bg-neutral-900 text-white"
        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
    }`;
  };

  const mobileNavLinkClass = (href) => {
    const isActive = pathname === href;
    return `flex items-center gap-2.5 text-sm font-medium px-3 py-2.5 rounded-xl transition-colors no-underline ${
      isActive
        ? "bg-neutral-900 text-white"
        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
    }`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 shadow-sm" : "bg-white/60"
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Brand ── */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline flex-shrink-0"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-900 text-white">

              <BookOpen size={16} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight text-neutral-900">
              Study<span className="font-light text-neutral-400">Nook</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {PUBLIC_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {(user || isPending) && (
              <>
                <span className="h-4 w-px bg-neutral-300 mx-1" />
                {PRIVATE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={navLinkClass(link.href)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* ── Desktop right: auth ── */}
          <div className="hidden md:flex items-center gap-2">
            {isPending ? (
              <div className="flex items-center gap-2 pl-1 pr-3 py-1 h-8 w-28 rounded-full bg-neutral-100 animate-pulse" />
            ) : user ? (
              /* ── Custom HTML/Tailwind Profile Dropdown (FIXED IMAGES) ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer select-none border-none bg-transparent"
                >
                  {/* ডেস্কটপ ইমেজ চেকিং */}
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-neutral-200"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const fallback = e.target.nextSibling;
                        if (fallback) fallback.classList.remove("hidden");
                      }}
                    />
                  ) : null}

                  {/* ডেস্কটপ ফলব্যাক লেটার অ্যাভাটার */}
                  <Avatar
                    name={user.name}
                    size="sm"
                    className={`w-8 h-8 flex-shrink-0 ${user.image ? "hidden" : ""}`}
                  />

                  <span className="text-sm font-medium text-neutral-800 hidden lg:block max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-neutral-400 flex-shrink-0 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu Overlay */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-100">
                    <button
                      onClick={() => {
                        router.push("/my-listings");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors text-left border-none bg-transparent"
                    >
                      <BsBuildings className="text-neutral-500" />
                      My Listings
                    </button>
                    <button
                      onClick={() => {
                        router.push("/my-bookings");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors text-left border-none bg-transparent"
                    >
                      <RiCalendarCheckLine className="text-neutral-500" />
                      My Bookings
                    </button>
                    <hr className="border-neutral-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium border-none bg-transparent"
                    >
                      <LuLogOut />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Logged out (FIXED WRAPPERS) ── */
              <>
                <Link href="/login" passHref className="no-underline">
                  <Button
                    variant="light"
                    size="sm"
                    className="font-medium text-neutral-600"
                    startContent={<LuUser size={15} />}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" passHref className="no-underline">
                  <Button
                    size="sm"
                    className="font-semibold bg-neutral-900 text-white hover:bg-neutral-700 rounded-full px-5"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-white/95 backdrop-blur-md border-t border-neutral-100`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold px-3 mb-1">
            Navigation
          </p>
          {PUBLIC_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={mobileNavLinkClass(link.href)}
            >
              <span
                className={
                  pathname === link.href ? "text-white" : "text-neutral-500"
                }
              >
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}

          {(user || isPending) && (
            <>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold px-3 mt-3 mb-1">
                My Account
              </p>
              {PRIVATE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileNavLinkClass(link.href)}
                >
                  <span
                    className={
                      pathname === link.href ? "text-white" : "text-neutral-400"
                    }
                  >
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
            </>
          )}

          <hr className="border-neutral-100 my-3" />

          {isPending ? (
            <div className="h-8 w-full bg-neutral-100 animate-pulse rounded-xl" />
          ) : user ? (
            /* Mobile logged in (FIXED IMAGES) */
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2.5">
                {/* মোবাইল ইমেজ চেকিং */}
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-neutral-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const fallback = e.target.nextSibling;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                ) : null}

                <Avatar
                  name={user.name}
                  size="sm"
                  className={`w-8 h-8 flex-shrink-0 ${user.image ? "hidden" : ""}`}
                />
                <div>
                  <p className="text-sm font-semibold text-neutral-800 leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-400 truncate max-w-[160px]">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors border-none bg-transparent cursor-pointer"
              >
                <LuLogOut size={15} />
                Logout
              </button>
            </div>
          ) : (
            /* Mobile logged out (FIXED WRAPPERS) */
            <div className="flex gap-2">
              <Link href="/login" passHref className="flex-1 no-underline">
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  variant="bordered"
                  className="w-full font-medium border-neutral-300 text-neutral-700 rounded-full hover:border-neutral-700"
                  size="sm"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" passHref className="flex-1 no-underline">
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full font-semibold bg-neutral-900 text-white rounded-full"
                  size="sm"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

