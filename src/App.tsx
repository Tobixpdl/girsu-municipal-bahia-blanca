import { Suspense, lazy, useEffect, useState } from 'react'
import { lessons, pageUrl, sourceUrl } from './content'

const OfficeScene = lazy(() => import('./OfficeScene'))
const key = 'girsu-mbb-96bf8a6f-v1'
type Progress = { visited: string[]; completed: string[] }
function readProgress(): Progress {
  try { const p = JSON.parse(localStorage.getItem(key) || '{}'); return { visited: Array.isArray(p.visited) ? p.visited : [], completed: Array.isArray(p.completed) ? p.completed : [] } }
  catch { return { visited: [], completed: [] } }
}
function initialLesson() { const id = decodeURIComponent(location.hash.slice(1)); return lessons.some(x => x.id === id) ? id : '' }

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  if (name === 'leaf') return <svg {...common}><path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16Z"/><path d="M5 19c3-5 7-8 12-11"/></svg>
  if (name === 'arrow') return <svg {...common}><path d="M4 12h16m-7-7 7 7-7 7"/></svg>
  if (name === 'check') return <svg {...common}><path d="m4 12 5 5L20 6"/></svg>
  if (name === 'book') return <svg {...common}><path d="M4 5.5c3-1.5 5.5-1.5 8 0v14c-2.5-1.5-5-1.5-8 0v-14Zm8 0c2.5-1.5 5-1.5 8 0v14c-3-1.5-5.5-1.5-8 0"/></svg>
  return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>
}

function SourceLinks({ pages, compact = false }: { pages: number[]; compact?: boolean }) {
  return <div className={`source-links ${compact ? 'compact' : ''}`}><Icon name="book" size={16}/><span>EN LA GUÍA</span>{pages.map(p => <a key={p} href={pageUrl(p)} target="_blank" rel="noreferrer" title={`Abrir página física ${p} del PDF`}>p. {p}</a>)}</div>
}

function OverviewVisual() {
  return <div className="overview-visual" aria-label="Tres momentos de la gestión: reducir, separar y recuperar">
    <div className="loop-circle loop-one"><span>01</span><strong>Reducir</strong><small>antes de descartar</small></div>
    <div className="loop-line" />
    <div className="loop-circle loop-two"><span>02</span><strong>Separar</strong><small>en el origen</small></div>
    <div className="loop-line" />
    <div className="loop-circle loop-three"><span>03</span><strong>Recuperar</strong><small>con otra ruta</small></div>
  </div>
}
function CompositionVisual() {
  return <div className="composition"><div className="composition-chart" role="img" aria-label="Composición ilustrativa del PDF: 50 % orgánicos compostables, 25 % secos reciclables, 25 % mixtos no reciclables"><div className="chart-center"><span>La guía<br/>representa</span><strong>3 grupos</strong></div></div><div className="legend"><div><i className="dot organic"/><strong>50 %</strong><span>orgánicos compostables</span></div><div><i className="dot recyclable"/><strong>25 %</strong><span>secos reciclables</span></div><div><i className="dot mixed"/><strong>25 %</strong><span>mixtos no reciclables</span></div><small>Proporciones que presenta la página 4. No son una medición actual.</small></div></div>
}
function SpecialVisual() {
  return <div className="special-grid"><div className="special-heading"><span>ALTO · OTRA VÍA</span><h3>Que parezca seco no significa que vaya a “secos”.</h3><p>Si tiene una condición particular o peligrosa, apartalo y consultá el circuito autorizado.</p></div>{[['▣','Pilas y baterías'],['⌁','Electrónicos'],['✳','Lámparas'],['▥','Tinta y tóner']].map(([icon,title]) => <div className="special-tile" key={title}><b aria-hidden="true">{icon}</b><span>{title}</span></div>)}</div>
}
function DestinationVisual() {
  return <div className="route-map" aria-label="Rutas de húmedos y secos descritas por la guía"><div className="route-origin"><span>01</span><b>Oficina</b><small>separación en origen</small></div><div className="route-split"><div className="route-row wet"><span className="route-line"/><div><b>Húmedos</b><small>retiro diferenciado → recolección urbana → relleno sanitario</small></div></div><div className="route-row dry"><span className="route-line"/><div><b>Secos</b><small>otro vehículo → planta de clasificación → recuperación por cooperativas</small></div></div></div><div className="route-note">Circuito relatado en la p. 9; confirmar la operación actual con el municipio.</div></div>
}
const rs = [
  ['Rediseñar', 'Elegir materiales y envases desde el diseño', '12'], ['Reducir', 'Evitar consumos y residuos innecesarios', '11'], ['Reutilizar', 'Dar otra vida a un objeto', '11'], ['Reparar', 'Arreglar lo que se estropeó', '12'], ['Renovar', 'Actualizar para volver a usar', '12'], ['Recuperar', 'Reintroducir materiales usados', '12'], ['Reciclar', 'Transformar materiales descartados', '11']
]
function SevenRVisual() { return <div className="r-grid">{rs.map(([name,description,page],i) => <div className="r-card" key={name}><span>0{i+1}</span><strong>{name}</strong><small>{description}</small><a href={pageUrl(Number(page))} target="_blank" rel="noreferrer">p. {page} ↗</a></div>)}</div> }
function PracticeVisual() { return <div className="practice-grid"><div><span>ANTES DE COMPRAR</span><strong>¿Lo necesito?</strong><p>Reducir empieza al evitar el descarte futuro.</p></div><div><span>ANTES DE TIRAR</span><strong>¿Puede seguir sirviendo?</strong><p>Reutilizar, reparar o renovar prolonga su vida.</p></div><div><span>ANTES DE SEPARAR</span><strong>¿Está limpio y seco?</strong><p>El estado decide si un material recuperable entra en secos.</p></div></div> }
function CommunityVisual() { return <div className="conversation-visual"><div className="speech-one">“¿Podemos acordar dónde va cada cosa?”</div><div className="speech-two">“Sí, y avisemos cómo se retiran las bolsas.”</div><p>Paciencia, información y un circuito claro ayudan a que el hábito sea compartido.</p></div> }

