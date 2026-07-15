// js/competencias.js

// 1. Diccionario Léxico de Dimensiones Heurísticas Reestructurado (Normalizadas sin acentos ni eñes para el motor)
const DICCIONARIO_HEURISTICO = {
  pensamientoAnalitico: {
    palabras: [
      "analisis", "analice", "datos", "evidencias", "indicadores", "informacion", "diagnostico", "causa", 
      "causas", "problema", "patrones", "tendencias", "observacion", "observaciones", "resultado", "resultados", 
      "estadisticas", "registro", "evaluacion", "medicion", "comparacion", "hipotesis", "conclusion", "deduccion", 
      "inferencia", "criterio", "interpretacion", "investigacion", "hallazgo", "variables", "evidencia"
    ],
    verbos: [
      "analice", "identifique", "observe", "compare", "diagnostique", "investigue", "interprete", "deduje", 
      "detecte", "recopile", "clasifique", "evalue", "midi", "registre", "argumente", "comprobe"
    ],
    expresiones: [
      "identifique patrones", "analice los datos", "detecte la causa", "compare resultados", "realice un diagnostico", 
      "evidencias de aprendizaje", "analisis de resultados", "tome decisiones", "utilice indicadores", 
      "recolecte informacion", "analisis cualitativo", "analisis cuantitativo"
    ]
  },
  planificacion: {
    palabras: [
      "planeacion", "planificacion", "cronograma", "agenda", "calendario", "programacion", "organizacion", 
      "prioridades", "prioridad", "objetivos", "metas", "recursos", "tiempo", "seguimiento", "evaluacion", 
      "control", "estructura", "etapas", "fases", "contingencia", "riesgos", "estrategia", "logistica", 
      "coordinacion", "distribucion"
    ],
    verbos: [
      "planifique", "organice", "coordine", "gestione", "distribui", "priorice", "delegue", "controle", 
      "supervise", "prepare", "programe", "estableci", "optimice", "estructure"
    ],
    expresiones: [
      "plan de trabajo", "plan alternativo", "plan de contingencia", "cronograma de actividades", 
      "cumplimiento de objetivos", "seguimiento semanal", "administracion de recursos", "gestion del tiempo", 
      "distribucion de actividades", "estableci prioridades", "organice las tareas", "coordine actividades"
    ]
  },
  manejoConflictos: {
    palabras: [
      "conflicto", "disciplina", "emociones", "dialogo", "mediacion", "negociacion", "respeto", "autoridad", 
      "reglas", "limites", "acuerdo", "tension", "problema", "incidente", "conducta", "convivencia", 
      "empatia", "escucha", "control", "solucion"
    ],
    verbos: [
      "medie", "dialogue", "negocie", "escuche", "controle", "resolvi", "calme", "intervine", "explique", 
      "oriente", "acompané", "estableci", "previne"
    ],
    expresiones: [
      "resolvi el conflicto", "mantuve la calma", "escucha activa", "dialogo respetuoso", "acuerdo mutuo", 
      "manejo emocional", "resolucion pacifica", "restableci la disciplina", "intervencion oportuna", "ambiente de respeto"
    ]
  },
  servicioCliente: {
    palabras: [
      "padre", "familia", "tutor", "atencion", "servicio", "empatia", "escucha", "solucion", "seguimiento", 
      "orientacion", "acompañamiento", "comunicacion", "confianza", "satisfaccion", "respuesta", "acuerdo", "compromiso"
    ],
    verbos: [
      "escuche", "oriente", "atendi", "acompañe", "propuse", "explique", "aclare", "respondi", "solucione", "negocie"
    ],
    expresiones: [
      "atencion personalizada", "seguimiento al alumno", "escuche al padre", "propuesta de solucion", 
      "trato respetuoso", "comunicacion efectiva", "acuerdo conjunto", "acompañamiento continuo"
    ]
  },
  trabajoEquipo: {
    palabras: [
      "equipo", "colaboracion", "cooperacion", "coordinacion", "integracion", "participacion", "comunicacion", 
      "compromiso", "liderazgo", "responsabilidad", "apoyo", "consenso", "objetivo comun", "colectivo", "grupo"
    ],
    verbos: [
      "colabore", "coordine", "lidere", "apoye", "integre", "coopere", "participe", "delegue", "acompañe"
    ],
    expresiones: [
      "trabajo colaborativo", "objetivo comun", "apoyo mutuo", "responsabilidad compartida", 
      "toma de decisiones conjunta", "colaboracion interdisciplinaria"
    ]
  },
  comunicacion: {
    palabras: [
      "comunicacion", "mensaje", "instrucciones", "claridad", "retroalimentacion", "dialogo", "explicacion", 
      "comprension", "canales", "informacion", "presentacion", "expresion", "escucha", "preguntas"
    ],
    verbos: [
      "explique", "aclare", "comunique", "escuche", "pregunte", "retroalimente", "presente", "expuse", "argumente"
    ],
    expresiones: [
      "instrucciones claras", "retroalimentacion constante", "escucha activa", "comunicacion efectiva", 
      "canales de comunicacion", "mensaje claro"
    ]
  },
  relaciones: {
    palabras: [
      "empatia", "respeto", "confianza", "inclusion", "integracion", "diversidad", "equidad", "convivencia", 
      "solidaridad", "apoyo", "dialogo", "escucha", "sensibilizacion", "acompañamiento", "participacion"
    ],
    verbos: [
      "escuche", "acompañe", "integre", "sensibilice", "dialogue", "apoye", "comprendi", "oriente", "medie"
    ],
    expresiones: [
      "ambiente inclusivo", "clima escolar", "escucha activa", "respeto mutuo", "integracion grupal", 
      "acompañamiento emocional", "sentido de pertenencia", "relaciones positivas"
    ]
  },
  cambio: {
    palabras: [
      "cambio", "adaptacion", "innovacion", "tecnologia", "plataforma", "capacitacion", "aprendizaje", 
      "actualizacion", "mejora", "transformacion", "digitalizacion", "implementacion", "flexibilidad", 
      "resiliencia"
    ],
    verbos: [
      "aprendi", "implemente", "adapte", "actualice", "innove", "explore", "investigue", "capacite", 
      "integre", "transforme"
    ],
    expresiones: [
      "aprendizaje continuo", "adaptacion al cambio", "innovacion educativa", "integracion tecnologica", 
      "mejora continua", "capacitación autodidacta", "actualizacion profesional", "resistencia al cambio"
    ]
  }
};

