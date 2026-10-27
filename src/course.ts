export type Step = {
  id: string
  label: string
  page: number
  heading: string
  body: string
  detail: string
  object: string
}

export type Chapter = {
  id: string
  title: string
  pages: number[]
  summary: string
  steps: Step[]
  closing: string
  question: string
  choices: { text: string; correct: boolean; explanation: string }[]
}

export const pdfUrl = '/GUIA-GIRSU-MBB.pdf'
export const pageUrl = (n: number) => `${pdfUrl}#page=${n}`

export const chapters: Chapter[] = [
  {
    id: 'residuos', title: 'Qué descartamos', pages: [3, 4, 5],
    summary: 'La guía propone reducir, clasificar y recolectar por separado los residuos de las dependencias municipales. Para decidir bien, primero hay que mirar el material y su estado.',
    steps: [
      { id: 'conjunto', label: 'El conjunto', page: 3, heading: 'Un programa para toda la oficina', body: 'GIRSU MBB busca reducir, clasificar y recolectar en forma diferenciada. La guía pide recipientes, capacitación para personal municipal y de limpieza, instrucciones compartidas y sensibilización.', detail: 'Una bolsa mezclada dificulta recuperar materiales. Por eso la decisión empieza donde se genera el residuo y continúa durante el retiro.', object: 'Bolsa con tres tipos de residuos' },
      { id: 'organicos', label: 'Húmedos', page: 4, heading: 'Restos orgánicos y humedad', body: 'Yerba, café, cáscaras, comida y restos de jardín son ejemplos de la guía. Contienen mucha agua, cambian con rapidez y pueden biodegradarse. Una parte puede compostarse si se gestiona por esa vía.', detail: 'El 50 % de orgánicos compostables del dibujo es una proporción presentada por la guía, no una medición actual de esta oficina.', object: 'Cáscaras, yerba y restos vegetales' },
      { id: 'reciclables', label: 'Secos reciclables', page: 5, heading: 'Material que puede volver al proceso', body: 'Papel, cartón, plásticos, metales y vidrio aparecen entre los secos recuperables. La condición indispensable es que lleguen limpios y secos; la suciedad puede impedir su aprovechamiento.', detail: 'La ilustración de la página 4 asigna 25 % a secos reciclables. Botellas, envases y papeles son ejemplos, siempre sujetos al circuito local.', object: 'Botella, lata y hoja de papel' },
      { id: 'mixtos', label: 'Mixtos', page: 4, heading: 'No todo se recupera', body: 'La guía representa otro 25 % como mixtos no reciclables: envases compuestos o sucios, pañales y otros materiales que no entran en la corriente recuperable.', detail: 'La categoría de disposición “húmedos” que usa el programa de oficina también recibe materiales sucios y sanitarios. Eso no los convierte en compostables.', object: 'Envase sucio y residuo sanitario' },
    ],
    closing: 'El dibujo 50/25/25 y la cifra de 1 kg por persona y día provienen de la edición de 2021. Sirven para leer esa guía; no describen una medición vigente.',
    question: 'Una hoja limpia y seca aparece entre los residuos de la oficina. ¿Cuál es la primera decisión correcta?',
    choices: [
      { text: 'Conservarla separada para la corriente de secos', correct: true, explanation: 'El papel limpio y seco puede recuperarse según la guía (pp. 5 y 7).' },
      { text: 'Mezclarla con yerba usada', correct: false, explanation: 'La humedad de la yerba puede contaminar el papel.' },
      { text: 'Tratarla como una pila', correct: false, explanation: 'Las pilas requieren otra vía; una hoja limpia no.' },
    ],
  },
  {
    id: 'oficina', title: 'Separar en la oficina', pages: [5, 6, 7],
    summary: 'La guía muestra un recipiente negro para húmedos y uno verde para secos. La práctica funciona cuando se entiende qué entra, dónde conviene ubicarlos y cómo se retiran.',
    steps: [
      { id: 'negro', label: 'Recipiente negro', page: 6, heading: 'Húmedos cerca de la cocina', body: 'La guía sugiere ubicar el recipiente de húmedos en la matera o cerca de donde se preparan alimentos. Recibe restos de comida, servilletas usadas, sanitarios, envoltorios sucios y varios no reciclables.', detail: 'Es una categoría de recolección. Los pañuelos o envoltorios sucios que van allí no son material para compost.', object: 'Tacho negro con restos orgánicos' },
      { id: 'verde', label: 'Recipiente verde', page: 7, heading: 'Secos junto al trabajo diario', body: 'La oficina puede tener un recipiente común o pequeños cestos de escritorio, siempre reservados para secos. La guía enumera botellas, tapitas, envases, latas, papel y cartón.', detail: 'El personal de limpieza debe mantener esta corriente separada y llevarla al contenedor exterior identificado para secos.', object: 'Tacho verde con papel y envases' },
      { id: 'limpiar', label: 'Limpiar y secar', page: 5, heading: 'La condición cambia el destino', body: 'Si un envase se puede lavar y secar, recupera su condición de seco. Si tiene restos de comida, aceite o cemento que no se quitan, la guía indica desecharlo con húmedos.', detail: 'La caja de pizza engrasada es el ejemplo del documento. No alcanza con reconocer que “es cartón”: hay que observar cómo llega.', object: 'Envase limpio frente a envase sucio' },
      { id: 'retiro', label: 'Retiro', page: 7, heading: 'No volver a mezclar', body: 'El personal de limpieza retira por separado húmedos y secos hacia contenedores exteriores identificados. Las oficinas que ya separan papel o tapitas pueden conservar esos recipientes o unificarlos en las dos corrientes.', detail: 'La nota de la página 7 sobre botellas rellenas describe la situación local de 2021; confirmá el circuito actual antes de tomarla como instrucción vigente.', object: 'Dos recipientes con rutas distintas' },
    ],
    closing: 'Los colores negro y verde siguen las ilustraciones de las páginas 6 y 7 del PDF. Son una ayuda visual de esta guía, no un código universal.',
    question: 'Terminaste un mate y también tenés una botella plástica limpia y seca. ¿Qué hacés?',
    choices: [
      { text: 'Yerba al negro; botella al verde', correct: true, explanation: 'La yerba usada va a húmedos y la botella limpia y seca va a secos (pp. 6–7).' },
      { text: 'Ambos al verde', correct: false, explanation: 'La yerba húmeda puede contaminar los recuperables.' },
      { text: 'Ambos al negro', correct: false, explanation: 'La botella limpia y seca debe mantenerse en la corriente recuperable.' },
    ],
  },
  {
    id: 'otras-vias', title: 'Lo que va por otra vía', pages: [8, 9, 10],
    summary: 'Hay objetos que no van en ninguno de los dos recipientes. La guía también explica a dónde se dirige cada corriente y cómo sostener la separación entre personas.',
    steps: [
      { id: 'pilas', label: 'Pilas', page: 8, heading: 'Pilas y baterías', body: 'La guía las excluye de ambos recipientes. Por sus componentes necesitan manipulación y tratamiento diferenciados. No se vuelven “secos reciclables” por el solo hecho de estar secas.', detail: 'Apartalas y consultá el circuito de recepción autorizado. El teléfono publicado en la página 8 pertenece a la edición de 2021.', object: 'Pilas cilíndricas con polos visibles' },
      { id: 'electronicos', label: 'Electrónicos', page: 8, heading: 'Aparatos eléctricos y electrónicos', body: 'Los RAEEs aparecen entre los materiales que requieren gestión especial. La guía prohíbe dejarlos en el negro o en el verde junto a residuos de oficina.', detail: 'Un equipo roto sigue siendo un aparato electrónico; no es comparable a un envase o una hoja de papel.', object: 'Computadora portátil abierta' },
      { id: 'lamparas', label: 'Lámparas', page: 8, heading: 'Lámparas y fluorescentes', body: 'Tubos fluorescentes y lámparas de bajo consumo figuran en la lista de materiales que no se arrojan a ninguno de los dos recipientes.', detail: 'Manipulalos con cuidado y consultá la vía de recepción apropiada. El modelo muestra una lámpara compacta representativa.', object: 'Lámpara de bajo consumo' },
      { id: 'toner', label: 'Tóner', page: 8, heading: 'Cartuchos de tinta y tóner', body: 'La señal roja del PDF incluye tinta y tóner entre los objetos que deben apartarse de los cestos comunes de la oficina.', detail: 'El cartucho 3D es una representación didáctica del objeto señalado en el documento.', object: 'Cartucho de tóner con rodillo' },
      { id: 'rutas', label: 'Destino', page: 9, heading: 'Las corrientes toman rutas distintas', body: 'Según el esquema de la guía, los húmedos viajan con la recolección urbana al relleno sanitario. Los secos van en otro vehículo a una planta de clasificación y recuperación, donde trabajan cooperativas.', detail: 'La guía cita la Ecoplanta de Cerri y la Planta del Complejo Ambiental. No confirmamos aquí que el circuito operativo siga igual.', object: 'Dos vehículos y planta de clasificación' },
      { id: 'equipo', label: 'Entre personas', page: 10, heading: 'Acordar, explicar y sostener', body: 'Si una oficina pequeña no tiene recolección directa, la guía prevé un punto limpio asignado. Si alguien no separa, propone diálogo paciente y respetuoso y, si persiste el problema, pedir apoyo a la Subsecretaría de Gestión Ambiental.', detail: 'La página 10 también invita a llevar el aprendizaje al hogar y menciona otros programas municipales de la época. Sus servicios actuales requieren verificación.', object: 'Oficina con dos recipientes' },
    ],
    closing: 'La página 8 advierte además que no hay que abandonar vidrio ni otros residuos en espacios verdes. Los contactos, nombres institucionales y recorridos corresponden al PDF de 2021.',
    question: 'Se agotó una pila del teclado. ¿Qué recorrido indica la guía?',
    choices: [
      { text: 'Apartarla y consultar una recepción diferenciada', correct: true, explanation: 'La página 8 indica expresamente no poner pilas en ninguno de los dos recipientes.' },
      { text: 'Dejarla en el verde porque está seca', correct: false, explanation: 'La condición “seca” no elimina sus requisitos de gestión especial.' },
      { text: 'Ocultarla dentro del negro', correct: false, explanation: 'Mezclarla con húmedos tampoco es una vía adecuada.' },
    ],
  },
  {
    id: 'siete-r', title: 'Las siete R', pages: [11, 12, 13, 14, 15],
    summary: 'El PDF pasa de las tres R tradicionales a siete decisiones a lo largo de la vida de un producto. Las páginas finales las traducen en hábitos de compra, uso, reparación y separación.',
    steps: [
      { id: 'redisenar', label: 'Rediseñar', page: 12, heading: 'Pensarlo desde el diseño', body: 'Antes de fabricar, elegir materiales, envases y procesos con criterio ambiental. El documento llama a esto ecodiseño.', detail: 'La escena usa un envase y su embalaje para mostrar que parte del impacto se define antes de que alguien lo compre.', object: 'Envase y embalaje' },
      { id: 'reducir', label: 'Reducir', page: 13, heading: 'Evitar lo innecesario', body: 'Comprar solo lo que hace falta, evitar exceso de envoltorio, revisar antes de imprimir y ahorrar agua y energía son ejemplos de la guía.', detail: 'La reducción ocurre antes de crear el residuo. Separar bien después no reemplaza esta decisión.', object: 'Pila de hojas que disminuye' },
      { id: 'reutilizar', label: 'Reutilizar', page: 14, heading: 'Dar otro uso', body: 'Usar ambas caras del papel, convertir hojas en borradores, devolver envases y volver a usar cajas o frascos extiende la vida del objeto.', detail: 'La página 14 también sugiere donar ropa y aprovechar bienes usados en buen estado.', object: 'Frasco con tapa que se reutiliza' },
      { id: 'reparar', label: 'Reparar', page: 12, heading: 'Arreglar para seguir usando', body: 'Antes de reemplazar un producto estropeado, considerar la reparación. La guía usa como ejemplo objetos y muebles que pueden volver a servir.', detail: 'La pata de la silla vuelve a su posición al seleccionar este paso: es una animación explicativa, no un procedimiento de carpintería.', object: 'Silla con una pata reparada' },
      { id: 'renovar', label: 'Renovar', page: 12, heading: 'Actualizar un objeto antiguo', body: 'Renovar significa poner al día un objeto para que vuelva a cumplir la función para la que fue creado.', detail: 'La página 14 propone restaurar sillas o muebles viejos para darles una nueva vida.', object: 'Silla restaurada' },
      { id: 'recuperar', label: 'Recuperar', page: 12, heading: 'Reintroducir materiales', body: 'Recuperar es recoger materiales ya usados para que puedan regresar al proceso productivo.', detail: 'En el esquema de la página 9, las cooperativas clasifican y procesan secos para su uso o comercialización.', object: 'Material separado para nueva producción' },
      { id: 'reciclar', label: 'Reciclar', page: 11, heading: 'Transformar material usado', body: 'Reciclar transforma residuos en materia prima o nuevos productos. Separar limpio y seco permite que esos materiales lleguen a esa etapa.', detail: 'La guía también propone compostaje domiciliario para parte de la materia orgánica y remite a manuales y videos en la página 15.', object: 'Papel usado y nuevo producto' },
    ],
    closing: 'Las páginas 13–15 suman ejemplos de transporte, energía, agua, compras, reutilización y compostaje. Los enlaces externos del PDF son referencias de la edición de 2021; consultá la fuente y verificá su disponibilidad.',
    question: 'Una silla tiene una pata floja y la arreglás para seguir usándola. ¿Qué R describe mejor la acción?',
    choices: [
      { text: 'Reparar', correct: true, explanation: 'Corregiste una falla para prolongar la vida del objeto (p. 12).' },
      { text: 'Reciclar', correct: false, explanation: 'No transformaste la silla en materia prima para otro producto.' },
      { text: 'Rediseñar', correct: false, explanation: 'El diseño ocurre antes de fabricar el producto.' },
    ],
  },
]
