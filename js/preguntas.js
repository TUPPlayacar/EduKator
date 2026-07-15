// js/preguntas.js
const poolCompetencias = [
  {
    id: "planificacion",
    nombre: "Planificación y Organización",
    definicion: "Capacidad para planificar, organizar y gestionar eficazmente los recursos, el tiempo y las actividades pedagógicas, considerando necesidades multinivel.",
    icono: "📋",
    comportamientos: [
      "Organiza adecuadamente su tiempo.",
      "Diseña planeaciones didácticas estructuradas.",
      "Prioriza actividades según objetivos educativos.",
      "Administra recursos materiales y tecnológicos.",
      "Anticipa posibles dificultades y establece planes alternativos.",
      "Coordina actividades con otros docentes y directivos.",
      "Da seguimiento al cumplimiento de metas."
    ],
    // Diccionario de pesos específicos por palabras/verbos clave (Normalizados a minúsculas y sin acentos)
    lexicoEvaluacion: {
      palabras: {
        "cronograma": 10, "planeacion": 15, "seguimiento": 12, "objetivos": 12, 
        "evaluacion": 10, "prioridades": 15, "recursos": 12, "metas": 10,
        "anticipar": 15, "tiempo": 10, "alternativa": 15, "contingencia": 15
      },
      verbos: {
        "organice": 15, "disene": 15, "implemente": 15, "coordine": 15, 
        "supervise": 12, "evalue": 12, "planifique": 15, "gestione": 15, "delegue": 12
      },
      frases: {
        "plan alternativo": 20, "estableci prioridades": 20, "cumplimiento de metas": 15, "reuniones de seguimiento": 15
      }
    },
    preguntas: [
      { fase: "S - Situación", texto: "Cuénteme sobre una ocasión en la que tuvo que planificar clases para estudiantes con diferentes niveles de aprendizaje dentro del mismo grupo." },
      { fase: "S - Situación", texto: "Describa un proyecto escolar importante que haya organizado o liderado." },
      { fase: "T - Tarea", texto: "¿Cuál era exactamente su responsabilidad dentro de ese proyecto u escenario y qué objetivos debía cumplir?" },
      { fase: "T - Tarea", texto: "¿Qué recursos materiales, tecnológicos o humanos tenía disponibles para la ejecución?" },
      { fase: "A - Acción", texto: "¿Cómo organizó el trabajo inicial y qué criterios utilizó para establecer prioridades y distribuir su tiempo?" },
      { fase: "A - Acción", texto: "¿Qué acciones concretas tomó cuando surgieron imprevistos y cómo coordinó el trabajo con otros docentes o directivos?" },
      { fase: "R - Resultado", texto: "¿Qué resultados medibles obtuvo al final y cómo evaluó el éxito de la planificación?" },
      { fase: "R - Resultado", texto: "Mirando atrás, ¿qué aprendizaje obtuvo de esa experiencia y qué haría diferente si tuviera que repetirlo?" }
    ]
  },
  {
    id: "relaciones",
    nombre: "Relaciones Interpersonales",
    definicion: "Capacidad para establecer relaciones respetuosas, empáticas y colaborativas con estudiantes, docentes, familias y comunidad educativa, promoviendo un ambiente inclusivo y de confianza.",
    icono: "🤝",
    comportamientos: [
      "Escucha activamente y demuestra empatía.",
      "Mantiene relaciones respetuosas y favorece el trabajo colaborativo.",
      "Maneja desacuerdos de forma constructiva.",
      "Se comunica con claridad y genera confianza entre estudiantes y familias.",
      "Promueve ambientes inclusivos."
    ],
    lexicoEvaluacion: {
      palabras: {
        "escuche": 12, "dialogue": 12, "medie": 15, "consensuamos": 15, 
        "empatia": 15, "apoye": 10, "negocie": 15, "acompane": 12, 
        "colaboramos": 15, "confianza": 12, "respeto": 10, "inclusivo": 12
      },
      verbos: {
        "escuche": 15, "dialogue": 15, "medie": 15, "comunique": 12, 
        "apoye": 12, "negocie": 15, "colaboramos": 15, "consense": 15, "integre": 12
      },
      frases: {
        "resolvimos el conflicto": 25, "llegamos a un acuerdo": 20, "escuche sus opiniones": 15, "ambiente de confianza": 15
      }
    },
    preguntas: [
      { fase: "S - Situación", texto: "Cuénteme sobre una ocasión en la que tuvo que trabajar con personas muy diferentes a usted para alcanzar un objetivo educativo." },
      { fase: "S - Situación", texto: "Describa una situación difícil o de conflicto que haya enfrentado con un estudiante, padre de familia o compañero docente." },
      { fase: "T - Tarea", texto: "¿Cuál era su responsabilidad directa en esa situación y qué esperaba lograr originalmente?" },
      { fase: "A - Acción", texto: "¿Cómo inició la comunicación, qué hizo para generar confianza y cómo manejó las diferencias de opinión?" },
      { fase: "A - Acción", texto: "¿Qué estrategias o acciones específicas utilizó para llegar a acuerdos y mantener una relación positiva?" },
      { fase: "R - Resultado", texto: "¿Cómo terminó finalmente la situación y cuál fue la respuesta de las personas involucradas?" },
      { fase: "R - Resultado", texto: "¿Qué impacto tuvo en el ambiente escolar a largo plazo y qué gran aprendizaje obtuvo de ello?" }
    ]
  }
];