// 2. Catálogo Institucional de las 8 Competencias (Definición + Comportamientos Posibles)
// Contenido base tomado del instrumento oficial de evaluación por competencias.
const CATALOGO_COMPETENCIAS = [
  {
    id: "pensamientoAnalitico",
    numero: 1,
    nombre: "Pensamiento Analítico",
    icono: "🧠",
    definicion: "Identificar información para analizar, utilizando habilidades de razonamiento lógico, con el fin de tomar decisiones informadas.",
    comportamientos: [
      "Desarticular un conflicto en sus partes esenciales.",
      "Identificar información pertinente de analizar.",
      "Identificar patrones y temas comunes en los datos.",
      "Utilizar datos cuantitativos y cualitativos para analizar.",
      "Demostrar habilidades de razonamiento lógico.",
      "Tomar decisiones y proponer soluciones con datos ambiguos."
    ]
  },
  {
    id: "planificacion",
    numero: 2,
    nombre: "Planificación y Organización",
    icono: "📋",
    definicion: "Realización de una serie de acciones complejas a partir de la estructuración de tareas para conseguir las metas.",
    comportamientos: [
      "Manejar y organizar el propio tiempo.",
      "Descomponer metas complejas.",
      "Decidir cuánto tiempo otorgar a los diversos temas con el fin de obtener la meta final.",
      "Considerar qué recursos serán necesarios.",
      "Crear planes contingentes en caso que se presenten problemas."
    ]
  },
  {
    id: "manejoConflictos",
    numero: 3,
    nombre: "Manejo de Conflictos",
    icono: "🚨",
    definicion: "Persistir frente a la adversidad, motivándose para alcanzar resultados y hacer que las cosas sucedan a pesar de las dificultades.",
    comportamientos: [
      "Priorizar acciones (decidir qué puede realizarse y qué no) en un tiempo acotado.",
      "Encontrar maneras para superar problemas y dificultades.",
      "Tomar la iniciativa cuando sea necesario.",
      "Poner mayor tiempo y esfuerzo en el trabajo, para que se concrete.",
      "Buscar y obtener la asistencia necesaria de otros, para asegurarse que el trabajo se realice."
    ]
  },
  {
    id: "servicioCliente",
    numero: 4,
    nombre: "Servicio al Cliente",
    icono: "🎯",
    definicion: "Busca entender los requerimientos de los clientes y cómo trabaja para satisfacerlos.",
    comportamientos: [
      "Hace preguntas para entender lo que el cliente necesita.",
      "Lee el lenguaje corporal del cliente para entender necesidades no explicitadas verbalmente.",
      "Interactúa de manera entusiasta con los clientes.",
      "Pone las necesidades de los clientes como prioridad.",
      "Busca maneras para cumplir con las expectativas de los clientes."
    ]
  },
  {
    id: "trabajoEquipo",
    numero: 5,
    nombre: "Trabajo en Equipo",
    icono: "👥",
    definicion: "Participar activamente como parte de un equipo, dando todo el apoyo necesario para asegurar el cumplimiento de objetivos comunes.",
    comportamientos: [
      "Chequear proactivamente si los integrantes del equipo necesitan asistencia.",
      "Ofrecer apoyo emocional y/o ayuda práctica al miembro del equipo que lo requiera.",
      "Compartir información e ideas con los otros miembros del equipo.",
      "Detener o afrontar cualquier insinuación de conflicto o una mala comunicación en el equipo.",
      "Adaptarse al rol que el equipo le ha asignado."
    ]
  },
  {
    id: "comunicacion",
    numero: 6,
    nombre: "Comunicación",
    icono: "💬",
    definicion: "Produce una interacción clara y efectiva, tanto escrita como oralmente, en situaciones formales o informales.",
    comportamientos: [
      "Escribe documentos que contienen puntos claves, en un estilo claro y conciso.",
      "Comenta y expone sus propias opiniones en diferentes situaciones.",
      "Adapta su vocabulario y manera de expresarse, dependiendo de las necesidades de su audiencia.",
      "Confecciona y distribuye presentaciones formales y efectivas.",
      "Busca retroalimentación para confirmar la efectividad de su propia comunicación."
    ]
  },
  {
    id: "relaciones",
    numero: 7,
    nombre: "Relaciones Interpersonales",
    icono: "❤️",
    definicion: "Establecer una buena interrelación con otras personas, buscar entender los requerimientos y necesidades de los demás y tratar a otros con respeto.",
    comportamientos: [
      "Acercarse a los demás con entusiasmo y apertura.",
      "Hacer preguntas para establecer los requerimientos y necesidades de los otros.",
      "Empatía: Reconocer diversas perspectivas (culturales, nacionales, organizacionales, etc.).",
      "Respeto con los demás."
    ]
  },
  {
    id: "cambio",
    numero: 8,
    nombre: "Disposición al Cambio",
    icono: "🔄",
    definicion: "Demostración de una actitud positiva ante el desafío de una nueva manera de hacer las cosas. Alentar y apoyar a otros para el cambio.",
    comportamientos: [
      "Estar abierto a eventualidades o cambios de circunstancias.",
      "Hacer preguntas que desafíen supuestos y el estatus quo.",
      "Buscar activamente oportunidades de cambiar sistemas, procesos, o maneras de trabajar en beneficio a la organización.",
      "Enfrentar los cambios con entusiasmo.",
      "Alentar y apoyar a otros en hacer que los cambios ocurran."
    ]
  }
];

