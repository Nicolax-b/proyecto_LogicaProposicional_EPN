// Lista (global) que contiene la def de cada operación lógica en forma de objeto, nótese como cada una
// tiene un nombre, símbolo, descripción, su método para determinar un valor de verdad, etc

const OPERADORES = {
    conjuncion: {
        nombre: "CONJUNCIÓN (AND)",
        simbolo: "∧",
        descripcion: "La conjunción de dos proposiciones es verdadera solo cuando ambas proposiciones son verdaderas.",
        calcular: (p, q) => p && q,
        definicion: `
            <p>La <strong>conjunción lógica</strong> (operador AND, símbolo ∧) de dos proposiciones p y q se define como:</p>
            <div style="text-align: center; margin: 20px 0; padding: 20px; background-color: #f0f7ff; border-radius: 8px;">
                <p style="font-family: monospace; font-size: 1.3em; margin: 0;">
                    p ∧ q es verdadero ⇔ p es verdadero Y q es verdadero
                </p>
            </div>
            <p>En la lógica proposicional, la conjunción es un operador binario que devuelve verdadero únicamente cuando ambas entradas son verdaderas.</p>
        `,
        explicacion: (p, q, resultado) => {
            if (p && q) return "Porque ambas proposiciones, p y q, son verdaderas.";
            if (!p && !q) return "Porque p es falso y q es falso.";
            return "Porque al menos una de las proposiciones es falsa.";
        }
    },

    disyuncion: {
        nombre: "DISYUNCIÓN (OR)",
        simbolo: "∨",
        descripcion: "La disyunción de dos proposiciones es verdadera cuando al menos una de las proposiciones es verdadera.",
        calcular: (p, q) => p || q,
        definicion: `
            <p>La <strong>disyunción lógica</strong> (operador OR, símbolo ∨) de dos proposiciones p y q se define como:</p>
            <div style="text-align: center; margin: 20px 0; padding: 20px; background-color: #f0f7ff; border-radius: 8px;">
                <p style="font-family: monospace; font-size: 1.3em; margin: 0;">
                    p ∨ q es falso ⇔ p es falso Y q es falso
                </p>
            </div>
            <p>En la lógica proposicional, la disyunción es un operador binario que devuelve falso únicamente cuando ambas entradas son falsas.</p>
        `,
        explicacion: (p, q, resultado) => {
            if (p || q) return "Porque al menos una de las proposiciones es verdadera.";
            return "Porque ambas proposiciones, p y q, son falsas.";
        }
    },

    implicacion: {
        nombre: "IMPLICACIÓN (IF-THEN)",
        simbolo: "→",
        descripcion: "La implicación p → q es falsa solo cuando p es verdadero y q es falso. En todos los demás casos es verdadera.",
        calcular: (p, q) => !p || q,
        definicion: `
            <p>La <strong>implicación lógica</strong> (operador IF-THEN, símbolo →) de dos proposiciones p y q se define como:</p>
            <div style="text-align: center; margin: 20px 0; padding: 20px; background-color: #f0f7ff; border-radius: 8px;">
                <p style="font-family: monospace; font-size: 1.3em; margin: 0;">
                    p → q es falso ⇔ p es verdadero Y q es falso
                </p>
            </div>
            <p>La implicación es falsa únicamente cuando el antecedente (p) es verdadero y el consecuente (q) es falso.</p>
        `,
        explicacion: (p, q, resultado) => {
            if (p && !q) return "Porque p es verdadero pero q es falso.";
            return "Porque cuando p es falso, la implicación siempre es verdadera; y cuando q es verdadero, también.";
        }
    },

    bicondicional: {
        nombre: "BICONDICIONAL (IFF)",
        simbolo: "↔",
        descripcion: "El bicondicional p ↔ q es verdadero cuando p y q tienen el mismo valor de verdad (ambos verdaderos o ambos falsos).",
        calcular: (p, q) => p === q,
        definicion: `
            <p>El <strong>bicondicional lógico</strong> (operador IFF, símbolo ↔) de dos proposiciones p y q se define como:</p>
            <div style="text-align: center; margin: 20px 0; padding: 20px; background-color: #f0f7ff; border-radius: 8px;">
                <p style="font-family: monospace; font-size: 1.3em; margin: 0;">
                    p ↔ q es verdadero ⇔ p y q tienen el mismo valor de verdad
                </p>
            </div>
            <p>El bicondicional es verdadero cuando ambas proposiciones son verdaderas o ambas son falsas.</p>
        `,
        explicacion: (p, q, resultado) => {
            if (p === q) return "Porque p y q tienen el mismo valor de verdad.";
            return "Porque p y q tienen valores de verdad diferentes.";
        }
    },

    negacion: {
        nombre: "NEGACIÓN (NOT)",
        simbolo: "¬",
        descripcion: "La negación ¬p invierte el valor de verdad de la proposición p.",
        calcular: (p, q) => !p,
        definicion: `
            <p>La <strong>negación lógica</strong> (operador NOT, símbolo ¬) de una proposición p se define como:</p>
            <div style="text-align: center; margin: 20px 0; padding: 20px; background-color: #f0f7ff; border-radius: 8px;">
                <p style="font-family: monospace; font-size: 1.3em; margin: 0;">
                    ¬p es verdadero ⇔ p es falso
                </p>
            </div>
            <p>La negación simplemente invierte el valor de verdad: si p es verdadero, ¬p es falso; si p es falso, ¬p es verdadero.</p>
        `,
        explicacion: (p, q, resultado) => {
            return resultado ? "Porque p es falso." : "Porque p es verdadero.";
        }
    }

};


