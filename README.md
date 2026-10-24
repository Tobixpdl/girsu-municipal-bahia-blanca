# GIRSU Municipal · guía interactiva

Curso web en español basado en `GUIA-GIRSU-MBB.pdf`, *Programa de Gestión Integral de Residuos Sólidos Urbanos Municipal* (Bahía Blanca, archivo creado en 2021). La fuente original se incluye en `public/` para que cada cita abra la página física correspondiente.

## Ejecutar

```sh
npm install
npm run dev
```

Para generar la versión estática: `npm run build`. El resultado queda en `dist/`. El proyecto usa React, TypeScript, Vite, Three.js y React Three Fiber. El progreso se guarda solo en el navegador con la clave `girsu-mbb-96bf8a6f-v1`.

## Estructura

- `src/content.ts`: currículo, explicaciones, actividades, respuestas y páginas de origen.
- `src/OfficeScene.tsx`: laboratorio 3D esquemático con alternativa en botones HTML.
- `src/App.tsx`: navegación, otras representaciones, actividades y progreso.
- `docs/COBERTURA.md`: inventario por página, unidades de contenido y correspondencia con lecciones.
- `public/GUIA-GIRSU-MBB.pdf`: copia sin modificar de la fuente.

Para sumar una lección, agregá un objeto a `lessons` con `id` único, objetivo, páginas físicas, explicación y actividad. Agregá una representación en `LessonVisual` solo si aporta comprensión. El PDF presenta un esquema de implementación de 2021: verificá servicios, contactos y procedimientos vigentes antes de usar el curso como instrucción operativa actual.

## Procedencia y fidelidad

SHA-256 del PDF: `96BF8A6F9729DB645E62A9E2FDF3BD46D3AB5700BAB6112E899F2D801BD10BE6` (15 páginas A4). Las escenas y diagramas son originales y esquemáticos; no reproducen instalaciones municipales reales. Los porcentajes de composición y el dato de 1 kg por persona y día se atribuyen a la guía y no se presentan como datos actuales. Los colores de los tres recipientes 3D son una convención visual del curso, no una norma del documento.

El método de creación se basa en `Tutorial-Interactivo-Robotica/skills/pdf-to-3d-course`, sus referencias de formatos, interacciones, cobertura y trabajo, y las referencias locales de frontend y Three.js. La escena de recipientes retoma los colores negro y verde de las ilustraciones de las páginas 6 y 7; el recipiente de residuos especiales es un modelo didáctico y no representa un contenedor que aparezca en el documento.
