import NewsSection from "@/components/NewsSection";

export default function Home() {
  return (
    <>
    <section style={{ backgroundColor: "#EBE9E1" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "72px 24px",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#FE5000",
            fontSize: "10px",
            marginBottom: "24px",
          }}
        >
          Skellefteå · Campus · Framtid
        </p>

        {/* H1 */}
        <h1
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#201515",
            marginBottom: "32px",
            maxWidth: "800px",
          }}
        >
          Vi bygger{" "}
          <span style={{ color: "#FE5000" }}>morgondagens</span>{" "}
          universitetsstad
        </h1>

        {/* Ingress */}
        <p
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: "#555555",
            maxWidth: "440px",
            fontSize: "18px",
            lineHeight: 1.6,
            marginBottom: "48px",
          }}
        >
          SUA är katalysatorn — vi skapar förutsättningar, samarbeten och
          synlighet för utbildningar som formar regionens framtid.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="/vad-vi-gor"
            style={{
              backgroundColor: "#FE5000",
              color: "#FFFFFF",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "13px",
              borderRadius: 0,
              padding: "14px 28px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Vad vi gör
          </a>
          <a
            href="/studier"
            style={{
              backgroundColor: "transparent",
              color: "#000000",
              border: "2px solid #000000",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "13px",
              borderRadius: 0,
              padding: "14px 28px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Studier i Skellefteå
          </a>
        </div>
      </div>
    </section>

    {/* News section */}
    <NewsSection />
    </>
  );
}
