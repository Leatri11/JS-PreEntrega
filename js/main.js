const gestorGastos = {
    nombreUsuario: "",
    limiteGastos: 0,
    gastos: []
};

function iniciarGestor() {
    gestorGastos.nombreUsuario = prompt("Ingrese su nombre:");
    alert("Bienvenido a su Gestor de Gastos, " + gestorGastos.nombreUsuario);

    gestorGastos.limiteGastos = parseFloat(prompt("Ingrese el límite de los gastos mensuales:"));
    if (isNaN(gestorGastos.limiteGastos) || gestorGastos.limiteGastos <= 0) {
        alert("Límite inválido. Recargue la página e intente nuevamente.");
        return;
    }

    alert("Has establecido un límite de $" + gestorGastos.limiteGastos.toFixed(2));
    registrarGastos();
}

function registrarGastos() {
    let continuar = true;

    while (continuar) {
        let monto = parseFloat(prompt("Ingresa el monto del gasto:"));
        if (isNaN(monto) || monto <= 0) {
            alert("Monto no válido. Inténtalo nuevamente.");
            continue;
        }

        let descripcion = prompt("Describe el gasto:");
        let categoria = prompt("Categoriza el gasto (cuentas, comida, transporte, entretenimiento):");

        gestorGastos.gastos.push({ monto, descripcion, categoria });

        const totalGastos = calcularTotalGastos();
        alert("Gasto acumulado: $" + totalGastos.toFixed(2));

        if (totalGastos >= gestorGastos.limiteGastos) {
            alert("¡Cuidado! Has alcanzado o superado tu límite de gastos.");
            continuar = false;
        } else {
            continuar = prompt("¿Deseas agregar otro gasto? (si/no)").toLowerCase() === "si";
        }
    }

    mostrarResumen();
    filtrarGastosPorCategoria();
    buscarGastoPorDescripcion();
}

function calcularTotalGastos() {
    return gestorGastos.gastos.reduce((acumulador, gasto) => acumulador + gasto.monto, 0);
}

function mostrarResumen() {
    const totalGastos = calcularTotalGastos();

    if (totalGastos > gestorGastos.limiteGastos) {
        alert(
            "Resumen de gastos:\n" +
            "Límite fijado: $" + gestorGastos.limiteGastos.toFixed(2) + "\n" +
            "Total gastado: $" + totalGastos.toFixed(2) + "\n" +
            "¡Te pasaste del límite!"
        );
    } else {
        alert(
            "Resumen de gastos:\n" +
            "Límite fijado: $" + gestorGastos.limiteGastos.toFixed(2) + "\n" +
            "Total gastado: $" + totalGastos.toFixed(2) + "\n" +
            "Te mantuviste dentro del límite."
        );
    }
}

function filtrarGastosPorCategoria() {
    let categoria = prompt("¿Deseas ver los gastos de una categoría específica? (Escribe la categoría o deja vacío para salir):");
    if (categoria) {
        const gastosFiltrados = gestorGastos.gastos.filter(gasto => gasto.categoria.toLowerCase() === categoria.toLowerCase());
        
        if (gastosFiltrados.length > 0) {
            let mensaje = `Gastos en la categoría '${categoria}':\n`;
            gastosFiltrados.forEach(gasto => {
                mensaje += `- Monto: $${gasto.monto}, Descripción: ${gasto.descripcion}\n`;
            });
            alert(mensaje);
        } else {
            alert(`No se encontraron gastos en la categoría '${categoria}'.`);
        }
    }
}

function buscarGastoPorDescripcion() {
    let descripcion = prompt("¿Deseas buscar un gasto específico por su descripción? (Escribe la descripción o deja vacío para salir):");
    if (descripcion) {
        const gastoEncontrado = gestorGastos.gastos.find(gasto => gasto.descripcion.toLowerCase() === descripcion.toLowerCase());
        if (gastoEncontrado) {
            alert(
                `Gasto encontrado:\nMonto: $${gastoEncontrado.monto}\nDescripción: ${gastoEncontrado.descripcion}\nCategoría: ${gastoEncontrado.categoria}`
            );
        } else {
            alert("No se encontró ningún gasto con esa descripción.");
        }
    }
}

iniciarGestor();
