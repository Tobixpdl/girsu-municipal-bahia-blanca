import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'

type SceneProps = { chapter: string; step: string; onPick: (id: string) => void; onIdentify: (name: string) => void }
type GroupProps = { children: ReactNode; position?: [number, number, number]; rotation?: [number, number, number] }

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => { const mq = window.matchMedia('(prefers-reduced-motion: reduce)'); const listener = () => setReduced(mq.matches); mq.addEventListener('change', listener); return () => mq.removeEventListener('change', listener) }, [])
  return reduced
}

function Float({ children, position = [0, 0, 0], rotation = [0, 0, 0] }: GroupProps) {
  const ref = useRef<THREE.Group>(null)
  const reduced = useReducedMotion()
  useFrame(({ clock }, delta) => { if (!ref.current || reduced) return; ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, position[1] + Math.sin(clock.elapsedTime * 1.3) * 0.055, 3, delta); ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, rotation[1] + Math.sin(clock.elapsedTime * .48) * .09, 3, delta) })
  return <group ref={ref} position={position} rotation={rotation}>{children}</group>
}

function Pickable({ name, onIdentify, children }: { name: string; onIdentify: (name: string) => void; children: ReactNode }) {
  return <group onClick={event => { event.stopPropagation(); onIdentify(name) }} onPointerOver={event => { event.stopPropagation(); document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }}>{children}</group>
}

