// --- Referencias a los elementos del HTML ---
const input = document.getElementById('inputTarea');
const colPendientes = document.getElementById('listaPendientes');
const colProceso = document.getElementById('listaProceso');
const colRealizadas = document.getElementById('listaRealizadas');

// --- Evento: Cargar tareas al abrir la página ---
document.addEventListener('DOMContentLoaded', cargarTareas);

function cargarTareas() {
    // 1. Recuperamos las tareas del navegador (o creamos una lista vacía si no hay)
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    
    // 2. Limpiamos las columnas visualmente para no duplicar
    colPendientes.innerHTML = '';
    colProceso.innerHTML = '';
    colRealizadas.innerHTML = '';

    // 3. Recorremos cada tarea y la ponemos en su columna correspondiente
    tareas.forEach((tarea, index) => {
        crearTarjetaVisual(tarea, index);
    });
}

function crearTarjetaVisual(tarea, index) {
    const li = document.createElement('li');
    
    // Generamos los botones dinámicamente según el estado
    let botonesMover = '';
    
    if (tarea.estado === 'pendiente') {
        // Si está pendiente, botón para pasar a proceso (Play)
        botonesMover = `<button onclick="cambiarEstado(${index}, 'proceso')" class="btn-sm btn-move" title="Empezar"><i class="fas fa-play"></i></button>`;
    } else if (tarea.estado === 'proceso') {
        // Si está en proceso, botones para regresar (Undo) o terminar (Check)
        botonesMover = `
            <button onclick="cambiarEstado(${index}, 'pendiente')" class="btn-sm btn-move" title="Devolver"><i class="fas fa-undo"></i></button>
            <button onclick="cambiarEstado(${index}, 'realizada')" class="btn-sm btn-move" title="Finalizar"><i class="fas fa-check"></i></button>
        `;
    } else if (tarea.estado === 'realizada') {
        // Si está realizada, botón para reabrir (Undo)
        botonesMover = `<button onclick="cambiarEstado(${index}, 'proceso')" class="btn-sm btn-move" title="Reabrir"><i class="fas fa-undo"></i></button>`;
    }

    // HTML interno de la tarjeta
    li.innerHTML = `
        <span>${tarea.texto}</span>
        <div class="acciones">
            <div>${botonesMover}</div>
            <div>
                <button onclick="editarTarea(${index})" class="btn-sm btn-edit"><i class="fas fa-pen"></i></button>
                <button onclick="eliminarTarea(${index})" class="btn-sm btn-delete"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;

    // Decidimos en qué columna visual insertar la tarjeta
    if (tarea.estado === 'pendiente') colPendientes.appendChild(li);
    else if (tarea.estado === 'proceso') colProceso.appendChild(li);
    else if (tarea.estado === 'realizada') colRealizadas.appendChild(li);
}

// --- Función: Agregar Tarea Nueva ---
function agregarTarea() {
    const texto = input.value.trim();
    if (texto === '') return alert("Por favor escribe una tarea");

    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    
    // Creamos el objeto tarea. Por defecto nace en 'pendiente'
    const nuevaTarea = {
        texto: texto,
        estado: 'pendiente' 
    };

    tareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas)); // Guardar en BD local
    
    input.value = ''; // Limpiar input
    cargarTareas(); // Refrescar pantalla
}

// --- Función: Mover Tarea (Cambiar Estado) ---
function cambiarEstado(index, nuevoEstado) {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    tareas[index].estado = nuevoEstado; // Actualizamos el estado
    localStorage.setItem('tareas', JSON.stringify(tareas));
    cargarTareas();
}

// --- Función: Eliminar ---
function eliminarTarea(index) {
    if(!confirm("¿Seguro que quieres eliminar esta tarea?")) return;
    
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    tareas.splice(index, 1); // Borrar del array
    localStorage.setItem('tareas', JSON.stringify(tareas));
    cargarTareas();
}

// --- Función: Editar ---
function editarTarea(index) {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    const nuevoTexto = prompt("Editar nombre de la tarea:", tareas[index].texto);
    
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        tareas[index].texto = nuevoTexto.trim();
        localStorage.setItem('tareas', JSON.stringify(tareas));
        cargarTareas();
    }
}

// --- Función: Borrar Todo (Botón inferior) ---
function limpiarTodo() {
    if(confirm("¿Estás seguro de borrar TODAS las tareas?")) {
        localStorage.removeItem('tareas');
        cargarTareas();
    }
}

// Fin del proyecto