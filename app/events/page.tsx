import { getEvents } from "@/lib/queries";

export const metadata = {
  title: "Events — SUA",
};

const MONTHS_SV = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
const DAYS_SV = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];

type Event = {
  _id: string;
  rubrik: string;
  slug: { current: string };
  ingress: string;
  eventdatum: string;
  eventslut?: string;
  plats?: string;
  kategori?: string;
};

function groupByMonth(events: Event[]) {
  const groups: Record<string, Event[]> = {};
  for (const event of events) {
    const date = new Date(event.eventdatum);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(event);
  }
  return groups;
}

export default async function EventsPage() {
  const events: Event[] = await getEvents();
  const grouped = groupByMonth(events || []);

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#201515" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#FE5000", marginBottom: "16px" }}>
            Kalender
          </p>
          <h1 style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.95, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#FFFFFF", marginBottom: "16px" }}>
            Kommande events
          </h1>
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", maxWidth: "520px", margin: 0 }}>
            Seminarier, nätverksmöten och konferenser kopplade till SUA och utbildningslandskapet i Skellefteå.
          </p>
        </div>
      </div>

      {/* Event list */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>
        {events?.length === 0 && (
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", color: "#555555" }}>Inga kommande events publicerade ännu.</p>
        )}

        {Object.entries(grouped).map(([key, monthEvents]) => {
          const firstDate = new Date(monthEvents[0].eventdatum);
          const monthLabel = `${MONTHS_SV[firstDate.getMonth()]} ${firstDate.getFullYear()}`;

          return (
            <div key={key} style={{ marginBottom: "56px" }}>
              {/* Månadshuvud */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#000000", whiteSpace: "nowrap" }}>
                  {monthLabel}
                </span>
                <div style={{ flex: 1, borderTop: "1px dashed rgba(0,0,0,0.2)" }} />
              </div>

              {/* Events i månaden */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {monthEvents.map((event) => {
                  const start = new Date(event.eventdatum);
                  const end = event.eventslut ? new Date(event.eventslut) : null;
                  const dayName = DAYS_SV[start.getDay()];
                  const dayNum = start.getDate();
                  const month = MONTHS_SV[start.getMonth()].slice(0, 3).toLowerCase();
                  const time = start.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
                  const endTime = end?.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

                  return (
                    <a
                      key={event._id}
                      href={`/events/${event.slug.current}`}
                      style={{ display: "flex", alignItems: "flex-start", gap: "24px", padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", textDecoration: "none" }}
                      className="group"
                    >
                      {/* Datum-block */}
                      <div style={{ minWidth: "64px", textAlign: "center", flexShrink: 0 }}>
                        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#555555" }}>
                          {dayName}
                        </div>
                        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "36px", lineHeight: 1, letterSpacing: "-0.03em", color: "#201515" }}>
                          {dayNum}
                        </div>
                        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#FE5000" }}>
                          {month}
                        </div>
                      </div>

                      {/* Vertikal separator */}
                      <div style={{ width: "2px", backgroundColor: "#FE5000", alignSelf: "stretch", flexShrink: 0, minHeight: "60px" }} />

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        {/* Tid och plats */}
                        <div style={{ display: "flex", gap: "16px", marginBottom: "6px", flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "12px", color: "#555555" }}>
                            {time}{endTime && ` – ${endTime}`}
                          </span>
                          {event.plats && (
                            <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "12px", color: "#555555" }}>
                              📍 {event.plats}
                            </span>
                          )}
                          {event.kategori && (
                            <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#FE5000" }}>
                              {event.kategori}
                            </span>
                          )}
                        </div>
                        {/* Rubrik */}
                        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "17px", color: "#000000", lineHeight: 1.3, marginBottom: "6px" }} className="group-hover:underline underline-offset-2">
                          {event.rubrik}
                        </div>
                        {/* Ingress */}
                        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "14px", color: "#555555", lineHeight: 1.5 }}>
                          {event.ingress}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
