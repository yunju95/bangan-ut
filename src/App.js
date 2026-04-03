import { useState, useEffect, Component } from "react";
import UTTest from "./UTTest";
import AdminPage from "./AdminPage";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Sans KR', sans-serif; min-height: 100vh; }
`;

// ── 에러 경계 — 크래시 시 빈 화면 대신 에러 메시지 표시 ──
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, fontFamily: "sans-serif", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>⚠️</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#2D1F4A", marginBottom: 8 }}>
            화면을 불러오지 못했습니다
          </div>
          <div style={{ fontSize: 13, color: "#6B5B8A", marginBottom: 16, lineHeight: 1.6 }}>
            아래 에러 내용을 캡처해서 공유해 주세요.
          </div>
          <pre style={{
            background: "#F5EEFF", border: "1px solid #E8D5F7",
            borderRadius: 10, padding: 16, fontSize: 12,
            color: "#2D1F4A", whiteSpace: "pre-wrap", wordBreak: "break-all"
          }}>
            {this.state.error && this.state.error.toString()}
            {"\n\n"}
            {this.state.error && this.state.error.stack}
          </pre>
          <button
            onClick={() => { window.location.hash = ""; window.location.reload(); }}
            style={{ marginTop: 16, padding: "10px 20px", borderRadius: 10, background: "#8B6FD4", color: "#fff", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
          >
            처음으로 돌아가기
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [page, setPage] = useState("test");

  useEffect(() => {
    if (window.location.hash === "#admin") setPage("admin");
    const onHash = () => {
      setPage(window.location.hash === "#admin" ? "admin" : "test");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goAdmin = () => { window.location.hash = "#admin"; setPage("admin"); };
  const goTest  = () => { window.location.hash = "";       setPage("test");  };

  return (
    <ErrorBoundary>
      <style>{css}</style>
      {page === "test"  && <ErrorBoundary><UTTest onAdmin={goAdmin} /></ErrorBoundary>}
      {page === "admin" && <ErrorBoundary><AdminPage onBack={goTest} /></ErrorBoundary>}
    </ErrorBoundary>
  );
}
