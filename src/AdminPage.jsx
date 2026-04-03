import { useState, useRef, useEffect } from "react";

const C = {
  primary:"#8B6FD4", primaryLight:"#C97BE8", primarySoft:"#E8D5F7", primaryBg:"#F5EEFF",
  dark:"#2D1F4A", mid:"#6B5B8A", light:"#9E8BB5", white:"#FFFFFF", surface:"#FDFAFF",
  border:"#E5D8F5", green:"#4CAF88", greenBg:"#EBF7F2", orange:"#E8943A", orangeBg:"#FEF3E8", red:"#E06B8B",
};
const PURPLES = ["#8B6FD4","#C97BE8","#B89FDA","#D4BFEA","#7B5EA7","#9B7FC4"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body,#root{font-family:'Noto Sans KR',sans-serif;background:#F0EAF9;min-height:100vh;}
.tabs{display:flex;gap:4px;padding:12px 16px 0;background:#fff;border-bottom:1px solid #E5D8F5;position:sticky;top:0;z-index:20;overflow-x:auto;}
.tab{padding:9px 14px 11px;font-size:13px;font-weight:600;color:#9E8BB5;cursor:pointer;border-bottom:2px solid transparent;transition:all .18s;white-space:nowrap;}
.tab.on{color:#8B6FD4;border-bottom-color:#8B6FD4;}
.page{padding:16px;max-width:960px;margin:0 auto;}
.hdr{background:#fff;border-radius:14px;padding:16px 20px;margin-bottom:14px;border:1px solid #E5D8F5;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px;margin-bottom:14px;}
.card{background:#fff;border-radius:14px;padding:16px;border:1px solid #E5D8F5;}
.card-lbl{font-size:11px;color:#9E8BB5;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;}
.card-val{font-size:26px;font-weight:800;color:#2D1F4A;letter-spacing:-1px;margin-bottom:3px;}
.card-sub{font-size:12px;color:#6B5B8A;}
.stabs{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;}
.stab{padding:7px 14px;border-radius:99px;font-size:12px;font-weight:600;border:none;cursor:pointer;transition:all .18s;}
.q-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:12px;}
.qb{background:#fff;border-radius:14px;padding:15px 17px;border:1px solid #E5D8F5;position:relative;}
.q-meta{display:flex;align-items:center;gap:8px;margin-bottom:9px;}
.qtag{font-size:10px;font-weight:700;background:#E8D5F7;color:#8B6FD4;padding:2px 8px;border-radius:99px;flex-shrink:0;}
.qtext{font-size:12px;font-weight:600;color:#2D1F4A;flex:1;line-height:1.4;}
.brow{display:flex;align-items:center;gap:8px;margin-bottom:5px;position:relative;}
.blbl{font-size:11px;font-weight:700;color:#6B5B8A;width:14px;text-align:right;}
.btrack{flex:1;height:9px;background:#E5D8F5;border-radius:99px;overflow:visible;position:relative;}
.bseg{height:100%;border-radius:99px;background:linear-gradient(90deg,#C97BE8,#8B6FD4);cursor:pointer;position:relative;transition:opacity .15s;}
.bseg:hover{opacity:.8;}
.bcnt{font-size:11px;color:#9E8BB5;width:28px;}
.tooltip{position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:#2D1F4A;color:#fff;font-size:11px;font-weight:500;padding:5px 9px;border-radius:8px;white-space:nowrap;z-index:100;pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,.2);}
.tooltip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#2D1F4A;}
.drow{display:flex;align-items:center;gap:10px;margin-bottom:7px;}
.dlbl{width:80px;font-size:12px;font-weight:600;color:#6B5B8A;flex-shrink:0;}
.dtrack{flex:1;height:10px;background:#E5D8F5;border-radius:99px;overflow:hidden;}
.dfill{height:100%;border-radius:99px;transition:width .5s;}
.dcnt{font-size:12px;font-weight:700;color:#2D1F4A;width:60px;text-align:right;flex-shrink:0;}
.sc{border-radius:6px;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;font-weight:700;font-size:11px;}
.s5{background:#7B5EA7;color:#fff;} .s4{background:#9B7FC4;color:#fff;} .s3{background:#B89FDA;color:#fff;}
.s2{background:#D4BFEA;color:#2D1F4A;} .s1{background:#ECD9F7;color:#2D1F4A;}
/* Sheet sticky */
.sheet-outer{overflow:hidden;border-radius:12px;border:1px solid #E5D8F5;box-shadow:0 2px 12px rgba(139,111,212,.08);}
.sheet-container{display:flex;}
.sheet-fixed{flex-shrink:0;overflow:hidden;}
.sheet-scroll{flex:1;overflow-x:auto;}
.stbl{border-collapse:collapse;font-size:11px;background:#fff;width:100%;}
.stbl th{background:linear-gradient(135deg,rgba(201,123,232,.2),rgba(139,111,212,.13));color:#2D1F4A;font-weight:600;padding:9px 11px;text-align:left;border-bottom:1px solid #E5D8F5;border-right:1px solid #E5D8F5;white-space:nowrap;}
.stbl td{padding:8px 11px;border-bottom:1px solid #E5D8F5;border-right:1px solid #E5D8F5;color:#6B5B8A;vertical-align:middle;white-space:nowrap;}
.stbl tr:last-child td{border-bottom:none;}
.stbl tr:hover td{background:#F5EEFF;}
.fixed-col th,.fixed-col td{border-right:2px solid #C97BE8 !important;}
.aggrow td{background:#F5EEFF;font-weight:700;color:#8B6FD4;}
.lock-banner{background:linear-gradient(135deg,#FFF4E8,#FEF0E0);border:1.5px solid ${C.orange};border-radius:12px;padding:12px 16px;margin-bottom:14px;display:flex;align-items:center;gap:10px;}
@media(max-width:600px){.page{padding:10px;}.q-grid{grid-template-columns:1fr;}.cards{grid-template-columns:1fr 1fr;}}
`;

// ─── DATA ───────────────────────────────────────────────────────────
const TESTERS = []; // 실제 테스트 데이터가 입력되면 채워집니다

const QUESTIONS = [
  {id:"P1-Q6",  phase:"P1", text:"신청 UX 수월함",           scores:[]},
  {id:"P1-Q8",  phase:"P1", text:"금융/행정 용어 이해 용이성",scores:[]},
  {id:"P1-Q11", phase:"P1", text:"맞춤 추천 즉각 행동 유도",  scores:[]},
  {id:"P2-Q1",  phase:"P2", text:"컬러톤 신뢰감",             scores:[]},
  {id:"P2-Q15", phase:"P2", text:"화면 복잡도 (1복잡~5단순)", scores:[]},
  {id:"P3-Q4",  phase:"P3", text:"탐색 시간/에너지 절약 예상",scores:[]},
  {id:"P3-Q6",  phase:"P3", text:"방안 앱 전반 평가",         scores:[]},
];

const VERBAL_QS = [
  {id:"p1q1", phase:"P1", tag:"Q1",  text:"평소 본인에게 맞는 정부 정책이나 금융 혜택을 찾을 때 어떤 경로를 이용하시나요? 정보를 얻을 때 가장 불편했던 점은 무엇인가요?", intent:"유저의 기본 탐색 행동 패턴 및 서비스 진입 시점을 파악 / 정보 취득 시 이탈 시점 파악"},
  {id:"p1q2", phase:"P1", tag:"Q2",  text:"정책 신청 시 필요한 서류가 무엇인지, 어디서 발급받는지 찾는 과정에서 포기하고 싶었던 적이 있나요?", intent:"서류 준비 허들 확인"},
  {id:"p1q3", phase:"P1", tag:"Q3",  text:"실제 정책 수혜자의 후기나 사례를 찾아보시나요? 주로 어디서 찾으며, 그 정보는 만족스러우신가요?", intent:"[커뮤니티 기반 정보]의 결핍 정도 파악"},
  {id:"p1q4", phase:"P1", tag:"Q4",  text:"수많은 정책 리스트를 보았을 때, 어떤 기준으로 나에게 가장 유리한 것을 고르시나요?", intent:"유저의 의사결정 기준(금액, 난이도, 기간 등)과 우리 필터 로직의 정합성 대조"},
  {id:"p1q5", phase:"P1", tag:"Q5",  text:"경쟁사 서비스에서 '이 기능은 정말 편했다' 혹은 반대로 '너무 복잡해서 쓰기 싫었다'라고 느낀 포인트가 있다면 무엇인가요?", intent:"'방안' 앱이 해결해 주어야 할 가장 우선순위 높은 과제가 무엇인지 도출"},
  {id:"p1q7", phase:"P1", tag:"Q7",  text:"(웰로) 민간 앱의 'AI 추천' 결과를 보았을 때, 그 데이터가 얼마나 정확하다고 신뢰하시나요?", intent:"[추천 정확도 80%] KPI 설정을 위한 신뢰도 기준 측정"},
  {id:"p1q9", phase:"P1", tag:"Q9",  text:"나라에서 운영하는 사이트는 제공하는 글자가 많고 복잡한데, '이 버튼만 누르세요'라고 정해주는 방식이 훨씬 편하게 느껴지시나요?", intent:"[핵심 솔루션: 행동 전환] 공부해야 하는 어려운 정보보다 '당장 할 일'만 알려주는 게 유저를 진짜 움직이게 만드는 핵심 비결인지 검증"},
  {id:"p1q10",phase:"P1", tag:"Q10", text:"비슷한 정책이나 추천받은 정책들의 적합도를 따져보기 위해, 정보를 별도로 기록(메모, 캡쳐 등)하며 따로 정리하여 비교해 본 적이 있나요?", intent:"[비교 분석] 기능의 잠재적 수요 확인"},
  {id:"p1q11",phase:"P1", tag:"Q11", text:"유저가 여러 개를 일일이 비교하지 않고, '이 정책이 당신에게 적합합니다'라고 말해주는게 당장 행동하게 만드나요?", intent:"의사결정 최적화 → '확신이 바로 드는지'"},
  {id:"p1q12",phase:"P1", tag:"Q12", text:"(서류 관리/OCR 기획 제시) 정책을 신청할 때 개별 서류 업로드를 하지 않고, 미리 서류를 찍어서 저장해두면 클릭 한번으로 가능하다면 미리 등록해두시겠어요?", intent:"[중단 없는 흐름] 구축을 위한 실행 단계 허들 확인"},
  {id:"p1q13",phase:"P1", tag:"Q13", text:"(전략서류함) '자립 설계 이행률'이 정책을 추가하고, 실행하는데 동기가 되나요?", intent:"[사용자 활성도 30%] 달성을 위한 게이미피케이션 검증"},
  {id:"p2q2", phase:"P2", tag:"Q2",  text:"본인의 현재 상황(거주지, 소득 등)에 맞는 정책을 추천받는 과정이 직관적인가요?", intent:"온보딩 UX 직관성 확인"},
  {id:"p2q3", phase:"P2", tag:"Q3",  text:"정부 정책 검색 시 가장 원하는 필터 키워드가 있는가요?", intent:"유저가 원하는 필터 니즈 파악"},
  {id:"p2q4", phase:"P2", tag:"Q4",  text:"정부정책을 찾아볼 때 용어에 대한 어려움이 있었나요?", intent:"용어 이해 허들 측정"},
  {id:"p2q7", phase:"P2", tag:"Q7",  text:"[정책검색] 정책 검색의 지역 설정(2개 지역) 및 필터링 과정에서 어려움은 없었나요?", intent:"정책검색 UX 마찰 지점 확인"},
  {id:"p2q8", phase:"P2", tag:"Q8",  text:"'나만의 설계 zip.'에서는 어떤 내용들이 나올 것이라 예상되나요? 어떤 내용들이 들어가면 이 플랫폼을 이용하는 목적에 가장 큰 도움이 될 것 같으나요?", intent:"UX 라이팅 인지 확인"},
  {id:"p2q10",phase:"P2", tag:"Q10", text:"[정책 상세 페이지] 이 화면에서 가장 먼저 눈에 들어오는 정보는 무엇인가요?", intent:"화면 상 사용자에게 가장 먼저 들어오는 정보를 확인하고자 함"},
  {id:"p2q12",phase:"P2", tag:"Q12", text:"정책 상세 확인 및 비교 후 그 다음 행동으로 무엇을 하고 싶은가요? (저장, 공유, 신청 등)", intent:"UX 플로우 다음 행동 니즈 파악"},
  {id:"p2q15",phase:"P2", tag:"Q15", text:"정책 소개 정보 요소를 [금액, 자격 요건, 필요서류, 후기] 중 중요도 순으로 나열해주세요.", intent:"카드 소팅을 통한 정보 우선순위 파악"},
  {id:"p2q16",phase:"P2", tag:"Q16", text:"정부 정책이나 금융 정보를 확인하는 행위가 이 캐릭터를 성장시키는 것과 연결된다는 점이 본인에게 어떤 의미로 다가오나요? (재미, 성취감, 무관심 등)", intent:"게이미피케이션 정서 반응 확인"},
  {id:"p2q17",phase:"P2", tag:"Q17", text:"이 캐릭터가 잘 성장한다면, 서비스를 더 자주 방문하고 싶어지는 동기가 될 것 같나요?", intent:"리텐션 동기로서의 게이미피케이션 검증"},
  {id:"p2q18",phase:"P2", tag:"Q18", text:"[공통 UX라이팅 평가] [정책-목록] : '어려워요'가 어떤 의미로 이해가 되나요?", intent:"UX 라이팅 이해도 측정"},
  {id:"p3q1", phase:"P3", tag:"Q1",  text:"정책 지원금을 받기 위해 내 개인정보(소득, 지역 등)를 어디까지 입력할 의향이 있으신가요?", intent:"데이터 확보를 위한 유저의 심리적 마지노선 확인"},
  {id:"p3q2", phase:"P3", tag:"Q2",  text:"본인의 민감한 서류(등본 등)를 등록하는 대가로 '정확도 80% 이상의 추천'을 받는 것에 동의하시나요?", intent:"개인정보 활용과 서비스 가치 사이의 등가교환 확인"},
  {id:"p3q3", phase:"P3", tag:"Q3",  text:"\"내 조건에 맞는 정확도 80% 이상의 정보만 골라준다\"면, 유료 멤버십이나 광고 시청의 의향이 있나요?", intent:"[추천 정확도] 가치의 비즈니스 모델 가능성 타진"},
  {id:"p3q5", phase:"P3", tag:"Q5",  text:"본인의 친구나 지인에게 이 서비스를 추천한다면, 어떤 유형의 사람에게 가장 추천하고 싶으신가요?", intent:"핵심 타겟 유저(Target Audience)의 구체화"},
  {id:"p3q7", phase:"P3", tag:"Q7",  text:"기존에 사용하시던 금융 앱이나 정책 사이트와 비교했을 때, 이 앱만의 확실한 장/단점은 무엇인가요?", intent:"경쟁 우위 및 개선점 도출"},
  {id:"p3q8", phase:"P3", tag:"Q8",  text:"정식으로 출시된다면 실제로 이 앱을 다운로드해서 사용하실 의향이 있나요? (이유도 함께)", intent:"실사용 전환 가능성 측정"},
  {id:"p3q9", phase:"P3", tag:"Q9",  text:"사용하면서 가장 불편했거나, 추가되었으면 하는 기능이 있다면 자유롭게 말씀해 주세요.", intent:"개선 기회 발굴"},
];

const MOCK_DURATION = [];


const MOCK_PHASE_TIMES = [];

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzj4KJhggp0HBIEF9t3My4Fl-8Sv5T8myLAHRqbLHuCECpKDPupbue2UJbyrnNgk2C0/exec";

const d5 = arr => [5,4,3,2,1].map(s => ({score:s, count:arr.filter(x=>x===s).length}));

// 날짜 문자열 정제 — "Sun Dec 31 1899 06:19:45..." → "06:19:45"
function cleanTime(val) {
  if (!val || val === "—") return "—";
  const s = String(val);
  // HH:MM:SS 패턴 추출
  const m = s.match(/(\d{1,2}:\d{2}:\d{2})/);
  if (m) return m[1];
  // 이미 깔끔한 형태면 그대로
  if (s.length <= 8 && s.includes(":")) return s;
  return "—";
}

// 나이 계산 — NaN 방지
function calcAge(birthYear) {
  const y = parseInt(birthYear);
  if (!y || isNaN(y) || y < 1900 || y > 2020) return "—";
  return (new Date().getFullYear() - y) + "세";
}

function extractKW(answers) {
  const all = Object.values(answers).join(" ");
  if (!all.trim()) return [];
  const stop = new Set(["것","이","가","을","를","은","는","에","의","로","도","와","과","있다","없다","그","있는","하는","수","있어","없어","잘","더","좀","너무","그냥","다","할","때","같은","같아","같이","그래서","그리고","하다","되다","이다","아니다","우리","제","이런","저런","없고","있고","것이","거","저","뭔가","그게","뭐","어","네","아","근데","싶다","싶어","않다","않아"]);
  const freq = {};
  all.replace(/[.,!?'"]/g,"").split(/\s+/).filter(w=>w.length>=2&&!stop.has(w)).forEach(w=>{freq[w]=(freq[w]||0)+1;});
  return Object.entries(freq).filter(([,c])=>c>=2).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([word,count])=>({word,count}));
}

function downloadCSV(va, locked, sheetData=[]) {
  const fixedHeaders = ["진행자","성별","출생년","직업","거주지","1인가구"];
  const scoreHeaders = QUESTIONS.map(q=>q.id+"(점수)");
  const verbalHeaders = VERBAL_QS.map(q=>q.tag+" "+q.text.slice(0,20)+"...");
  const allHeaders = [...fixedHeaders, ...scoreHeaders, ...verbalHeaders];
  const rows = sheetData.map((t,i) => {
    const fixed = [t.진행자||t.facilitator||"", t.성별||t.gender||"", t.출생년||t.birth||"", t.직업||t.job||"", t.거주지||t.region||"", t["1인가구"]||t.household||""];
    const scores = QUESTIONS.map(q=>t[q.id+"(점수)"]||va[`${q.id}_${i}`]||"");
    const verbals = VERBAL_QS.map(q=>va[`${q.id}_${i}`]||"");
    return [...fixed,...scores,...verbals].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",");
  });
  const csv = [allHeaders.map(h=>`"${h}"`).join(","), ...rows].join("\n");
  const blob = new Blob(["\uFEFF"+csv], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download="bangahn_ut_result.csv"; a.click();
  URL.revokeObjectURL(url);
}

// ─── Main ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState("admin");
  const [sheetTesters, setSheetTesters] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch(SCRIPT_URL + "?t=" + Date.now())
      .then(r => r.json())
      .then(data => {
        if (data && Array.isArray(data.testers) && data.testers.length > 0) {
          // 빈 행 제거 + 최소 진행자 필드 있는 행만 허용
          const valid = data.testers.filter(t =>
            t && typeof t === "object" && (t["진행자"] || t["facilitator"])
          );
          if (valid.length > 0) setSheetTesters(valid);
        }
      })
      .catch(() => setFetchError(true));
  }, []);
  return (
    <>
      <style>{css}</style>
      <div>
        <div className="tabs">
          {[{k:"admin",l:"📊 어드민"},{k:"sheets",l:"📋 시트 예시"},{k:"compare",l:"🔍 비교 안내"}].map(t=>(
            <div key={t.k} className={`tab${tab===t.k?" on":""}`} onClick={()=>setTab(t.k)}>{t.l}</div>
          ))}
        </div>
        <div className="page">
          {fetchError && (
            <div style={{background:"#FFF4E8",border:"1px solid #E8943A",borderRadius:12,padding:"10px 16px",marginBottom:12,fontSize:12,color:"#C07020"}}>
              ⚠️ Sheets 연결 실패. 서술형 편집은 정상 사용 가능합니다.
            </div>
          )}
          {tab==="admin"   && <AdminView sheetTesters={sheetTesters} />}
          {tab==="sheets"  && <SheetsView sheetTesters={sheetTesters} />}
          {tab==="compare" && <CompareView />}
        </div>
      </div>
    </>
  );
}

// ─── Admin ───────────────────────────────────────────────────────────
function AdminView({ sheetTesters }) {
  const [sub, setSub] = useState("respondent");
  const [va, setVa] = useState({});
  const [locked, setLocked] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const testers = sheetTesters.length > 0 ? sheetTesters : TESTERS;
  const hasData = testers.length > 0;

  return (
    <div style={{position:"relative"}}>
      {/* 인라인 확인 모달 */}
      {confirmOpen && (
        <div style={{position:"fixed",inset:0,background:"rgba(45,31,74,.5)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:C.white,borderRadius:18,padding:"24px 26px",maxWidth:320,width:"100%",boxShadow:"0 12px 40px rgba(0,0,0,.25)"}}>
            <div style={{fontSize:28,marginBottom:10,textAlign:"center"}}>🔒</div>
            <div style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:8,textAlign:"center"}}>기록을 마감하시겠습니까?</div>
            <div style={{fontSize:13,color:C.mid,lineHeight:1.7,marginBottom:20,textAlign:"center"}}>마감 후에는 새로운 테스트 결과가 저장되지 않습니다.<br/>포트폴리오용 데이터가 보존됩니다.</div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmOpen(false)} style={{flex:1,padding:"11px",borderRadius:12,background:C.border,color:C.mid,fontSize:13,fontWeight:600,border:"none",cursor:"pointer"}}>취소</button>
              <button onClick={()=>{setLocked(true);setConfirmOpen(false);}} style={{flex:1,padding:"11px",borderRadius:12,background:C.red,color:"#fff",fontSize:13,fontWeight:700,border:"none",cursor:"pointer"}}>기록 마감</button>
            </div>
          </div>
        </div>
      )}

      {/* 마감 배너 */}
      {locked && (
        <div className="lock-banner">
          <span style={{fontSize:20}}>🔒</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:C.orange}}>기록이 마감되었습니다</div>
            <div style={{fontSize:12,color:"#C07020",marginTop:2}}>테스트를 진행해도 새로운 기록이 저장되지 않습니다.</div>
          </div>
          <button onClick={()=>setLocked(false)} style={{padding:"5px 12px",borderRadius:99,background:"none",border:`1px solid ${C.orange}`,color:C.orange,fontSize:12,fontWeight:600,cursor:"pointer",flexShrink:0}}>마감 해제</button>
        </div>
      )}

      <div className="hdr">
        <div>
          <div style={{fontSize:16,fontWeight:700,color:C.dark}}>방안 UT 테스트 결과</div>
          <div style={{fontSize:12,color:C.light,marginTop:2}}>
            {testers.length > 0 && testers[0]["테스트시작"]
              ? `${new Date().getFullYear()}년 ${new Date().getMonth()+1}월 진행`
              : "방안 UT 테스트"} · 참가자 {testers.length}명
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{background:C.primarySoft,color:C.primary,fontSize:12,fontWeight:600,padding:"5px 12px",borderRadius:99}}>✅ {testers.length}명 완료</span>
          <button onClick={()=>downloadCSV(va,locked,testers)} style={{padding:"6px 14px",borderRadius:99,background:C.green,color:"#fff",fontSize:12,fontWeight:700,border:"none",cursor:"pointer"}}>⬇ 시트 다운로드</button>
          <button
            onClick={()=>{ if(!locked) setConfirmOpen(true); }}
            style={{padding:"6px 14px",borderRadius:99,background:locked?"#E8E0F0":C.red,color:locked?C.light:"#fff",fontSize:12,fontWeight:700,border:"none",cursor:locked?"default":"pointer"}}
          >{locked?"🔒 마감됨":"🔒 기록 마감"}</button>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-lbl">전체 응답자</div>
          <div className="card-val">{testers.length}<span style={{fontSize:15,fontWeight:500}}>명</span></div>
          <div className="card-sub">{testers.length > 0 ? `목표 6명 중 ${testers.length}명` : "테스트 진행 후 업데이트"}</div>
        </div>
        <div className="card">
          <div className="card-lbl">평균 소요시간</div>
          <div className="card-val">—</div>
          <div className="card-sub">테스트 진행 후 업데이트</div>
        </div>
      </div>

      {/* 탭 순서: 응답자 분석 > 누적 분석 > 서술형 편집 */}
      <div className="stabs">
        {[
          {k:"respondent", l:"👥 응답자 분석"},
          {k:"cumulative",  l:"📊 누적 분석"},
          {k:"verbal",      l:"🎙 서술형 편집"},
        ].map(t=>(
          <button key={t.k} className="stab" onClick={()=>setSub(t.k)} style={{background:sub===t.k?C.primary:C.border,color:sub===t.k?C.white:C.mid}}>{t.l}</button>
        ))}
      </div>

      {sub==="respondent"  && <RespondentView testers={testers} />}
      {sub==="cumulative"  && <CumulativeView va={va} testers={testers} />}
      {sub==="verbal"      && <VerbalEditView va={va} setVa={setVa} locked={locked} testers={testers} />}
    </div>
  );
}

// ─── Cumulative ───────────────────────────────────────────────────────
function BarWithTooltip({score, count, totalTesters}) {
  const [tip, setTip] = useState(false);
  if (count === 0) return (
    <div className="brow">
      <div className="blbl">{score}</div>
      <div className="btrack" style={{overflow:"visible"}} />
      <div className="bcnt">0명</div>
    </div>
  );
  return null; // handled in parent
}

function ScoreBar({q, allTesters=[]}) {
  const [hoveredScore, setHoveredScore] = useState(null);
  const ds = d5(q.scores);
  const total = Math.max(q.scores.length, 1);
  return (
    <div>
      {ds.map(({score,count}) => {
        const scorers = allTesters.filter((_,i)=>q.scores[i]===score);
        const names = scorers.map(t=>t.진행자||t.facilitator||"");
        const unique = [...new Set(names)];
        return (
          <div className="brow" key={score} style={{position:"relative"}}>
            <div className="blbl">{score}</div>
            <div className="btrack" style={{overflow:"visible",position:"relative"}}>
              {count > 0 ? (
                <div
                  className="bseg"
                  style={{width:`${(count/total)*100}%`}}
                  onMouseEnter={()=>setHoveredScore(score)}
                  onMouseLeave={()=>setHoveredScore(null)}
                >
                  {hoveredScore===score && unique.length>0 && (
                    <div className="tooltip">{unique.join(", ")} ({count}명)</div>
                  )}
                </div>
              ) : (
                <div style={{height:9}} />
              )}
            </div>
            <div className="bcnt">{count}명</div>
          </div>
        );
      })}
    </div>
  );
}

function CumulativeView({va, testers=[]}) {
  const kw = extractKW(va);
  const hasData = testers.length > 0;

  // Sheets 데이터에서 문항별 점수 배열 계산
  const questionsWithScores = QUESTIONS.map(q => {
    const scores = testers.map(t => {
      // 여러 가능한 키 이름 시도
      const v = t[q.id+"(점수)"] ?? t[q.id+"(점수) "] ?? t[" "+q.id+"(점수)"] ?? "";
      const n = Number(String(v).trim());
      return isNaN(n) ? 0 : n;
    }).filter(v => v > 0);
    return { ...q, scores, allTesters: testers };
  });

  return (
    <div>
      {!hasData && (
        <div style={{background:C.white,borderRadius:14,padding:"28px 20px",border:`1px solid ${C.border}`,marginBottom:12,textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:12}}>📋</div>
          <div style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:6}}>아직 테스트 데이터가 없습니다</div>
          <div style={{fontSize:13,color:C.light,lineHeight:1.7}}>테스트가 완료되면 점수 분포가 여기에 표시됩니다.<br/>서술형 편집 탭에서 답변을 직접 입력할 수 있습니다.</div>
        </div>
      )}
      {kw.length>0 && (
        <div style={{background:C.white,borderRadius:14,padding:"15px 18px",border:`1px solid ${C.border}`,marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>서술형 응답 키워드</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {kw.map(({word,count})=>(
              <span key={word} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"4px 11px",borderRadius:99,background:C.primarySoft,color:C.primary,fontSize:12,fontWeight:600}}>
                {word}<span style={{fontSize:10,opacity:.7}}>×{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="q-grid">
        {questionsWithScores.map(q=>(
          <div className="qb" key={q.id}>
            <div className="q-meta">
              <span className="qtag">{q.phase}</span>
              <span className="qtext">{q.text}</span>
            </div>
            <ScoreBar q={q} allTesters={testers} />
            <div style={{fontSize:10,color:C.light,marginTop:7}}>
              {q.scores.length > 0
                ? d5(q.scores).filter(x=>x.count>0).map(x=>`${x.score}점 ${x.count}명`).join(" · ")
                : "데이터 없음"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Verbal Edit ──────────────────────────────────────────────────────
function VerbalEditView({va, setVa, locked, testers=[]}) {
  const [open, setOpen] = useState(null);
  const [phase, setPhase] = useState("P1");
  const filtered = VERBAL_QS.filter(q=>q.phase===phase);
  const filled = Object.values(va).filter(v=>v&&v.trim()).length;
  const total = VERBAL_QS.length*Math.max(testers.length,1);
  const get = (ti,id) => va[`${id}_${ti}`]||"";
  const set = (ti,id,v) => { if (!locked) setVa(p=>({...p,[`${id}_${ti}`]:v})); };

  return (
    <div>
      {locked && (
        <div style={{background:C.orangeBg,borderRadius:10,padding:"9px 14px",marginBottom:11,fontSize:12,color:C.orange,fontWeight:600}}>
          🔒 기록이 마감되어 편집이 비활성화되었습니다.
        </div>
      )}
      <div style={{background:C.primaryBg,borderRadius:12,padding:"11px 15px",marginBottom:13,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
        <span style={{fontSize:13,color:C.mid,fontWeight:500}}>🎙 녹음 확인 후 답변을 입력해주세요</span>
        <span style={{fontSize:12,fontWeight:700,color:C.primary}}>{filled} / {total} 입력됨</span>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:11}}>
        {["P1","P2","P3"].map(p=>(
          <button key={p} onClick={()=>setPhase(p)} style={{padding:"5px 13px",borderRadius:99,fontSize:11,fontWeight:700,border:"none",cursor:"pointer",background:phase===p?C.primary:C.border,color:phase===p?C.white:C.mid}}>{p}</button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(q=>{
          const isOpen = open===q.id;
          const cnt = testers.filter((_,i)=>get(i,q.id).trim()).length;
          return (
            <div key={q.id} style={{background:C.white,borderRadius:13,border:`1.5px solid ${isOpen?C.primary:C.border}`,overflow:"hidden",transition:"border-color .18s"}}>
              <div onClick={()=>setOpen(isOpen?null:q.id)} style={{display:"flex",alignItems:"flex-start",gap:9,padding:"13px 15px",cursor:"pointer"}}>
                <span style={{background:C.primarySoft,color:C.primary,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:99,flexShrink:0,marginTop:2}}>{q.tag}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.dark,lineHeight:1.5,marginBottom:4}}>{q.text}</div>
                  <div style={{fontSize:11,color:C.light,lineHeight:1.5}}>💡 {q.intent}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                  <span style={{fontSize:11,fontWeight:700,color:cnt===6?C.green:C.orange}}>{cnt}/6</span>
                  <span style={{color:C.light,fontSize:11}}>{isOpen?"▲":"▼"}</span>
                </div>
              </div>
              {isOpen && (
                <div style={{padding:"0 15px 13px",borderTop:`1px solid ${C.border}`}}>
                  {(testers.length>0?testers:TESTERS).map((t,i)=>(
                    <div key={i} style={{marginTop:10}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.mid,marginBottom:3}}>T{i+1} · {t.진행자||t.facilitator||"—"} · {t.성별||t.gender}</div>
                      <textarea
                        value={get(i,q.id)}
                        onChange={e=>set(i,q.id,e.target.value)}
                        placeholder={locked?"기록이 마감되었습니다.":`T${i+1} 답변 입력...`}
                        disabled={locked}
                        rows={2}
                        style={{width:"100%",padding:"9px 11px",border:`1.5px solid ${get(i,q.id)?C.primary:C.border}`,borderRadius:9,fontSize:13,fontFamily:"inherit",color:C.dark,background:locked?"#F5F5F5":get(i,q.id)?C.primaryBg:C.white,outline:"none",resize:"vertical",lineHeight:1.6,transition:"border-color .18s",cursor:locked?"not-allowed":"text"}}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Respondent ───────────────────────────────────────────────────────
function RespondentView({ testers=[] }) {
  if (testers.length === 0) {
    return (
      <div style={{background:C.white,borderRadius:14,padding:"28px 20px",border:`1px solid ${C.border}`,textAlign:"center"}}>
        <div style={{fontSize:28,marginBottom:12}}>👥</div>
        <div style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:6}}>아직 응답자 데이터가 없습니다</div>
        <div style={{fontSize:13,color:C.light,lineHeight:1.7}}>테스트가 완료되면 응답자 분포가 여기에 표시됩니다.</div>
      </div>
    );
  }
  const mk = (field, vals) => vals.map(v=>({label:v, count:testers.filter(t=>t && t[field]===v).length}));
  const gender = mk("성별",["여","남"]);
  const curYear = new Date().getFullYear();
  const age = [
    {label:"20~22세", count:testers.filter(t=>t && (curYear-(Number(t.출생년)||0))>=20&&(curYear-(Number(t.출생년)||0))<=22).length},
    {label:"23~26세", count:testers.filter(t=>t && (curYear-(Number(t.출생년)||0))>=23&&(curYear-(Number(t.출생년)||0))<=26).length},
    {label:"27~30세", count:testers.filter(t=>t && (curYear-(Number(t.출생년)||0))>=27).length},
  ];
  const jobs = [...new Set(testers.map(t=>t&&t.직업||"").filter(Boolean))].map(j=>({label:j,count:testers.filter(t=>t&&t.직업===j).length}));
  const hh   = [...new Set(testers.map(t=>t&&t["1인가구"]||"").filter(Boolean))].map(h=>({label:h,count:testers.filter(t=>t&&t["1인가구"]===h).length}));
  const rg   = [...new Set(testers.map(t=>t&&t.거주지||"").filter(Boolean))].map(r=>({label:r,count:testers.filter(t=>t&&t.거주지===r).length}));

  const DistCard = ({title,rows}) => {
    const tot = rows.reduce((s,r)=>s+r.count,0);
    return (
      <div style={{background:C.white,borderRadius:14,padding:"15px 17px",border:`1px solid ${C.border}`}}>
        <div style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:.5,marginBottom:11}}>{title}</div>
        {rows.map((r,i)=>{
          const pct = tot>0?Math.round((r.count/tot)*100):0;
          return (
            <div key={r.label} className="drow">
              <div className="dlbl">{r.label}</div>
              <div className="dtrack"><div className="dfill" style={{width:`${pct}%`,background:PURPLES[i%PURPLES.length]}} /></div>
              <div className="dcnt">{r.count}명 <span style={{color:C.light,fontWeight:400,fontSize:10}}>({pct}%)</span></div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:12,marginBottom:14}}>
        <DistCard title="성별 분포"   rows={gender} />
        <DistCard title="연령대 분포" rows={age} />
        <DistCard title="직업 분포"   rows={jobs} />
        <DistCard title="거주 형태"   rows={hh} />
        <DistCard title="거주지 분포" rows={rg} />
      </div>
      <div style={{background:C.white,borderRadius:14,padding:"15px 17px",border:`1px solid ${C.border}`}}>
        <div style={{fontSize:11,fontWeight:700,color:C.light,textTransform:"uppercase",letterSpacing:.5,marginBottom:11}}>진행자별 참가자</div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {(testers.length>0?testers:TESTERS).map((t,i)=>(
            <div key={i} style={{background:C.surface,borderRadius:10,border:`1px solid ${C.border}`,overflow:"hidden"}}>
              <div style={{display:"flex",alignItems:"center",gap:9,padding:"10px 13px"}}>
                <div style={{width:25,height:25,borderRadius:7,background:`linear-gradient(135deg,${C.primaryLight},${C.primary})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.dark}}>진행자: {t.facilitator}</div>
                  <div style={{fontSize:11,color:C.light,marginTop:1}}>{t["성별"]||t.gender||"—"} · {calcAge(t["출생년"]||t.birth)} · {t["직업"]||t.job||"—"} · {t["거주지"]||t.region||"—"} · {t["1인가구"]||t.household||"—"}</div>
                </div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                  {QUESTIONS.map(q=><span key={q.id} className={`sc s${q.scores[i]}`}>{q.scores[i]}</span>)}
                </div>
              </div>
              {/* 타이머 + Phase 진입 시간 */}
              <div style={{borderTop:`1px solid ${C.border}`,padding:"9px 13px",background:C.primaryBg}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                  <span style={{fontSize:10,fontWeight:700,color:C.primary}}>⏱ 총 소요시간</span>
                  <span style={{fontSize:13,fontWeight:800,color:C.primary}}>
                    {cleanTime(testers[i] && testers[i]["종료"])}
                  </span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
                  {[
                    {label:"시작",    key:"테스트시작"},
                    {label:"Phase 1", key:"P1진입"},
                    {label:"Phase 2", key:"P2진입"},
                    {label:"Phase 3", key:"P3진입"},
                    {label:"종료",    key:"종료"},
                  ].map(ph=>(
                    <div key={ph.key} style={{background:C.white,borderRadius:8,padding:"5px 7px",textAlign:"center",border:`1px solid ${C.border}`}}>
                      <div style={{fontSize:9,fontWeight:700,color:C.light,marginBottom:2}}>{ph.label}</div>
                      <div style={{fontSize:11,fontWeight:800,color:C.primary,fontVariantNumeric:"tabular-nums",letterSpacing:"0.5px"}}>
                        {cleanTime(testers[i] && testers[i][ph.key])}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sheets ───────────────────────────────────────────────────────────
function SheetsView({ sheetTesters=[] }) {
  const fixedCols = ["진행자","성별","출생년","직업","거주지","1인가구"];
  const fixedWidths = [70,40,52,80,60,70];

  if (sheetTesters.length === 0) {
    return (
      <div>
        <div style={{fontSize:13,color:C.mid,marginBottom:11,lineHeight:1.7}}>
          좌측 6개 컬럼 고정 · 점수 및 서술형 답변 항목은 가로 스크롤.
        </div>
        <div style={{background:C.white,borderRadius:14,padding:"28px 20px",border:`1px solid ${C.border}`,textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:12}}>📊</div>
          <div style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:6}}>아직 시트 데이터가 없습니다</div>
          <div style={{fontSize:13,color:C.light,lineHeight:1.7}}>테스트가 완료되면 응답자별 데이터가 여기에 표시됩니다.</div>
        </div>
      </div>
    );
  }

  const displayTesters = sheetTesters;

  const FixedTable = () => (
    <table className="stbl fixed-col">
      <thead>
        <tr>{fixedCols.map((c,i)=><th key={c} style={{minWidth:fixedWidths[i]}}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {displayTesters.map((t,i)=>(
          <tr key={i}>
            <td>{t["진행자"]||"—"}</td>
            <td>{t["성별"]||"—"}</td>
            <td>{t["출생년"]||"—"}</td>
            <td>{t["직업"]||"—"}</td>
            <td>{t["거주지"]||"—"}</td>
            <td>{t["1인가구"]||"—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const ScrollTable = () => (
    <table className="stbl">
      <thead>
        <tr>
          {QUESTIONS.map(q=><th key={q.id}>{q.id}</th>)}
          {VERBAL_QS.map(q=><th key={q.id} style={{minWidth:120}}>{q.tag} {q.text.slice(0,16)}…</th>)}
        </tr>
      </thead>
      <tbody>
        {displayTesters.map((t,i)=>(
          <tr key={i}>
            {QUESTIONS.map(q=>{
              const val = t[q.id+"(점수)"];
              return <td key={q.id}>{val ? <span className={`sc s${val}`}>{val}</span> : <span style={{color:C.light}}>—</span>}</td>;
            })}
            {VERBAL_QS.map(q=><td key={q.id} style={{fontSize:10,color:C.light}}>녹음확인</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <div style={{fontSize:13,color:C.mid,marginBottom:11,lineHeight:1.7}}>
        좌측 6개 컬럼 고정 · 점수 및 서술형 답변 항목은 가로 스크롤. 어드민에서 입력한 답변이 자동 반영됩니다.
      </div>
      <div className="sheet-outer">
        <div className="sheet-container">
          <div className="sheet-fixed"><FixedTable /></div>
          <div className="sheet-scroll"><ScrollTable /></div>
        </div>
      </div>
    </div>
  );
}

// ─── Compare ──────────────────────────────────────────────────────────
function CompareView() {
  return (
    <div>
      <div style={{background:C.white,borderRadius:14,padding:"17px 20px",border:`1px solid ${C.border}`,marginBottom:12}}>
        <div style={{fontSize:14,fontWeight:700,color:C.dark,marginBottom:11}}>📊 Google Sheets vs 어드민 화면</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {[
            {title:"📋 Google Sheets", pros:["추가 개발 없이 바로 사용","엑셀처럼 자유롭게 편집","팀원과 즉시 공유"], cons:["시각적 분석 직접 구성해야 함","타임스탬프 가독성 낮음"]},
            {title:"📊 어드민 화면",  pros:["누적/분석 탭 전환 가능","서술형 직접 입력·편집","키워드 자동 추출","CSV 다운로드 지원"], cons:["개발 공수 추가 필요","원본 수정은 시트에서 별도 진행"]},
          ].map(col=>(
            <div key={col.title} style={{flex:1,minWidth:200,background:C.surface,borderRadius:10,padding:13,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:12,fontWeight:700,color:C.primary,marginBottom:8}}>{col.title}</div>
              <div style={{fontSize:12,color:C.mid,lineHeight:1.9}}>
                {col.pros.map(p=><div key={p}><span style={{color:C.green}}>✓</span> {p}</div>)}
                {col.cons.map(c=><div key={c}><span style={{color:C.red}}>✗</span> {c}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:C.primaryBg,borderRadius:12,padding:"13px 17px",fontSize:13,color:C.mid,lineHeight:1.8}}>
        <strong style={{color:C.primary}}>💡 추천</strong><br/>
        6명 규모 UT는 <strong>Sheets + 어드민 병행</strong>이 최적. Sheets는 원본 보관, 어드민은 리뷰/발표용.
      </div>
    </div>
  );
}
