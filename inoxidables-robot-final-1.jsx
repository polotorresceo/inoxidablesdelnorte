import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════ DATOS ═══════════════════ */
const HOOKS = [
  "¿Le estás dando toxinas a tu familia sin saberlo?",
  "¿Sabes qué libera tu sartén cuando lo calientas?",
  "¿Sigues cocinando con teflón rayado?",
  "¿Tu cocina cuida o descuida tu salud?",
  "¿Cuánto vale la salud de tu familia?",
  "¿Ya sabes por qué los chefs eligen acero inoxidable?",
  "¿Estás invirtiendo en salud o en gastos recurrentes?",
  "¿Qué pasa cuando el teflón llega a alta temperatura?",
  "¿Cuál es la diferencia entre cocinar bien y cocinar seguro?",
  "¿Tu sartén tiene vida útil vencida?",
  "Antes de encender la estufa, lee esto…",
  "Cambia uno. Cambia todo.",
  "Cocinar bien empieza antes de la receta.",
  "Con el material correcto, cualquier platillo es obra de arte.",
  "El mejor regalo para tu cocina no es una receta.",
  "El secreto de la cocina saludable no está en los ingredientes.",
  "El teflón se desgasta. El acero inoxidable, no.",
  "Elegancia y salud en cada cocción.",
  "En tu cocina también se toman decisiones de salud.",
  "Esta es la inversión que tu cocina llevaba años esperando.",
  "Hay cocinas que cuidan… y cocinas que enferman.",
  "La calidad se siente desde el primer platillo.",
  "La cocina que mereces existe.",
  "Las mejores familias cocinan con los mejores utensilios.",
  "Lo que cocinas importa. Cómo lo cocinas, también.",
  "Lo que no ves en tu sartén puede estar en tu comida.",
  "Los mejores cocineros del mundo tienen algo en común.",
  "No todas las ollas son iguales.",
  "No es solo cocinar. Es cuidar.",
  "No es moda. Es una decisión inteligente.",
  "Porque tu familia merece más que lo promedio.",
  "Si cocinas todos los días, esto te importa.",
  "Sin tóxicos. Sin riesgos. Sin compromisos.",
  "Sube de nivel en tu cocina hoy.",
  "Todo gran chef tiene un secreto. Descúbrelo.",
  "Tu cocina habla de ti. ¿Qué dice hoy?",
  "Tu salud no es negociable.",
  "Una cocina premium es una cocina saludable.",
  "Un buen utensilio dura más que diez baratos.",
  "Vivirás mejor si cocinas mejor.",
  "Cuando cuidas lo que comes, cuidas tu futuro."
].sort();

const PLATILLOS = [
  "Arroz con leche","Arroz rojo","Bistec a la mexicana","Caldo de pollo","Caldo de res",
  "Camarones al mojo de ajo","Carnitas","Ceviche","Chiles en nogada","Chilaquiles",
  "Chiles rellenos","Caldo tlalpeño","Crema de elote","Ejotes con crema",
  "Enchiladas verdes","Enfrijoladas","Ensalada César","Espagueti a la boloñesa",
  "Estofado de res","Fajitas de pollo","Fideo seco","Flautas de pollo",
  "Guisado de lentejas","Huevos a la mexicana","Lomo en salsa","Macarrones con queso",
  "Milanesa de res","Mole rojo","Molletes","Panuchos","Papas con chorizo",
  "Pasta con camarones","Picadillo","Pipián verde","Pollo al ajillo","Pollo asado",
  "Pozole rojo","Pozole verde","Puntas de filete","Quesadillas","Res en salsa verde",
  "Sopa de lima","Sopa de tortilla","Sopa de verduras","Tacos de barbacoa",
  "Tacos de canasta","Tamal de rajas","Tamales de elote","Tamales rojos",
  "Tinga de pollo","Tortas de camarón"
].sort();

const PRODUCTOS = [
  "Juego completo de ollas (oferta mayo $14,500)",
  "Sartén de acero T304",
  "Tamalera 30L (de $27,000 a $19,900)",
  "Olla express / presión",
  "Vaporera de acero",
  "Wok de acero inoxidable",
  "Olla para caldo (6 litros)",
  "Set de sartenes variados",
  "Juego completo + portaespecias"
];

const TONES = [
  { k:"educativo",   l:"🎓 Educativo" },
  { k:"emocional",   l:"💛 Emocional" },
  { k:"urgente",     l:"🔥 Urgente"   },
  { k:"lujoso",      l:"✨ Lujoso"    },
  { k:"salud",       l:"💚 Salud"     },
  { k:"comparativo", l:"⚖️ Comparativo" },
];

