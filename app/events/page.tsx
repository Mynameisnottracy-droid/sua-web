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

export default async function EventsPage() {
  const events: Event[] = await getEvents();

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#201515" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#FE5000", marginBottom: "16px" }}>
            Kalender
          </p>
          <h1 style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.95, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#FFFFFF", marginBottom: "16px" }}>
            Evenemang
          </h1>
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", maxWidth: "520px", margin: 0 }}>
            Här hittar du aktiviteter och händelser från SUA.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>
        {(!events || events.length === 0) && (
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", color: "#555555" }}>Inga kommande evenemang publicerade ännu.</p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {events?.map((event) => {
            const start = new Date(event.eventdatum);
            const end = event.eventslut ? new Date(event.eventslut) : null;
            const dayNum = start.getDate();
            const month = MONTHS_SV[start.getMonth()];
            const year = start.getFullYear();
            const time = start.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
            const endTime = end?.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
            const imageUrl = event.bild ? urlFor(event.bild).width(240).height(240).url() : null;

            return (
              <a
                key={event._id}
                href={`/events/${event.slug.current}`}
                style={{ display: "flex", gap: "20px", backgroundColor: "#EBE9E1", padding: "20px", textDecoration: "none" }}
                className="group"
              >
                {/* Bild/platshållare */}
                <div style={{ width: "120px", height: "120px", minWidth: "120px", backgroundColor: "#D8D4CC", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  {imageUrl && (
                    <Image src={imageUrl} alt={event.rubrik} fill style={{ objectFit: "cover" }} />
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                  {/* Badge */}
                  {event.kategori && (
                    <div style={{ display: "inline-block", alignSelf: "flex-start", backgroundColor: "#FE5000", color: "#FFFFFF", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", padding: "3px 8px" }}>
                      {event.kategori}
                    </div>
                  )}

                  {/* Datum */}
                  <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "22px", letterSpacing: "-0.02em", lineHeight: 1, color: "#201515" }}>
                    {dayNum} {month} {year}
                  </div>

                  {/* Tid */}
                  <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "13px", color: "#555555" }}>
                    {time}{endTime && ` – ${endTime}`}
                  </div>

                  {/* Rubrik */}
                  <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "15px", color: "#201515", lineHeight: 1.3 }} className="group-hover:underline underline-offset-2">
                    {event.rubrik}
                  </div>

                  {/* Plats */}
                  {event.plats && (
                    <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "13px", color: "#888888" }}>
                      {event.plats}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