// ============================================================================
// 2. FUNCIÓN PRINCIPAL - Punto de entrada ('main' que llama a las demás funciones)
// ============================================================================


function inicializarCalculadora() {
    console.log("🔧 Inicializando calculadora lógica...");
    
    // 2.1 Obtener todos los elementos del DOM
    const elementos = obtenerElementosDOM();
    
    // Si no hay elementos básicos, salir (no es una página de operador)
    if (!elementos.selectP) {
        console.warn(" No se encontraron elementos de calculadora. Esta no es una página de operador.");
        return;
    }
    
    // 2.2 Determinar qué operador mostrar
    const operadorId = determinarOperadorActual();
    console.log(` Operador detectado: ${operadorId}`);
    
    // 2.3 Configurar la página según el operador
    configurarPagina(elementos, operadorId);
    
    // 2.4 Agregar eventos a los selectores
    configurarEventos(elementos, operadorId);
    
    // 2.5 Calcular y mostrar valores iniciales
    calcularYMostrarTodo(elementos, operadorId);
    
    console.log("Calculadora inicializada correctamente");
}

// ============================================================================
// 3. FUNCIÓN: Obtener elementos del DOM (se usa en paso 2.1)
// ============================================================================

function obtenerElementosDOM() {
    return {
        // SELECTORES
        selectP: document.getElementById('proposicion-p'),
        selectQ: document.getElementById('proposicion-q'),
        
        // ELEMENTOS DE TEXTO DINÁMICO
        tituloOperador: document.getElementById('titulo-operador'),
        descripcionOperador: document.getElementById('descripcion-operador'),
        subtituloOperador: document.getElementById('subtitulo-operador'),
        textoDescripcion: document.getElementById('texto-descripcion'),
        simboloOperador: document.getElementById('simbolo-operador'),
        expresionTexto: document.getElementById('expresion-texto'),
        valorResultado: document.getElementById('valor-resultado'),
        explicacionResultado: document.getElementById('explicacion-resultado'),
        encabezadoOperador: document.getElementById('encabezado-operador'),
        
        // TABLA DE VERDAD
        cuerpoTabla: document.getElementById('cuerpo-tabla'),
        
        // DEFINICIÓN FORMAL
        definicionOperador: document.getElementById('definicion-operador')
    };
}

// ============================================================================
// 4. FUNCIÓN: Determinar operador actual (se usa en paso 2.2)
// ============================================================================

