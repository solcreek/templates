import data from "../creek-data.json";

const isDark = data.theme === "dark";

export function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: isDark ? "#0a0a0a" : "#ffffff",
      color: isDark ? "#f5f5f5" : "#111",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {/* Hero */}
      <section style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "6rem 2rem 4rem",
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}>
          {data.title}
        </h1>
        <p style={{
          fontSize: "1.25rem",
          color: isDark ? "#888" : "#666",
          marginTop: "1rem",
          lineHeight: 1.6,
        }}>
          {data.tagline}
        </p>
        <p style={{
          color: isDark ? "#666" : "#888",
          marginTop: "0.75rem",
        }}>
          {data.description}
        </p>
        <a
          href={data.ctaUrl}
          style={{
            display: "inline-block",
            marginTop: "2rem",
            padding: "0.75rem 2rem",
            background: data.accentColor,
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          {data.ctaText}
        </a>
      </section>

      {/* Features */}
      {data.features.length > 0 && (
        <section style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(data.features.length, 3)}, 1fr)`,
          gap: "1.5rem",
        }}>
          {data.features.map((feature) => (
            <div
              key={feature.title}
              style={{
                padding: "1.5rem",
                borderRadius: 12,
                border: `1px solid ${isDark ? "#222" : "#e5e5e5"}`,
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                {feature.title}
              </h3>
              <p style={{ color: isDark ? "#888" : "#666", fontSize: "0.9rem", lineHeight: 1.5 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "3rem 2rem",
        color: isDark ? "#444" : "#aaa",
        fontSize: "0.8rem",
      }}>
        Built with Creek
      </footer>
    </div>
  );
}
