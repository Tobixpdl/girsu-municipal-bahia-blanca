export type Lesson = {
  id: string
  number: string
  title: string
  kicker: string
  pages: number[]
  goal: string
  intro: string
  sections: { title: string; text: string; bullets?: string[]; note?: string }[]
  activity: { prompt: string; options: { label: string; explanation: string; correct: boolean }[]; hint: string }
}

export const lessons: Lesson[] = [
  {
    id: 'proposito', number: '01', title: 'Un programa para cambiar hábitos', kicker: 'El punto de partida', pages: [1, 2, 3],
    goal: 'Reconocer qué busca el programa GIRSU MBB y quiénes participan.',
    intro: 'La gestión integral empieza antes de que el camión retire una bolsa. La guía propone reducir, clasificar y recolectar de manera diferenciada los residuos dentro de las dependencias municipales de Bahía Blanca.',
    sections: [
      { title: 'La idea central', text: 'El programa plantea una práctica compartida: disponer recipientes para secos y húmedos, capacitar al personal municipal y de limpieza, dar instrucciones claras y sensibilizar sobre el desarrollo sustentable. Separar en el escritorio solo funciona si la separación continúa durante el retiro.', bullets: ['Reducir lo que se descarta.', 'Clasificar en el lugar donde se genera el residuo.', 'Mantener corrientes diferenciadas durante la recolección.'] },
      { title: 'Por qué importa', text: 'La página 9 conecta los hábitos de consumo y descarte con la presión sobre materias primas, agua, energía y sistemas de disposición. También plantea que pequeñas acciones, repetidas por muchas personas, pueden cambiar el impacto colectivo. Las cifras mundiales que menciona son estimaciones citadas por la edición de 2021 y no se usan como datos actuales en esta experiencia.' },
      { title: 'Un acuerdo de oficina', text: 'La guía llama a todo el personal y a las jefaturas a acompañar el cambio. La ubicación de los recipientes y el modo de usarlos deben resultar comprensibles para quienes comparten el espacio.', note: 'Fuente: objetivos generales y específicos de la guía, página física 3.' }
    ],
    activity: { prompt: '¿Qué acción representa mejor el objetivo del programa en una oficina?', hint: 'Pensá en todo el recorrido, desde el recipiente hasta el retiro.', options: [
      { label: 'Poner dos recipientes y acordar con limpieza cómo retirar cada corriente', explanation: 'Correcto. La separación debe sostenerse desde la generación hasta la recolección diferenciada.', correct: true },
      { label: 'Cambiar el color de las bolsas sin explicar cómo usarlas', explanation: 'El programa también requiere instrucciones y capacitación; el color por sí solo no resuelve la clasificación.', correct: false },
      { label: 'Juntar todo al final del día para ahorrar espacio', explanation: 'Mezclar al final anula el esfuerzo de separar en origen.', correct: false }
    ] }
  },
  {
    id: 'materiales', number: '02', title: 'Entender lo que descartamos', kicker: 'Húmedos, secos y límites', pages: [4, 5],
    goal: 'Distinguir composición, reciclabilidad y condiciones del material.',
    intro: 'Los residuos sólidos urbanos provienen de las actividades cotidianas en domicilios, comercios, oficinas y servicios. La guía los organiza en húmedos y secos, y recuerda que parte de lo descartado puede volver a un proceso productivo.',
    sections: [
      { title: 'Húmedos de origen orgánico', text: 'Yerba, café, infusiones, cáscaras, restos de comida y jardín contienen mucha agua, cambian rápidamente y pueden biodegradarse. La guía menciona el compost como una posibilidad para parte de esta materia orgánica.', bullets: ['Su humedad puede contaminar papeles y envases.', 'Si no se compostan, la disposición debe evitar olores y animales.', 'La posibilidad de compostar no significa que todo lo que va al recipiente de húmedos sea compostable.'] },
      { title: 'Secos reciclables', text: 'Papel, cartón, ciertos plásticos, metales, vidrio y envases son ejemplos de materiales que pueden recuperarse. El requisito operativo de la guía es decisivo: deben estar limpios y secos. Un material reciclable en teoría deja de servir para esta corriente si llega cubierto de comida, aceite o cemento.', note: 'La clasificación local y los materiales aceptados pueden cambiar; este curso reproduce la guía, no certifica un servicio vigente.' },
      { title: 'Las proporciones del documento', text: 'La página 4 presenta una composición orientativa: 50 % orgánicos compostables, 25 % secos reciclables y 25 % mixtos no reciclables. También menciona un promedio de 1 kg por persona por día en Argentina. Son cifras de la publicación, no una medición actual de tu oficina.' }
    ],
    activity: { prompt: 'Tenés una caja de cartón con aceite de una pizza. Según la guía, ¿qué hacés?', hint: 'El material de base no alcanza: evaluá su estado.', options: [
      { label: 'La pongo con secos porque es cartón', explanation: 'El aceite contamina el cartón. La guía usa justamente la caja de pizza sucia como ejemplo de húmedos.', correct: false },
      { label: 'La pongo con húmedos por estar contaminada', explanation: 'Correcto según la guía. Si una parte limpia puede separarse, esa parte sí podría ir con secos.', correct: true },
      { label: 'La dejo junto a las pilas', explanation: 'Las pilas requieren una vía diferenciada; no son el destino de un cartón sucio.', correct: false }
    ] }
  },
  {
    id: 'oficina', number: '03', title: 'Diseñar la separación en la oficina', kicker: 'Práctica espacial', pages: [5, 6, 7],
    goal: 'Elegir recipiente según el estado del residuo y organizar el retiro.',
    intro: 'La decisión ocurre en segundos, cerca del escritorio o de la cocina. El programa admite distintas configuraciones de recipientes, pero exige que cada persona sepa dónde dejar lo húmedo y que el personal de limpieza retire por separado ambas corrientes.',
    sections: [
      { title: 'El recipiente de húmedos', text: 'Conviene ubicarlo cerca de la matera, cocina o sector de alimentos. En el esquema de la guía recibe restos de comida, residuos sanitarios, materiales sucios y varios no reciclables. No necesita rótulo si todas las personas del área acuerdan su uso, aunque identificarlo reduce dudas.', note: 'Atención: “húmedos” es una categoría operativa de este programa. Residuos sanitarios y envoltorios sucios no son insumos para compost.' },
      { title: 'El recipiente de secos', text: 'Puede haber un recipiente común o pequeños recipientes junto a cada escritorio. Acepta envases, papeles y cartones que estén limpios y secos. El documento permite conservar contenedores ya existentes para materiales específicos o unificarlos en secos y húmedos.', bullets: ['Si un envase puede lavarse y secarse, recuperá su condición de seco.', 'No pongas yerba ni restos de comida en un cesto de escritorio para secos.', 'Al retirar, cada corriente va al contenedor exterior identificado correspondiente.'] },
      { title: 'Una precisión sobre las botellas rellenas', text: 'La guía de 2021 indica que en ese momento no había maquinaria local para su tratamiento integral y recomienda separar la botella y los envoltorios limpios y secos. Ese dato expresa el contexto de la publicación y requiere confirmación local antes de usarlo como instrucción vigente.' }
    ],
    activity: { prompt: 'Terminaste un té y tenés un saquito usado y una botella plástica vacía, limpia y seca. ¿Cómo los separás?', hint: 'Son dos materiales con estados diferentes.', options: [
      { label: 'Saquito a húmedos; botella a secos', explanation: 'Correcto. El saquito es un resto húmedo y la botella limpia y seca se recupera en la corriente seca.', correct: true },
      { label: 'Ambos a secos', explanation: 'El saquito usado aporta humedad y puede contaminar los secos.', correct: false },
      { label: 'Ambos a húmedos', explanation: 'La botella limpia y seca puede recuperarse y debe conservarse separada.', correct: false }
    ] }
  },
  {
    id: 'especiales', number: '04', title: 'Reconocer lo que necesita otra vía', kicker: 'No va en ninguno de los dos', pages: [5, 8],
    goal: 'Identificar materiales que requieren gestión diferenciada.',
    intro: 'La división secos/húmedos no resuelve todos los casos. Pilas, baterías, aparatos electrónicos, lámparas y tóner aparecen señalados en la guía como residuos que no deben arrojarse en ninguno de los dos recipientes de oficina.',
    sections: [
      { title: 'Por qué separar estos casos', text: 'Algunos residuos contienen sustancias peligrosas o exigen tratamientos específicos. La guía enumera además aceite de cocina usado, medicamentos vencidos, termómetros de mercurio y envases con sustancias tóxicas. Su manejo no se deduce de que el objeto parezca seco.', bullets: ['Apartalos de la corriente común.', 'Conservalos de forma segura mientras se consulta el circuito autorizado.', 'Pedí indicaciones al área responsable antes de trasladarlos o mezclarlos.'] },
      { title: 'También importa dónde se abandona', text: 'La página 8 advierte sobre el vidrio tirado en espacios verdes: además de ser un residuo abandonado, puede concentrar luz solar. La indicación práctica del documento es llevarse los residuos y disponerlos correctamente, sin dejarlos en el lugar.' },
      { title: 'El dato de contacto del documento', text: 'La página 8 remite a la Oficina de Gestión Ambiental y publica el teléfono (291) 4594000, internos 2471 / 2472 / 2473. Se ofrece como referencia documental de 2021; confirmá que el canal continúe activo antes de usarlo.', note: 'La guía menciona al OPDS como organismo de autorización de transporte y destino. La denominación y los procedimientos oficiales pueden haber cambiado desde su publicación.' }
    ],
    activity: { prompt: 'Se agotó una pila del teclado. ¿Dónde la dejás?', hint: 'La guía muestra una categoría que no entra en los dos recipientes.', options: [
      { label: 'En secos, porque no está mojada', explanation: 'La pila requiere una vía diferenciada. “Seco” no significa que sea reciclable con papeles y envases.', correct: false },
      { label: 'En húmedos, para que no contamine los secos', explanation: 'Tampoco debe ir con los residuos comunes húmedos.', correct: false },
      { label: 'Separada, para consultar el circuito autorizado', explanation: 'Correcto. La guía prohíbe arrojar pilas en cualquiera de los dos recipientes.', correct: true }
    ] }
  },
  {
    id: 'destino', number: '05', title: 'Seguir la ruta de cada corriente', kicker: 'Del escritorio al destino', pages: [6, 7, 9, 10],
    goal: 'Explicar por qué la recolección diferenciada completa la separación en origen.',
    intro: 'El destino importa. Según el programa descrito, el personal de limpieza retira las dos corrientes por separado y las coloca en contenedores exteriores identificados.',
    sections: [
      { title: 'Ruta de húmedos', text: 'La sección de preguntas frecuentes indica que, en ese esquema, los húmedos se recolectan con el servicio de basura urbana y se trasladan al relleno sanitario para tratamiento y disposición final. La mención de compost en la guía describe una posibilidad doméstica para ciertos orgánicos, no el destino automático de todo el recipiente de oficina.' },
      { title: 'Ruta de secos', text: 'El documento señala un vehículo diferente hacia la Ecoplanta de Cerri o la Planta del Complejo Ambiental. Allí trabajadores de cooperativas separan el material recibido y lo procesan para uso o comercialización. La limpieza y sequedad facilitan esa tarea.' },
      { title: 'Dependencias sin recolección directa', text: 'La guía prevé que dependencias grandes funcionen como “puntos limpios” para oficinas más pequeñas. Indica que los jefes de área recibirían la asignación correspondiente durante la implementación. No aporta un mapa permanente ni un horario que el curso pueda afirmar como actual.' }
    ],
    activity: { prompt: '¿Qué podría frustrar una separación bien hecha dentro de la sala?', hint: 'Seguí la ruta después de cerrar la bolsa.', options: [
      { label: 'Retirar secos y húmedos por separado hacia sus contenedores', explanation: 'Eso mantiene la separación que pide el programa.', correct: false },
      { label: 'Volver a mezclar las bolsas al retirarlas', explanation: 'Correcto. Si las corrientes se mezclan, se pierde la clasificación lograda en origen.', correct: true },
      { label: 'Explicar al equipo cuál es el recipiente de cada corriente', explanation: 'La capacitación ayuda a que el sistema funcione.', correct: false }
    ] }
  },
  {
    id: 'comunidad', number: '06', title: 'Sostener el cambio entre personas', kicker: 'Preguntas frecuentes', pages: [9, 10],
    goal: 'Resolver dudas habituales sin perder el trato respetuoso ni inventar servicios.',
    intro: 'La guía presenta la separación como un hábito colectivo. También reconoce que habrá oficinas pequeñas, dudas sobre el cumplimiento y oportunidades de extender lo aprendido al hogar.',
    sections: [
      { title: 'Si falta recolección', text: 'La propuesta del documento es consultar cuál dependencia de mayor tamaño funciona como punto limpio asignado. No conviene improvisar una ubicación: la asignación corresponde a la implementación del programa.' },
      { title: 'Si alguien todavía no separa', text: 'Primero propone diálogo paciente y respetuoso con compañeros o superiores. Si el incumplimiento persiste, remite a la Subsecretaría de Gestión Ambiental para pedir apoyo y corrección de prácticas. El aprendizaje del equipo necesita instrucciones claras, no reproches automáticos.' },
      { title: 'Más allá de la oficina', text: 'La página 10 invita a replicar lo aprendido en casa y otros espacios y a enseñar con el ejemplo. También enumera iniciativas que la gestión municipal desarrollaba al publicarse la guía, como recolección diferenciada, bateas, ecocanje y apoyo a cooperativas. Son antecedentes del texto, no un catálogo vigente.' }
    ],
    activity: { prompt: 'Sos la única persona que separa en tu oficina. ¿Cuál es el primer paso sugerido?', hint: 'La guía propone una secuencia de diálogo y, si hace falta, apoyo institucional.', options: [
      { label: 'Abrir un diálogo respetuoso para explicar el programa', explanation: 'Correcto. La guía recomienda paciencia y respeto antes de escalar la situación.', correct: true },
      { label: 'Retirar todos los recipientes para evitar errores', explanation: 'Eso dificulta cumplir el programa y no ayuda a aprender.', correct: false },
      { label: 'Acusar públicamente a quienes se equivocan', explanation: 'La guía favorece el diálogo respetuoso y el apoyo institucional.', correct: false }
    ] }
  },
  {
    id: 'siete-r', number: '07', title: 'Pensar antes de reciclar', kicker: 'Las siete R', pages: [11, 12],
    goal: 'Distinguir acciones de prevención, extensión de uso y recuperación.',
    intro: 'Reducir, reutilizar y reciclar son las tres R clásicas. La guía suma rediseñar, reparar, renovar y recuperar para pensar los productos a lo largo de todo su ciclo de vida.',
    sections: [
      { title: 'Antes de generar un residuo', text: 'Reducir significa consumir menos bienes, energía, agua y embalajes. Rediseñar actúa incluso antes: elegir materiales, envases y procesos de fabricación con criterios ambientales. Ambas acciones evitan presión sobre los recursos desde el inicio.', bullets: ['REDISEÑAR: decidir cómo se crea.', 'REDUCIR: consumir solo lo necesario.'] },
      { title: 'Mientras un objeto todavía sirve', text: 'Reutilizar da otro uso a un producto; reparar corrige una falla; renovar actualiza un objeto antiguo para que vuelva a cumplir su función. En todos los casos se extiende la vida del objeto antes de descartarlo.', bullets: ['REUTILIZAR: darle una segunda vida.', 'REPARAR: arreglar lo averiado.', 'RENOVAR: actualizar para seguir usando.'] },
      { title: 'Cuando vuelve al circuito', text: 'Reciclar transforma residuos en materia prima o productos nuevos. Recuperar recoge materiales ya usados para reintroducirlos en el proceso productivo. La guía vincula estas siete acciones con una economía circular, en vez de una secuencia lineal de extraer, producir y descartar.' }
    ],
    activity: { prompt: 'Una silla tiene una pata suelta y la arreglás para seguir usándola. ¿Qué R describe mejor la acción?', hint: 'La silla no cambia de función ni se transforma en materia prima.', options: [
      { label: 'Reciclar', explanation: 'Reciclar implica transformar material usado para un nuevo proceso productivo.', correct: false },
      { label: 'Reparar', explanation: 'Correcto. Corregiste una falla para prolongar su uso.', correct: true },
      { label: 'Rediseñar', explanation: 'Rediseñar se refiere a decisiones de diseño del producto, previas a su fabricación.', correct: false }
    ] }
  },
  {
    id: 'practica', number: '08', title: 'Llevar las ideas a la vida diaria', kicker: 'Aplicar lo aprendido', pages: [13, 14, 15],
    goal: 'Elegir acciones concretas y distinguir las sugerencias del documento de datos vigentes.',
    intro: 'Las últimas páginas convierten las R en hábitos: comprar con criterio, evitar impresiones, ahorrar agua y energía, compartir recursos, reutilizar envases y separar materiales. También proponen consultar materiales externos para compostaje.',
    sections: [
      { title: 'Reducir en la oficina y en casa', text: 'Antes de comprar, preguntá si hace falta. La guía sugiere evitar embalaje excesivo, usar botellas y bolsas durables, revisar documentos antes de imprimir, aprovechar ambas caras del papel, apagar luces y equipos sin uso y cuidar el agua. Estas acciones previenen residuos y consumo.', note: 'Los rangos de temperatura de calefacción y aire acondicionado de la página 13 son consejos de la publicación; no se presentan aquí como norma actual.' },
      { title: 'Reutilizar y reparar', text: 'Usar envases retornables, convertir hojas impresas en borradores, dar otro uso a cajas o frascos, donar ropa en buen estado y restaurar muebles son ejemplos del texto. La elección concreta depende del estado y seguridad del objeto.' },
      { title: 'Reciclar y explorar compostaje', text: 'La guía propone separar para el reciclaje y señala que parte de la materia orgánica puede convertirse en abono. La página 15 remite a manuales y videos externos de compostaje domiciliario. Esos recursos son referencias de la edición de 2021; verificá su disponibilidad y las indicaciones actuales antes de aplicarlos.' }
    ],
    activity: { prompt: 'Antes de imprimir un borrador para una reunión, ¿qué decisión aplica mejor la prioridad de reducir?', hint: 'La mejor prevención ocurre antes de generar la hoja usada.', options: [
      { label: 'Revisar si se puede compartir digitalmente y usar vista previa', explanation: 'Correcto. Evita impresiones innecesarias y errores, como recomienda la guía.', correct: true },
      { label: 'Imprimir de inmediato y luego separar el papel', explanation: 'Separar ayuda, pero reducir el consumo innecesario actúa antes.', correct: false },
      { label: 'Tirar el papel usado al recipiente de húmedos aunque esté limpio', explanation: 'El papel limpio y seco puede recuperarse en la corriente seca.', correct: false }
    ] }
  }
]

export const sourceUrl = '/GUIA-GIRSU-MBB.pdf'
export const pageUrl = (page: number) => `${sourceUrl}#page=${page}`
