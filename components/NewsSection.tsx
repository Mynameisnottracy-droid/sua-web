import Image from "next/image";
import { getNyheter, urlFor } from "@/lib/queries";

const news_fallback = [
  {
    date: "23 mars 2026",
    category: "Event",
    title: "SUA och MIT Open Learning arrangerar think tank-dag om tillgänglig utbildning",
    excerpt: "En dag för strategiska samtal om hur utbildning kan göras mer tillgänglig — med deltagare från akademi, näringsliv och offentlig sektor.",
    href: "/aktuellt/think-tank",
    image: null,
  },
  {
    date: "20 jan 2026",
    category: "Team",
    title: "SUA rekryterar Olof Gränström: Kunskap måste bli begriplig för att få effekt",
    excerpt: "Olof Gränström kliver in som kommunikationsstrateg med ett tydligt uppdrag: att göra SUA:s arbete synligt och förståeligt.",
    href: "/aktuellt/olof-granstrom",
    image: null,
  },
  {
    date: "9 okt 2025",
    category: "Team",
    title: "Han har satt standarden för digitala upplevelser — nu tar han sig an utbildningsvärlden",
    excerpt: "Med bakgrund i ledande designroller på globala bolag byter han nu perspektiv och riktar blicken mot hur lärande kan se ut i framtiden.",
    href: "/aktuellt/david-eriksson",
    image: null,
  },
];

function NewsCard({ item }: { item: { title: string; category: string; date: string; excerpt: string; href: string; image: string | null } }) {
  return (
    <a href={item.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
      className="group"
    >
      {/* Image 3:2 */}
      <div style={{ width: "100%", aspectRatio: "3 / 2", backgroundColor: "#EBE9E1", marginBottom: "16px", overflow: "hidden", position: "relative" }}>
        {item.image && (
          <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
        )}
      </div>

      {/* Meta */}
      <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#FE5000", marginBottom: "8px" }}>
        {item.date} · {item.category}
      </div>

      {/* Title */}
      <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "17px", color: "#000000", lineHeight: 1.25, marginBottom: "10px" }}
        className="group-hover:underline underline-offset-2"
      >
        {item.title}
      </div>

      {/* Excerpt */}
      <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "14px", color: "#555555", lineHeight: 1.6 }}>
        {item.excerpt}
      </div>
    </a>
  );
}

export default async function NewsSection() {
  let items = news_fallback;

  try {
    const sanityNyheter = await getNyheter(3);
    if (sanityNyheter?.length > 0) {
      items = sanityNyheter.map((n: {rubrik: string; kategori: string; publiceringsdatum: string; ingress: string; slug: {current: string}; bild: unknown}) => ({
        title: n.rubrik,
        category: n.kategori,
        date: new Date(n.publiceringsdatum).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" }),
        excerpt: n.ingress,
        href: `/aktuellt/${n.slug.current}`,
        image: n.bild ? urlFor(n.bild).width(600).height(400).url() : null,
      }));
    }
  } catch {
    // Visa fallback om Sanity inte svarar
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>

        {/* Heading */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#000000", whiteSpace: "nowrap" }}>
            Aktuellt
          </span>
          <div style={{ flex: 1, borderTop: "1px dashed rgba(0,0,0,0.2)" }} />
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", marginBottom: "40px" }}>
          {items.map((item, i) => (
            <NewsCard key={i} item={item} />
          ))}
        </div>

        {/* All news */}
        <a href="/aktuellt" style={{ display: "inline-block", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "13px", color: "#FE5000", textDecoration: "none", borderBottom: "2px solid #FE5000", paddingBottom: "2px" }}>
          Visa alla nyheter →
        </a>
      </div>
    </div>
  );
}
