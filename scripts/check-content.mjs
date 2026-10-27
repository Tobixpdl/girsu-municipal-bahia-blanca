import fs from 'node:fs'
import ts from 'typescript'

const source = fs.readFileSync(new URL('../src/course.ts', import.meta.url), 'utf8')
const javascript = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const { chapters } = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`)
const errors = []
const ids = chapters.map(chapter => chapter.id)
const pages = new Set(chapters.flatMap(chapter => [...chapter.pages, ...chapter.steps.map(step => step.page)]))
if (ids.length !== 4 || new Set(ids).size !== ids.length) errors.push('Se esperaban cuatro capítulos con IDs únicos.')
for (let p = 3; p <= 15; p++) if (!pages.has(p)) errors.push(`Falta la página de contenido ${p}.`)
for (const chapter of chapters) {
  if (!chapter.title || !chapter.summary || chapter.steps.length < 4) errors.push(`Capítulo incompleto: ${chapter.id}.`)
  const stepIds = chapter.steps.map(step => step.id)
  if (new Set(stepIds).size !== stepIds.length) errors.push(`Pasos repetidos: ${chapter.id}.`)
  for (const step of chapter.steps) {
    if (!step.heading || !step.body || !step.detail || !step.object || !chapter.pages.includes(step.page)) errors.push(`Paso incompleto o sin página válida: ${chapter.id}/${step.id}.`)
  }
  if (!chapter.question || chapter.choices.filter(choice => choice.correct).length !== 1 || chapter.choices.some(choice => !choice.explanation)) errors.push(`Actividad incompleta: ${chapter.id}.`)
}
if (!fs.existsSync(new URL('../public/GUIA-GIRSU-MBB.pdf', import.meta.url))) errors.push('Falta el PDF original.')
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log(`Cobertura estructural: ${chapters.length} capítulos, ${chapters.reduce((n, c) => n + c.steps.length, 0)} pasos, 4 actividades, páginas de contenido 3–15.`)
