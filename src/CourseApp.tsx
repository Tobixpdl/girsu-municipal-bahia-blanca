import { Suspense, lazy, useEffect, useState } from 'react'
import { chapters, pageUrl, pdfUrl } from './course'

const Scene = lazy(() => import('./Scene'))
const storageKey = 'girsu-mbb-96bf8a6f-v2'
const legacy: Record<string,string> = { proposito:'residuos',materiales:'residuos',oficina:'oficina',especiales:'otras-vias',destino:'otras-vias',comunidad:'otras-vias','siete-r':'siete-r',practica:'siete-r' }
function route() { const [rawChapter,rawStep] = decodeURIComponent(location.hash.slice(1)).split('/'); const id = legacy[rawChapter] || rawChapter; const chapter = chapters.find(c=>c.id===id) || chapters[0]; const step = chapter.steps.some(s=>s.id===rawStep) ? rawStep : chapter.steps[0].id; return { chapter:chapter.id, step } }
function loadProgress(): string[] { try { const value=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(value)?value:[] }catch{return[]} }

function Arrow({right=true}:{right?:boolean}){return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={right?undefined:{transform:'rotate(180deg)'}}><path d="M2 8h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function Leaf(){return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><path d="M22 3C9 3 3 10 4 18c.5 3 3 5 6 5 8 0 12-8 12-20Z" fill="currentColor"/><path d="M5 21c3-6 7-10 13-14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>}