function LessonVisual({ id }: { id: string }) {
  if (id === 'proposito') return <OverviewVisual />
  if (id === 'materiales') return <CompositionVisual />
  if (id === 'oficina') return <Suspense fallback={<div className="scene-loading">Preparando el laboratorio 3D…</div>}><OfficeScene /></Suspense>
  if (id === 'especiales') return <SpecialVisual />
  if (id === 'destino') return <DestinationVisual />
  if (id === 'comunidad') return <CommunityVisual />
  if (id === 'siete-r') return <SevenRVisual />
  return <PracticeVisual />
}

export default function App() {
  const [active, setActive] = useState(initialLesson)
  const [progress, setProgress] = useState<Progress>(readProgress)
  const [answer, setAnswer] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const current = lessons.find(x => x.id === active)
  const index = current ? lessons.indexOf(current) : -1

  useEffect(() => {
    const sync = () => setActive(initialLesson())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  useEffect(() => { setAnswer(null); setShowHint(false); setMenuOpen(false); if (active && !progress.visited.includes(active)) setProgress(p => ({ ...p, visited: [...p.visited, active] })) }, [active])
  useEffect(() => { localStorage.setItem(key, JSON.stringify(progress)) }, [progress])
  function choose(index: number) { setAnswer(index); if (current?.activity.options[index].correct && !progress.completed.includes(current.id)) setProgress(p => ({ ...p, completed: [...p.completed, current.id] })) }
  function go(id: string) { location.hash = id ? `#${id}` : ''; setActive(id); window.scrollTo({ top: 0, behavior: 'instant' }) }

  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <a className="brand" href="#" onClick={(e) => { e.preventDefault(); go('') }}><span className="brand-mark"><Icon name="leaf" size={24}/></span><span><strong>GIRSU<span className="brand-dot">.</span></strong><small>MUNICIPAL · BAHÍA BLANCA</small></span></a>
      <div className="sidebar-rule" />
      <div className="nav-label">RECORRIDO DE APRENDIZAJE</div>
      <nav aria-label="Lecciones"><button className={`nav-home ${!current ? 'active' : ''}`} onClick={() => go('')}><span className="nav-num">⌂</span><span>Inicio</span></button>{lessons.map(x => <button key={x.id} className={`nav-lesson ${active === x.id ? 'active' : ''}`} onClick={() => go(x.id)} aria-current={active === x.id ? 'page' : undefined}><span className="nav-num">{x.number}</span><span className="nav-title">{x.title}</span>{progress.completed.includes(x.id) && <span className="nav-check"><Icon name="check" size={14}/></span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="progress-meta"><span>TU PROGRESO</span><strong>{progress.completed.length} / {lessons.length}</strong></div><div className="progress-track"><span style={{ width: `${progress.completed.length / lessons.length * 100}%` }}/></div><p>Actividades resueltas en este dispositivo.</p><a href={sourceUrl} target="_blank" rel="noreferrer"><Icon name="book" size={17}/> Abrir guía original ↗</a></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>☰</button><span>GUÍA INTERACTIVA <span className="top-separator">/</span> {current ? `LECCIÓN ${current.number}` : 'INICIO'}</span><a href={sourceUrl} target="_blank" rel="noreferrer">PDF ORIGINAL ↗</a></header>
      {!current ? <>
        <section className="hero"><div className="hero-copy"><div className="eyebrow light"><span className="eyebrow-line"/> APRENDER · DECIDIR · ACTUAR</div><h1>Lo que separás hoy<br/><em>cambia el recorrido</em><br/>de mañana.</h1><p>Una experiencia para entender y aplicar la Guía de Gestión Integral de Residuos Sólidos Urbanos Municipal de Bahía Blanca.</p><button onClick={() => go('proposito')} className="primary-button">Empezar el recorrido <Icon name="arrow" size={19}/></button></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="hero-symbol"><Icon name="leaf" size={78}/></div><span className="hero-tag tag-one">MENOS RESIDUOS</span><span className="hero-tag tag-two">MÁS RECURSOS</span><span className="hero-tag tag-three">MEJORES HÁBITOS</span></div><div className="hero-index">01 — 08 <span>DESLIZÁ PARA EXPLORAR ↓</span></div></section>
        <section className="home-content"><div className="section-heading"><div><span className="eyebrow">EL RECORRIDO</span><h2>Ocho lecciones.<br/><em>Una decisión a la vez.</em></h2></div><p>Leé la explicación, explorá una representación y resolvé una situación concreta. Cada tema enlaza las páginas físicas del documento.</p></div><div className="lesson-grid">{lessons.map((x,i) => <button className="lesson-card" key={x.id} onClick={() => go(x.id)}><span className="card-top"><span>{x.number} / 08</span><span>{progress.completed.includes(x.id) ? '✓ COMPLETADA' : `${x.pages.length} PÁGINAS`}</span></span><span className="card-glyph" aria-hidden="true">{['◌','◕','▣','✳','⇢','◍','↻','✺'][i]}</span><strong>{x.title}</strong><small>{x.kicker}</small><span className="card-footer">Explorar lección <Icon name="arrow" size={17}/></span></button>)}</div></section>
        <section className="source-band"><div><span className="eyebrow">LA FUENTE</span><h2>Siempre podés volver<br/>a la página original.</h2><p>Este curso interpreta una guía municipal publicada en 2021. Los circuitos, contactos y cifras de esa edición pueden haber cambiado: verificá las indicaciones locales actuales antes de aplicarlas.</p></div><a href={sourceUrl} target="_blank" rel="noreferrer" className="source-button"><Icon name="book"/> Consultar el PDF completo ↗</a></section>
      </> : <article className="lesson-page" key={current.id}>
        <div className="lesson-header"><div className="eyebrow"><span className="eyebrow-line"/> LECCIÓN {current.number} <span className="eyebrow-slash">/</span> {current.kicker.toUpperCase()}</div><h1>{current.title}<span>.</span></h1><p className="lesson-intro">{current.intro}</p><div className="lesson-meta"><div><span>AL TERMINAR VAS A PODER</span><strong>{current.goal}</strong></div><SourceLinks pages={current.pages}/></div></div>
        <div className="visual-label"><span>EXPLORÁ EL CONCEPTO</span><span>0{index+1} / 08</span></div>
        <LessonVisual id={current.id}/>
        <div className="reading-layout"><div className="reading-main"><div className="reading-eyebrow">IDEAS CLAVE <span>·</span> BASADAS EN LA GUÍA</div>{current.sections.map((s,i) => <section className="reading-section" key={i}><span className="section-number">{String(i+1).padStart(2,'0')}</span><div><h2>{s.title}</h2><p>{s.text}</p>{s.bullets && <ul>{s.bullets.map((b,j) => <li key={j}>{b}</li>)}</ul>}{s.note && <div className="note"><strong>PARA TENER EN CUENTA</strong><p>{s.note}</p></div>}</div></section>)}</div><aside className="reading-aside"><div className="aside-sticky"><div className="aside-mark">“</div><h3>Del documento a la acción</h3><p>Las decisiones de la práctica siguen los criterios de la guía. Volvé a las páginas originales cuando necesites revisar un caso.</p><SourceLinks pages={current.pages} compact/><small>Las referencias indican la página física del archivo PDF, comenzando por la portada.</small></div></aside></div>
        <section className="activity"><div className="activity-head"><span className="eyebrow">PONÉ A PRUEBA TU CRITERIO</span><h2>Una situación realista.<br/><em>Una decisión fundamentada.</em></h2><p>{current.activity.prompt}</p></div><div className="activity-options">{current.activity.options.map((o,i) => <button key={i} className={`option ${answer === i ? (o.correct ? 'correct' : 'incorrect') : ''}`} onClick={() => choose(i)}><span className="option-letter">{String.fromCharCode(65+i)}</span><span>{o.label}</span><span className="option-arrow">↗</span></button>)}</div><div className="activity-foot">{answer === null ? <button className="hint-button" onClick={() => setShowHint(!showHint)}>{showHint ? 'Ocultar pista' : 'Necesito una pista'} ↗</button> : <div className={`answer-feedback ${current.activity.options[answer].correct ? 'good' : 'retry'}`} role="status"><strong>{current.activity.options[answer].correct ? '¡Bien pensado!' : 'Probá de nuevo'}</strong><p>{current.activity.options[answer].explanation}</p></div>}{showHint && answer === null && <p className="hint-text">{current.activity.hint}</p>}<SourceLinks pages={current.pages} compact/></div></section>
        <div className="lesson-next"><span>{index < lessons.length-1 ? 'SIGUIENTE LECCIÓN' : 'RECORRIDO COMPLETADO'}</span><button onClick={() => go(index < lessons.length-1 ? lessons[index+1].id : '')}>{index < lessons.length-1 ? lessons[index+1].title : 'Volver al inicio'} <Icon name="arrow"/></button></div>
      </article>}
      <footer className="footer"><span>GIRSU MUNICIPAL · EXPERIENCIA EDUCATIVA</span><span>Fuente: Guía GIRSU MBB, 15 páginas · Edición 2021</span></footer>
    </main>
  </div>
}
