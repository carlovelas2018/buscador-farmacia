async function buscarMedicamentos(texto) {

    // No buscar hasta escribir al menos 3 caracteres
    if (texto.trim().length < 3) {

        mostrarMedicamentos([]);
        return;

    }

    mostrarCargando();

    const medicamentos = await obtenerMedicamentos(texto);

    mostrarMedicamentos(medicamentos);

}