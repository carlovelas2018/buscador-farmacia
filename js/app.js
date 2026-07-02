document.addEventListener("DOMContentLoaded", () => {

    mostrarMedicamentos([]);
    mostrarSeleccionados();

    const txtBuscar = document.getElementById("txtBuscar");

    txtBuscar.focus();

    let temporizador;

    txtBuscar.addEventListener("keyup", () => {

        clearTimeout(temporizador);

        temporizador = setTimeout(() => {

            buscarMedicamentos(txtBuscar.value);

        }, 300);

    });

});

document
    .getElementById("btnCopiar")
    .addEventListener("click", copiarSeleccion);

document
    .getElementById("btnLimpiar")
    .addEventListener("click", () => {

        limpiarSeleccion();

        actualizarPanelSeleccionados();

        mostrarMedicamentos(ultimoResultado);

    });