import Image from "next/image";
import { getUtbildningar, urlFor } from "@/lib/queries";

export const metadata = {
  title: "Utbildningar i Skellefteå",
};

export default async function UtbildningarPage() {
  const utbildningar = await getUtbildningar();

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#201515" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#FE5000", marginBottom: "16px" }}>
            Utbildningar
          </p>
          <h1 style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.95, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#FFFFFF", marginBottom: "16px" }}>
            Studier i Skellefteå
          </h1>
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", maxWidth: "520px", margin: 0 }}>
            Utbildningar vid lärosäten i och kring Skellefteå — från yrkeshögskola till forskarutbildning.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>
        {utbildningar?.length === 0 && (
          <p style={{ fontFamily: "Helvetica, Arial, sans-serif", color: "#555555" }}>Inga utbildningar publicerade ännu.</p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {utbildningar?.map((u: {_id: string; slug: {current: string}; bild: unknown; rubrik: string; larosate: string; amnesomrade: string; ingress: string}) => (
            <a key={u._id} href={`/utbildningar/${u.slug.current}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column" }} className="group">
              {/* Bild */}
              <div style={{ width: "100%", aspectRatio: "3/2", backgroundColor: "#EBE9E1", marginBottom: "16px", overflow: "hidden", position: "relative" }}>
                {u.bild && (
                  <Image src={urlFor(u.bild).width(600).height(400).url()} alt={u.rubrik} fill style={{ objectFit: "cover" }} />
                )}
              </div>
              {/* Meta */}
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#FE5000", marginBottom: "8px" }}>
                {[u.amnesomrade, u.larosate].filter(Boolean).join(" · ")}
              </div>
              {/* Rubrik */}
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: "17px", color: "#000000", lineHeight: 1.25, marginBottom: "10px" }} className="group-hover:underline underline-offset-2">
                {u.rubrik}
              </div>
              {/* Ingress */}
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "14px", color: "#555555", lineHeight: 1.6 }}>
                {u.ingress}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
