let mainsection = document.querySelector(".mainsection");
let container = document.querySelector("#container");
let header = document.querySelector(".header");


let header_div = document.createElement("div");
header_div.classList.add("header-div");
header.appendChild(header_div);


let header_logo = document.createElement("img");
header_logo.classList.add("logo");
header_logo.src = "/img/SABORCUYANOLOGO.jpg";
header_div.appendChild(header_logo);


let boton_empanadas = document.createElement("button");
boton_empanadas.textContent = "Empanadas";
boton_empanadas.id = "myboton_empanadas";
boton_empanadas.className = "boton_empanadas";
container.appendChild(boton_empanadas);
boton_empanadas.addEventListener("click", llamador_menu);
boton_empanadas.addEventListener("click", setear_datos_inputs_carrito);

let carrito_container = document.createElement("div");
carrito_container.classList.add("carrito_container");
header_div.appendChild(carrito_container);
carrito_container.style.cursor = "pointer";
carrito_container.addEventListener("click", setear_datos_carrito_desplegable);


let carrito_contador = document.createElement("div");
carrito_contador.classList.add("carrito_contador");
carrito_contador.innerHTML = 0;
carrito_contador.style.opacity = 0;
carrito_container.appendChild(carrito_contador);
carrito_contador.addEventListener("DOMContentLoaded", levantar_numeros_del_usuario);


let carrito_logo = document.createElement("img");
carrito_logo.src = "/img/carrito.jpg";
carrito_logo.classList.add("carrito");
carrito_container.appendChild(carrito_logo);


let carrito_desplegado_div = document.createElement("div");
carrito_desplegado_div.classList.add("carrito_desplegado_div");
container.appendChild(carrito_desplegado_div);


let lista_carrito = document.createElement("ul");
lista_carrito.classList.add("lista_carrito");
carrito_desplegado_div.appendChild(lista_carrito);


let finalizar_compra_btn = document.createElement("button");
finalizar_compra_btn.textContent = "Finalizar Compra";
finalizar_compra_btn.classList.add("finalizar_compra_btn");
carrito_desplegado_div.appendChild(finalizar_compra_btn);
finalizar_compra_btn.addEventListener("click", finalizar_compra_menu);


let total_carrito = document.createElement("div");
total_carrito.classList.add("total_carrito");
total_carrito.textContent = "Total: $0";
carrito_desplegado_div.insertBefore(total_carrito, finalizar_compra_btn);


let input_direccion = document.createElement("input");
input_direccion.type = "text";
input_direccion.placeholder = "Ingresa tu dirección";
input_direccion.classList.add("direccion_input");
carrito_desplegado_div.insertBefore(input_direccion, finalizar_compra_btn);

