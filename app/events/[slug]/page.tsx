import { getEvent, urlFor } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

const sectionStyle = { maxWidth: "760px", margin: "0 auto", padding: "64px 24px" };

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const imageUrl = event.bild ? urlFor(event.bild).width(1200).height(800).url() : null;
  const startDate = new Date(event.eventdatum);
  const endDate = event.eventslut ? new Date(event.eventslut) : null;

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div style={sectionStyle}>

        {/* Meta */}
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#FE5000", marginBottom: "16px" }}>
          {event.kategori || "Event"}
        </div>

        {/* Rubrik */}
        <h1 style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#201515", marginBottom: "24px" }}>
          {event.rubrik}
        </h1>

        {/* Ingress */}
        <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: 1.6, color: "#333333", marginBottom: "40px", borderLeft: "3px solid #FE5000", paddingLeft: "20px" }}>
          {event.ingress}
        </p>

        {/* Eventinfo */}
        <div style={{ backgroundColor: "#EBE9E1", padding: "24px 28px", marginBottom: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px" }}>
          <div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FE5000", marginBottom: "6px" }}>Datum</div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "15px", color: "#201515" }}>
              {startDate.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FE5000", marginBottom: "6px" }}>Tid</div>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "15px", color: "#201515" }}>
              {startDate.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })}
              {endDate && ` – ${endDate.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })}`}
            </div>
          </div>
          {event.plats && (
            <div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FE5000", marginBottom: "6px" }}>Plats</div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "15px", color: "#201515" }}>{event.plats}</div>
            </div>
          )}
        </div>

        {/* Bild */}
        {imageUrl && (
          <div style={{ width: "100%", aspectRatio: "3/2", position: "relative", marginBottom: "40px" }}>
            <Image src={imageUrl} alt={event.rubrik} fill style={{ objectFit: "cover" }} />
          </div>
        )}

        {/* Brödtext */}
        {event.brodtext && (
          <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "17px", lineHeight: 1.75, color: "#333333" }}>
            <PortableText value={event.brodtext} />
          </div>
        )}

        {/* Citat */}
        {event.citat && (
          <blockquote style={{ margin: "48px 0", padding: "0 32px", borderLeft: "4px solid #FE5000" }}>
            <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "22px", lineHeight: 1.4, color: "#201515", fontStyle: "italic", marginBottom: "12px" }}>
              "{event.citat}"
            </p>
          </blockquote>
        )}

        {/* Faktaruta */}
        {event.faktaruta?.rubrik && (
          <div style={{ backgroundColor: "#EBE9E1", padding: "28px 32px", marginTop: "48px" }}>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FE5000", marginBottom: "12px" }}>
              {event.faktaruta.rubrik}
            </div>
            <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, color: "#333333", margin: 0 }}>
              {event.faktaruta.innehall}
            </p>
          </div>
        )}

        {/* Anmälningslänk */}
        {event.anmalanlank && (
          <a href={event.anmalanlank} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "48px", backgroundColor: "#FE5000", color: "#FFFFFF", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "13px", padding: "14px 28px", textDecoration: "none" }}>
            Anmäl dig →
          </a>
        )}

        {/* Tillbaka */}
        <div>
          <a href="/events" style={{ display: "inline-block", marginTop: "56px", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "13px", color: "#FE5000", textDecoration: "none", borderBottom: "2px solid #FE5000", paddingBottom: "2px" }}>
            ← Alla events
          </a>
        </div>

      </div>
    </div>
  );
}