function Label({ text, width = 1, height = .27, position = [0, 0, 0], dark = false }: { text: string; width?: number; height?: number; position?: [number, number, number]; dark?: boolean }) {
  const texture = useMemo(() => { const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 128; const ctx = canvas.getContext('2d')!; ctx.clearRect(0, 0, 512, 128); ctx.fillStyle = dark ? '#23302b' : '#ffffff'; ctx.font = 'bold 60px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 256, 67); const t = new THREE.CanvasTexture(canvas); t.colorSpace = THREE.SRGBColorSpace; return t }, [text, dark])
  useEffect(() => () => texture.dispose(), [texture])
  return <mesh position={position}><planeGeometry args={[width, height]} /><meshBasicMaterial map={texture} transparent depthWrite={false} /></mesh>
}

function Floor() { return <><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.04, 0]} receiveShadow><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#f3f5ef" roughness={1} /></mesh><gridHelper args={[12, 24, '#d9e2d7', '#e6ece4']} position={[0, -.025, 0]} /></> }
function Pedestal({ width = 3.2 }: { width?: number }) { return <RoundedBox args={[width, .16, 2.45]} radius={.07} position={[0, .05, 0]} receiveShadow castShadow><meshStandardMaterial color="#d7dfd4" roughness={.85} /></RoundedBox> }

function Bottle({ color = '#74bccc', cap = '#298e9d', transparent = true }: { color?: string; cap?: string; transparent?: boolean }) {
  return <group><mesh position={[0, .48, 0]} castShadow><cylinderGeometry args={[.24, .29, .82, 32]} /><meshPhysicalMaterial color={color} transparent={transparent} opacity={transparent ? .75 : 1} roughness={.23} metalness={.02} /></mesh><mesh position={[0, .97, 0]} castShadow><cylinderGeometry args={[.11, .22, .2, 32]} /><meshPhysicalMaterial color={color} transparent={transparent} opacity={transparent ? .75 : 1} roughness={.23} /></mesh><mesh position={[0, 1.1, 0]} castShadow><cylinderGeometry args={[.13, .13, .1, 32]} /><meshStandardMaterial color={cap} roughness={.55} /></mesh><mesh position={[0, .42, .294]}><planeGeometry args={[.34, .26]} /><meshBasicMaterial color="#f3e8d6" side={THREE.DoubleSide} /></mesh></group>
}
function Can() { return <group><mesh position={[0, .41, 0]} castShadow><cylinderGeometry args={[.23, .23, .72, 32]} /><meshStandardMaterial color="#e05c47" metalness={.45} roughness={.35} /></mesh><mesh position={[0, .78, 0]}><cylinderGeometry args={[.235, .235, .03, 32]} /><meshStandardMaterial color="#c5c9c5" metalness={.7} roughness={.25} /></mesh><mesh position={[0, .41, .231]}><planeGeometry args={[.33, .27]} /><meshBasicMaterial color="#eddfc0" /></mesh></group> }
function Paper({ crumpled = false }: { crumpled?: boolean }) { return <group rotation={[-.13, -.12, .07]}><RoundedBox args={[.78, .035, 1]} radius={.018} position={[0, .22, 0]} castShadow><meshStandardMaterial color={crumpled ? '#dbd7ce' : '#fffdf3'} roughness={.88} /></RoundedBox>{[0,1,2,3].map(i=><mesh key={i} position={[-.06, .242, -.3+i*.17]}><boxGeometry args={[.48-i*.04, .004, .015]} /><meshBasicMaterial color="#a8b9ae" /></mesh>)}</group> }
function BananaPeel() { const curves = useMemo(() => Array.from({ length: 3 }, (_, i) => { const a = i * Math.PI * 2 / 3; return new THREE.CatmullRomCurve3([new THREE.Vector3(0,.18,0),new THREE.Vector3(Math.sin(a)*.16,.44,Math.cos(a)*.16),new THREE.Vector3(Math.sin(a)*.31,.7,Math.cos(a)*.31),new THREE.Vector3(Math.sin(a)*.42,.45,Math.cos(a)*.42)]) }), []); return <group>{curves.map((curve,i)=><mesh key={i} castShadow><tubeGeometry args={[curve, 16, .075, 8, false]} /><meshStandardMaterial color={i===1?'#f2bd3c':'#f5ca4a'} roughness={.86} /></mesh>)}</group> }
function Carrot() {
  const profile = useMemo(() => [[.006,0],[.045,.11],[.105,.26],[.16,.46],[.19,.61],[.185,.69],[.13,.76],[0,.78]].map(([x,y]) => new THREE.Vector2(x,y)), [])
  return <group rotation={[0,0,-.24]}><mesh castShadow><latheGeometry args={[profile,32]} /><meshStandardMaterial color="#e8752a" roughness={.87} /></mesh>
    {[-.09,0,.09].map((x,i)=><group key={i} position={[x,.81,0]} rotation={[0,0,x*2]}><mesh position={[0,.12,0]} castShadow><cylinderGeometry args={[.018,.027,.25,10]} /><meshStandardMaterial color="#3d8043" /></mesh><mesh position={[x<0?-.075:.075,.25,0]} rotation={[0,0,x<0?-.55:.55]}><coneGeometry args={[.065,.28,10]} /><meshStandardMaterial color={i===1?'#347346':'#4d9650'} side={THREE.DoubleSide} /></mesh></group>)}
    {[.25,.38,.52].map((y,i)=><mesh key={i} position={[.12,y,.09]} rotation={[0,.28,-.18]}><boxGeometry args={[.085,.008,.008]} /><meshStandardMaterial color="#b75529" roughness={1} /></mesh>)}
  </group>
}
function CoffeeFilter() { return <group><mesh position={[0,.37,0]} castShadow rotation={[Math.PI,0,0]}><coneGeometry args={[.28,.5,28]} /><meshStandardMaterial color="#d9b585" roughness={.95} side={THREE.DoubleSide} /></mesh><mesh position={[0,.625,0]}><cylinderGeometry args={[.275,.275,.018,28]} /><meshStandardMaterial color="#4b3022" roughness={1} /></mesh><mesh position={[0,.627,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.24,.285,28]} /><meshStandardMaterial color="#ecd7b6" roughness={.9} side={THREE.DoubleSide} /></mesh>{[[-.13,.02],[.1,-.08],[.04,.13],[-.08,-.11]].map(([x,z],i)=><mesh key={i} position={[x,.648,z]} scale={[.06,.018,.035]}><sphereGeometry args={[1,10,8]} /><meshStandardMaterial color={i%2?'#3b2419':'#62402a'} roughness={1} /></mesh>)}</group> }
function DirtyCarton() { return <group rotation={[0,.2,-.1]}><RoundedBox args={[.7,.56,.5]} radius={.025} position={[0,.34,0]} castShadow><meshStandardMaterial color="#ae906d" roughness={.9} /></RoundedBox><mesh position={[0,.64,.03]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.2,20]} /><meshBasicMaterial color="#644831" transparent opacity={.72} /></mesh></group> }
function Diaper() { return <group><RoundedBox args={[.62,.18,.49]} radius={.08} position={[0,.18,0]} castShadow><meshStandardMaterial color="#f3f1e7" /></RoundedBox><mesh position={[-.23,.28,0]} rotation={[0,0,.4]}><boxGeometry args={[.12,.15,.48]} /><meshStandardMaterial color="#b7d6de" /></mesh><mesh position={[.23,.28,0]} rotation={[0,0,-.4]}><boxGeometry args={[.12,.15,.48]} /><meshStandardMaterial color="#b7d6de" /></mesh></group> }

