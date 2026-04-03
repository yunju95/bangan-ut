import { useState } from "react";
import UTTest from "./UTTest";
import AdminPage from "./AdminPage";

const C = {
  primary: "#8B6FD4",
  primaryLight: "#C97BE8",
  primarySoft: "#E8D5F7",
  white: "#FFFFFF",
  border: "#E5D8F5",
  dark: "#2D1F4A",
  light: "#9E8BB5",
  bgOuter: "#EDE5FA",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Sans KR', sans-serif; background: ${C.bgOuter}; min-height: 100vh; }
`;

export default function App() {
  // URL hash로 라우팅: / = UT테스트, /admin = 어드민
  const isAdmin = window.location.hash === "#admin";
  const [page, setPage] = useState(isAdmin ? "admin" : "test");

  return (
    <>
      <style>{css}</style>
      {page === "test" && <UTTest onAdmin={() => setPage("admin")} />}
      {page === "admin" && <AdminPage onBack={() => setPage("test")} />}
    </>
  );
}
