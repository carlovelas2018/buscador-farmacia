const TIEMPO_CACHE = 5 * 60 * 1000; // 5 minutos
// URL de la API
const API_URL = "https://script.google.com/macros/s/AKfycbwLXivimJ8TJPDcg_a1MB2tJAjt7suiDl1jpVEfHUNnYpBhHQt2ynmLJ7ZQrAvYaX6E/exec";
// Productos seleccionados
const productosSeleccionados = new Map();

// Cache de búsquedas
const cacheBusqueda = new Map();

async function obtenerMedicamentos(texto = "") {

    try {

	const textoBusqueda = texto.trim().toLowerCase();

	if (cacheBusqueda.has(textoBusqueda)) {

         const cache = cacheBusqueda.get(textoBusqueda);

         const tiempoTranscurrido = Date.now() - cache.fecha;

         if (tiempoTranscurrido < TIEMPO_CACHE) {

             console.log("Resultado obtenido desde la caché.");

             return cache.datos;

         }

        cacheBusqueda.delete(textoBusqueda);

    }

        const respuesta = await fetch(
            `${API_URL}?buscar=${encodeURIComponent(texto)}`
        );

        if (!respuesta.ok) {
            throw new Error("No fue posible obtener los medicamentos.");
        }

        const datos = await respuesta.json();

	cacheBusqueda.set(textoBusqueda, {

	    datos: datos,

	    fecha: Date.now()

	});

	return datos;

    } catch (error) {

        console.error("Error consultando la API:", error);

        return [];
    }
}

function seleccionarProducto(producto) {

    productosSeleccionados.set(producto.id, producto);

}

function deseleccionarProducto(id) {

    productosSeleccionados.delete(id);

}

function estaSeleccionado(id) {

    return productosSeleccionados.has(id);

}

function cantidadSeleccionados() {

    return productosSeleccionados.size;

}
function obtenerProductosSeleccionados() {

    return Array.from(productosSeleccionados.values());

}

function limpiarSeleccion() {

    productosSeleccionados.clear();

}

function obtenerTextoSeleccionados() {

    const productos = obtenerProductosSeleccionados();

    if (productos.length === 0)
        return "";

    let texto = "Solicitud de medicamentos\n\n";

    productos.forEach(p => {

        texto += `• ${p.descripcion} - ${p.presentacion}\n`;

    });

    texto += `\nTotal productos: ${productos.length}`;

    return texto;

}