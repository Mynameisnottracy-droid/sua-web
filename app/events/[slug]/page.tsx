import { getEvent, urlFor } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

const MONTHS_SV = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const imageUrl = event.bild ? urlFor(event.bild).width(1200).height(800).url() : null;
  const start = new Date(event.eventdatum);
  const end = event.eventslut ? new Date(event.eventslut) : null;
  const datumText = `${start.getDate()} ${MONTHS_SV[start.getMonth()]} ${start.getFullYear()}`;
  const time = start.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
  const endTime = end?.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>

        {/* Badge + rubrik */}
        {event.kategori && (
          <div style={{ display: "inline-block", backgroundColor: "#FE5000", color: "#FFFFFF", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 10px", marginBottom: "20px" }}>
            {event.kategori}
          </div>
        )}

        <h1 style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#201515", marginBottom: "48px", maxWidth: "760px" }}>
          {event.rubrik}
        </h1>

        {/* Två kolumner */}
        <div style={{ display: "grid", gridTemplateColumns: "65% 35%", gap: "48px", alignItems: "flex-start" }}>

          {/* Vänster: brödtext */}
          <div>
            {/* Ingress */}
            <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: 1.6, color: "#333333", marginBottom: "32px", borderLeft: "3px solid #FE5000", paddingLeft: "20px" }}>
              {event.ingress}
            </p>

            {/* Bild */}
            {imageUrl && (
              <div style={{ width: "100%", aspectRatio: "3/2", position: "relative", marginBottom: "32px" }}>
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
              <blockquote style={{ margin: "40px 0", padding: "0 32px", borderLeft: "4px solid #FE5000" }}>
                <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "22px", lineHeight: 1.4, color: "#201515", fontStyle: "italic" }}>
                  "{event.citat}"
                </p>
              </blockquote>
            )}

            {/* Tillbaka */}
            <a href="/events" style={{ display: "inline-block", marginTop: "48px", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "13px", color: "#FE5000", textDecoration: "none", borderBottom: "2px solid #FE5000", paddingBottom: "2px" }}>
              ← Alla evenemang
            </a>
          </div>

          {/* Höger: faktaruta */}
          <div style={{ backgroundColor: "#EBE9E1", borderLeft: "4px solid #FE5000", padding: "32px 28px", position: "sticky", top: "80px" }}>

            {/* Datum */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.14em", color: "#FE5000", marginBottom: "6px" }}>
                Datum
              </div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "20px", color: "#201515", lineHeight: 1.2 }}>
                {datumText}
              </div>
            </div>

            {/* Tid */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.14em", color: "#FE5000", marginBottom: "6px" }}>
                Tid
              </div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "20px", color: "#201515" }}>
                {time}{endTime && ` – ${endTime}`}
              </div>
            </div>

            {/* Plats */}
            {event.plats && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.14em", color: "#FE5000", marginBottom: "6px" }}>
                  Plats
                </div>
                <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "15px", color: "#333333" }}>
                  {event.plats}
                </div>
              </div>
            )}

            {/* Faktaruta-innehåll */}
            {event.faktaruta?.rubrik && (
              <div style={{ marginBottom: "24px", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.14em", color: "#FE5000", marginBottom: "6px" }}>
                  {event.faktaruta.rubrik}
                </div>
                <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: 1.6, color: "#333333", margin: 0 }}>
                  {event.faktaruta.innehall}
                </p>
              </div>
            )}

            {/* Anmälningsknapp */}
            {event.anmalanlank && (
              <a href={event.anmalanlank} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: "8px", backgroundColor: "#FE5000", color: "#FFFFFF", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "13px", padding: "14px 20px", textDecoration: "none", textAlign: "center" }}>
                Anmäl dig →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
