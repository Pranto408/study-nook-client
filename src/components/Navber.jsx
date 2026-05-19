"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";
import { BookOpen, ChevronDown, Menu, X } from "lucide-react";
import { HiOutlineHome } from "react-icons/hi";
import { MdMeetingRoom } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { RiCalendarCheckLine } from "react-icons/ri";
import { LuLogOut, LuUser } from "react-icons/lu";

// Mock user — swap with real auth context later
// null = logged out | object = logged in
const MOCK_USER = null;
// const MOCK_USER = { name: "Arif Hossain", photo: "https://i.pravatar.cc/40?img=12" };

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

          {/* ── Desktop center links ── */}
          <nav className="hidden md:flex items-center gap-1">
            {PUBLIC_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-all duration-200 no-underline"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <span className="h-4 w-px bg-neutral-300 mx-1" />

            {PRIVATE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-all duration-200 no-underline"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop right: auth ── */}
          <div className="hidden md:flex items-center gap-2">
            {MOCK_USER ? (
              /* Logged in */
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-neutral-100 transition-colors outline-none cursor-pointer">
                    <Avatar
                      src={MOCK_USER.photo}
                      name={MOCK_USER.name}
                      size="sm"
                      className="w-8 h-8"
                    />
                    <span className="text-sm font-medium text-neutral-800 hidden lg:block">
                      {MOCK_USER.name}
                    </span>
                    <ChevronDown size={14} className="text-neutral-400" />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile menu"
                  itemClasses={{ base: "gap-2 text-sm" }}
                >
                  <DropdownSection showDivider>
                    <DropdownItem
                      key="my-listings"
                      startContent={<BsBuildings />}
                      href="/my-listings"
                    >
                      My Listings
                    </DropdownItem>
                    <DropdownItem
                      key="my-bookings"
                      startContent={<RiCalendarCheckLine />}
                      href="/my-bookings"
                    >
                      My Bookings
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownItem
                    key="logout"
                    startContent={<LuLogOut />}
                    className="text-danger"
                    color="danger"
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              /* Logged out */
              <>
                <Button
                  as={Link}
                  href="/login"
                  variant="light"
                  size="sm"
                  className="font-medium text-neutral-600"
                  startContent={<LuUser size={15} />}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  href="/register"
                  size="sm"
                  className="font-semibold bg-neutral-900 text-white hover:bg-neutral-700 rounded-full px-5"
                >
                  Register
                </Button>
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
              className="flex items-center gap-2.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors no-underline"
            >
              <span className="text-neutral-500">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold px-3 mt-3 mb-1">
            My Account
          </p>
          {PRIVATE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors no-underline"
            >
              <span className="text-neutral-400">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          <hr className="border-neutral-100 my-3" />

          <div className="flex gap-2">
            <Button
              as={Link}
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              variant="bordered"
              className="flex-1 font-medium border-neutral-300 text-neutral-700 rounded-full"
              size="sm"
            >
              Login
            </Button>
            <Button
              as={Link}
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="flex-1 font-semibold bg-neutral-900 text-white rounded-full"
              size="sm"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
