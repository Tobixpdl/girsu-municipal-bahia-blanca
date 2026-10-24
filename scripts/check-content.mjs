import fs from 'node:fs'
import ts from 'typescript'

const source = fs.readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8')
const javascript = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const { lessons } = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`)
const errors = []
const ids = lessons.map(x => x.id)
const pages = new Set(lessons.flatMap(x => x.pages))
if (ids.length !== 8 || new Set(ids).size !== ids.length) errors.push('Se esperaban ocho IDs únicos de lección.')
for (let p = 1; p <= 15; p++) if (!pages.has(p)) errors.push(`Falta la página física ${p}.`)
for (const lesson of lessons) {
  if (!lesson.intro || !lesson.goal || lesson.sections.length < 2) errors.push(`Explicación incompleta: ${lesson.id}.`)
  if (lesson.activity.options.filter(o => o.correct).length !== 1) errors.push(`La actividad ${lesson.id} debe tener una única respuesta correcta.`)
}
if (!fs.existsSync(new URL('../public/GUIA-GIRSU-MBB.pdf', import.meta.url))) errors.push('Falta el PDF original.')
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log(`Cobertura estructural: ${ids.length} lecciones, ${ids.length} actividades, 15/15 páginas físicas.`)
