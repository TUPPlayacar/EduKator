// js/app.js
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

let estadoEvaluacion = {
  candidato: {},
  competenciaActualIdx: 0,
  preguntaActualIdx: 0,
  respuestasAcumuladas: {},
  transcripcionChat: {},
  historialChatActual: [],
  pantallaActual: "bienvenida"
};

function initApp() {
  renderPantalla();
}

function renderPantalla() {
  const container = document.getElementById("app-container");
  container.innerHTML = "";

  switch (estadoEvaluacion.pantallaActual) {
    case "bienvenida":
      container.innerHTML = `
        <div class="text-center py-6">
          <div class="w-20 h-20 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 p-2 shadow-sm">
            <img src="ico.png" alt="EduKator Icon" class="w-full h-full object-contain">
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-3">Evaluación del Desempeño por Competencias</h2>
          
          <div class="my-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl max-w-lg mx-auto">
            <p class="text-indigo-950 text-sm font-bold mb-2">📢 Indicación importante antes de comenzar:</p>
            <p class="text-slate-600 text-xs mb-4">Por favor, escuche atentamente las siguientes instrucciones en audio sobre el desarrollo de la prueba:</p>
            <div class="flex justify-center">
              <iframe width="300" height="60" src="https://vocaroo.com/embed/1czZXr0JhPzb?autoplay=0" frameborder="0" allow="autoplay"></iframe>
            </div>
            <p class="text-[11px] text-slate-400 mt-2">
              <a href="https://voca.ro/1czZXr0JhPzb" target="_blank" class="underline hover:text-indigo-600">Ver en Vocaroo >></a>
            </p>
          </div>

          <p class="text-slate-600 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            Bienvenido al portal institucional. Este sistema ejecuta una <strong>Entrevista Conversacional STAR Dinámica</strong> guiada, interactiva e inteligente.
          </p>
          <button onclick="cambiarPantalla('informacion')" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer no-print">
            Iniciar Registro de Postulante
          </button>

          <div class="mt-4 no-print">
            <button onclick="abrirModalChecklist()" class="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm underline decoration-dotted underline-offset-4 cursor-pointer transition">
              📋 Ver Checklist Previo a la Entrevista
            </button>
          </div>
        </div>
      `;
      break;

    case "informacion":
      container.innerHTML = `
        <div class="no-print">
          <div class="mb-6">
            <span class="text-xs font-bold tracking-widest text-indigo-600 uppercase">Marco de Referencia</span>
            <h2 class="text-xl font-bold text-slate-900 mt-0.5 mb-2">Diccionario Institucional de Competencias</h2>
            <p class="text-sm text-slate-500 leading-relaxed">
              Antes de iniciar la entrevista, conozca la definición y los comportamientos posibles asociados a cada una de las 8 competencias.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            ${CATALOGO_COMPETENCIAS.map(c => `
              <div class="competencia-card border border-slate-200 rounded-3xl overflow-hidden bg-white flex flex-col">
                <div class="bg-gradient-to-r from-indigo-950 to-slate-900 px-5 py-3.5 flex items-center gap-3">
                  <span class="text-2xl">${c.icono}</span>
                  <h3 class="text-sm font-bold text-white uppercase tracking-wide">${c.numero}. ${c.nombre}</h3>
                </div>
                <div class="p-5 flex-grow">
                  <span class="block text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1.5">Definición</span>
                  <p class="text-xs text-slate-600 leading-relaxed mb-4">${c.definicion}</p>
                  <span class="block text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1.5">Comportamientos clave</span>
                  <ul class="space-y-1.5 text-xs">
                    ${c.comportamientos.map(cp => `
                      <li class="text-slate-700 leading-relaxed flex gap-2">
                        <span class="text-emerald-500 mt-0.5">•</span><span>${cp}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="flex justify-center">
            <button onclick="cambiarPantalla('registro')" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer">
              Entendido, Continuar al Registro ➔
            </button>
          </div>
        </div>
      `;
      break;

    case "registro":
      container.innerHTML = `
        <div class="no-print">
          <h2 class="text-xl font-bold text-slate-900 mb-2">Ficha de Identificación del Candidato</h2>
          <p class="text-sm text-slate-500 mb-6">Por favor ingrese sus datos generales antes de comenzar la entrevista adaptativa.</p>
          <form id="form-registro" onsubmit="guardarRegistro(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Nombre Completo</label>
              <input type="text" id="reg-nombre" required class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="Ej. Ing. Héctor Pérez">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Correo Electrónico</label>
              <input type="email" id="reg-correo" required class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Años de Experiencia Docente</label>
                <input type="number" id="reg-exp" min="0" max="50" required class="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Máximo Nivel Educativo</label>
                <select id="reg-nivel" class="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500">
                  <option value="Licenciatura">Licenciatura / Ingeniería</option>
                  <option value="Maestría">Maestría</option>
                  <option value="Doctorado">Doctorado</option>
                </select>
              </div>
            </div>
            <div class="pt-4">
              <button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition cursor-pointer">
                Confirmar Datos e Iniciar Entrevista
              </button>
            </div>
          </form>
        </div>
      `;
      break;

    case "evaluacion":
      renderModuloChat(container);
      break;

    case "finalizado":
      mostrarModalFinal(container);
      break;

    case "reporte":
      renderDashboardReporte(container);
      break;
  }
}

function cambiarPantalla(pantalla) {
  estadoEvaluacion.pantallaActual = pantalla;
  renderPantalla();
}

function guardarRegistro(e) {
  e.preventDefault();
  estadoEvaluacion.candidato = {
    nombre: document.getElementById("reg-nombre").value,
    correo: document.getElementById("reg-correo").value,
    experiencia: document.getElementById("reg-exp").value,
    nivel: document.getElementById("reg-nivel").value,
    fecha: new Date().toLocaleDateString()
  };
  
  estadoEvaluacion.competenciaActualIdx = 0;
  estadoEvaluacion.preguntaActualIdx = 0;
  estadoEvaluacion.historialChatActual = [];
  estadoEvaluacion.respuestasAcumuladas = {};
  estadoEvaluacion.transcripcionChat = {};
  
  const comp = poolCompetencias[0];
  estadoEvaluacion.historialChatActual.push({
    remitente: "sistema",
    fase: comp.preguntas[0].fase,
    subCompetencia: comp.preguntas[0].subCompetencia,
    texto: comp.preguntas[0].texto
  });

  cambiarPantalla("evaluacion");
}

function renderModuloChat(container) {
  const comp = poolCompetencias[estadoEvaluacion.competenciaActualIdx];
  const pregActual = comp.preguntas[estadoEvaluacion.preguntaActualIdx];
  
  container.innerHTML = `
    <div class="mb-4 border-b border-slate-200 pb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
      <div>
        <span class="text-xs font-bold tracking-widest text-indigo-600 uppercase">Bloque Dinámico ${estadoEvaluacion.competenciaActualIdx + 1} de ${poolCompetencias.length}</span>
        <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
          <span class="text-xl">${comp.icono}</span> ${comp.nombre}. <span class="text-indigo-600 font-semibold">${pregActual.subCompetencia}</span>
        </h2>
      </div>
      <div class="text-xs text-slate-400 max-w-sm md:text-right italic">${comp.definicion.substring(0, 110)}...</div>
    </div>

    <div class="border border-slate-200 rounded-2xl bg-slate-100 flex flex-col h-[380px] overflow-hidden shadow-inner">
      <div id="chat-window" class="flex-grow p-4 overflow-y-auto space-y-3 flex flex-col">
        ${estadoEvaluacion.historialChatActual.map(msg => {
          if (msg.remitente === 'sistema') {
            return `
              <div class="self-start max-w-[85%] bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-xs">
                <span class="block text-[9px] font-bold uppercase tracking-wider text-indigo-600 mb-0.5">${msg.fase} | ${msg.subCompetencia}</span>
                <p class="text-sm text-slate-800 leading-relaxed">${msg.texto}</p>
              </div>
            `;
          } else {
            return `
              <div class="self-end max-w-[85%] bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm">
                ${msg.texto}
              </div>
            `;
          }
        }).join('')}
      </div>

      <div class="bg-white border-t border-slate-200 p-3 flex gap-2">
        <textarea id="chat-input" rows="1" placeholder="Escriba aquí su respuesta libre con el mayor detalle posible..." class="flex-grow px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none" onkeydown="detectarEnter(event)"></textarea>
        <button onclick="procesarEntradaChat()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center">
          Responder ➔
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const chatWin = document.getElementById("chat-window");
    if(chatWin) chatWin.scrollTop = chatWin.scrollHeight;
    document.getElementById("chat-input").focus();
  }, 20);
}

function detectarEnter(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    procesarEntradaChat();
  }
}

// MOTOR DE ANÁLISIS HEURÍSTICO
function ejecutarAnalizadorHeuristico(textoCompleto) {
  if (!textoCompleto) return null;

  let textoLimpio = textoCompleto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/ñ/g, "n");

  let conteoDimensiones = {};
  let totalPalabrasClave = 0;
  let totalVerbos = 0;
  let totalExpresiones = 0;
  let verbosDetectados = [];
  let frasesDetectadas = [];
  
  Object.keys(DICCIONARIO_HEURISTICO).forEach(d => conteoDimensiones[d] = 0);

  Object.keys(DICCIONARIO_HEURISTICO).forEach(dimension => {
    const vector = DICCIONARIO_HEURISTICO[dimension];
    
    vector.palabras.forEach(palabra => {
      let regex = new RegExp(`\\b${palabra}\\w*\\b`, 'g');
      let coincidencias = textoLimpio.match(regex);
      if (coincidencias) {
        conteoDimensiones[dimension] += coincidencias.length;
        totalPalabrasClave += coincidencias.length;
      }
    });

    vector.verbos.forEach(verbo => {
      let regex = new RegExp(`\\b${verbo}\\b`, 'g');
      let coincidencias = textoLimpio.match(regex);
      if (coincidencias) {
        conteoDimensiones[dimension] += coincidencias.length;
        totalVerbos += coincidencias.length;
        verbosDetectados.push({ verbo, conteo: coincidencias.length });
      }
    });

    vector.expresiones.forEach(frase => {
      if (textoLimpio.includes(frase)) {
        conteoDimensiones[dimension] += 2;
        totalExpresiones++;
        frasesDetectadas.push(frase);
      }
    });
  });

  let basePuntos = (totalPalabrasClave * 3) + (totalVerbos * 6) + (totalExpresiones * 12);
  let scoreFinal = Math.min(100, Math.max(20, basePuntos)); 

  return {
    score: scoreFinal,
    conteoDimensiones,
    totalPalabrasClave,
    verbosDetectados,
    frasesDetectadas
  };
}

function procesarEntradaChat() {
  const inputEl = document.getElementById("chat-input");
  const textoUsuario = inputEl.value.trim();
  if (!textoUsuario) return;

  const comp = poolCompetencias[estadoEvaluacion.competenciaActualIdx];
  const pregActual = comp.preguntas[estadoEvaluacion.preguntaActualIdx];
  
  estadoEvaluacion.historialChatActual.push({ remitente: "usuario", texto: textoUsuario });

  if (!estadoEvaluacion.respuestasAcumuladas[comp.id]) {
    estadoEvaluacion.respuestasAcumuladas[comp.id] = "";
  }
  estadoEvaluacion.respuestasAcumuladas[comp.id] += " " + textoUsuario;

  if (!estadoEvaluacion.transcripcionChat[comp.id]) {
    estadoEvaluacion.transcripcionChat[comp.id] = [];
  }
  estadoEvaluacion.transcripcionChat[comp.id].push({
    pregunta: pregActual.texto,
    fase: pregActual.fase,
    subCompetencia: pregActual.subCompetencia,
    respuesta: textoUsuario
  });

  estadoEvaluacion.preguntaActualIdx++;

  if (estadoEvaluacion.preguntaActualIdx < comp.preguntas.length) {
    const sigPreg = comp.preguntas[estadoEvaluacion.preguntaActualIdx];
    estadoEvaluacion.historialChatActual.push({
      remitente: "sistema",
      fase: sigPreg.fase,
      subCompetencia: sigPreg.subCompetencia,
      texto: sigPreg.texto
    });
    renderPantalla();
  } else {
    const analisisHeuristico = ejecutarAnalizadorHeuristico(estadoEvaluacion.respuestasAcumuladas[comp.id]);
    estadoEvaluacion.respuestasAcumuladas[comp.id + "_analisis"] = analisisHeuristico;

    estadoEvaluacion.competenciaActualIdx++;
    if (estadoEvaluacion.competenciaActualIdx < poolCompetencias.length) {
      estadoEvaluacion.preguntaActualIdx = 0;
      estadoEvaluacion.historialChatActual = [];
      
      const siguienteComp = poolCompetencias[estadoEvaluacion.competenciaActualIdx];
      estadoEvaluacion.historialChatActual.push({
        remitente: "sistema",
        fase: siguienteComp.preguntas[0].fase,
        subCompetencia: siguienteComp.preguntas[0].subCompetencia,
        texto: siguienteComp.preguntas[0].texto
      });
      renderPantalla();
    } else {
      localStorage.setItem(`evaluacion_heuristica_${Date.now()}`, JSON.stringify(estadoEvaluacion));
      estadoEvaluacion.pantallaActual = "finalizado";
      renderPantalla();
    }
  }
}

function obtenerNivelEscala5(score) {
  if (score >= 90) return { 
    nivel: "Sobresaliente", 
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    dot: "🟢"
  };
  if (score >= 80) return { 
    nivel: "Competente Alto", 
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    dot: "🟢"
  };
  if (score >= 70) return { 
    nivel: "Competente", 
    color: "text-amber-600 bg-amber-50 border-amber-200",
    dot: "🟡"
  };
  if (score >= 60) return { 
    nivel: "En Desarrollo", 
    color: "text-orange-600 bg-orange-50 border-orange-200",
    dot: "🟠"
  };
  return { 
    nivel: "Requiere Fortalecimiento", 
    color: "text-rose-600 bg-rose-50 border-rose-200",
    dot: "🔴"
  };
}

function generarRetroalimentacion(promedio) {
  const nivelInfo = obtenerNivelEscala5(promedio);
  
  const retroBase = {
    "Sobresaliente": {
      dictamen: "El candidato evidencia un dominio altamente desarrollado de las competencias evaluadas, demostrando capacidad para enfrentar situaciones complejas mediante decisiones fundamentadas, liderazgo pedagógico y orientación a resultados.",
      fortalezas: ["Pensamiento estratégico", "Planeación efectiva", "Excelente comunicación", "Capacidad de liderazgo", "Alta adaptabilidad"],
      areas: ["Continuar fortaleciendo procesos de innovación educativa y liderazgo institucional."],
      recomendacion: "Perfil altamente recomendable para desempeñar funciones docentes con alto nivel de autonomía y responsabilidad."
    },
    "Competente Alto": {
      dictamen: "El candidato demuestra un desempeño consistente y sólido en la mayoría de las competencias evaluadas. Presenta evidencia suficiente de habilidades para organizar, resolver problemas y establecer relaciones colaborativas dentro del entorno educativo.",
      fortalezas: ["Organización", "Trabajo colaborativo", "Comunicación efectiva", "Adaptabilidad"],
      areas: ["Seguir desarrollando habilidades de innovación y liderazgo en proyectos institucionales."],
      recomendacion: "Candidato idóneo para continuar su crecimiento profesional dentro de la institución."
    },
    "Competente": {
      dictamen: "El candidato cuenta con un nivel aceptable en las competencias evaluadas, mostrando capacidades básicas para cumplir con las responsabilidades docentes de manera efectiva.",
      fortalezas: ["Cumplimiento de tareas", "Relaciones interpersonales", "Comunicación básica"],
      areas: ["Fortalezas en pensamiento analítico y planificación estratégica."],
      recomendacion: "Se recomienda acompañamiento pedagógico para potenciar su desarrollo profesional."
    },
    "En Desarrollo": {
      dictamen: "El candidato muestra potencial en varias competencias, pero aún requiere consolidar habilidades clave para un desempeño óptimo en el rol docente.",
      fortalezas: ["Disposición al aprendizaje", "Relaciones interpersonales"],
      areas: ["Planificación estructurada", "Manejo de conflictos", "Pensamiento analítico"],
      recomendacion: "Se sugiere un plan de acompañamiento y capacitación focalizada durante los primeros meses."
    },
    "Requiere Fortalecimiento": {
      dictamen: "El candidato presenta áreas de oportunidad importantes que requieren atención prioritaria para cumplir con las expectativas del perfil docente.",
      fortalezas: ["Motivación y disposición"],
      areas: ["Planificación pedagógica", "Manejo de aula", "Comunicación asertiva", "Adaptabilidad al cambio"],
      recomendacion: "Se recomienda un proceso de inducción intensivo y seguimiento cercano por parte de la coordinación académica."
    }
  };

  const retro = retroBase[nivelInfo.nivel];
  return { nivel: nivelInfo, ...retro };
}

function mostrarModalFinal(container) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <div class="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mb-8 text-5xl">✅</div>
      <h2 class="text-3xl font-bold text-slate-900 mb-4">¡Entrevista Finalizada!</h2>
      <p class="text-slate-600 max-w-md mb-10 text-lg">Gracias por completar el proceso. Por favor, informe al entrevistador para que proceda a evaluar sus respuestas.</p>
      
      <button onclick="generarReporteFinal()" 
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-12 py-5 rounded-2xl shadow-xl text-lg transition transform hover:scale-105">
        Evaluar Respuestas (Solo Entrevistador)
      </button>
    </div>
  `;
}

function generarReporteFinal() {
  estadoEvaluacion.pantallaActual = "reporte";
  renderPantalla();
}

function generarDescripcionCompetencia(p, nombreCompetencia) {
  const d = p.conteoDimensiones || {};
  const totalVerbos = (p.verbosDetectados || []).reduce((acc, v) => acc + v.conteo, 0);
  
  let fortaleza = "";
  let oportunidad = "";

  if (nombreCompetencia.includes("Planificación")) {
    fortaleza = d.planificacion > 3 
      ? "destaca por su capacidad estructurada para planificar, organizar recursos y anticipar contingencias."
      : "muestra una base adecuada de planificación, aunque se recomienda fortalecer la descomposición de metas complejas.";
    if ((d.cambio || 0) < 2) oportunidad = " Se identifica oportunidad de mejora en flexibilidad ante cambios tecnológicos o metodológicos.";
  } else {
    fortaleza = (d.relaciones + (d.manejoConflictos || 0)) > 4 
      ? "demuestra excelente competencia relacional, empatía y habilidad para gestionar conflictos constructivamente."
      : "presenta un enfoque positivo en relaciones interpersonales, con espacio para mayor asertividad en situaciones de tensión.";
    if (d.servicioCliente > 2) oportunidad = " Destaca particularmente su orientación al servicio y atención a familias.";
  }

  return `
    El análisis heurístico identifica que el candidato <strong>${fortaleza}</strong>${oportunidad}
    <br><br>
    Se registraron <strong>${totalVerbos} verbos de acción</strong> en su narrativa.
  `;
}

function reiniciarEvaluacion() {
  estadoEvaluacion = {
    candidato: {},
    competenciaActualIdx: 0,
    preguntaActualIdx: 0,
    respuestasAcumuladas: {},
    transcripcionChat: {},
    historialChatActual: [],
    pantallaActual: "bienvenida"
  };
  renderPantalla();
}

function generarBarraBloques(score) {
  const totalBloques = 10;
  const bloquesLlenos = Math.round((score / 100) * totalBloques);
  const bloquesVacios = totalBloques - bloquesLlenos;
  return "█".repeat(Math.max(0, bloquesLlenos)) + "".repeat(Math.max(0, bloquesVacios));
}

function renderDashboardReporte(container) {
  const p1 = estadoEvaluacion.respuestasAcumuladas["planificacion_bloque_analisis"] || { score: 20, conteoDimensiones: {}, verbosDetectados: [], frasesDetectadas: [] };
  const p2 = estadoEvaluacion.respuestasAcumuladas["relaciones_bloque_analisis"] || { score: 20, conteoDimensiones: {}, verbosDetectados: [], frasesDetectadas: [] };
  
  const promedioGeneral = (p1.score + p2.score) / 2;
  const retro = generarRetroalimentacion(promedioGeneral);
  const evalGlobal = retro.nivel;

  const labelDimensiones = {
    pensamientoAnalitico: "🧠 P. Analítico", planificacion: "📋 Planificación", manejoConflictos: "🚨 Conflictos",
    servicioCliente: "🤝 S. Cliente", trabajoEquipo: "👥 T. Equipo", comunicacion: "💬 Comunicación",
    relaciones: "❤️ Relaciones", cambio: "🔄 Cambio"
  };

  container.innerHTML = `
    <div class="border-b border-slate-200 pb-4 mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 no-print">
      <div>
        <span class="text-xs font-bold tracking-widest text-slate-400 uppercase">Gabinete de Analítica Predictiva</span>
        <h2 class="text-xl font-black text-slate-900 tracking-tight">Dictamen Heurístico por Dimensiones</h2>
      </div>
      <div class="flex gap-2">
        <button onclick="window.print()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer">
          📥 Generar Reporte PDF (Imprimir)
        </button>
        <button onclick="reiniciarEvaluacion()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer">
          🔄 Evaluar Otro Docente
        </button>
      </div>
    </div>

    <div class="print-area bg-white p-1 text-slate-900">
      <div class="text-center font-mono text-[10px] text-slate-400 tracking-widest mb-1">Edukator - DEPARTAMENTO DE SELECCIÓN DE PERSONAL</div>
      <div class="text-center font-mono text-base font-black text-slate-900 tracking-wider mb-6">DICTAMEN TÉCNICO DE IDONEIDAD PEDAGÓGICA</div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3 mb-6 text-xs font-mono">
        <div><span class="text-slate-400 block uppercase text-[9px]">Postulante</span><strong>${estadoEvaluacion.candidato.nombre || 'N/A'}</strong></div>
        <div><span class="text-slate-400 block uppercase text-[9px]">Grado Máximo</span><strong>${estadoEvaluacion.candidato.nivel || 'N/A'}</strong></div>
        <div><span class="text-slate-400 block uppercase text-[9px]">Experiencia</span><strong>${estadoEvaluacion.candidato.experiencia || '0'} Años</strong></div>
        <div><span class="text-slate-400 block uppercase text-[9px]">Dictamen Global</span><span class="font-bold ${evalGlobal.color}">${evalGlobal.dot} ${evalGlobal.nivel}</span></div>
      </div>

      <!-- Gráfico Radar + Densidad -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="md:col-span-2 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm h-72 flex flex-col justify-center">
          <canvas id="radarChart"></canvas>
        </div>
        
        <div class="border border-slate-200 p-4 rounded-2xl bg-slate-50/70 font-mono text-[11px]">
          <span class="font-bold text-slate-500 block mb-3 uppercase text-[10px] tracking-wider">📊 DENSIDAD GLOBAL DEL LÉXICO:</span>
          <div class="space-y-2">
            ${Object.keys(labelDimensiones).map(k => {
              let total = ((p1.conteoDimensiones ? p1.conteoDimensiones[k] : 0) || 0) + ((p2.conteoDimensiones ? p2.conteoDimensiones[k] : 0) || 0);
              return `<div class="flex justify-between py-1 border-b border-slate-200 last:border-0">
                <span>${labelDimensiones[k]}</span>
                <span class="font-bold">${total} coinc.</span>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Retroalimentación Profesional -->
      <div class="border border-slate-200 rounded-2xl p-6 mb-8 bg-white shadow-sm">
        <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          ${evalGlobal.dot} ${evalGlobal.nivel}
        </h3>
        <p class="text-slate-700 leading-relaxed mb-6">${retro.dictamen}</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-emerald-700 mb-3">Fortalezas identificadas</h4>
            <ul class="space-y-2 text-sm">
              ${retro.fortalezas.map(f => `<li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✔</span> ${f}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-amber-700 mb-3">Áreas de oportunidad</h4>
            <ul class="space-y-2 text-sm">
              ${retro.areas.map(a => `<li class="flex items-start gap-2"><span class="text-amber-500 mt-1">→</span> ${a}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-slate-200">
          <p class="font-medium text-slate-700">${retro.recomendacion}</p>
        </div>
      </div>

      <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">📈 Niveles por Competencia Institucional</h3>
      <div class="space-y-2 font-mono text-xs mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
          <div class="w-40 font-bold text-slate-700">I. Planificación:</div>
          <div class="text-indigo-600 font-bold tracking-tight">${generarBarraBloques(p1.score)}</div>
          <div class="w-12 text-right font-bold text-slate-900">${Math.round(p1.score)}%</div>
          <div class="w-28 text-right font-bold ${obtenerNivelEscala5(p1.score).color.split(' ')[0]}">${obtenerNivelEscala5(p1.score).nivel}</div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
          <div class="w-40 font-bold text-slate-700">II. Relaciones Int:</div>
          <div class="text-indigo-600 font-bold tracking-tight">${generarBarraBloques(p2.score)}</div>
          <div class="w-12 text-right font-bold text-slate-900">${Math.round(p2.score)}%</div>
          <div class="w-28 text-right font-bold ${obtenerNivelEscala5(p2.score).color.split(' ')[0]}">${obtenerNivelEscala5(p2.score).nivel}</div>
        </div>
      </div>

      <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">🔍 Defensa e Interpretación de Evidencias</h3>
      <div class="space-y-4 font-sans mb-6">
        <div class="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
          <div class="flex justify-between items-center mb-2 border-b border-slate-100 pb-1.5">
            <h4 class="text-xs font-bold text-indigo-950 uppercase tracking-tight">📋 I. Competencia: Planificación y Organización</h4>
            <span class="text-[10px] font-mono font-bold px-2 py-0.5 border rounded-md ${obtenerNivelEscala5(p1.score).color}">${obtenerNivelEscala5(p1.score).nivel}</span>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
            ${generarDescripcionCompetencia(p1, "Planificación y Organización")}
          </p>
        </div>

        <div class="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
          <div class="flex justify-between items-center mb-2 border-b border-slate-100 pb-1.5">
            <h4 class="text-xs font-bold text-indigo-950 uppercase tracking-tight">🤝 II. Competencia: Relaciones Interpersonales</h4>
            <span class="text-[10px] font-mono font-bold px-2 py-0.5 border rounded-md ${obtenerNivelEscala5(p2.score).color}">${obtenerNivelEscala5(p2.score).nivel}</span>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
            ${generarDescripcionCompetencia(p2, "Relaciones Interpersonales")}
          </p>
        </div>
      </div>

      <div class="bg-slate-900 text-slate-100 p-4 rounded-xl font-sans mb-8">
        <h4 class="text-[10px] font-bold tracking-wider uppercase text-indigo-400 mb-1 font-mono">⚖️ Conclusión Automatizada del Motor Heurístico:</h4>
        <p class="text-xs text-slate-300 leading-relaxed">${retro.dictamen}</p>
      </div>

      <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono flex items-center gap-1.5">📝 Transcripción Completa del Diálogo STAR</h3>
      <div class="space-y-4 font-mono text-[11px] text-slate-700">
        ${Object.keys(estadoEvaluacion.transcripcionChat).map(compId => {
          const tituloCompetencia = compId === "planificacion_bloque" ? "I. PLANIFICACIÓN Y ORGANIZACIÓN" : "II. RELACIONES INTERPERSONALES";
          return `
            <div class="border border-slate-200 rounded-xl p-4 bg-slate-50/30">
              <div class="font-bold text-indigo-950 text-xs mb-3 border-b border-slate-200 pb-1">${tituloCompetencia}</div>
              <div class="space-y-3">
                ${estadoEvaluacion.transcripcionChat[compId].map(item => `
                  <div class="border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                    <span class="text-slate-400 block text-[10px] uppercase font-bold tracking-tight">[${item.fase}] (${item.subCompetencia}) Pregunta: ${item.pregunta}</span>
                    <p class="text-slate-900 mt-1 italic pl-2 border-l-2 border-slate-300">"${item.respuesta}"</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Renderizar Gráfica de Radar
  setTimeout(() => {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const d1 = p1.conteoDimensiones || {};
    const d2 = p2.conteoDimensiones || {};

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['P. Analítico', 'Planificación', 'M. Conflictos', 'S. Cliente', 'T. Equipo', 'Comunicación', 'Relaciones', 'Cambio'],
        datasets: [{
          label: 'Perfil del Candidato',
          data: [
            ((d1.pensamientoAnalitico || 0) + (d2.pensamientoAnalitico || 0)) * 10,
            ((d1.planificacion || 0) + (d2.planificacion || 0)) * 10,
            ((d1.manejoConflictos || 0) + (d2.manejoConflictos || 0)) * 10,
            ((d1.servicioCliente || 0) + (d2.servicioCliente || 0)) * 10,
            ((d1.trabajoEquipo || 0) + (d2.trabajoEquipo || 0)) * 10,
            ((d1.comunicacion || 0) + (d2.comunicacion || 0)) * 10,
            ((d1.relaciones || 0) + (d2.relaciones || 0)) * 10,
            ((d1.cambio || 0) + (d2.cambio || 0)) * 10
          ],
          backgroundColor: 'rgba(79, 70, 229, 0.15)',
          borderColor: 'rgb(79, 70, 229)',
          pointBackgroundColor: 'rgb(79, 70, 229)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { r: { min: 0, ticks: { display: false }, pointLabels: { font: { size: 8, weight: 'bold' } } } },
        plugins: { legend: { display: false } }
      }
    });
  }, 100);
}

// ============================================================
// MÓDULO: CHECKLIST PREVIO A LA ENTREVISTA
// ============================================================

const CHECKLIST_PREVIO = [
  { id: "chk-01", texto: "¿Tiene a mano una copia del Currículum Vitae del candidato?" },
  { id: "chk-02", texto: "¿Ha leído el perfil y las competencias necesarias para el cargo?" },
  { id: "chk-03", texto: "¿El lugar donde va a realizar la entrevista está limpio y ordenado, libre de elementos que puedan distraer a los candidatos, y es un lugar atractivo?" },
  { id: "chk-04", texto: "¿Avisó a otros que realizará una entrevista y que no le deben interrumpir?" },
  { id: "chk-05", texto: "¿Ha apagado o puesto en silencio su celular?" },
  { id: "chk-06", texto: "¿Los muebles del lugar de entrevista están ordenados para que los candidatos estén lo más cómodos y relajados posible?" },
  { id: "chk-07", texto: "¿Tiene lápiz y cuaderno para tomar notas?" },
  { id: "chk-08", texto: "Mirando el currículum del postulante, ¿tiene preguntas que quisiera hacer sobre su historial laboral (por ejemplo, vacíos en fechas, cambios de trabajo, etc.)?" },
  { id: "chk-09", texto: "¿Sabe sobre la base de cuáles competencias necesita hacer la entrevista?" },
  { id: "chk-10", texto: "¿Ha preparado las preguntas generales y abiertas (así como las más específicas) que usará para comenzar con la indagación sobre cada competencia?" },
  { id: "chk-11", texto: "Si entrevista conjuntamente con un(a) colega, ¿se han puesto de acuerdo sobre qué preguntas realizará cada uno?" },
  { id: "chk-12", texto: "¿Ha revisado si alguna de las preguntas podría ser mal interpretada como ofensiva y/o discriminadora?" },
  { id: "chk-13", texto: "¿Está preparado para responder preguntas específicas del entrevistado, como por ejemplo, estrategia, ventas, estructura, valores y cultura organizacional?" }
];

function abrirModalChecklist() {
  // Evita duplicar el modal si ya está abierto
  if (document.getElementById("modal-checklist-previo")) return;

  const overlay = document.createElement("div");
  overlay.id = "modal-checklist-previo";
  overlay.className = "fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-print";
  overlay.innerHTML = `
    <div class="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      <div class="bg-slate-900 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <h2 class="text-white font-bold text-base flex items-center gap-2">📋 Check Previo a la Entrevista</h2>
        <button onclick="cerrarModalChecklist()" class="text-slate-400 hover:text-white text-xl leading-none cursor-pointer" aria-label="Cerrar">&times;</button>
      </div>

      <div class="overflow-y-auto p-6 flex-grow">
        <p class="text-xs text-slate-500 mb-4">Marque cada punto que ya tiene resuelto antes de iniciar la entrevista. Al finalizar, presione <strong>Verificar</strong>.</p>

        <div id="checklist-alerta" class="hidden mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl p-3"></div>

        <form id="form-checklist-previo" class="space-y-2.5">
          ${CHECKLIST_PREVIO.map(item => `
            <label for="${item.id}" class="flex items-start gap-3 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition">
              <input type="checkbox" id="${item.id}" class="checklist-item mt-0.5 w-4 h-4 accent-indigo-600 cursor-pointer flex-shrink-0">
              <span class="text-sm text-slate-700 leading-relaxed">${item.texto}</span>
            </label>
          `).join('')}
        </form>
      </div>

      <div class="border-t border-slate-200 px-6 py-4 flex justify-end gap-3 flex-shrink-0 bg-slate-50">
        <button onclick="cerrarModalChecklist()" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 cursor-pointer transition">
          Cancelar
        </button>
        <button onclick="verificarChecklistPrevio()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg transition cursor-pointer">
          Verificar ✔
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

function cerrarModalChecklist() {
  const overlay = document.getElementById("modal-checklist-previo");
  if (overlay) overlay.remove();
}

function verificarChecklistPrevio() {
  const checkboxes = document.querySelectorAll("#form-checklist-previo .checklist-item");
  const pendientes = [];

  checkboxes.forEach((cb, idx) => {
    if (!cb.checked) pendientes.push(CHECKLIST_PREVIO[idx].texto);
  });

  const alerta = document.getElementById("checklist-alerta");

  if (pendientes.length > 0) {
    alerta.classList.remove("hidden");
    alerta.innerHTML = `
      ⚠️ Aún tiene ${pendientes.length} punto(s) pendiente(s) por preparar antes de iniciar la entrevista:
      <ul class="list-disc list-inside mt-2 font-normal space-y-0.5">
        ${pendientes.slice(0, 5).map(p => `<li>${p}</li>`).join('')}
        ${pendientes.length > 5 ? `<li>y ${pendientes.length - 5} punto(s) más...</li>` : ''}
      </ul>
    `;
    alerta.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }

  mostrarModalChecklistCompleto();
}

function mostrarModalChecklistCompleto() {
  const overlay = document.getElementById("modal-checklist-previo");
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">
      <div class="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl">✅</div>
      <h2 class="text-xl font-bold text-slate-900 mb-2">¡Todo listo!</h2>
      <p class="text-sm text-slate-600 mb-6">Ha confirmado los ${CHECKLIST_PREVIO.length} puntos del check previo. Está en condiciones óptimas para iniciar la entrevista.</p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button onclick="cerrarModalChecklist()" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 cursor-pointer transition">
          Cerrar
        </button>
        <button onclick="cerrarModalChecklist(); cambiarPantalla('informacion');" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg transition cursor-pointer">
          Continuar con la Entrevista ➔
        </button>
      </div>
    </div>
  `;
}