function WasteBag({ step, onPick, onIdentify }: { step: string; onPick: (id: string) => void; onIdentify: (name: string) => void }) {
  const active = step === 'conjunto' ? '' : step
  const layer = (id: string, y: number, h: number, color: string) => <mesh onClick={(e) => { e.stopPropagation(); onPick(id); onIdentify(id==='organicos'?'Residuos orgánicos':id==='reciclables'?'Secos reciclables':'Mixtos no reciclables') }} position={[0,y,0]} castShadow><cylinderGeometry args={[.98,.98,h,42,1,false]} /><meshStandardMaterial color={color} transparent opacity={active && active !== id ? .16 : .65} roughness={.7} emissive={active === id ? color : '#000000'} emissiveIntensity={active === id ? .13 : 0} /></mesh>
  return <group position={[0,.16,0]}>
    <Pedestal width={4} />
    <Float position={[0,.27,0]}>
      {layer('mixtos',.47,.48,'#424844')}{layer('reciclables',.95,.48,'#269b86')}{layer('organicos',1.67,.96,'#e7853c')}
      <mesh position={[0,2.31,0]} castShadow><cylinderGeometry args={[.22,.98,.34,42]} /><meshStandardMaterial color="#e7853c" transparent opacity={active && active !== 'organicos' ? .16 : .65} roughness={.8}/></mesh>
      <mesh position={[0,2.51,0]}><cylinderGeometry args={[.18,.2,.18,24]} /><meshStandardMaterial color="#333a37" roughness={.9} /></mesh>
      <mesh position={[0,2.71,0]} rotation={[0,0,-.3]}><coneGeometry args={[.22,.35,5]} /><meshStandardMaterial color="#353b37" side={THREE.DoubleSide} /></mesh>
      <Pickable name="Zanahoria" onIdentify={onIdentify}><group position={[-.46,1.48,1.12]} scale={.83}><Carrot /></group></Pickable>
      <Pickable name="Filtro con café usado" onIdentify={onIdentify}><group position={[.38,1.51,1.1]} scale={.92}><CoffeeFilter /></group></Pickable>
      <Pickable name="Botella de plástico" onIdentify={onIdentify}><group position={[-.43,.77,1.07]} scale={.55}><Bottle /></group></Pickable>
      <Pickable name="Lata" onIdentify={onIdentify}><group position={[.37,.77,1.08]} scale={.65}><Can /></group></Pickable>
      <Pickable name="Envase sucio" onIdentify={onIdentify}><group position={[-.39,.35,1.07]} scale={.68}><DirtyCarton /></group></Pickable>
      <Pickable name="Pañal" onIdentify={onIdentify}><group position={[.37,.32,1.08]} scale={.66}><Diaper /></group></Pickable>
    </Float>
  </group>
}

