import { Canvas } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'
import { useState } from 'react'

type BinKind = 'humedos' | 'secos' | 'especiales'
type Item = { name: string; detail: string; target: BinKind; reason: string; shape: 'cup' | 'paper' | 'battery' | 'bottle' | 'food' }

const items: Item[] = [
  { name: 'Yerba usada', detail: 'Restos de mate, todavía húmedos', target: 'humedos', reason: 'La yerba usada es un resto orgánico húmedo. En la oficina del programa va a húmedos (p. 6).', shape: 'food' },
  { name: 'Hoja de papel', detail: 'Limpia y seca', target: 'secos', reason: 'El papel limpio y seco se deposita con los materiales recuperables (p. 7).', shape: 'paper' },
  { name: 'Pila agotada', detail: 'De un teclado', target: 'especiales', reason: 'Las pilas requieren gestión diferenciada: la guía indica no arrojarlas en ninguno de los dos recipientes (p. 8).', shape: 'battery' },
  { name: 'Botella plástica', detail: 'Vacía, limpia y seca', target: 'secos', reason: 'Los envases plásticos limpios y secos se colocan en secos (pp. 5 y 7).', shape: 'bottle' },
  { name: 'Vaso con café', detail: 'Descartable y sucio', target: 'humedos', reason: 'Los envases sucios con restos de bebida o comida van a húmedos si no pueden limpiarse antes (pp. 5 y 6).', shape: 'cup' },
]

const labels: Record<BinKind, string> = { humedos: 'Húmedos', secos: 'Secos', especiales: 'Vía especial' }

function Bin({ x, color, active, onClick }: { x: number; color: string; active: boolean; onClick: () => void }) {
  return <group position={[x, 0, 0]} onClick={(e) => { e.stopPropagation(); onClick() }}>
    <RoundedBox args={[1.28, 1.35, 1.04]} radius={0.1} position={[0, 0.76, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.55} emissive={active ? color : '#000000'} emissiveIntensity={active ? 0.25 : 0} />
    </RoundedBox>
    <RoundedBox args={[1.43, 0.13, 1.18]} radius={0.045} position={[0, 1.47, 0]} castShadow>
      <meshStandardMaterial color={color} roughness={0.55} />
    </RoundedBox>
    <mesh position={[0, 0.98, 0.53]}><planeGeometry args={[0.66, 0.42]} /><meshBasicMaterial color="#fffaf0" /></mesh>
    <mesh position={[0, 1.05, 0.54]}><circleGeometry args={[0.075, 24]} /><meshBasicMaterial color={active ? '#facc15' : '#125047'} /></mesh>
    <mesh position={[0, 0.88, 0.54]}><boxGeometry args={[0.39, 0.035, 0.01]} /><meshBasicMaterial color="#125047" /></mesh>
  </group>
}

function ObjectShape({ shape }: { shape: Item['shape'] }) {
  return <group position={[0, 0.55, 1.45]} rotation={[0, -0.25, 0]}>
    {shape === 'paper' && <RoundedBox args={[0.65, 0.05, 0.88]} radius={0.02} rotation={[0.25, 0.2, 0]} castShadow><meshStandardMaterial color="#f7f2e6" /></RoundedBox>}
    {shape === 'battery' && <><mesh rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.16, 0.16, 0.55, 24]} /><meshStandardMaterial color="#2d5360" metalness={0.5} roughness={0.3} /></mesh><mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.09, 0.09, 0.045, 20]} /><meshStandardMaterial color="#d5ba68" metalness={0.6} /></mesh></>}
    {shape === 'bottle' && <><mesh castShadow><cylinderGeometry args={[0.2, 0.24, 0.78, 24]} /><meshPhysicalMaterial color="#8ecbc7" transparent opacity={0.8} roughness={0.22} /></mesh><mesh position={[0, 0.47, 0]}><cylinderGeometry args={[0.11, 0.11, 0.15, 20]} /><meshStandardMaterial color="#257b72" /></mesh></>}
    {shape === 'cup' && <><mesh castShadow><cylinderGeometry args={[0.25, 0.19, 0.55, 24]} /><meshStandardMaterial color="#eee6d4" /></mesh><mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.26, 0.26, 0.045, 24]} /><meshStandardMaterial color="#9b5f42" /></mesh></>}
    {shape === 'food' && <><mesh castShadow><sphereGeometry args={[0.34, 24, 16]} /><meshStandardMaterial color="#789358" roughness={0.9} /></mesh><mesh position={[0.1, 0.16, 0.2]}><sphereGeometry args={[0.16, 16, 12]} /><meshStandardMaterial color="#a9b66f" /></mesh></>}
  </group>
}

