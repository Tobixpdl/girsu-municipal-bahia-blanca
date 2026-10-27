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
  question: string
  choices: { text: string; correct: boolean; explanation: string }[]
}

export const pdfUrl = '/GUIA-GIRSU-MBB.pdf'
export const pageUrl = (n: number) => `${pdfUrl}#page=${n}`

export const chapters: Chapter[] = [
  {
    id: 'residuos', title: 'Qué descartamos', pages: [3, 4, 5],
    summary: 'Reducir, clasificar y recolectar por separado los residuos de las dependencias municipales empieza con una pregunta: ¿qué material tenemos y en qué estado está?',
    steps: [
      { id: 'conjunto', label: 'El conjunto', page: 3, heading: 'Un programa para toda la oficina', body: 'GIRSU MBB busca reducir, clasificar y recolectar en forma diferenciada. Se necesitan recipientes, capacitación para personal municipal y de limpieza, instrucciones compartidas y sensibilización.', detail: 'Una bolsa mezclada dificulta recuperar materiales. La separación empieza donde se genera cada residuo y continúa durante el retiro.', object: 'Bolsa con tres tipos de residuos' },
      { id: 'organicos', label: 'Húmedos', page: 4, heading: 'Restos orgánicos y humedad', body: 'Yerba, café, cáscaras, comida y restos de jardín contienen mucha agua, cambian con rapidez y pueden biodegradarse. Una parte puede compostarse si se gestiona por esa vía.', detail: 'Los orgánicos compostables representan el 50 % y el promedio en Argentina se estima en 1 kg de residuos por persona y día. Son cifras de la edición de 2021, no una medición actual de esta oficina.', object: 'Zanahoria y filtro con café usado' },
      { id: 'reciclables', label: 'Secos reciclables', page: 5, heading: 'Material que puede volver al proceso', body: 'Papel, cartón, plásticos, metales y vidrio pueden recuperarse cuando llegan limpios y secos; la suciedad puede impedir su aprovechamiento.', detail: 'Los secos reciclables representan el 25 %. Botellas, envases y papeles son ejemplos, siempre sujetos al circuito local.', object: 'Botella, lata y hoja de papel' },
      { id: 'mixtos', label: 'Mixtos', page: 4, heading: 'No todo se recupera', body: 'Otro 25 % corresponde a mixtos no reciclables: envases compuestos o sucios, pañales y otros materiales que no entran en la corriente recuperable.', detail: 'En la oficina, el recipiente de “húmedos” también recibe materiales sucios y sanitarios. Eso no los convierte en compostables.', object: 'Envase sucio y residuo sanitario' },
    ],
    question: 'Una hoja limpia y seca aparece entre los residuos de la oficina. ¿Cuál es la primera decisión correcta?',
    choices: [
      { text: 'Conservarla separada para la corriente de secos', correct: true, explanation: 'El papel limpio y seco puede recuperarse (pp. 5 y 7).' },
      { text: 'Mezclarla con yerba usada', correct: false, explanation: 'La humedad de la yerba puede contaminar el papel.' },
      { text: 'Tratarla como una pila', correct: false, explanation: 'Las pilas requieren otra vía; una hoja limpia no.' },
    ],
  },
  {
    id: 'oficina', title: 'Separar en la oficina', pages: [5, 6, 7],
    summary: 'Un recipiente negro recibe húmedos y uno verde recibe secos. La separación funciona cuando se entiende qué entra, dónde ubicarlos y cómo se retiran.',
    steps: [
      { id: 'negro', label: 'Recipiente negro', page: 6, heading: 'Húmedos cerca de la cocina', body: 'El recipiente negro puede ubicarse en la matera o cerca de donde se preparan alimentos. Recibe restos de comida, servilletas usadas, sanitarios, envoltorios sucios y varios no reciclables.', detail: 'Es una categoría de recolección. Los pañuelos o envoltorios sucios que van allí no son material para compost.', object: 'Tacho negro con restos orgánicos' },
      { id: 'verde', label: 'Recipiente verde', page: 7, heading: 'Secos junto al trabajo diario', body: 'La oficina puede tener un recipiente común o pequeños cestos de escritorio reservados para secos: botellas, tapitas, envases, latas, papel y cartón.', detail: 'El personal de limpieza mantiene esta corriente separada y la lleva al contenedor exterior identificado para secos.', object: 'Tacho verde con papel y envases' },
      { id: 'limpiar', label: 'Limpiar y secar', page: 5, heading: 'La condición cambia el destino', body: 'Si un envase se puede lavar y secar, recupera su condición de seco. Si conserva restos de comida, aceite o cemento, va con los húmedos.', detail: 'Una caja de pizza engrasada no se recupera por el solo hecho de ser cartón. Hay que observar cómo llega.', object: 'Envase limpio frente a envase sucio' },
      { id: 'retiro', label: 'Retiro', page: 7, heading: 'No volver a mezclar', body: 'El personal de limpieza retira por separado húmedos y secos hacia contenedores exteriores identificados. Las oficinas que ya separan papel o tapitas pueden conservar esos recipientes o unificarlos en las dos corrientes.', detail: 'Negro identifica húmedos y verde identifica secos en este programa. La opción de botellas rellenas corresponde a una situación local de 2021; confirmá el circuito actual.', object: 'Dos recipientes con rutas distintas' },
    ],
    question: 'Terminaste un mate y también tenés una botella plástica limpia y seca. ¿Qué hacés?',
    choices: [
      { text: 'Yerba al negro; botella al verde', correct: true, explanation: 'La yerba usada va a húmedos y la botella limpia y seca va a secos (pp. 6–7).' },
      { text: 'Ambos al verde', correct: false, explanation: 'La yerba húmeda puede contaminar los recuperables.' },
      { text: 'Ambos al negro', correct: false, explanation: 'La botella limpia y seca debe mantenerse en la corriente recuperable.' },
    ],
  },
  {
    id: 'otras-vias', title: 'Lo que va por otra vía', pages: [8, 9, 10],
    summary: 'Algunos objetos necesitan otra vía. Las dos corrientes de la oficina también toman destinos distintos y requieren acuerdos entre las personas que las separan y retiran.',
    steps: [
      { id: 'pilas', label: 'Pilas', page: 8, heading: 'Pilas y baterías', body: 'Las pilas y baterías no van en ninguno de los dos recipientes. Por sus componentes necesitan manipulación y tratamiento diferenciados. Estar secas no las convierte en reciclables de la oficina.', detail: 'Apartalas y consultá el circuito de recepción autorizado. El contacto impreso en la edición de 2021 puede haber cambiado.', object: 'Dos pilas separadas, con polos visibles' },
      { id: 'electronicos', label: 'Electrónicos', page: 8, heading: 'Aparatos eléctricos y electrónicos', body: 'Los aparatos eléctricos y electrónicos requieren gestión especial. No van en el recipiente negro ni en el verde junto a los residuos de oficina.', detail: 'Un equipo roto sigue siendo un aparato electrónico; no es comparable a un envase o una hoja de papel.', object: 'Computadora portátil abierta' },
      { id: 'lamparas', label: 'Lámparas', page: 8, heading: 'Lámparas y fluorescentes', body: 'Los tubos fluorescentes y las lámparas de bajo consumo tampoco van en ninguno de los dos recipientes.', detail: 'Manipulalos con cuidado y consultá la vía de recepción apropiada.', object: 'Lámpara de bajo consumo' },
      { id: 'toner', label: 'Tóner', page: 8, heading: 'Cartuchos de tinta y tóner', body: 'La tinta y el tóner se apartan de los cestos comunes de la oficina.', detail: 'Conservá los cartuchos separados para la recepción diferenciada.', object: 'Cartucho de tóner con rodillo' },
      { id: 'rutas', label: 'Destino', page: 9, heading: 'Las corrientes toman rutas distintas', body: 'Los húmedos viajan con la recolección urbana al relleno sanitario. Los secos van en otro vehículo a una planta de clasificación y recuperación, donde trabajan cooperativas.', detail: 'Entre los destinos mencionados están la Ecoplanta de Cerri y la Planta del Complejo Ambiental. Los recorridos operativos pueden haber cambiado desde 2021.', object: 'Camiones de húmedos y secos; cinta de clasificación' },
      { id: 'equipo', label: 'Entre personas', page: 10, heading: 'Acordar, explicar y sostener', body: 'Una oficina pequeña sin recolección directa puede usar un punto limpio asignado. Si alguien no separa, conviene conversar con paciencia y respeto; si el problema persiste, se puede pedir apoyo a la Subsecretaría de Gestión Ambiental.', detail: 'No abandones vidrio ni otros residuos en espacios verdes. Llevá lo aprendido al hogar. Los programas y contactos institucionales de la edición de 2021 pueden haber cambiado.', object: 'Oficina con dos recipientes' },
    ],
    question: 'Se agotó una pila del teclado. ¿Qué hacés?',
    choices: [
      { text: 'Apartarla y consultar una recepción diferenciada', correct: true, explanation: 'Las pilas no van en ninguno de los dos recipientes (p. 8).' },
      { text: 'Dejarla en el verde porque está seca', correct: false, explanation: 'La condición “seca” no elimina sus requisitos de gestión especial.' },
      { text: 'Ocultarla dentro del negro', correct: false, explanation: 'Mezclarla con húmedos tampoco es una vía adecuada.' },
    ],
  },
  {
    id: 'siete-r', title: 'Las siete R', pages: [11, 12, 13, 14, 15],
    summary: 'Las tres R tradicionales se amplían a siete decisiones a lo largo de la vida de un producto: desde su diseño hasta la recuperación de materiales.',
    steps: [
      { id: 'redisenar', label: 'Rediseñar', page: 12, heading: 'Pensarlo desde el diseño', body: 'Antes de fabricar, elegir materiales, envases y procesos con criterio ambiental: eso es ecodiseño.', detail: 'Parte del impacto de un envase y su embalaje se define antes de que alguien lo compre.', object: 'Envase y embalaje' },
      { id: 'reducir', label: 'Reducir', page: 13, heading: 'Evitar lo innecesario', body: 'Comprar solo lo necesario, evitar exceso de envoltorio, revisar antes de imprimir y ahorrar agua y energía reduce residuos y consumo de recursos.', detail: 'También conviene elegir medios de transporte de menor impacto cuando sea posible. Reducir ocurre antes de crear el residuo.', object: 'Pila de hojas que disminuye' },
      { id: 'reutilizar', label: 'Reutilizar', page: 14, heading: 'Dar otro uso', body: 'Usar ambas caras del papel, convertir hojas en borradores, devolver envases y volver a usar cajas o frascos extiende la vida de cada objeto.', detail: 'Donar ropa y aprovechar bienes usados en buen estado también evita descartarlos antes de tiempo.', object: 'Frasco con tapa que se reutiliza' },
      { id: 'reparar', label: 'Reparar', page: 12, heading: 'Arreglar para seguir usando', body: 'Antes de reemplazar un producto estropeado, considerar la reparación. Objetos y muebles pueden volver a servir.', detail: 'La pata de la silla vuelve a su posición al seleccionar este paso.', object: 'Silla con una pata reparada' },
      { id: 'renovar', label: 'Renovar', page: 12, heading: 'Actualizar un objeto antiguo', body: 'Renovar significa poner al día un objeto para que vuelva a cumplir la función para la que fue creado.', detail: 'Restaurar sillas o muebles viejos puede darles una nueva vida.', object: 'Silla restaurada' },
      { id: 'recuperar', label: 'Recuperar', page: 12, heading: 'Reintroducir materiales', body: 'Recuperar es recoger materiales ya usados para que puedan regresar al proceso productivo.', detail: 'Las cooperativas clasifican y procesan secos para su uso o comercialización.', object: 'Material separado para nueva producción' },
      { id: 'reciclar', label: 'Reciclar', page: 11, heading: 'Transformar material usado', body: 'Reciclar transforma residuos en materia prima o nuevos productos. Separar limpio y seco permite que esos materiales lleguen a esa etapa.', detail: 'Parte de la materia orgánica puede tratarse mediante compostaje domiciliario. Hay recursos de reutilización y compostaje para seguir aprendiendo (pp. 14–15).', object: 'Papel usado y nuevo producto' },
    ],
    question: 'Una silla tiene una pata floja y la arreglás para seguir usándola. ¿Qué R describe mejor la acción?',
    choices: [
      { text: 'Reparar', correct: true, explanation: 'Corregiste una falla para prolongar la vida del objeto (p. 12).' },
      { text: 'Reciclar', correct: false, explanation: 'No transformaste la silla en materia prima para otro producto.' },
      { text: 'Rediseñar', correct: false, explanation: 'El diseño ocurre antes de fabricar el producto.' },
    ],
  },
]