// 3. Estructura de la Guía de Entrevista Institucional por Bloques de Competencias Cruzadas
const poolCompetencias = [
  {
    id: "planificacion_bloque",
    nombre: "I. Planificación y Organización",
    icono: "📋",
    definicion: "Capacidad para estructurar de manera anticipada una serie de acciones complejas, administrar eficientemente el tiempo y los recursos didácticos, y prever planes de contingencia para lograr las metas de aprendizaje en un aula donde convergen de manera simultánea múltiples grados, edades y niveles cognitivos.",
    // Mapeo heurístico ponderado de sub-rubros para este bloque
    dimensionesClave: ["planificacion", "pensamientoAnalitico", "cambio"],
    preguntas: [
      // Planificación y Organización (El núcleo de la competencia)
      { subCompetencia: "Planificación y Organización", fase: "S - Situación", texto: "¿Cuénteme acerca de algún proyecto académico complejo (feria, acreditación, rediseño curricular) que haya organizado y/o planeado?" },
      { subCompetencia: "Planificación y Organización", fase: "T - Tarea", texto: "¿Cómo llegó a manejar este proyecto? ¿Qué objetivos tenía?" },
      { subCompetencia: "Planificación y Organización", fase: "A - Acción", texto: "¿Cómo empezó a planearlo y a descomponer las metas complejas en tareas simples? ¿Qué recursos necesitó y qué planes contingentes creó en caso de problemas?" },
      { subCompetencia: "Planificación y Organización", fase: "R - Resultado", texto: "¿Qué retroalimentación recibió sobre el éxito del proyecto? ¿Qué razones concluye usted que fueron claves para el éxito (o fracaso) del proyecto?" },
      
      // Pensamiento Analítico (Esencial para desglosar la información antes de planear)
      { subCompetencia: "Pensamiento Analítico", fase: "S - Situación", texto: "Describa una situación donde detectó que un grupo completo de alumnos no lograba comprender un tema clave a pesar de haber usado sus métodos habituales. ¿Cómo surgió esta situación?" },
      { subCompetencia: "Pensamiento Analítico", fase: "T - Tarea", texto: "¿Cuál fue la tarea específica que tuvo que realizar para entender lo que fallaba?" },
      { subCompetencia: "Pensamiento Analítico", fase: "A - Acción", texto: "¿Qué datos cuantitativos o cualitativos recopiló de los alumnos para analizar el problema? ¿Qué patrones o temas comunes desprendió de la información?" },
      { subCompetencia: "Pensamiento Analítico", fase: "R - Resultado", texto: "¿Cuáles fueron sus recomendaciones o la solución que propuso tras el análisis? ¿Qué resultado concreto tuvo el que haya realizado ese análisis?" },
      
      // Disposición al Cambio (Requerida para reestructurar planes y adaptarse a nuevas metodologías)
      { subCompetencia: "Disposición al Cambio", fase: "S - Situación", texto: "Hábleme de alguna herramienta digital, plataforma de gestión escolar o metodología pedagógica nueva que su colegio anterior haya implementado de forma obligatoria y repentina. ¿Qué tanto alteraba esta nueva disposición sus hábitos o su rutina de enseñanza habitual?" },
      { subCompetencia: "Disposición al Cambio", fase: "T - Tarea", texto: "¿Qué plazos y estándares de uso le exigía la institución para dominar el nuevo sistema?" },
      { subCompetencia: "Disposición al Cambio", fase: "A - Acción", texto: "¿Qué recursos o capacitación extra buscó por su cuenta para acelerar su adaptación? ¿Cómo integró positivamente este cambio en su planeación diaria sin mostrar resistencia?" },
      { subCompetencia: "Disposición al Cambio", fase: "R - Resultado", texto: "¿Cómo mejoró su práctica docente una vez que dominó por completo el nuevo cambio? ¿Qué comentarios recibió de la coordinación académica sobre su velocidad de adaptación?" }
    ]
  },
  {
    id: "relaciones_bloque",
    nombre: "II. Relaciones Interpersonales",
    icono: "🤝",
    definicion: "Capacidad de establecer interrelaciones efectivas, empáticas y de colaboración estrecha con diversos actores de la comunidad educativa (estudiantes de distintas edades, padres de familia, colegas docentes y directivos), tratando a todos con respeto absoluto y reconociendo sus diferencias individuales o culturales para potenciar el entorno de aprendizaje.",
    dimensionesClave: ["relaciones", "manejoConflictos", "servicioCliente", "trabajoEquipo", "comunicacion"],
    preguntas: [
      // Relaciones Interpersonales (El núcleo de la competencia)
      { subCompetencia: "Relaciones Interpersonales", fase: "S - Situación", texto: "Cuénteme sobre alguna ocasión en la que notó que un alumno de su grupo se encontraba aislado, rechazado o excluido por el resto de sus compañeros en las dinámicas diarias. ¿Cuándo ocurrió? ¿Qué comportamientos o actitudes del grupo generaban este aislamiento?" },
      { subCompetencia: "Relaciones Interpersonales", fase: "T - Tarea", texto: "¿Qué meta se propuso a nivel relacional y humano para construir un ambiente más empático?" },
      { subCompetencia: "Relaciones Interpersonales", fase: "A - Acción", texto: "¿De qué manera sutil se acercó al alumno para conocer su perspectiva sin hacerlo sentir expuesto? ¿Qué dinámicas sociométricas o de integración interpersonal diseñó en sus clases para fomentar la inclusión? ¿Cómo dialogó con el resto del grupo para sensibilizarlos sobre el respeto mutuo?" },
      { subCompetencia: "Relaciones Interpersonales", fase: "R - Resultado", texto: "¿Qué cambios observó en la interacción y estado anímico del alumno en las semanas posteriores? ¿Cómo evolucionó el clima relacional general de ese salón de clases?" },
      
      // Manejo de Conflictos (Clave para mediar crisis entre personas)
      { subCompetencia: "Manejo de Conflictos", fase: "S - Situación", texto: "Cuénteme sobre alguna ocasión en la que un alumno desafió abiertamente su autoridad, lineamientos o reglas frente al resto del grupo. ¿Qué detonó el desafío del estudiante?" },
      { subCompetencia: "Manejo de Conflictos", fase: "T - Tarea", texto: "¿Qué tarea o rol normativo tuvo que ejercer para mantener el control sin caer en la confrontación?" },
      { subCompetencia: "Manejo de Conflictos", fase: "A - Acción", texto: "¿Cómo manejó sus propias emociones en ese instante de alta tensión? ¿Qué pasos siguió para abordar al alumno de forma asertiva?" },
      { subCompetencia: "Manejo de Conflictos", fase: "R - Resultado", texto: "¿Cómo reaccionó el alumno ante las medidas que usted tomó? ¿Qué mensaje y resultado concreto percibió el resto del grupo sobre el manejo de la disciplina?" },
      
      // Servicio al Cliente (Orientado a la empatía y atención a alumnos y padres)
      { subCompetencia: "Servicio al Cliente", fase: "S - Situación", texto: "Describa una ocasión en la que tuvo que atender a un padre de familia que acudió muy molesto o agresivo a reclamar por una situación escolar de su hijo. ¿Cuál era el motivo principal del enojo del padre?" },
      { subCompetencia: "Servicio al Cliente", fase: "T - Tarea", texto: "¿Cuál era el objetivo que usted debía cumplir en esa reunión de atención?" },
      { subCompetencia: "Servicio al Cliente", fase: "A - Acción", texto: "¿Cómo manejó la apertura de la conversación para empatizar con el padre sin perder la postura profesional? ¿Qué propuestas u opciones de solución le brindó para resolver la inconformidad?" },
      { subCompetencia: "Servicio al Cliente", fase: "R - Resultado", texto: "¿Con qué actitud y bajo qué acuerdos concretos se retiró el padre de familia de la institución? ¿Cómo impactó esto en el seguimiento posterior del alumno?" },
      
      // Trabajo en Equipo (Necesario para colaborar con directivos y el Consejo Técnico)
      { subCompetencia: "Trabajo en Equipo", fase: "S - Situación", texto: "Hábleme de una actividad a nivel institucional (como una feria de ciencias, un festival o proceso de acreditación) que requirió la colaboración activa de todo el Consejo Técnico o personal directivo. ¿Cómo se planteó inicialmente el reto al equipo?" },
      { subCompetencia: "Trabajo en Equipo", fase: "T - Tarea", texto: "¿Cuál fue el rol específico que usted asumió o le fue asignado dentro del grupo de trabajo?" },
      { subCompetencia: "Trabajo en Equipo", fase: "A - Acción", texto: "¿Cómo interactuó con compañeros de otras áreas para coordinar los esfuerzos? ¿Qué hizo cuando un miembro del equipo no estaba cumpliendo con su parte y afectaba el trabajo de todos?" },
      { subCompetencia: "Trabajo en Equipo", fase: "R - Resultado", texto: "¿Qué retroalimentación global recibió la institución sobre la ejecución de ese evento? ¿Qué conclusiones obtuvo sobre la efectividad del trabajo colaborativo en esa experiencia?" },
      
      // Comunicación (La herramienta fundamental para conectar y transmitir ideas a los demás)
      { subCompetencia: "Comunicación", fase: "S - Situación", texto: "Describa una situación en la que un malentendido o una instrucción ambigua de su parte generó confusión o queja generalizada en el grupo con respecto a una tarea, examen o proyecto importante. ¿Cómo descubrió que las instrucciones no habían sido claras?" },
      { subCompetencia: "Comunicación", fase: "T - Tarea", texto: "¿Qué impacto negativo en la entrega o evaluación tenía que solucionar con urgencia?" },
      { subCompetencia: "Comunicación", fase: "A - Acción", texto: "¿Qué nuevos canales o formatos estructurados utilizó para retransmitir las especificaciones de forma inequívoca? ¿Cómo manejó las dudas o posibles inconformidades que surgieron por el cambio?" },
      { subCompetencia: "Comunicación", fase: "R - Resultado", texto: "¿Cómo resultó la entrega definitiva de los trabajos tras la aclaración? ¿Qué medidas tomó en sus siguientes planeaciones para garantizar que sus instrucciones sean 100% claras desde el inicio?" }
    ]
  }
];