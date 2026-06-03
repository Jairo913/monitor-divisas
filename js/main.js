// js/main.js

const API_URL = "https://dolarapi.com/v1/venezuela/tasas";

const domBCV = document.querySelector("#bcv .precio");
const domUSDT = document.querySelector("#usdt .precio");
const domEuro = document.querySelector("#euro .precio");
const domFecha = document.getElementById("fecha");
const btnActualizar = document.getElementById("btn-actualizar");

async function actualizarInterfaz() {
    btnActualizar.textContent = "Buscando precios reales...";
    btnActualizar.disabled = true;

    try {
        // Aquí la app intenta salir a internet a buscar los precios de hoy
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        
        const bcv = datos.oficials?.find(t => t.id === "bcv")?.valor;
        const euro = datos.oficials?.find(t => t.id === "euro")?.valor;
        const usdt = datos.paralelos?.find(t => t.id === "binance")?.valor;

        // Mostramos los datos 100% reales en la pantalla
        domBCV.textContent = `Bs. ${bcv.toFixed(2)}`;
        domEuro.textContent = `Bs. ${euro.toFixed(2)}`;
        domUSDT.textContent = `Bs. ${usdt.toFixed(2)}`;
        domFecha.textContent = "Conectado a Internet en Vivo";

    } catch (error) {
        // Si sale este mensaje en internet, es porque no tienes datos o Wifi activos
        domFecha.textContent = "Error: Tu teléfono bloqueó la conexión local.";
    } {
        btnActualizar.textContent = "Actualizar Tasas";
        btnActualizar.disabled = false;
    }
}

btnActualizar.addEventListener("click", actualizarInterfaz);
document.addEventListener("DOMContentLoaded", actualizarInterfaz);