export default function CourseApp(){
  const [locationState,setLocationState]=useState(route)
  const [completed,setCompleted]=useState(loadProgress)
  const [answer,setAnswer]=useState<number|null>(null)
  const [menu,setMenu]=useState(false)
  const chapter=chapters.find(c=>c.id===locationState.chapter) || chapters[0]
  const step=chapter.steps.find(s=>s.id===locationState.step) || chapter.steps[0]
  const chapterIndex=chapters.indexOf(chapter)
  const stepIndex=chapter.steps.indexOf(step)
  useEffect(()=>{const sync=()=>setLocationState(route());window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[])
  useEffect(()=>{setAnswer(null);setMenu(false)},[chapter.id])
  useEffect(()=>{localStorage.setItem(storageKey,JSON.stringify(completed))},[completed])
  function navigate(chapterId:string,stepId?:string){const found=chapters.find(c=>c.id===chapterId)||chapters[0];const next={chapter:found.id,step:stepId||found.steps[0].id};location.hash=`#${next.chapter}/${next.step}`;setLocationState(next);if(found.id!==chapter.id)window.scrollTo({top:0,behavior:'instant'})}
  function pickAnswer(i:number){setAnswer(i);if(chapter.choices[i].correct&&!completed.includes(chapter.id))setCompleted(previous=>[...previous,chapter.id])}
  return <div className="course-shell">
    <aside className={`course-sidebar ${menu?'is-open':''}`}>
      <div className="identity"><span className="identity-icon"><Leaf/></span><div><b>GIRSU</b><small>Bahía Blanca · guía interactiva</small></div></div>
      <p className="sidebar-caption">Guía municipal · 15 páginas</p>
      <nav aria-label="Módulos del curso">{chapters.map((c,i)=><button key={c.id} className={`chapter-link ${c.id===chapter.id?'current':''}`} onClick={()=>navigate(c.id)} aria-current={c.id===chapter.id?'page':undefined}><span className="chapter-number">{String(i+1).padStart(2,'0')}</span><span className="chapter-name">{c.title}<small>pp. {c.pages[0]}–{c.pages.at(-1)}</small></span>{completed.includes(c.id)&&<span className="done-mark" aria-label="Actividad resuelta">✓</span>}</button>)}</nav>
      <div className="sidebar-tail"><div className="sidebar-progress"><span>Actividades resueltas</span><b>{completed.length}/{chapters.length}</b></div><div className="progress-line"><i style={{width:`${completed.length/chapters.length*100}%`}}/></div><a href={pdfUrl} target="_blank" rel="noreferrer">Abrir PDF completo <span>↗</span></a></div>
    </aside>
    <div className="course-main">
      <header className="course-top"><button className="menu-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?'Cerrar menú':'Abrir menú'}>☰</button><span>Programa de gestión integral de residuos sólidos urbanos municipal</span><a href={pdfUrl} target="_blank" rel="noreferrer">Ver guía original ↗</a></header>
      <main className="course-content">
        <div className="chapter-intro"><div className="chapter-kicker"><b>{String(chapterIndex+1).padStart(2,'0')}</b><span>de {chapters.length} módulos</span><span className="kicker-rule"/><span>pp. {chapter.pages[0]}–{chapter.pages.at(-1)}</span></div><h1>{chapter.title}</h1><p>{chapter.summary}</p></div>
        <div className="step-tabs" role="group" aria-label={`Pasos de ${chapter.title}`}>{chapter.steps.map((s,i)=><button key={s.id} onClick={()=>navigate(chapter.id,s.id)} className={s.id===step.id?'active':''} aria-pressed={s.id===step.id}><span>{String(i+1).padStart(2,'0')}</span>{s.label}</button>)}</div>
        <section className="workbench" aria-label="Modelo y explicación de la lección">
          <div className="canvas-column"><div className="scene-stage"><Suspense fallback={<div className="scene-loading">Preparando modelo 3D…</div>}><Scene chapter={chapter.id} step={step.id} onPick={id=>navigate(chapter.id,id)}/></Suspense><div className="scene-topline"><span>Modelo 3D · {step.object}</span><span>Arrastrá para girar</span></div></div><div className="scene-caption"><span className="caption-dot"/> Figuras esquemáticas basadas en los objetos y colores de la guía. <span>Podés usar los pasos sin manipular el modelo.</span></div></div>
          <div className="inspector"><div className="inspector-top"><span>Página {step.page} del PDF</span><a href={pageUrl(step.page)} target="_blank" rel="noreferrer">Ver fuente ↗</a></div><div className="inspector-body"><div className="step-counter">{String(stepIndex+1).padStart(2,'0')} / {String(chapter.steps.length).padStart(2,'0')}</div><h2>{step.heading}</h2><p>{step.body}</p><div className="detail-note"><span>En la práctica</span><p>{step.detail}</p></div>{chapter.id==='otras-vias'&&step.id==='equipo'&&<div className="message-demo" aria-label="Ejemplo de conversación respetuosa"><div>“¿Acordamos cuál es el recipiente de cada cosa?”</div><div>“Sí. También avisemos cómo se retiran las bolsas.”</div></div>}</div><div className="inspector-actions"><button onClick={()=>navigate(chapter.id,chapter.steps[Math.max(0,stepIndex-1)].id)} disabled={stepIndex===0} aria-label="Paso anterior"><Arrow right={false}/></button><span>Recorrer el tema</span><button onClick={()=>navigate(chapter.id,chapter.steps[Math.min(chapter.steps.length-1,stepIndex+1)].id)} disabled={stepIndex===chapter.steps.length-1} aria-label="Paso siguiente"><Arrow/></button></div></div>
        </section>
        <div className="after-stage"><div className="editorial-note"><b>Lo que indica el documento</b><p>{chapter.closing}</p><div className="page-links">{chapter.pages.map(p=><a key={p} href={pageUrl(p)} target="_blank" rel="noreferrer">p. {p}</a>)}</div></div><section className="mini-practice" aria-label="Pregunta de comprensión"><div className="mini-heading"><span>Comprobá tu criterio</span><b>{completed.includes(chapter.id)?'Resuelta':'Una decisión'}</b></div><h3>{chapter.question}</h3><div className="choices">{chapter.choices.map((choice,i)=><button key={i} className={answer===i?(choice.correct?'right':'wrong'):''} onClick={()=>pickAnswer(i)}><span>{String.fromCharCode(65+i)}</span>{choice.text}</button>)}</div>{answer!==null&&<p className={`choice-result ${chapter.choices[answer].correct?'good':''}`} role="status">{chapter.choices[answer].explanation}</p>}</section></div>
        <div className="chapter-footer"><span>{chapterIndex+1} / {chapters.length}</span><button onClick={()=>navigate(chapters[(chapterIndex+1)%chapters.length].id)}>{chapterIndex===chapters.length-1?'Volver al primer módulo':`Seguir con ${chapters[chapterIndex+1].title}`} <Arrow/></button></div>
      </main>
      <footer className="site-foot">Fuente: Programa GIRSU MBB · archivo de 2021 · Los circuitos y contactos pueden haber cambiado.</footer>
    </div>
  </div>
}
