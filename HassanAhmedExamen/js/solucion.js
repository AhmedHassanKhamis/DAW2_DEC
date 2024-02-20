// (()=>{
  // document.addEventListener("DOMContentLoaded",function(){

  
'use strict';
/* Estructura del html
 
  (4) en el id=act
   El nombre de la imagen se forma con las tres primeras letras
   del valor del campo cielo (en minúsculas) + la terminación svg
 
<div>
  <h2>Madrid</h2>
  <h3>(España)</h3>
  <p>Actualizado hace <span id="act">1</span> minuto(s)</p>
</div>
<div data-date="25/2/2021">
  <h3>Hoy</h3>
  <img src="img/sol.svg" alt="estado">
  <span>Soleado</span>
  <p>Min: 1,6°</p>
  <p>Max: 13,5°</p>
</div>
*/

// El codigo de la tecla ENTER es 13
let urlServidor = 'http://localhost:3000';

// Variables y funciones a utilizar obligatoriamente dentro del IIFE
function tiempoApp(url) {
  if (url) {
    urlServidor = url;
  }
  gestorEventos();
}

function gestorEventos() {
  let boton = document.querySelector("button");
  boton.addEventListener("click", hacerConsulta);
}

function hacerConsulta() {
  let busqueda = document.querySelector("input[type='text']").value;
  let regEx1 = /^[A-Z][A-Z]-[0-9][0-9]-[0-9][0-9][0-9]/
  let regEx2 = /^[A-Z][a-z][a-z]*/
  if (busqueda.match(regEx1) || busqueda.match(regEx2)) {
    if (busqueda.match(regEx1)) {
      pedirDatos2("/localizaciones?id=" + busqueda, segundaPeticion);
    } else {
      pedirDatos2("/localizaciones?Nombre=" + busqueda, segundaPeticion);
    }
  } else {
    alert("Formatos Admitidos:2LETRAS-2DIGITOS-3DIGITOS , O el formato: primera letra en mayuscula seguida de dos letras o mas");
  }

}

function segundaPeticion(datos) {
  construirLocalizacion(datos);
  pedirDatos2(`/temperaturas?id=${datos.id}`, construirTemperaturas)
}


function construirLocalizacion(datos) {
  let div = crearNodo("div", null, [
    crearNodo("h2", null, datos.Nombre),
    crearNodo("h3", null, datos.País),
    crearNodo("p", null, "Actualizado hace X minutos(s)")
  ])
  let reemplazar = document.querySelector("div[id='info'] > :first-child");
  if (reemplazar) {
    reemplazar.replaceWith(div);
  } else {
    let contenedor = document.querySelector("div[id='info']");
    contenedor.appendChild(div);
  }
}

// const formato = {
//   decimal: "3"
// }
// const formateador = new Intl.NumberFormat();

function construirTemperaturas(datos) {
  let textoFecha;
  if (datos.fecha == new Date("yyyy-MM-dd")) {
    textoFecha = "hoy";
  } else {
    textoFecha = datos.fecha;
  }
  let div = crearNodo("div", { "data-date": datos.fecha }, [
    crearNodo("h3", null, textoFecha),
    crearNodo("img", { src: "./img/sol.svg" }),
    crearNodo("span", null, datos.cielo),
    crearNodo("p", null, "Min: " + datos.temp_min),
    crearNodo("p", null, "Max: " + datos.temp_max)
  ])
  let reemplazar = document.querySelector("div[id='info'] > div[data-date]");
  if (reemplazar) {
    reemplazar.replaceWith(div);
  } else {
    let contenedor = document.querySelector("div[id='info']");
    contenedor.appendChild(div);
  }
}

function crearNodo(tipo, atributos = null, contenido = null) {
  let elemento = document.createElement(tipo);

  if (atributos) {
    for (let atributo in atributos) {
      elemento.setAttribute(atributo, atributos[atributo]);
    }
  }

  if (typeof contenido == "string" || typeof contenido == "number") {
    elemento.innerText = contenido;
  } else if (contenido instanceof HTMLElement) {
    elemento.appendChild(contenido);
  } else if (Array.isArray(contenido)) {
    contenido.forEach(element => {
      elemento.appendChild(element);
    });
  }

  return elemento;
}











/*
** Función para pedir los datos al servidor CORS
** El GET se debe hacer a URL
*/
// function pedirDatos(peticion, callback)  {
//   const URL = urlServidor + peticion;
//   const xhr = new XMLHttpRequest();
//   if (xhr.readyState == 4) {
//     if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 303) {
//       callback(JSON.stringify(xhr.responseText));
//     }else{
//       console.error(`Error: ${xhr.status} -> ${xhr.statusText}`);
//     }
//   }
//   xhr.open("GET",URL,true);
//   xhr.send();
// }

async function pedirDatos2(peticion, callback) {
  const URL = urlServidor + peticion;
  try {
    const respuesta = await fetch(URL);
    if (respuesta.status >= 200 && respuesta.status <= 300) {
      const datos = await respuesta.json();
      callback(datos[0]);
    }
  } catch (error) {
    console.error(error);
  }
}



function imprimir(info) {
  console.log(info.temp_max);
}

// })
// })()
