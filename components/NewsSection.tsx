"use client";

import { useState } from "react";

const news = [
  {
    date: "23 mars 2026",
    category: "Event",
    title: "SUA och MIT Open Learning arrangerar think tank-dag om tillgänglig utbildning",
    excerpt: "En dag för strategiska samtal om hur utbildning kan göras mer tillgänglig — med deltagare från akademi, näringsliv och offentlig sektor.",
    href: "/aktuellt/think-tank",
  },
  {
    date: "20 jan 2026",
    category: "Team",
    title: "SUA rekryterar Olof Gränström: Kunskap måste bli begriplig för att få effekt",
    excerpt: "Olof Gränström kliver in som kommunikationsstrateg med ett tydligt uppdrag: att göra SUA:s arbete synligt och förståeligt.",
    href: "/aktuellt/olof-granstrom",
  },
  {
    date: "9 okt 2025",
    category: "Team",
    title: "Han har satt standarden för digitala upplevelser — nu tar han sig an utbildningsvärlden",
    excerpt: "Med bakgrund i ledande designroller på globala bolag byter han nu perspektiv och riktar blicken mot hur lärande kan se ut i framtiden.",
    href: "/aktuellt/david-eriksson",
  },
];

function NewsCard({ item }: { item: typeof news[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
    >
      {/* Image 3:2 */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 2",
          backgroundColor: "#EBE9E1",
          marginBottom: "16px",
          overflow: "hidden",
        }}
      />

      {/* Meta */}
      <div
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#FE5000",
          marginBottom: "8px",
        }}
      >
        {item.date} · {item.category}
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: "17px",
          color: "#000000",
          lineHeight: 1.25,
          marginBottom: "10px",
          textDecoration: hovered ? "underline" : "none",
          textUnderlineOffset: "3px",
          transition: "text-decoration 150ms",
        }}
      >
        {item.title}
      </div>

      {/* Excerpt */}
      <div
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          color: "#555555",
          lineHeight: 1.6,
        }}
      >
        {item.excerpt}
      </div>
    </a>
  );
}

export default function NewsSection() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "56px 24px",
        }}
      >
        {/* Section heading */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 900,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#000000",
              whiteSpace: "nowrap",
            }}
          >
            Aktuellt
          </span>
          <div style={{ flex: 1, borderTop: "1px dashed rgba(0,0,0,0.2)" }} />
        </div>

        {/* 3-column card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {news.map((item, i) => (
            <NewsCard key={i} item={item} />
          ))}
        </div>

        {/* All news link */}
        <a
          href="/aktuellt"
          style={{
            display: "inline-block",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            color: "#FE5000",
            textDecoration: "none",
            letterSpacing: "0.04em",
            borderBottom: "2px solid #FE5000",
            paddingBottom: "2px",
          }}
        >
          Visa alla nyheter →
        </a>
      </div>
    </div>
  );
}