function WheelieBin({ color, name, open = false, position = [0,0,0], onClick }: { color: string; name: string; open?: boolean; position?: [number,number,number]; onClick?: () => void }) {
  const lid = useRef<THREE.Group>(null)
  const reduced = useReducedMotion()
  useFrame((_,delta)=>{if(lid.current) lid.current.rotation.x = THREE.MathUtils.damp(lid.current.rotation.x, open ? -.52 : -.06, reduced ? 20 : 5, delta)})
  return <group position={position} onClick={onClick ? e=>{e.stopPropagation();onClick()} : undefined}>
    <RoundedBox args={[1.03,1.36,.8]} radius={.1} position={[0,.83,0]} castShadow receiveShadow><meshStandardMaterial color={color} roughness={.68} /></RoundedBox>
    <RoundedBox args={[.83,.9,.014]} radius={.018} position={[0,.9,.409]}><meshStandardMaterial color={color==='#313536'?'#484d4b':'#7eca57'} roughness={.7} /></RoundedBox>
    <mesh position={[0,1.04,.422]}><planeGeometry args={[.75,.39]} /><meshStandardMaterial color="#f9f9f1" /></mesh><Label text={name} width={.72} height={.17} position={[0,1.04,.434]} dark />
    <group ref={lid} position={[0,1.52,-.39]}><RoundedBox args={[1.2,.11,.99]} radius={.045} position={[0,0,.42]} castShadow><meshStandardMaterial color={color} roughness={.58} /></RoundedBox><RoundedBox args={[.7,.09,.15]} radius={.035} position={[0,.04,.93]}><meshStandardMaterial color={color==='#313536'?'#242728':'#3e832c'} /></RoundedBox></group>
    {[-.49,.49].map(x=><group key={x} position={[x,.21,-.32]} rotation={[0,0,Math.PI/2]}><mesh castShadow><cylinderGeometry args={[.18,.18,.11,24]} /><meshStandardMaterial color="#1d2524" roughness={.84} /></mesh><mesh position={[0,.06,0]}><cylinderGeometry args={[.055,.055,.012,24]} /><meshStandardMaterial color="#919998" metalness={.6} /></mesh></group>)}
    <mesh position={[0,1.39,-.42]}><boxGeometry args={[.85,.09,.18]} /><meshStandardMaterial color={color==='#313536'?'#242728':'#3e832c'} /></mesh>
  </group>
}

function BinsScene({ step, onPick, onIdentify }: { step: string; onPick?: (id: string) => void; onIdentify: (name: string) => void }) {
  const looseName=step==='negro'?'Cáscara de banana':step==='verde'?'Botella de plástico':step==='limpiar'?'Envase sucio':'Hoja de papel'
  return <group><Pedestal width={4.5}/><WheelieBin color="#313536" name="HÚMEDOS" open={step==='negro'||step==='limpiar'} position={[-1.15,.15,-.2]} onClick={()=>{onPick?.('negro');onIdentify('Recipiente de húmedos')}}/><WheelieBin color="#61b33d" name="SECOS" open={step==='verde'||step==='limpiar'} position={[1.15,.15,-.2]} onClick={()=>{onPick?.('verde');onIdentify('Recipiente de secos')}}/>
    <Float key={step} position={[0,.55,1]}><Pickable name={looseName} onIdentify={onIdentify}>{step==='negro'?<group scale={.9}><BananaPeel /></group>:step==='verde'?<group scale={.8}><Bottle /></group>:step==='limpiar'?<group scale={.87}><DirtyCarton /></group>:<group scale={.8}><Paper /></group>}</Pickable></Float>
  </group>
}

