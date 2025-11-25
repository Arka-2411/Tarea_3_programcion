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
    
    // HTML interno de la tarjeta (Solo texto por ahora, sin botones)
    li.innerHTML = `
        <span>${tarea.texto}</span>
        <div class="acciones">
            </div>
    `;

    // Decidimos en qué columna visual insertar la tarjeta
    if (tarea.estado === 'pendiente') colPendientes.appendChild(li);
    else if (tarea.estado === 'proceso') colProceso.appendChild(li);
    else if (tarea.estado === 'realizada') colRealizadas.appendChild(li);
}