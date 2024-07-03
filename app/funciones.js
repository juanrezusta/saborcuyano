let menu_corriendo = false;

function actualizar_total_carrito() {
    let carrito = catchear_localstorage();
    let total = 0;

    let carrito_vacio = Object.keys(carrito).length === 0;

    if (!carrito_vacio) {
        for (let sabor in carrito) {
            let cantidad = carrito[sabor];
            total += cantidad * 1500;
        }
    }

    total_carrito.textContent = `Total: $${total}`;
}

function finalizar_compra_menu() {
    const direccion_ingresada = input_direccion.value;
    const menu_final = catchear_localstorage();

    if (Object.keys(menu_final).length !== 0 && direccion_ingresada !== "") {
        let total = 0;
        for (let sabor in menu_final) {
            let cantidad = menu_final[sabor];
            total += cantidad * 1500;
        }

        Swal.fire({
            title: 'Compra Realizada.',
            text: `Tu pedido será enviado a ${direccion_ingresada} en el lapso de 30 minutos. \nTotal: $${total}`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            localStorage.removeItem("carrito");
            actualizar_interfaz_carrito();
            location.reload()
        });

    } else {
        Swal.fire({
            title: 'Ups!',
            text: 'El pedido necesita tener items y la direccion de envio cargada.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
}

function desplegar_carrito() {
    if (lista_carrito.style.opacity === "1") {
        lista_carrito.style.opacity = "0";
        carrito_desplegado_div.style.opacity = "0";
    } else {
        lista_carrito.style.opacity = "1";
        carrito_desplegado_div.style.opacity = "1";
    }
}

function catchear_localstorage() {
    let carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : {};
}

function guardar_carrito_en_localstorage(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizar_interfaz_carrito() {
    let carrito = catchear_localstorage();
    let cantidades_empanadas = Object.values(carrito);
    let cantidadTotal = 0;
    actualizar_total_carrito();
    for (let cantidad of cantidades_empanadas) {
        cantidadTotal += cantidad;
    }
    carrito_contador.innerHTML = cantidadTotal;
    carrito_contador.style.opacity = cantidadTotal > 0 ? 1 : 0;

    lista_carrito.innerHTML = '';
    for (let sabor in carrito) {
        let cantidad = carrito[sabor];
        let item_subtotal = cantidad * 1500;
        let item_pedido = document.createElement("li");
        item_pedido.innerHTML = `${cantidad} x ${sabor} = $${item_subtotal} <button class="remove-itemcito" style="color: red; background: none; border: none; cursor: pointer;"><strong>✖</strong></button>`
        lista_carrito.appendChild(item_pedido);

        let botonEliminar = item_pedido.querySelector('.remove-itemcito');
        botonEliminar.addEventListener('click', () => {
            eliminar_item_carrito(sabor)
            actualizar_interfaz_carrito()
        });
    }
}

function plasmar_fotos(ruta, donde_append) {
    let foto = document.createElement("img");
    foto.src = ruta;
    foto.classList.add("foto-empanada");
    donde_append.appendChild(foto);
    foto.width = 90;
    foto.height = 70;
}

function levantar_numeros_del_usuario() {
    let carrito = catchear_localstorage();
    let inputs = document.querySelectorAll(".input_empanada");
    inputs.forEach(function(input) {
        let cantidad = parseInt(input.value);
        let sabor = input.id;
        if (!isNaN(cantidad)) {
            if (cantidad === 0) {
                delete carrito[sabor];
            } else {
                carrito[sabor] = cantidad;
            }
        }
    });
    guardar_carrito_en_localstorage(carrito);
    actualizar_interfaz_carrito();
}

function setear_datos_inputs_carrito() {
    let carrito = catchear_localstorage();
    for (let sabor in carrito) {
        let input = document.getElementById(sabor);
        if (input) {
            input.value = carrito[sabor];
        }
    }
    actualizar_interfaz_carrito();
}

function setear_datos_carrito_desplegable() {
    actualizar_interfaz_carrito();
    desplegar_carrito();
}

function eliminar_item_carrito(sabor) {
    let carrito = catchear_localstorage();
    delete carrito[sabor];
    guardar_carrito_en_localstorage(carrito);
    actualizar_interfaz_carrito();

    let input = document.getElementById(sabor);
    if (input) {
        input.value = 0;
    }
}

async function fetchea_carga_asincrona() {
    try {
        const response = await fetch('data.json');
        
        if (!response.ok) {
            throw new Error('Ups, tenemos un error en nuestro sistema, por favor vuelva a intentarlo en unos minutos.');
        }

        const empanadas = await response.json();
        mostrar_menu(empanadas);

    } catch (error) {

        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al cargar los datos.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

function mostrar_menu(empanadas) {
    let lista_desordenada = document.createElement("div");
    lista_desordenada.classList.add("lista_desordenada");
    container.appendChild(lista_desordenada);
    
    empanadas.forEach(empanadaitem => {
        let bloque_empanada = document.createElement("div");
        bloque_empanada.classList.add("bloque_empanada");
        lista_desordenada.appendChild(bloque_empanada);
        
        let empanada_div = document.createElement("div");
        empanada_div.classList.add("empanada_div");
        bloque_empanada.appendChild(empanada_div);
        plasmar_fotos(empanadaitem.ruta, empanada_div);
        

        let sabor_descripcion_div = document.createElement("div");
        sabor_descripcion_div.classList.add("sabor_descripcion_div");
        empanada_div.appendChild(sabor_descripcion_div);

        let sabor_div = document.createElement("div");
        sabor_div.innerHTML = `${empanadaitem.sabor}`;
        sabor_div.classList.add("sabor_div");
        sabor_descripcion_div.appendChild(sabor_div);

        let descripcion_div = document.createElement("div");
        descripcion_div.innerHTML = `${empanadaitem.descripcion}`;
        descripcion_div.classList.add("descripcion_div");
        sabor_descripcion_div.appendChild(descripcion_div);

        let input_empanada = document.createElement("input");
        input_empanada.type = "number";
        input_empanada.classList.add("input_empanada");
        bloque_empanada.appendChild(input_empanada);
        input_empanada.min = 0;
        input_empanada.placeholder = 0;
        input_empanada.id = empanadaitem.sabor;

        input_empanada.addEventListener("click", levantar_numeros_del_usuario);
    });
}

function llamador_menu() {

    if (!menu_corriendo) {
        fetchea_carga_asincrona().then(() => {
            setear_datos_inputs_carrito();
            menu_corriendo = true
        })
    }
}