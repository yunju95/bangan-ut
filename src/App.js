import { useState, useEffect } from "react";
import UTTest from "./UTTest";
import AdminPage from "./AdminPage";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Sans KR', sans-serif; min-height: 100vh; }
`;

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
    <>
      <style>{css}</style>
      {page === "test"  && <UTTest     onAdmin={goAdmin} />}
      {page === "admin" && <AdminPage  onBack={goTest}  />}
    </>
  );
}