function Battery({color='#2c3437'}:{color?:string}) { return <group><mesh position={[0,.4,0]} castShadow><cylinderGeometry args={[.19,.19,.72,30]} /><meshStandardMaterial color={color} metalness={.2} roughness={.45} /></mesh><mesh position={[0,.39,.194]}><planeGeometry args={[.26,.32]} /><meshBasicMaterial color="#ee442f" /></mesh><Label text="PILA" width={.2} height={.08} position={[0,.38,.201]} dark /><mesh position={[0,.78,0]}><cylinderGeometry args={[.2,.2,.05,30]} /><meshStandardMaterial color="#c0c9c6" metalness={.65} roughness={.26} /></mesh><mesh position={[0,.85,0]}><cylinderGeometry args={[.085,.085,.07,22]} /><meshStandardMaterial color="#dadfdb" metalness={.7} /></mesh><mesh position={[0,.02,0]}><cylinderGeometry args={[.19,.19,.035,30]} /><meshStandardMaterial color="#aab2ae" metalness={.6} /></mesh></group> }
function Laptop() { return <group><RoundedBox args={[1.32,.08,.9]} radius={.05} position={[0,.2,.17]} castShadow><meshStandardMaterial color="#485258" metalness={.58} roughness={.38} /></RoundedBox><group rotation={[-.22,0,0]} position={[0,.25,-.25]}><RoundedBox args={[1.35,.91,.06]} radius={.05} position={[0,.46,0]} castShadow><meshStandardMaterial color="#34434a" metalness={.48} roughness={.4} /></RoundedBox><mesh position={[0,.47,.037]}><planeGeometry args={[1.17,.73]} /><meshBasicMaterial color="#8fb6b8" /></mesh><mesh position={[0,.47,.041]}><planeGeometry args={[.95,.55]} /><meshBasicMaterial color="#5b818c" /></mesh></group>{Array.from({length:16},(_,i)=><mesh key={i} position={[-.46+(i%4)*.3,.246,-.1+Math.floor(i/4)*.15]}><boxGeometry args={[.23,.01,.09]} /><meshStandardMaterial color="#18282c" /></mesh>)}</group> }
function Lamp() { return <group><mesh position={[0,.24,0]} castShadow><cylinderGeometry args={[.17,.2,.28,28]} /><meshStandardMaterial color="#b8c0be" metalness={.6} roughness={.28} /></mesh>{[0,1,2].map(i=><mesh key={i} position={[0,.15+i*.08,0]}><torusGeometry args={[.17,.018,8,32]} /><meshStandardMaterial color="#8c9592" metalness={.7} /></mesh>)}<mesh position={[0,.38,0]}><cylinderGeometry args={[.24,.17,.14,28]} /><meshStandardMaterial color="#e1ded0" /></mesh>{[-.15,0,.15].map((x,i)=><group key={i} position={[x,.65,0]}><mesh><cylinderGeometry args={[.045,.045,.47,16]} /><meshStandardMaterial color="#f6f4e6" emissive="#d7d3b5" emissiveIntensity={.25} /></mesh><mesh position={[0,.23,0]}><sphereGeometry args={[.045,12,8]} /><meshStandardMaterial color="#f6f4e6" /></mesh></group>)}</group> }
function Toner() { return <group><RoundedBox args={[1.2,.53,.62]} radius={.055} position={[0,.45,0]} castShadow><meshStandardMaterial color="#303538" roughness={.7} /></RoundedBox><mesh position={[0,.48,.319]}><planeGeometry args={[.72,.29]} /><meshStandardMaterial color="#dadfdb" /></mesh><Label text="TÓNER" width={.69} height={.17} position={[0,.48,.327]} dark /><mesh rotation={[Math.PI/2,0,0]} position={[0,.14,.24]}><cylinderGeometry args={[.13,.13,1.1,24]} /><meshStandardMaterial color="#161d22" metalness={.38} roughness={.36} /></mesh><mesh position={[0,.79,0]}><boxGeometry args={[.5,.13,.2]} /><meshStandardMaterial color="#252a2c" /></mesh></group> }
function SpecialScene({ step, onIdentify }: { step:string; onIdentify:(name:string)=>void }) {
  if(step==='rutas')return <RouteScene onIdentify={onIdentify}/>
  if(step==='equipo')return <BinsScene step="retiro" onIdentify={onIdentify}/>
  const model=step==='pilas'?<group><Pickable name="Pila" onIdentify={onIdentify}><group position={[-.52,0,0]} rotation={[0,0,-.12]}><Battery/></group></Pickable><Pickable name="Pila" onIdentify={onIdentify}><group position={[.52,0,-.16]} rotation={[0,0,.1]}><Battery color="#354b4a"/></group></Pickable></group>:step==='electronicos'?<Pickable name="Computadora portátil" onIdentify={onIdentify}><Laptop/></Pickable>:step==='lamparas'?<Pickable name="Lámpara de bajo consumo" onIdentify={onIdentify}><Lamp/></Pickable>:<Pickable name="Cartucho de tóner" onIdentify={onIdentify}><Toner/></Pickable>
  return <group><Pedestal width={3.8}/><RoundedBox args={[3.35,.045,1.9]} radius={.02} position={[0,.15,0]}><meshStandardMaterial color="#e8d7d3" roughness={.9}/></RoundedBox><Float key={step} position={[0,.3,0]}><group scale={step==='electronicos'?1.62:1.85}>{model}</group></Float></group>
}

