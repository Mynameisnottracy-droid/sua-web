import Image from "next/image";
import { getEvents, urlFor } from "@/lib/queries";

export const metadata = {
  title: "Evenemang — SUA",
};

const MONTHS_SV = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];

type Event = {
  _id: string;
  rubrik: string;
  slug: { current: string };
  ingress: string;
  eventdatum: string;
  eventslut?: string;
  plats?: string;
  kategori?: string;
  bild?: unknown;
};

const FALLBACK_EVENTS: Event[] = [
  { _id: "1", rubrik: "Frukostseminarium: AI i offentlig sektor", slug: { current: "#" }, ingress: "", eventdatum: "2026-05-06T08:00:00", eventslut: "2026-05-06T09:30:00", plats: "Campus Skellefteå", kategori: "Seminarium" },
  { _id: "2", rubrik: "Nätverksmöte för utbildningsaktörer i norr", slug: { current: "#" }, ingress: "", eventdatum: "2026-05-14T13:00:00", eventslut: "2026-05-14T16:00:00", plats: "Kulturhuset Skellefteå", kategori: "Nätverksmöte" },
  { _id: "3", rubrik: "Öppet hus: ELVA — en ny utbildningsmodell", slug: { current: "#" }, ingress: "", eventdatum: "2026-06-03T10:00:00", eventslut: "2026-06-03T12:00:00", plats: "Online", kategori: "Webinar" },
  { _id: "4", rubrik: "Konferens: Framtidens campus i grön omställning", slug: { current: "#" }, ingress: "", eventdatum: "2026-06-18T09:00:00", eventslut: "2026-06-19T17:00:00", plats: "Scandic Skellefteå", kategori: "Konferens" },
];

function EventCard({ event }: { event: Event }) {
  const start = new Date(event.eventdatum);
  const end = event.eventslut ? new Date(event.eventslut) : null;
  const dayNum = start.getDate();
  const month = MONTHS_SV[start.getMonth()];
  const year = start.getFullYear();
  const time = start.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
  const endTime = end?.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageUrl = (event as any).bild ? urlFor((event as any).bild).width(240).height(240).url() : null;

  return (
    <a
      href={event.slug.current === "#" ? "#" : `/events/${event.slug.current}`}
      style={{ display: "flex", gap: "0", backgroundColor: "#EBE9E1", textDecoration: "none", overflow: "hidden", height: "238px" }}
      className="group"
    >
      {/* Bild med badge */}
      <div style={{ width: "160px", minWidth: "160px", height: "238px", position: "relative", backgroundColor: "#D0CCC4", flexShrink: 0 }}>
        {imageUrl && (
          <Image src={imageUrl} alt={event.rubrik} fill style={{ objectFit: "cover" }} />
        )}
        {event.kategori && (
          <div style={{ position: "absolute", top: "12px", left: "0", width: "87px", height: "35px", backgroundColor: "#FE5000", color: "#FFFFFF", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 6px" }}>
            {event.kategori}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ width: "240px", minWidth: "240px", padding: "20px 18px", display: "flex", flexDirection: "column", gap: "4px", overflow: "hidden" }}>
        {/* Datum */}
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "20px", letterSpacing: "-0.02em", lineHeight: 1, color: "#201515" }}>
          {dayNum} {month} {year}
        </div>
        {/* Tid */}
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "12px", color: "#555555" }}>
          {time}{endTime && ` – ${endTime}`}
        </div>
        {/* Rubrik */}
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "14px", color: "#201515", lineHeight: 1.3, marginTop: "6px" }} className="group-hover:underline underline-offset-2">
          {event.rubrik}
        </div>
        {/* Plats */}
        {event.plats && (
          <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "12px", color: "#888888", marginTop: "4px" }}>
            {event.plats}
          </div>
        )}
      </div>
    </a>
  );
}

export default async function EventsPage() {
  let events: Event[] = [];
  try {
    const fetched = await getEvents();
    const real = fetched || [];
    const needed = Math.max(0, 4 - real.length);
    events = [...real, ...FALLBACK_EVENTS.slice(0, needed)];
  } catch {
    events = FALLBACK_EVENTS;
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: "#201515" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#FE5000", marginBottom: "16px", margin: "0 0 16px" }}>
            Kalender
          </p>
          <h1 style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.95, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#FFFFFF", margin: "0 0 16px" }}>
            Evenemang
          </h1>
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "17px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", maxWidth: "480px", margin: 0 }}>
            Här hittar du aktiviteter och händelser från SUA.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
