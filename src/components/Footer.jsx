import Link from "next/link";
import { BookOpen, LogIn, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { MdMeetingRoom } from "react-icons/md";


const USEFUL_LINKS = [
  { href: "/", label: "Home", icon: <HiOutlineHome /> },
  { href: "/rooms", label: "Rooms", icon: <MdMeetingRoom /> },
  { href: "/login", label: "Log in", icon: <LogIn /> },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <FaFacebookF size={14} />,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: <FaXTwitter size={14} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <FaLinkedinIn size={14} />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <FaInstagram size={14} />,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400">
      {/* ── Main section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 no-underline w-fit"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-neutral-950">
                <BookOpen size={16} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Study<span className="font-light text-neutral-500">Nook</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-500 max-w-xs">
              Find and book the perfect study room. Quiet, productive spaces
              whenever you need them.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-1">
              {USEFUL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors duration-200 no-underline py-1.5 group"
                  >
                    <span className="text-neutral-600 group-hover:text-neutral-300 transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@studynook.com"
                  className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors duration-200 no-underline group"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800 group-hover:bg-neutral-700 transition-colors text-neutral-400 group-hover:text-white">
                    <Mail size={15} />
                  </span>
                  hello@studynook.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801700000000"
                  className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors duration-200 no-underline group"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800 group-hover:bg-neutral-700 transition-colors text-neutral-400 group-hover:text-white">
                    <Phone size={15} />
                  </span>
                  +880 170 000 0000
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <hr className="border-neutral-800" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-neutral-600">
          © {year} StudyNook. All rights reserved.
        </p>
        <p className="text-xs text-neutral-700">
          Made with care for learners everywhere.
        </p>
      </div>
    </footer>
  );
}