function determinarOperadorActual() {

    // Prioridad 1: Variable global forzada (si se define en el HTML)
    if (window.OPERADOR_FORZADO && OPERADORES[window.OPERADOR_FORZADO]) {
        console.log(`Operador forzado: ${window.OPERADOR_FORZADO}`);
        return window.OPERADOR_FORZADO;
    }
    
    // Prioridad 2: Parámetro en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const operadorParam = urlParams.get('operador');
    if (operadorParam && OPERADORES[operadorParam]) {
        console.log(`Operador desde URL: ${operadorParam}`);
        return operadorParam;
    }
    
    // Prioridad 3: Detectar por nombre de archivo
    const path = window.location.pathname;
    const nombreArchivo = path.substring(path.lastIndexOf('/') + 1).toLowerCase();
    
    const mapaArchivos = {
        'conjuncion.html': 'conjuncion',
        'and.html': 'conjuncion',
        'conjunction.html': 'conjuncion',
        
        'disyuncion.html': 'disyuncion',
        'or.html': 'disyuncion',
        'disjunction.html': 'disyuncion',
        
        'implicacion.html': 'implicacion',
        'implication.html': 'implicacion',
        'ifthen.html': 'implicacion',
        
        'bicondicional.html': 'bicondicional',
        'biconditional.html': 'bicondicional',
        'iff.html': 'bicondicional',
        
        'negacion.html': 'negacion',
        'negation.html': 'negacion',
        'not.html': 'negacion',
        
        'operator-template.html': 'conjuncion', // Plantilla por defecto
        'template.html': 'conjuncion'
    };
    
    const operadorDetectado = mapaArchivos[nombreArchivo] || 'conjuncion';
    console.log(`Operador detectado por archivo (${nombreArchivo}): ${operadorDetectado}`);
    
    return operadorDetectado;
}

// ============================================================================
// 5. FUNCIÓN: Configurar página según operador (se usa en paso 2.3)
// ============================================================================

function configurarPagina(elementos, operadorId) {
    const operador = OPERADORES[operadorId];
    
    if (!operador) {
        console.error(` Operador "${operadorId}" no existe. Usando conjunción por defecto.`);
        return configurarPagina(elementos, 'conjuncion');
    }
    
    console.log(`Configurando página para: ${operador.nombre}`);
    
    // Actualizar títulos y textos
    if (elementos.tituloOperador) elementos.tituloOperador.textContent = operador.nombre;
    if (elementos.descripcionOperador) elementos.descripcionOperador.textContent = "Calculadora interactiva";
    if (elementos.subtituloOperador) elementos.subtituloOperador.textContent = operador.nombre;
    if (elementos.textoDescripcion) elementos.textoDescripcion.textContent = operador.descripcion;
    if (elementos.simboloOperador) elementos.simboloOperador.textContent = operador.simbolo;
    if (elementos.definicionOperador) elementos.definicionOperador.innerHTML = operador.definicion;
    
    // Para negación, ocultar el selector de q
    if (operadorId === 'negacion' && elementos.selectQ) {
        elementos.selectQ.parentElement.style.display = 'none';
        if (elementos.encabezadoOperador) {
            elementos.encabezadoOperador.textContent = "¬p";
        }
    }
}

// ============================================================================
// 6. FUNCIÓN: Configurar eventos (se usa en paso 2.4)
// ============================================================================

function configurarEventos(elementos, operadorId) {
    console.log("Configurando eventos...");
    
    // Función que se ejecuta cuando cambia cualquier selector
    function manejarCambio() {
        calcularYMostrarTodo(elementos, operadorId);
    }
    
    // Agregar event listeners
    elementos.selectP.addEventListener('change', manejarCambio);
    if (elementos.selectQ && operadorId !== 'negacion') {
        elementos.selectQ.addEventListener('change', manejarCambio);
    }
    
    console.log("✅ Eventos configurados");
}

// ============================================================================
// 7. FUNCIÓN: Calcular y mostrar todo (se usa en paso 2.5 y en eventos)
// ============================================================================

function calcularYMostrarTodo(elementos, operadorId) {
    const operador = OPERADORES[operadorId];
    
    // Obtener valores actuales
    const p = elementos.selectP.value === 'true';
    const q = (operadorId === 'negacion') ? null : elementos.selectQ.value === 'true';
    
    // Calcular resultado
    const resultado = (operadorId === 'negacion') ? operador.calcular(p) : operador.calcular(p, q);
    
    console.log(`🧮 Cálculo: p=${p}, q=${q}, resultado=${resultado}`);
    
    // Actualizar interfaz
    actualizarExpresionYResultado(elementos, operador, operadorId, p, q, resultado);
    actualizarTablaVerdad(elementos, operador, operadorId, p, q);
}

// ============================================================================
// 8. FUNCIÓN: Actualizar expresión y resultado (se usa en paso 7)
// ============================================================================