export default function OfficeScene() {
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState<BinKind | null>(null)
  const [available, setAvailable] = useState(true)
  const item = items[index]
  const choose = (kind: BinKind) => setAnswer(kind)
  const next = () => { setIndex((index + 1) % items.length); setAnswer(null) }
  return <div className="lab-layout">
    <div className="scene-wrap" aria-label="Modelo tridimensional de tres recipientes en una oficina">
      {available ? <Canvas dpr={[1, 1.5]} shadows="percentage" frameloop="demand" camera={{ position: [4.8, 3.3, 6.8], fov: 39 }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', () => setAvailable(false), { once: true }) }}>
        <color attach="background" args={['#e5eee9']} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 8, 5]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} />
        <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, -0.03, 0]}><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#d4e0d8" /></mesh>
        <mesh position={[0, 0.13, -1.1]} receiveShadow><boxGeometry args={[5.6, 0.26, 2.1]} /><meshStandardMaterial color="#d9c9a6" roughness={0.85} /></mesh>
        <Bin x={-1.75} color="#3d4241" active={answer === 'humedos'} onClick={() => choose('humedos')} />
        <Bin x={0} color="#5fa93d" active={answer === 'secos'} onClick={() => choose('secos')} />
        <Bin x={1.75} color="#bd814b" active={answer === 'especiales'} onClick={() => choose('especiales')} />
        <ObjectShape shape={item.shape} />
        <OrbitControls enablePan={false} minDistance={5.5} maxDistance={11} minPolarAngle={0.65} maxPolarAngle={1.55} target={[0, 0.6, 0]} />
      </Canvas> : <div className="scene-fallback">Vista 3D no disponible. Usá los botones de respuesta que aparecen a continuación.</div>}
      <div className="scene-badge">LABORATORIO DE CLASIFICACIÓN <span>·</span> MODELO ILUSTRATIVO</div>
      <div className="scene-labels" aria-hidden="true"><span>HÚMEDOS</span><span>SECOS</span><span>VÍA ESPECIAL</span></div>
    </div>
    <div className="lab-panel">
      <div className="eyebrow">DESAFÍO {index + 1} / {items.length}</div>
      <h3>¿Dónde va?</h3>
      <div className="item-card"><span className="item-symbol">↗</span><div><strong>{item.name}</strong><small>{item.detail}</small></div></div>
      <p className="subtle">Elegí un recipiente en el modelo o mediante estos botones.</p>
      <div className="bin-actions">{(Object.keys(labels) as BinKind[]).map(kind => <button key={kind} onClick={() => choose(kind)} className={answer === kind ? 'selected' : ''}>{labels[kind]}</button>)}</div>
      {answer && <div className={`feedback ${answer === item.target ? 'good' : 'retry'}`} role="status"><strong>{answer === item.target ? 'Bien separado.' : 'Revisemos el criterio.'}</strong><p>{item.reason}</p></div>}
      {answer && <button className="next-item" onClick={next}>Siguiente objeto <span aria-hidden="true">→</span></button>}
      <p className="tiny-source">Interacción basada en pp. 5–8. El negro y el verde retoman los recipientes ilustrados en las pp. 6–7; el tercero es esquemático.</p>
    </div>
  </div>
}