function RouteScene({onIdentify}:{onIdentify:(name:string)=>void}) {
  const wetTruck=useRef<THREE.Group>(null)
  const dryTruck=useRef<THREE.Group>(null)
  const firstItem=useRef<THREE.Group>(null)
  const secondItem=useRef<THREE.Group>(null)
  const reduced=useReducedMotion()
  useFrame(({clock})=>{
    if(reduced)return
    const t=clock.elapsedTime
    if(wetTruck.current)wetTruck.current.position.x=-1.35+Math.sin(t*.8)*.17
    if(dryTruck.current)dryTruck.current.position.x=1.3-Math.sin(t*.8+.5)*.17
    if(firstItem.current)firstItem.current.position.z=.2-(t*.35%1.18)
    if(secondItem.current)secondItem.current.position.z=.2-((t*.35+.59)%1.18)
  })
  const truck=(color:string,name:string)=><group>
    <RoundedBox args={[1.1,.55,.48]} radius={.04} position={[-.12,.51,0]} castShadow><meshStandardMaterial color={color} roughness={.55}/></RoundedBox>
    <RoundedBox args={[.43,.43,.46]} radius={.04} position={[.65,.47,0]} castShadow><meshStandardMaterial color="#dae8e3" roughness={.38}/></RoundedBox>
    <mesh position={[.7,.53,.237]}><planeGeometry args={[.3,.22]}/><meshBasicMaterial color="#93b8bd"/></mesh>
    <mesh position={[-.15,.52,.247]}><planeGeometry args={[.84,.28]}/><meshBasicMaterial color="#f7f8ef"/></mesh>
    <Label text={name} width={.8} height={.15} position={[-.15,.52,.255]} dark/>
    {[-.55,.63].map(x=><mesh key={x} position={[x,.22,.27]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.14,.14,.1,20]}/><meshStandardMaterial color="#242b2b" roughness={.9}/></mesh>)}
  </group>
  return <group><Pedestal width={5.1}/>
    <Pickable name="Camión de húmedos: va al relleno sanitario" onIdentify={onIdentify}><group ref={wetTruck} position={[-1.35,.14,.51]}>{truck('#303b39','HÚMEDOS')}</group></Pickable>
    <Pickable name="Camión de secos: va a clasificación" onIdentify={onIdentify}><group ref={dryTruck} position={[1.3,.14,.51]}>{truck('#5bb842','SECOS')}</group></Pickable>
    <Pickable name="Relleno sanitario" onIdentify={onIdentify}><group position={[-1.4,.18,-.83]}><mesh position={[0,.22,0]} castShadow><coneGeometry args={[.58,.42,8]}/><meshStandardMaterial color="#92795f" roughness={1}/></mesh><mesh position={[0,.05,.31]}><planeGeometry args={[.88,.2]}/><meshBasicMaterial color="#fffdf4"/></mesh><Label text="RELLENO" width={.82} height={.12} position={[0,.05,.318]} dark/></group></Pickable>
    <Pickable name="Planta de clasificación y recuperación" onIdentify={onIdentify}><group position={[1.38,.16,-.89]}><RoundedBox args={[1.18,.68,.46]} radius={.025} position={[0,.36,0]} castShadow><meshStandardMaterial color="#dce8de" roughness={.8}/></RoundedBox><mesh position={[0,.73,0]}><boxGeometry args={[1.27,.09,.52]}/><meshStandardMaterial color="#678d70"/></mesh><mesh position={[0,.46,.243]}><planeGeometry args={[.78,.22]}/><meshBasicMaterial color="#fffdf4"/></mesh><Label text="PLANTA" width={.73} height={.14} position={[0,.46,.252]} dark/></group></Pickable>
    <Pickable name="Cinta transportadora de secos" onIdentify={onIdentify}><group position={[-.17,.31,.24]}><RoundedBox args={[.72,.12,1.2]} radius={.03} position={[0,.16,0]} castShadow><meshStandardMaterial color="#6e8975" roughness={.72}/></RoundedBox><mesh position={[0,.235,0]}><boxGeometry args={[.58,.018,1.08]}/><meshStandardMaterial color="#354b45" roughness={.9}/></mesh>{[-.51,.51].map(z=><mesh key={z} position={[0,.19,z]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.09,.09,.76,18]}/><meshStandardMaterial color="#b1c4b4" metalness={.3}/></mesh>)}<mesh position={[0,.11,.611]}><planeGeometry args={[.64,.12]}/><meshBasicMaterial color="#e9f5e7"/></mesh><Label text="CINTA SECOS" width={.61} height={.1} position={[0,.11,.619]} dark/><group ref={firstItem} position={[-.11,.27,.2]}><mesh><boxGeometry args={[.2,.15,.18]}/><meshStandardMaterial color="#bd996c"/></mesh></group><group ref={secondItem} position={[.14,.27,-.39]}><mesh><boxGeometry args={[.18,.14,.15]}/><meshStandardMaterial color="#6baea6"/></mesh></group></group></Pickable>
  </group>
}