function actualizarExpresionYResultado(elementos, operador, operadorId, p, q, resultado) {
    const esVerdadero = resultado;
    
    // 1. Actualizar expresión (ej: "p ∧ q = ")
    if (elementos.expresionTexto) {
        if (operadorId === 'negacion') {
            elementos.expresionTexto.textContent = "¬p = ";
        } else {
            elementos.expresionTexto.textContent = `p ${operador.simbolo} q = `;
        }
    }
    
    // 2. Actualizar encabezado de tabla
    if (elementos.encabezadoOperador) {
        if (operadorId === 'negacion') {
            elementos.encabezadoOperador.textContent = "¬p";
        } else {
            elementos.encabezadoOperador.textContent = `p ${operador.simbolo} q`;
        }
    }
    
    // 3. Actualizar valor resultado (¡DINÁMICO!)
    if (elementos.valorResultado) {
        // Texto
        elementos.valorResultado.textContent = esVerdadero ? 'VERDADERO' : 'FALSO';
        
        // Clases CSS (limpiar y añadir nuevas)
        elementos.valorResultado.className = '';
        elementos.valorResultado.classList.add(esVerdadero ? 'verdadero' : 'falso');
        elementos.valorResultado.classList.add('valor-booleano');
        
        // Estilos inline para asegurar
        elementos.valorResultado.style.display = 'inline-block';
        elementos.valorResultado.style.padding = '8px 16px';
        elementos.valorResultado.style.borderRadius = '6px';
        elementos.valorResultado.style.marginLeft = '10px';
        elementos.valorResultado.style.fontWeight = 'bold';
        elementos.valorResultado.style.fontSize = '1.1em';
        elementos.valorResultado.style.minWidth = '110px';
        elementos.valorResultado.style.textAlign = 'center';
        
        // Fondo dinámico
        if (esVerdadero) {
            elementos.valorResultado.style.backgroundColor = '#e8f5e9';
            elementos.valorResultado.style.border = '2px solid #2e7d32';
        } else {
            elementos.valorResultado.style.backgroundColor = '#ffebee';
            elementos.valorResultado.style.border = '2px solid #c62828';
        }
    }
    
    // 4. Actualizar explicación
    if (elementos.explicacionResultado) {
        elementos.explicacionResultado.textContent = operador.explicacion(p, q, resultado);
    }
}

// ============================================================================
// 9. FUNCIÓN: Generar tabla de verdad (se usa en paso 7)
// ============================================================================

function actualizarTablaVerdad(elementos, operador, operadorId, pActual, qActual) {
    if (!elementos.cuerpoTabla) return;
    
    // Limpiar tabla existente
    elementos.cuerpoTabla.innerHTML = '';
    
    // Determinar combinaciones según operador
    let combinaciones = [];
    
    if (operadorId === 'negacion') {
        combinaciones = [[true, null], [false, null]];
    } else {
        combinaciones = [
            [true, true],
            [true, false],
            [false, true],
            [false, false]
        ];
    }
    
    // Generar cada fila
    combinaciones.forEach(([p, q]) => {
        const resultado = (operadorId === 'negacion') 
            ? operador.calcular(p) 
            : operador.calcular(p, q);
        
        // Verificar si es la fila actual seleccionada
        const esFilaActual = (operadorId === 'negacion')
            ? (p === pActual)
            : (p === pActual && q === qActual);
        
        // Crear fila
        const fila = document.createElement('tr');
        if (esFilaActual) {
            fila.classList.add('fila-actual');
        }
        
        // Contenido de la celda según operador
        if (operadorId === 'negacion') {
            fila.innerHTML = `
                <td class="${p ? 'verdadero' : 'falso'}">${p ? 'V' : 'F'}</td>
                <td>N/A</td>
                <td class="${resultado ? 'verdadero' : 'falso'}">${resultado ? 'V' : 'F'}</td>
            `;
        } else {
            fila.innerHTML = `
                <td class="${p ? 'verdadero' : 'falso'}">${p ? 'V' : 'F'}</td>
                <td class="${q ? 'verdadero' : 'falso'}">${q ? 'V' : 'F'}</td>
                <td class="${resultado ? 'verdadero' : 'falso'}">${resultado ? 'V' : 'F'}</td>
            `;
        }
        
        elementos.cuerpoTabla.appendChild(fila);
    });
    
    console.log(`📋 Tabla de verdad generada (${combinaciones.length} filas)`);
}

// ============================================================================
// 10. INICIALIZACIÓN AUTOMÁTICA (se ejecuta al cargar la página)
// ============================================================================

// Verificar si el DOM ya está cargado
if (document.readyState === 'loading') {
    // El DOM todavía se está cargando, esperar
    document.addEventListener('DOMContentLoaded', inicializarCalculadora);
} else {
    // El DOM ya está cargado, ejecutar inmediatamente
    inicializarCalculadora();
}



