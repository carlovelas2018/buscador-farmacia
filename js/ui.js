let ultimoResultado = [];

function mostrarCargando() {

    const contenedor = document.getElementById("contenedorResultados");

    contenedor.innerHTML = `

        <div class="text-center p-4">

            <div class="spinner-border text-primary"></div>

            <div class="mt-2">

                Buscando medicamentos...

            </div>

        </div>

    `;

}

function mostrarMedicamentos(lista) {

    ultimoResultado = lista;
    const contenedor = document.getElementById("contenedorResultados");

    contenedor.innerHTML = "";

    document.getElementById("cantidadResultados").textContent = lista.length;
    if (lista.length === 0) {

    contenedor.innerHTML = `

        <div class="alert alert-secondary text-center">

            🔍 Escribe al menos 3 letras para buscar un medicamento.

        </div>

    `;

    return;

}
    
    const fragment = document.createDocumentFragment();
    lista.forEach(medicamento=>{

        fragment.appendChild(
            crearFilaMedicamento(medicamento)
        );

    });

    contenedor.appendChild(fragment);

}

function actualizarSeleccionados(){

    const cantidad = document.querySelectorAll(".form-check-input:checked").length;

    document.getElementById("cantidadSeleccionados").textContent = cantidad;

}

function cambiarSeleccion(check, id) {

    const medicamento = ultimoResultado.find(p => p.id == id);

    if (!medicamento) return;

    if (check.checked) {

        seleccionarProducto(medicamento);

    } else {

        deseleccionarProducto(id);

    }

    mostrarSeleccionados();

    document.getElementById("cantidadSeleccionados").textContent =
        cantidadSeleccionados();

}

function mostrarSeleccionados() {

    const contenedor = document.getElementById("contenedorSeleccionados");

    const productos = obtenerProductosSeleccionados();

    contenedor.innerHTML = "";

    if(productos.length===0){

        contenedor.innerHTML = `

            <div class="text-muted">

                No hay productos seleccionados.

            </div>

        `;

        return;

    }

    productos.forEach(producto=>{

        contenedor.innerHTML += `

            <div class="d-flex justify-content-between align-items-center border-bottom py-2">

                <div>

                    <strong>

                        ${producto.descripcion}

                    </strong>

                    <br>

                    <small>

                        ${producto.presentacion}

                    </small>

                </div>

                <button
                    class="btn btn-sm btn-outline-danger"
                    onclick="quitarProducto(${producto.id})">

                    <i class="bi bi-x-lg"></i>

                </button>

            </div>

        `;

    });

}

function quitarProducto(id){

    deseleccionarProducto(id);

    mostrarSeleccionados();

    document.getElementById("cantidadSeleccionados").textContent =
        cantidadSeleccionados();

}

function crearFilaMedicamento(medicamento){

    const fila=document.createElement("tr");

    const tdCheck=document.createElement("td");

    const checkbox=document.createElement("input");

    checkbox.type="checkbox";

    checkbox.className="form-check-input";

    checkbox.checked=estaSeleccionado(medicamento.id);

    checkbox.addEventListener("change",()=>{

        if(checkbox.checked){

            seleccionarProducto(medicamento);

        }
        else{

            deseleccionarProducto(medicamento.id);

        }

        actualizarPanelSeleccionados();

    });

    tdCheck.appendChild(checkbox);

    fila.appendChild(tdCheck);

    const tdDescripcion=document.createElement("td");

    tdDescripcion.innerHTML=`<strong>${medicamento.descripcion}</strong>`;

    fila.appendChild(tdDescripcion);

    const tdPresentacion=document.createElement("td");

    tdPresentacion.textContent=medicamento.presentacion;

    fila.appendChild(tdPresentacion);

    const tdLaboratorio=document.createElement("td");

    tdLaboratorio.innerHTML=

        `<span class="badge bg-success">${medicamento.laboratorio}</span>`;

    fila.appendChild(tdLaboratorio);

    return fila;

}


function crearTarjetaMedicamento(medicamento) {

    const card = document.createElement("div");
    card.className = "card producto shadow-sm mb-3";

    const body = document.createElement("div");
    body.className = "card-body";

    const checkDiv = document.createElement("div");
    checkDiv.className = "form-check";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input";
    checkbox.value = medicamento.id;
    checkbox.checked = estaSeleccionado(medicamento.id);

    checkbox.addEventListener("change", () => {

        if (checkbox.checked) {

            seleccionarProducto(medicamento);

        } else {

            deseleccionarProducto(medicamento.id);

        }

        actualizarPanelSeleccionados();

    });

    const label = document.createElement("label");
    label.className = "form-check-label";

    const titulo = document.createElement("strong");
    titulo.textContent = medicamento.descripcion;

    label.appendChild(titulo);

    checkDiv.appendChild(checkbox);
    checkDiv.appendChild(label);

    body.appendChild(checkDiv);

    const datos = document.createElement("div");
    datos.className = "mt-2";

    datos.innerHTML = `
        <span class="badge bg-secondary">${medicamento.presentacion}</span>
        <span class="badge bg-success">${medicamento.laboratorio}</span>
    `;

    body.appendChild(datos);

    card.appendChild(body);

    return card;

}

function actualizarPanelSeleccionados() {

    document.getElementById("cantidadSeleccionados").textContent =
        cantidadSeleccionados();

    mostrarSeleccionados();

}

async function copiarSeleccion() {

    const texto = obtenerTextoSeleccionados();

    if (texto === "") {

        alert("No hay productos seleccionados.");

        return;

    }

    try {

        await navigator.clipboard.writeText(texto);

        mostrarToast("Lista copiada al portapapeles.");

    }
    catch {

        alert("No fue posible copiar la lista.");

    }

}

function mostrarToast(mensaje) {

    const toast = document.createElement("div");

    toast.className =
        "toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4 show";

    toast.style.zIndex = 9999;

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${mensaje}
            </div>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 2500);

}