const TONE_DESC = {
  educativo:   "informativo y educativo sobre los beneficios del acero T304",
  emocional:   "emotivo y cercano, apelando al amor familiar y el cuidado del hogar",
  urgente:     "urgente y con sentido de escasez u oferta limitada",
  lujoso:      "elegante, aspiracional y de lujo, estilo premium",
  salud:       "enfocado en salud, bienestar y nutrición familiar",
  comparativo: "comparativo entre teflón y acero inoxidable T304, dejando claro quién gana",
};

const BANNER_DEFAULT = "https://i.ibb.co/6cfd6sPN/Gemini-Generated-Image-yiel6syiel6syiel.png";
const ADMIN_PW = "5366";

/* ═══════════════════ ESTILOS GLOBALES ═══════════════════ */
const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #1a1208; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #8a6a1a; border-radius: 2px; }
  @keyframes shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
`;

/* ═══════════════════ COMPONENTE SELECT ═══════════════════ */
function Select({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} style={{ position:"relative", width:"100%" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width:"100%", background: value ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.06)",
          border:`1px solid ${value ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.25)"}`,
          color: value ? "#f0d080" : "rgba(247,240,224,0.6)",
          padding:"11px 14px 11px 16px", borderRadius:7,
          fontFamily:"Montserrat,sans-serif", fontSize:"0.81rem",
          cursor:"pointer", textAlign:"left",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          transition:"all 0.2s", gap:8
        }}
      >
        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {value || placeholder}
        </span>
        <span style={{ color:"#c9a84c", fontSize:"0.65rem", flexShrink:0,
          transform: open ? "rotate(180deg)" : "none", transition:"transform 0.2s" }}>▼</span>
      </button>

      {open && (
        <div style={{
          position:"absolute", top:"calc(100% + 5px)", left:0, right:0,
          background:"#1c1508", border:"1px solid rgba(201,168,76,0.4)",
          borderRadius:7, maxHeight:250, overflowY:"auto", zIndex:500,
          boxShadow:"0 12px 50px rgba(0,0,0,0.7)", animation:"fadeUp 0.15s ease"
        }}>
          {options.map(opt => (
            <div key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding:"9px 16px", fontSize:"0.79rem", cursor:"pointer",
                borderBottom:"1px solid rgba(255,255,255,0.04)",
                color: opt === value ? "#f0d080" : "#f7f0e0",
                background: opt === value ? "rgba(201,168,76,0.2)" : "transparent",
                transition:"background 0.12s", lineHeight:1.45
              }}
              onMouseEnter={e => { if(opt!==value) e.currentTarget.style.background="rgba(201,168,76,0.1)"; }}
              onMouseLeave={e => { if(opt!==value) e.currentTarget.style.background="transparent"; }}
            >{opt}</div>
          ))}
        </div>
      )}

      {value && (
        <div style={{ marginTop:5 }}>
          <span style={{
            background:"rgba(201,168,76,0.15)", border:"1px solid rgba(201,168,76,0.4)",
            color:"#f0d080", fontSize:"0.68rem", padding:"3px 10px",
            borderRadius:20, display:"inline-block", maxWidth:"100%",
            overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"
          }}>✓ {value}</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ SECTION TITLE ═══════════════════ */
function STitle({ children }) {
  return (
    <div style={{
      fontSize:"0.61rem", letterSpacing:"0.22em", textTransform:"uppercase",
      color:"#c9a84c", marginBottom:10,
      display:"flex", alignItems:"center", gap:8
    }}>
      {children}
      <div style={{ flex:1, height:1, background:"rgba(201,168,76,0.25)" }} />
    </div>
  );
}

/* ═══════════════════ APP PRINCIPAL ═══════════════════ */
export default function App() {

  /* -- Banner -- */
  const [bannerUrls, setBannerUrls]     = useState([BANNER_DEFAULT, "", ""]);
  const [bannerInputs, setBannerInputs] = useState([BANNER_DEFAULT, "", ""]);
  const [slide, setSlide]               = useState(0);
  const timerRef = useRef(null);

  /* -- Admin -- */
  const [admOpen, setAdmOpen]       = useState(false);
  const [admAuth, setAdmAuth]       = useState(false);
  const [pwVal, setPwVal]           = useState("");
  const [pwErr, setPwErr]           = useState(false);

  /* -- Partner -- */
  const [pName, setPName]   = useState("");
  const [pWA, setPWA]       = useState("522214282564");
  const [pEmail, setPEmail] = useState("");
  const [pNameI, setPNameI] = useState("");
  const [pWAI, setPWAI]     = useState("");
  const [pEmailI, setPEmailI] = useState("");
  const [pSaved, setPSaved] = useState(false);

  /* -- Generator -- */
  const [hook, setHook]       = useState("");
  const [plat, setPlat]       = useState("");
  const [prod, setProd]       = useState("");
  const [tone, setTone]       = useState("educativo");
  const [extra, setExtra]     = useState("");
  const [loading, setLoading] = useState(false);
  const [postTxt, setPostTxt] = useState("");
  const [postVis, setPostVis] = useState(false);
  const [history, setHistory] = useState([]);
  const [stats, setStats]     = useState({ total:0, ses:0, cop:0 });
  const [toast, setToast]     = useState({ msg:"", on:false });
  const toastRef = useRef(null);

  /* ── Banner rotation ── */
  const startRot = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSlide(s => (s+1)%3), 6000);
  }, []);

  useEffect(() => { startRot(); return () => clearInterval(timerRef.current); }, [startRot]);

  const goSlide = n => {
    setSlide(((n % 3) + 3) % 3);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(startRot, 300);
  };

  /* ── Toast ── */
  const showToast = msg => {
    setToast({ msg, on:true });
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast({ msg:"", on:false }), 3000);
  };

  /* ── Admin ── */
  const checkPw = () => {
    if (pwVal === ADMIN_PW) { setAdmAuth(true); setPwErr(false); setPwVal(""); }
    else { setPwErr(true); setPwVal(""); }
  };

  /* ── Apply banner ── */
  const applyBanner = idx => {
    const url = bannerInputs[idx].trim();
    if (!url) { showToast("⚠️ Ingresa una URL primero"); return; }
    setBannerUrls(prev => { const n=[...prev]; n[idx]=url; return n; });
    showToast(`✅ Banner ${idx+1} actualizado`);
  };

  /* ── Save partner ── */
  const savePartner = () => {
    if (!pNameI) { showToast("⚠️ Ingresa el nombre"); return; }
    if (!pWAI)   { showToast("⚠️ Ingresa el WhatsApp"); return; }
    const wa = pWAI.replace(/\D/g,"");
    setPName(pNameI); setPWA(wa); setPEmail(pEmailI); setPSaved(true);
    showToast(`✅ Partner "${pNameI}" activado`);
  };

  /* ════════════════════════════════════════
     GENERAR POST — llamada a Anthropic API
     El fetch funciona porque Claude.ai sirve
     este artifact y maneja el proxy/auth.
  ════════════════════════════════════════ */
  const generatePost = async () => {
    if (!hook) { showToast("⚠️ Selecciona un hook primero"); return; }
    if (!plat) { showToast("⚠️ Selecciona un platillo");    return; }

    setLoading(true);
    setPostVis(false);
    setPostTxt("");

    const producto = prod || "Juego completo de ollas";
    const waNum    = pWA  || "522214282564";

    const prompt =
`Eres experto en marketing de redes sociales para "Inoxidables del Norte", marca mexicana de utensilios de cocina de acero inoxidable quirúrgico T304.

Crea un post para Instagram/Facebook con:
• Hook EXACTO (cópialo sin cambiar ni una letra): "${hook}"
• Platillo: "${plat}"
• Producto: "${producto}"
• Tono: ${TONE_DESC[tone]}
• Detalle extra: "${extra || 'ninguno'}"

REGLAS:
1. Inicia EXACTAMENTE con el hook, sin modificarlo
2. Conecta el platillo con beneficios del acero T304: no libera toxinas, no guarda bacterias, resiste altas temperaturas, dura años
3. Menciona el producto de forma natural en el texto
4. Máximo 220 palabras
5. 3-5 emojis distribuidos con naturalidad
6. Última línea SIEMPRE: "📲 Escríbenos por WhatsApp: +${waNum}"
7. 3-5 hashtags finales: #AceroInoxidable #CocinaSaludable #InoxidablesDelNorte + 1-2 del platillo

RESPONDE SOLO CON EL TEXTO DEL POST. Sin comillas, sin introducción, sin notas.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        let errMsg = `Error HTTP ${response.status}`;
        try {
          const errData = await response.json();
          errMsg = errData?.error?.message || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }

      const data = await response.json();

      const block = Array.isArray(data.content)
        ? data.content.find(b => b.type === "text")
        : null;

      if (!block || !block.text) throw new Error("Respuesta vacía de la API");

      const text = block.text.trim();
      setPostTxt(text);
      setPostVis(true);
      setStats(s => ({ ...s, total: s.total+1, ses: s.ses+1 }));
      setHistory(h => [{ plat, preview: text.slice(0,90)+"…", full: text }, ...h].slice(0, 6));
      showToast("✨ ¡Post generado con éxito!");

    } catch (err) {
      console.error("API Error:", err);
      showToast("❌ " + (err.message || "Error desconocido"));
    } finally {
      setLoading(false);
    }
  };

  const copyPost = () => {
    if (!postTxt) return;
    const doCopy = () => {
      setStats(s => ({ ...s, cop: s.cop+1 }));
      showToast("📋 Post copiado al portapapeles");
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postTxt).then(doCopy).catch(() => {
        const ta = Object.assign(document.createElement("textarea"),
          { value: postTxt, style: "position:fixed;opacity:0" });
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
        doCopy();
      });
    }
  };

  const sendWA = () => {
    if (!postTxt) return;
    window.open(`https://wa.me/${pWA}?text=${encodeURIComponent(postTxt)}`, "_blank");
  };

  /* ─── colores base ─── */
  const G = "#c9a84c", GL = "#f0d080", GD = "#8a6a1a";
  const DARK = "#1a1208", CREAM = "#f7f0e0";
  const GREEN = "#1e5c38", GREENL = "#2d8a55";

  const bannerLabels = [
    "🌟 Oferta Mayo — $14,500",
    "✨ Acero Quirúrgico T304 — Sin Tóxicos",
    "📲 Contáctanos — 52 2214282564"
  ];
  const bannerBgs = [
    "linear-gradient(135deg,#1a1208,#2e2010)",
    "linear-gradient(135deg,#0e2918,#1a3a20)",
    "linear-gradient(135deg,#1a1208,#3a2a0a)"
  ];

  return (
    <div style={{ background: DARK, minHeight:"100vh",
      fontFamily:"Montserrat,sans-serif", color: CREAM,
      backgroundImage:"radial-gradient(ellipse at 10% 20%,rgba(201,168,76,.07) 0%,transparent 50%),radial-gradient(ellipse at 90% 80%,rgba(30,92,56,.07) 0%,transparent 50%)" }}>

      <style>{GS}</style>

      {/* ══ ADMIN ══ */}
      <div style={{ background:"rgba(0,0,0,.7)", borderBottom:"1px solid rgba(201,168,76,.2)" }}>
        <button
          onClick={() => setAdmOpen(o => !o)}
          style={{ width:"100%", background:"none", border:"none", color: G,
            fontFamily:"Montserrat,sans-serif", fontSize:"0.69rem", fontWeight:700,
            letterSpacing:"0.22em", textTransform:"uppercase",
            padding:"10px 20px", cursor:"pointer", textAlign:"left",
            display:"flex", alignItems:"center", gap:10 }}>
          🔐 Panel de Administrador
          <span style={{ marginLeft:"auto", transition:"transform 0.25s",
            transform: admOpen ? "rotate(180deg)" : "none" }}>▼</span>
        </button>

        {admOpen && (
          <div style={{ padding:"0 20px 20px", animation:"fadeUp 0.2s ease" }}>
            {!admAuth ? (
              <div style={{ maxWidth:280, margin:"10px auto", textAlign:"center" }}>
                <div style={{ fontSize:"0.73rem", color:"rgba(255,255,255,.4)", marginBottom:10 }}>
                  Ingresa la contraseña de administrador
                </div>
                <input
                  type="password" value={pwVal}
                  onChange={e => { setPwVal(e.target.value); setPwErr(false); }}
                  onKeyDown={e => e.key==="Enter" && checkPw()}
                  placeholder="••••••" maxLength={10}
                  style={{ width:"100%", background:"rgba(255,255,255,.06)",
                    border:`1px solid ${pwErr ? "#e74c3c" : "rgba(201,168,76,.35)"}`,
                    color: CREAM, padding:"10px 14px", borderRadius:6,
                    fontFamily:"Montserrat,sans-serif", fontSize:"0.82rem",
                    outline:"none", textAlign:"center", letterSpacing:"0.2em",
                    marginBottom:8, display:"block" }} />
                {pwErr && <div style={{ color:"#e74c3c", fontSize:"0.71rem", marginBottom:8 }}>
                  Contraseña incorrecta
                </div>}
                <button onClick={checkPw}
                  style={{ background:`linear-gradient(135deg,${GD},${G})`,
                    border:"none", color: DARK, padding:"10px 28px", borderRadius:6,
                    fontFamily:"Montserrat,sans-serif", fontWeight:700,
                    fontSize:"0.78rem", letterSpacing:"0.1em",
                    textTransform:"uppercase", cursor:"pointer" }}>
                  🔓 Entrar
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between",
                  alignItems:"center", marginBottom:14 }}>
                  <span style={{ fontSize:"0.69rem", color: GREENL, fontWeight:700 }}>
                    ✅ Sesión de administrador activa
                  </span>
                  <button onClick={() => { setAdmAuth(false); setAdmOpen(false); }}
                    style={{ background:"none", border:"none",
                      color:"rgba(255,255,255,.35)", fontSize:"0.67rem",
                      cursor:"pointer", textDecoration:"underline" }}>
                    Cerrar sesión
                  </button>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>

                  {/* BANNERS */}
                  <div>
                    <STitle>🖼️ Cargar Banners (URL imgbb)</STitle>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:8,
                        marginBottom:10, background:"rgba(255,255,255,.03)",
                        border:"1px dashed rgba(201,168,76,.28)",
                        borderRadius:8, padding:"10px 12px" }}>
                        <div style={{ background:"rgba(201,168,76,.2)", color: G,
                          width:26, height:26, borderRadius:"50%",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontWeight:700, fontSize:"0.73rem", flexShrink:0 }}>{i+1}</div>
                        <input type="text"
                          value={bannerInputs[i]}
                          onChange={e => { const n=[...bannerInputs]; n[i]=e.target.value; setBannerInputs(n); }}
                          placeholder={`URL banner ${i+1}.jpg`}
                          style={{ flex:1, background:"rgba(255,255,255,.05)",
                            border:"1px solid rgba(201,168,76,.2)", color: CREAM,
                            padding:"7px 10px", borderRadius:5,
                            fontFamily:"Montserrat,sans-serif", fontSize:"0.72rem",
                            outline:"none" }} />
                        <button onClick={() => applyBanner(i)}
                          style={{ background:"rgba(201,168,76,.18)",
                            border:"1px solid rgba(201,168,76,.4)", color: GL,
                            padding:"7px 12px", borderRadius:5,
                            fontFamily:"Montserrat,sans-serif", fontSize:"0.67rem",
                            fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                          Aplicar
                        </button>
                      </div>
                    ))}
                    <div style={{ fontSize:"0.62rem", color:"rgba(255,255,255,.28)", lineHeight:1.6 }}>
                      Copia la URL directa de imgbb (termina en .jpg/.png) y presiona Aplicar.
                    </div>
                  </div>

                  {/* PARTNER */}
                  <div>
                    <STitle>👤 Datos del Partner / Distribuidora</STitle>
                    {[
                      { label:"Nombre completo", val:pNameI, set:setPNameI, ph:"Ej: María González",    type:"text"  },
                      { label:"WhatsApp (con código país)", val:pWAI, set:setPWAI, ph:"Ej: 522214282564", type:"text"  },
                      { label:"Correo Gmail",    val:pEmailI, set:setPEmailI, ph:"nombre@gmail.com",   type:"email" },
                    ].map(f => (
                      <div key={f.label} style={{ marginBottom:10 }}>
                        <div style={{ fontSize:"0.61rem", letterSpacing:"0.1em",
                          textTransform:"uppercase", color:"rgba(255,255,255,.38)",
                          marginBottom:4 }}>{f.label}</div>
                        <input type={f.type} value={f.val}
                          onChange={e => f.set(e.target.value)}
                          placeholder={f.ph}
                          style={{ width:"100%", background:"rgba(255,255,255,.05)",
                            border:"1px solid rgba(201,168,76,.2)", color: CREAM,
                            padding:"9px 12px", borderRadius:6,
                            fontFamily:"Montserrat,sans-serif", fontSize:"0.81rem",
                            outline:"none" }} />
                      </div>
                    ))}
                    <button onClick={savePartner}
                      style={{ background:`linear-gradient(135deg,${GREEN},${GREENL})`,
                        border:"none", color:"#fff", padding:"11px 20px",
                        borderRadius:6, fontFamily:"Montserrat,sans-serif",
                        fontWeight:700, fontSize:"0.77rem", letterSpacing:"0.08em",
                        textTransform:"uppercase", cursor:"pointer", width:"100%" }}>
                      💾 Guardar y Activar
                    </button>
                    {pSaved && (
                      <div style={{ marginTop:10, background:"rgba(30,92,56,.15)",
                        border:"1px solid rgba(45,138,85,.3)", borderRadius:8,
                        padding:"10px 14px", fontSize:"0.75rem", lineHeight:1.8 }}>
                        <strong style={{ color: GREENL }}>Partner:</strong> {pName}<br/>
                        <strong style={{ color: GREENL }}>WhatsApp:</strong> +{pWA}<br/>
                        {pEmail && <><strong style={{ color: GREENL }}>Email:</strong> {pEmail}</>}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══ BANNER ══ */}
      <div style={{ position:"relative", overflow:"hidden", borderBottom:"2px solid "+GD }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ display: i===slide ? "block" : "none",
            position:"relative", animation: i===slide ? "fadeUp 0.7s ease" : "none" }}>
            {bannerUrls[i] ? (
              <img src={bannerUrls[i]} alt={`Banner ${i+1}`}
                onError={e => { e.target.style.display="none"; }}
                style={{ width:"100%", maxHeight:380, objectFit:"cover", display:"block" }} />
            ) : (
              <div style={{ height:180, background: bannerBgs[i],
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"rgba(255,255,255,.22)", fontSize:"0.8rem", fontStyle:"italic" }}>
                🖼️ Banner {i+1} — carga tu imagen desde el panel admin
              </div>
            )}
            <div style={{ position:"absolute", bottom:0, left:0, right:0,
              background:"linear-gradient(transparent,rgba(0,0,0,.72))",
              padding:"14px 22px", display:"flex",
              justifyContent:"space-between", alignItems:"flex-end" }}>
              <span style={{ fontFamily:"Cormorant Garamond,serif", fontSize:"1.05rem",
                color: GL, fontStyle:"italic" }}>{bannerLabels[i]}</span>
              <div style={{ display:"flex", gap:8 }}>
                {[0,1,2].map(j => (
                  <button key={j} onClick={() => goSlide(j)}
                    style={{ width:10, height:10, borderRadius:"50%", border:"none",
                      background: j===slide ? G : "rgba(255,255,255,.38)",
                      cursor:"pointer", transition:"background 0.3s", padding:0 }} />
                ))}
              </div>
            </div>
          </div>
        ))}
        {["‹","›"].map((ch, di) => (
          <button key={ch} onClick={() => goSlide(slide + (di===0 ? -1 : 1))}
            style={{ position:"absolute", top:"50%", transform:"translateY(-50%)",
              [di===0 ? "left" : "right"]: 12,
              background:"rgba(0,0,0,.5)", border:`1px solid ${GD}`,
              color: G, width:38, height:38, borderRadius:"50%",
              cursor:"pointer", fontSize:"1.2rem",
              display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}>
            {ch}
          </button>
        ))}
      </div>

      {/* ══ HEADER ══ */}
      <div style={{ textAlign:"center", padding:"28px 20px 14px" }}>
        <div style={{ fontFamily:"Cormorant Garamond,serif",
          fontSize:"clamp(1.5rem,4vw,2.5rem)",
          fontWeight:700, color: G,
          textShadow:`0 0 40px rgba(201,168,76,.35)` }}>
          ∞ Inoxidables <em style={{ fontWeight:400 }}>del Norte</em>
        </div>
        <div style={{ fontSize:"0.68rem", letterSpacing:"0.26em",
          textTransform:"uppercase", color:"#8ab4c8", marginTop:5 }}>
          Robot de Creación de Posts • Cocina Saludable
        </div>
        <div style={{ width:80, height:1,
          background:`linear-gradient(90deg,transparent,${G},transparent)`,
          margin:"10px auto" }} />
      </div>

      {pSaved && (
        <div style={{ background:"rgba(30,92,56,.15)",
          borderTop:"1px solid rgba(45,138,85,.2)",
          borderBottom:"1px solid rgba(45,138,85,.2)",
          padding:"8px 20px", fontSize:"0.72rem",
          color:"rgba(255,255,255,.5)", textAlign:"center" }}>
          Distribuidora activa: <strong style={{ color: GREENL }}>{pName}</strong>
          &nbsp;|&nbsp; 📲 <strong style={{ color: GREENL }}>+{pWA}</strong>
          {pEmail && <> &nbsp;|&nbsp; ✉️ <strong style={{ color: GREENL }}>{pEmail}</strong></>}
        </div>
      )}

      {/* ══ MAIN GRID ══ */}
      <div style={{ display:"grid", gridTemplateColumns:"320px 1fr",
        maxWidth:1280, margin:"0 auto", padding:"0 16px 48px" }}>

        {/* ── LEFT ── */}
        <div style={{ background:"rgba(255,255,255,.025)",
          borderRight:"1px solid rgba(201,168,76,.18)",
          padding:"24px 20px", display:"flex", flexDirection:"column", gap:20 }}>

          <div><STitle>🎣 Hook de apertura</STitle>
            <Select placeholder="Seleccionar hook…" options={HOOKS} value={hook} onChange={setHook} />
          </div>

          <div><STitle>🍽️ Platillo a preparar</STitle>
            <Select placeholder="Seleccionar platillo…" options={PLATILLOS} value={plat} onChange={setPlat} />
          </div>

          <div><STitle>🥘 Producto Inoxidables</STitle>
            <Select placeholder="Seleccionar producto…" options={PRODUCTOS} value={prod} onChange={setProd} />
          </div>

          <div>
            <STitle>🎨 Tono del post</STitle>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {TONES.map(t => (
                <button key={t.k} onClick={() => setTone(t.k)}
                  style={{ background: tone===t.k ? "rgba(201,168,76,.22)" : "rgba(255,255,255,.04)",
                    border:`1px solid ${tone===t.k ? G : "rgba(201,168,76,.18)"}`,
                    color: tone===t.k ? GL : CREAM,
                    padding:"9px 4px", borderRadius:7, fontSize:"0.71rem",
                    cursor:"pointer", fontFamily:"Montserrat,sans-serif",
                    transition:"all 0.2s" }}>
                  {t.l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <STitle>✏️ Detalle extra (opcional)</STitle>
            <textarea value={extra} onChange={e => setExtra(e.target.value)} rows={2}
              placeholder="Ej: destacar oferta de mayo, mencionar la tamalera…"
              style={{ width:"100%", background:"rgba(255,255,255,.04)",
                border:"1px solid rgba(201,168,76,.22)", color: CREAM,
                padding:"10px 14px", borderRadius:7,
                fontFamily:"Montserrat,sans-serif", fontSize:"0.81rem",
                outline:"none", resize:"none" }} />
          </div>

          <div style={{ background:"rgba(30,92,56,.15)",
            border:"1px solid rgba(45,138,85,.3)", borderRadius:7,
            padding:"12px 14px", fontSize:"0.74rem", lineHeight:1.8 }}>
            <strong style={{ color: GREENL }}>📲 CTA automático:</strong><br/>
            WhatsApp: <strong style={{ color: GREENL }}>+{pWA}</strong>
          </div>

          <div style={{ height:1, background:"rgba(201,168,76,.12)" }} />

          <button onClick={generatePost} disabled={loading}
            style={{ width:"100%", padding:"15px",
              background:`linear-gradient(135deg,${GD},${G},${GD})`,
              backgroundSize:"200% 200%",
              border:"none", borderRadius:8, color: DARK,
              fontFamily:"Montserrat,sans-serif", fontWeight:800,
              fontSize:"0.84rem", letterSpacing:"0.13em",
              textTransform:"uppercase", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.55 : 1, transition:"all 0.3s",
              animation: loading ? "none" : "shimmer 3s infinite",
              boxShadow: loading ? "none" : "0 4px 20px rgba(201,168,76,.25)" }}>
            {loading ? "⏳ Generando post…" : "✨ Generar Post con IA"}
          </button>

        </div>

        {/* ── RIGHT ── */}
        <div style={{ padding:"24px 24px 24px 28px",
          display:"flex", flexDirection:"column", gap:20 }}>

          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[["Posts Generados", stats.total],["Esta Sesión", stats.ses],["Copiados", stats.cop]].map(([lbl,val]) => (
              <div key={lbl} style={{ background:"rgba(255,255,255,.03)",
                border:"1px solid rgba(201,168,76,.14)",
                borderRadius:9, padding:14, textAlign:"center" }}>
                <div style={{ fontFamily:"Cormorant Garamond,serif",
                  fontSize:"2rem", fontWeight:700, color: G, lineHeight:1 }}>{val}</div>
                <div style={{ fontSize:"0.6rem", textTransform:"uppercase",
                  letterSpacing:"0.1em", color:"rgba(255,255,255,.38)", marginTop:5 }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Output */}
          <div style={{ background:"rgba(255,255,255,.03)",
            border:"1px solid rgba(201,168,76,.18)",
            borderRadius:10, minHeight:300, position:"relative", overflow:"hidden" }}>

            {/* Spinner */}
            {loading && (
              <div style={{ position:"absolute", inset:0,
                background:"rgba(26,18,8,.9)", display:"flex",
                flexDirection:"column", alignItems:"center",
                justifyContent:"center", gap:16, zIndex:20 }}>
                <div style={{ width:48, height:48,
                  border:"3px solid rgba(201,168,76,.2)",
                  borderTopColor: G, borderRadius:"50%",
                  animation:"spin 0.8s linear infinite" }} />
                <div style={{ fontSize:"0.77rem", color: GL,
                  letterSpacing:"0.1em", fontStyle:"italic",
                  animation:"pulse 1.5s ease infinite" }}>
                  Creando tu post con IA…
                </div>
              </div>
            )}

            {/* Placeholder */}
            {!loading && !postVis && (
              <div style={{ position:"absolute", inset:0, display:"flex",
                flexDirection:"column", alignItems:"center",
                justifyContent:"center", gap:14,
                color:"rgba(255,255,255,.18)", textAlign:"center", padding:20 }}>
                <div style={{ fontSize:"3rem", opacity:0.25 }}>🥘</div>
                <div style={{ fontSize:"0.79rem", lineHeight:1.7 }}>
                  Selecciona un <strong style={{ color: G }}>hook</strong> y un{" "}
                  <strong style={{ color: G }}>platillo</strong><br/>
                  luego presiona Generar Post
                </div>
              </div>
            )}

            {/* Post */}
            {!loading && postVis && (
              <div style={{ padding:28, animation:"fadeUp 0.4s ease" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                  <div style={{ width:44, height:44, borderRadius:"50%",
                    background:`linear-gradient(135deg,${GD},${GREEN})`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"Cormorant Garamond,serif", fontSize:"1.2rem",
                    fontWeight:700, color: GL, flexShrink:0 }}>I</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:"0.84rem" }}>
                      {pSaved ? `@${pName.toLowerCase().replace(/\s+/g,"_")}` : "@inoxidablesdelnorte"}
                    </div>
                    <div style={{ fontSize:"0.69rem", color:"rgba(255,255,255,.38)" }}>
                      Cocina Saludable · Acero T304
                    </div>
                  </div>
                </div>
                <div style={{ background:"rgba(255,255,255,.045)",
                  border:"1px solid rgba(255,255,255,.07)",
                  borderRadius:8, padding:18, fontSize:"0.87rem",
                  lineHeight:1.85, whiteSpace:"pre-wrap", color: CREAM, minHeight:160 }}>
                  {postTxt}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {postVis && !loading && (
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", animation:"fadeUp 0.3s ease" }}>
              {[
                { l:"📋 Copiar Post", fn:copyPost,  bg:"rgba(201,168,76,.15)", bc:"rgba(201,168,76,.4)",  c: GL },
                { l:"🔄 Regenerar",  fn:generatePost, bg:"rgba(255,255,255,.05)", bc:"rgba(255,255,255,.15)", c: CREAM },
                { l:"💬 WhatsApp",   fn:sendWA,     bg:"rgba(37,211,102,.15)", bc:"rgba(37,211,102,.35)", c:"#25d366" },
              ].map(b => (
                <button key={b.l} onClick={b.fn}
                  style={{ padding:"10px 18px", borderRadius:7,
                    fontFamily:"Montserrat,sans-serif", fontSize:"0.74rem",
                    fontWeight:600, cursor:"pointer", letterSpacing:"0.06em",
                    textTransform:"uppercase", transition:"all 0.2s",
                    background: b.bg, border:`1px solid ${b.bc}`, color: b.c }}>
                  {b.l}
                </button>
              ))}
            </div>
          )}

          {/* Tip */}
          <div style={{ background:"rgba(201,168,76,.055)",
            borderLeft:`3px solid ${GD}`, padding:"12px 16px",
            borderRadius:"0 7px 7px 0", fontSize:"0.74rem",
            lineHeight:1.65, color:"rgba(255,255,255,.5)" }}>
            <strong style={{ color: GL }}>💡 Tip:</strong> Los posts con hook de salud + platillo familiar generan hasta 3× más engagement. Alterna tonos cada semana para mantener la audiencia activa.
          </div>

          {/* Historial */}
          <div>
            <STitle>📚 Últimos posts generados</STitle>
            {history.length === 0
              ? <div style={{ color:"rgba(255,255,255,.2)", fontSize:"0.74rem" }}>
                  Los posts generados aparecerán aquí…
                </div>
              : <div style={{ display:"grid",
                  gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))", gap:10 }}>
                  {history.map((item, i) => (
                    <div key={i}
                      onClick={() => { setPostTxt(item.full); setPostVis(true); }}
                      style={{ background:"rgba(255,255,255,.03)",
                        border:"1px solid rgba(255,255,255,.07)",
                        borderRadius:8, padding:12, fontSize:"0.71rem",
                        lineHeight:1.55, cursor:"pointer",
                        color:"rgba(255,255,255,.55)", transition:"all 0.2s" }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "rgba(201,168,76,.38)";
                        e.currentTarget.style.color = CREAM;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,.07)";
                        e.currentTarget.style.color = "rgba(255,255,255,.55)";
                      }}>
                      <span style={{ fontSize:"0.59rem", background:"rgba(201,168,76,.2)",
                        color: G, padding:"2px 7px", borderRadius:20,
                        display:"inline-block", marginBottom:6,
                        letterSpacing:"0.06em", textTransform:"uppercase" }}>
                        {item.plat.slice(0,18)}
                      </span>
                      <br/>{item.preview}
                    </div>
                  ))}
                </div>
            }
          </div>

        </div>
      </div>

      {/* ══ TOAST ══ */}
      <div style={{
        position:"fixed", bottom:24, right:24,
        background: GREEN, color:"#fff",
        padding:"12px 22px", borderRadius:9,
        fontSize:"0.81rem", fontWeight:600,
        opacity: toast.on ? 1 : 0,
        transform: toast.on ? "translateY(0)" : "translateY(10px)",
        transition:"all 0.3s", zIndex:999, pointerEvents:"none",
        boxShadow:"0 4px 20px rgba(0,0,0,.4)"
      }}>{toast.msg}</div>

    </div>
  );
}
