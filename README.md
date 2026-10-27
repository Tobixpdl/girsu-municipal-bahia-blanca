# Gestión integral de residuos sólidos urbanos municipal

Guía interactiva basada exclusivamente en el PDF local `GUIA-GIRSU-MBB.pdf` (15 páginas físicas, edición de 2021). Son cuatro capítulos, sin portada didáctica: qué descartamos, separación en la oficina, residuos que requieren otra vía y las siete R. Cada paso incluye una escena 3D manipulable, una explicación breve, un detalle de contexto y un enlace a la página exacta del documento. Hay una pregunta compacta al final de cada capítulo. Las escenas de residuos especiales muestran pilas, computadora, lámpara y tóner como objetos distintos.

## Ejecutar

```sh
npm install
npm run dev
```

`npm run check:content` verifica la estructura y las referencias de página. `npm run build` genera `dist/` para ChatGPT Sites.

## Archivos

- `src/course.ts`: capítulos, pasos, textos, preguntas y páginas.
- `src/Scene.tsx`: objetos y animaciones Three.js / React Three Fiber.
- `src/CourseApp.tsx` y `src/course.css`: interfaz compacta, navegación, diálogo y progreso.
- `docs/COBERTURA.md`: trazabilidad entre páginas y capítulos.
- `public/GUIA-GIRSU-MBB.pdf`: fuente original, sin modificar.

El progreso se guarda en este navegador con la clave `girsu-mbb-96bf8a6f-v2`. Se respetan las preferencias de movimiento reducido. Las escenas son representaciones didácticas, no modelos de instalaciones reales. Las cifras, teléfonos, servicios y recorridos operativos de la guía se presentan como información de su edición de 2021; antes de usarlos en una gestión actual hay que confirmar su vigencia.

SHA-256 del PDF: `96BF8A6F9729DB645E62A9E2FDF3BD46D3AB5700BAB6112E899F2D801BD10BE6`.

El proyecto sigue el método actualizado de `Tutorial-Interactivo-Robotica/skills/pdf-to-3d-course`, sus referencias y las guías locales de frontend y Three.js. El modelo 3D acompaña cada paso y el panel de texto explica la decisión concreta.
