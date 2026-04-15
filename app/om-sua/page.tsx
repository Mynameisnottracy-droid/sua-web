const values = [
  {
    title: "Resiliens",
    description: "Vi bygger strukturer och samarbeten som tål förändringar — och som stärks av dem. Skellefteås transformation kräver aktörer som håller i längden.",
  },
  {
    title: "Tillit",
    description: "Förändring sker mellan människor. Vi skapar relationer och sammanhang där akademi, näringsliv och samhälle kan mötas på riktigt.",
  },
  {
    title: "Hållbarhet",
    description: "Inte bara som mål, utan som arbetssätt. Vi tar ansvar för att de lösningar vi bidrar till är relevanta och bärkraftiga över tid.",
  },
];

const boardMembers = [
  { name: "Peter Larsson", title: "Styrelseordförande" },
  { name: "Svante Axelsson", title: "Nationell samordnare, Fossilfritt Sverige" },
  { name: "Joachim Nordin", title: "VD, Skellefteå Kraft" },
  { name: "Robin Teigland", title: "Professor, Chalmers" },
  { name: "Petter Mikaelsson", title: "VD, Repay" },
  { name: "Margareta Norell Bergendahl", title: "Professor, KTH" },
  { name: "Felicia Öberg", title: "Ordförande, IVA studentråd" },
];

const sectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "64px 24px",
};

export default function OmSua() {
  return (
    <div>

      {/* 1. Hero */}
      <section style={{ backgroundColor: "#201515" }}>
        <div style={sectionStyle}>
          <p style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#FE5000",
            marginBottom: "20px",
          }}>
            Om oss
          </p>
          <h1 style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "#FFFFFF",
            marginBottom: "28px",
          }}>
            Vi är katalysatorn
          </h1>
          <p style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "520px",
          }}>
            SUA skapar förutsättningar, samarbeten och synlighet för utbildningar som formar Skellefteås framtid — vi är inte en utbildningsanordnare, vi är rörelsen bakom.
          </p>
        </div>
      </section>

      {/* 2. Tre värden */}
      <section style={{ backgroundColor: "#EBE9E1" }}>
        <div style={sectionStyle}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}>
            {values.map((v, i) => (
              <div
                key={i}
                style={{
                  padding: "0 32px",
                  borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.12)" : "none",
                  paddingLeft: i === 0 ? 0 : "32px",
                }}
              >
                <h2 style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 900,
                  fontSize: "22px",
                  letterSpacing: "-0.02em",
                  color: "#201515",
                  marginBottom: "12px",
                }}>
                  {v.title}
                </h2>
                <p style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "#555555",
                }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Vision & syfte */}
      <section style={{ backgroundColor: "#FFFFFF" }}>
        <div style={sectionStyle}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
          }}>
            <div>
              <h2 style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 800,
                fontSize: "22px",
                letterSpacing: "-0.02em",
                color: "#201515",
                marginBottom: "16px",
              }}>
                Vår vision
              </h2>
              <p style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#333333",
              }}>
                Att Skellefteå ska vara en ledande aktör inom framtidens lärande — en stad där utbildning, innovation och näringsliv växer tillsammans och sätter standarden för hur kunskapsregioner byggs.
              </p>
            </div>
            <div>
              <h2 style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 800,
                fontSize: "22px",
                letterSpacing: "-0.02em",
                color: "#201515",
                marginBottom: "16px",
              }}>
                Vårt syfte
              </h2>
              <p style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#333333",
              }}>
                Att frigöra potentialen hos människor och organisationer i regionen — genom att skapa de strukturer, partnerskap och sammanhang som gör att kunskap omsätts till verklig förändring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Styrelse */}
      <section style={{ backgroundColor: "#EBE9E1" }}>
        <div style={sectionStyle}>
          <h2 style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#000000",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}>
            Styrelsen
            <span style={{ flex: 1, borderTop: "1px dashed rgba(0,0,0,0.2)", display: "block" }} />
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
          }}>
            {boardMembers.map((member, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#201515",
                  marginBottom: "4px",
                }}>
                  {member.name}
                </div>
                <div style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "#555555",
                  lineHeight: 1.4,
                }}>
                  {member.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