function Chair({ repaired = true, renewed = false }: { repaired?: boolean; renewed?: boolean }) { const leg=useRef<THREE.Group>(null); const reduced=useReducedMotion();useFrame((_,d)=>{if(leg.current)leg.current.position.x=THREE.MathUtils.damp(leg.current.position.x,repaired?-.37:-.66,reduced?20:4,d)});return <group><RoundedBox args={[1.08,.15,.9]} radius={.045} position={[0,.83,0]} castShadow><meshStandardMaterial color={renewed?'#6f9b72':'#ad7b54'} roughness={.8} /></RoundedBox><RoundedBox args={[1.08,.72,.13]} radius={.04} position={[0,1.26,-.39]} castShadow><meshStandardMaterial color={renewed?'#6f9b72':'#ad7b54'} roughness={.8} /></RoundedBox>{[-.37,.37].map(x=><RoundedBox key={x} args={[.12,.76,.12]} radius={.025} position={[x,.43,-.34]} castShadow><meshStandardMaterial color="#745c46" /></RoundedBox>)}<RoundedBox args={[.12,.76,.12]} radius={.025} position={[.37,.43,.34]} castShadow><meshStandardMaterial color="#745c46" /></RoundedBox><group ref={leg} position={[-.37,.43,.34]}><RoundedBox args={[.12,.76,.12]} radius={.025} castShadow><meshStandardMaterial color="#745c46" /></RoundedBox></group></group> }
function Jar() { return <group><mesh position={[0,.49,0]} castShadow><cylinderGeometry args={[.34,.34,.78,32]} /><meshPhysicalMaterial color="#b2d5d4" transparent opacity={.42} roughness={.14} metalness={.05} /></mesh><mesh position={[0,.9,0]}><cylinderGeometry args={[.31,.31,.1,32]} /><meshStandardMaterial color="#c54f42" metalness={.28} /></mesh><mesh position={[0,.5,.345]}><planeGeometry args={[.42,.27]} /><meshBasicMaterial color="#f5e9d5" /></mesh></group> }
function CardboardBox() { return <group><RoundedBox args={[1.02,1.04,.85]} radius={.035} position={[0,.56,0]} castShadow><meshStandardMaterial color="#b4936d" roughness={.92} /></RoundedBox><mesh position={[0,1.09,0]} rotation={[0,0,.28]}><boxGeometry args={[1.07,.045,.88]} /><meshStandardMaterial color="#aa855e" /></mesh></group> }
function RScene({ step, onIdentify }: { step:string; onIdentify:(name:string)=>void }) { let model:ReactNode;switch(step){case'redisenar':model=<group><CardboardBox/><group position={[.98,0,.4]} scale={.82}><Bottle color="#a6c8a7" cap="#53865d"/></group></group>;break;case'reducir':model=<group>{[0,1,2,3].map(i=><group key={i} position={[0,i*.075,0]}><Paper/></group>)}</group>;break;case'reutilizar':model=<Jar/>;break;case'reparar':model=<Chair repaired/>;break;case'renovar':model=<Chair renewed/>;break;case'recuperar':model=<group><group position={[-.55,0,0]} scale={.8}><Bottle/></group><group position={[.5,.2,.06]}><RoundedBox args={[.62,.55,.6]} radius={.045}><meshStandardMaterial color="#6ba59b" roughness={.7} /></RoundedBox></group></group>;break;default:model=<group><group position={[-.58,0,0]}><Paper crumpled/></group><group position={[.58,0,0]}><mesh rotation={[0,0,Math.PI/2]} position={[0,.46,0]}><cylinderGeometry args={[.24,.24,.8,28]} /><meshStandardMaterial color="#e8e2cf" /></mesh><mesh rotation={[0,0,Math.PI/2]} position={[0,.46,0]}><cylinderGeometry args={[.09,.09,.83,28]} /><meshStandardMaterial color="#8b9f8a" /></mesh></group></group>}
  const names:Record<string,string>={redisenar:'Envase y embalaje',reducir:'Hojas de papel',reutilizar:'Frasco reutilizado',reparar:'Silla reparada',renovar:'Silla renovada',recuperar:'Material recuperado',reciclar:'Papel reciclado'}
  return <group><Pedestal width={3.7}/><Float key={step} position={[0,.2,0]}><Pickable name={names[step]||'Objeto'} onIdentify={onIdentify}><group scale={1.5}>{model}</group></Pickable></Float></group> }

class SceneBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}}render(){return this.state.failed?<div className="scene-error">La vista 3D no está disponible. Los pasos y las explicaciones siguen accesibles.</div>:this.props.children}}

export default function Scene({chapter,step,onPick,onIdentify}:SceneProps){const reduced=useReducedMotion();return <SceneBoundary key={chapter}><Canvas shadows="percentage" dpr={[1,1.5]} frameloop={reduced?'demand':'always'} camera={{position:chapter==='residuos'?[5.25,3.7,7.4]:[4.3,3,5.8],fov:32}}><color attach="background" args={['#f6f8f3']}/><ambientLight intensity={1.35}/><directionalLight position={[4,7,6]} intensity={2.25} castShadow shadow-mapSize={[1024,1024]} shadow-bias={-.0002}/><directionalLight position={[-4,3,-3]} intensity={.65}/><Floor/>{chapter==='residuos'?<WasteBag step={step} onPick={onPick} onIdentify={onIdentify}/>:chapter==='oficina'?<BinsScene step={step} onPick={onPick} onIdentify={onIdentify}/>:chapter==='otras-vias'?<SpecialScene step={step} onIdentify={onIdentify}/>:<RScene step={step} onIdentify={onIdentify}/>}<OrbitControls makeDefault enablePan={false} enableDamping={!reduced} minDistance={4.5} maxDistance={11} minPolarAngle={.6} maxPolarAngle={1.48} target={[0,1.1,0]}/></Canvas></SceneBoundary>}

