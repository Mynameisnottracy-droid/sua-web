"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Hem", href: "/" },
  { label: "Om SUA", href: "/om-sua" },
  { label: "Aktuellt", href: "/aktuellt" },
  { label: "Utbildningar", href: "/utbildningar" },
  { label: "ELVA", href: "/elva" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav
        style={{ backgroundColor: "#201515", height: "52px" }}
        className="sticky top-0 z-50 w-full"
      >
        <div
          className="flex items-center justify-between h-full mx-auto"
          style={{ maxWidth: "1200px", padding: "0 24px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/sua-logo.svg"
              alt="SUA"
              height={32}
              width={0}
              style={{ width: "auto", height: "32px" }}
              priority
            />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              href="/kontakt"
              style={{
                backgroundColor: "#FE5000",
                color: "#FFFFFF",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: "13px",
                borderRadius: 0,
                padding: "8px 20px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Kontakt
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Öppna meny"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect y="4" width="24" height="2" fill="white" />
                <rect y="11" width="24" height="2" fill="white" />
                <rect y="18" width="24" height="2" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 60,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "320px",
          height: "100%",
          backgroundColor: "#201515",
          zIndex: 70,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms ease",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Stäng meny"
          style={{
            alignSelf: "flex-end",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            marginBottom: "48px",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="4" x2="4" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Links */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "32px" }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontSize: "18px",
                    color: isActive ? "#FE5000" : "#FFFFFF",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
