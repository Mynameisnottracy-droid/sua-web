import { getUtbildning, urlFor } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

const sectionStyle = { maxWidth: "760px", margin: "0 auto", padding: "64px 24px" };

export default async function UtbildningPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const utbildning = await getUtbildning(slug);
  if (!utbildning) notFound();

  const imageUrl = utbildning.bild ? urlFor(utbildning.bild).width(1200).height(800).url() : null;

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div style={sectionStyle}>

        {/* Meta */}
        <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#FE5000", marginBottom: "16px" }}>
          {utbildning.amnesomrade}{utbildning.larosate && ` · ${utbildning.larosate}`}
        </div>

        {/* Rubrik */}
        <h1 style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "#201515", marginBottom: "24px" }}>
          {utbildning.rubrik}
        </h1>

        {/* Ingress */}
        <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: 1.6, color: "#333333", marginBottom: "40px", borderLeft: "3px solid #FE5000", paddingLeft: "20px" }}>
          {utbildning.ingress}
        </p>

        {/* Utbildningsinfo */}
        <div style={{ backgroundColor: "#EBE9E1", padding: "24px 28px", marginBottom: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px" }}>
          {utbildning.larosate && (
            <div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FE5000", marginBottom: "6px" }}>Lärosäte</div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "15px", color: "#201515" }}>{utbildning.larosate}</div>
            </div>
          )}
          {utbildning.nivaPoang && (
            <div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FE5000", marginBottom: "6px" }}>Nivå & poäng</div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "15px", color: "#201515" }}>{utbildning.nivaPoang}</div>
            </div>
          )}
          {utbildning.amnesomrade && (
            <div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FE5000", marginBottom: "6px" }}>Ämnesområde</div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "15px", color: "#201515" }}>{utbildning.amnesomrade}</div>
            </div>
          )}
        </div>

        {/* Bild */}
        {imageUrl && (
          <div style={{ width: "100%", aspectRatio: "3/2", position: "relative", marginBottom: "40px" }}>
            <Image src={imageUrl} alt={utbildning.rubrik} fill style={{ objectFit: "cover" }} />
          </div>
        )}

        {/* Brödtext */}
        {utbildning.brodtext && (
          <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "17px", lineHeight: 1.75, color: "#333333" }}>
            <PortableText value={utbildning.brodtext} />
          </div>
        )}

        {/* Citat */}
        {utbildning.citat && (
          <blockquote style={{ margin: "48px 0", padding: "0 32px", borderLeft: "4px solid #FE5000" }}>
            <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "22px", lineHeight: 1.4, color: "#201515", fontStyle: "italic", marginBottom: "12px" }}>
              "{utbildning.citat}"
            </p>
            {utbildning.citatKalla && (
              <cite style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "13px", color: "#555555", fontStyle: "normal" }}>
                — {utbildning.citatKalla}
              </cite>
            )}
          </blockquote>
        )}

        {/* Faktaruta */}
        {utbildning.faktaruta?.rubrik && (
          <div style={{ backgroundColor: "#EBE9E1", padding: "28px 32px", marginTop: "48px" }}>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FE5000", marginBottom: "12px" }}>
              {utbildning.faktaruta.rubrik}
            </div>
            <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: 1.6, color: "#333333", margin: 0 }}>
              {utbildning.faktaruta.innehall}
            </p>
          </div>
        )}

        {/* Ansökningslänk */}
        {utbildning.ansokanslank && (
          <a href={utbildning.ansokanslank} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "48px", backgroundColor: "#FE5000", color: "#FFFFFF", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "13px", padding: "14px 28px", textDecoration: "none" }}>
            Ansök nu →
          </a>
        )}

        {/* Tillbaka */}
        <div>
          <a href="/utbildningar" style={{ display: "inline-block", marginTop: "56px", fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "13px", color: "#FE5000", textDecoration: "none", borderBottom: "2px solid #FE5000", paddingBottom: "2px" }}>
            ← Alla utbildningar
          </a>
        </div>

      </div>
    </div>
  );
}
