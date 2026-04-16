import { getNyhet, urlFor } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

const sectionStyle = { maxWidth: "760px", margin: "0 auto", padding: "64px 24px" };

export default async function NyhetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const nyhet = await getNyhet(slug);
  if (!nyhet) notFound();

  const imageUrl = nyhet.bild ? urlFor(nyhet.bild).width(1200).height(800).url() : null;

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div style={sectionStyle}>

        {/* Meta */}
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#FE5000", marginBottom: "16px" }}>
          {new Date(nyhet.publiceringsdatum).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" })} · {nyhet.kategori}
        </div>

        {/* Rubrik */}
        <h1 style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#201515", marginBottom: "24px" }}>
          {nyhet.rubrik}
        </h1>

        {/* Ingress */}
        <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: 1.6, color: "#333333", marginBottom: "40px", borderLeft: "3px solid #FE5000", paddingLeft: "20px" }}>
          {nyhet.ingress}
        </p>

        {/* Bild */}
        {imageUrl && (
          <div style={{ width: "100%", aspectRatio: "3/2", position: "relative", marginBottom: "40px" }}>
            <Image src={imageUrl} alt={nyhet.rubrik} fill style={{ objectFit: "cover" }} />
          </div>
        )}

        {/* Brödtext */}
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "17px", lineHeight: 1.75, color: "#333333" }}>
          <PortableText value={nyhet.brodtext} />
        </div>

        {/* Citat */}
        {nyhet.citat && (
          <blockquote style={{ margin: "48px 0", padding: "0 32px", borderLeft: "4px solid #FE5000" }}>
            <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "22px", lineHeight: 1.4, color: "#201515", fontStyle: "italic", marginBottom: "12px" }}>
              "{nyhet.citat}"
            </p>
            {nyhet.citatKalla && (
              <cite style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "13px", color: "#555555", fontStyle: "normal" }}>
                — {nyhet.citatKalla}
              </cite>
            )}
          </blockquote>
        )}

        {/* Faktaruta */}
        {nyhet.faktaruta?.rubrik && (
          <div style={{ backgroundColor: "#EBE9E1", padding: "28px 32px", marginTop: "48px" }}>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FE5000", marginBottom: "12px" }}>
              {nyhet.faktaruta.rubrik}
            </div>
            <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, color: "#333333", margin: 0 }}>
              {nyhet.faktaruta.innehall}
            </p>
          </div>
        )}

        {/* Tillbaka */}
        <a href="/aktuellt" style={{ display: "inline-block", marginTop: "56px", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "13px", color: "#FE5000", textDecoration: "none", borderBottom: "2px solid #FE5000", paddingBottom: "2px" }}>
          ← Alla nyheter
        </a>

      </div>
    </div>
  );
}
