/* ---------------------------------------
Pon aquí tu nombre y apellido, por favor.
Ahmed Hassan Khamis

------------------------------------------*/


/*
* Se pueden utilizar los formatos de las correspondientes resultados de los diferentes pasos.
* Se encuentran en datos.js y, en cada paso pertinente, se indica la variable correspondiente
* Si se utiliza alguna de esas variables, en el apartado correspondiente a su generación,
* se tendrá un 0
*/


/*
++ salida en la variable salP1 de datos.js 
*/
document.addEventListener('DOMContentLoaded',main);
function main() {
  
function tratarDatosEntrada(cadena, sepLinea, sepCampos) {
  array = cadena
    .split(sepLinea)
    .map(linea => linea.trim())
    .filter(linea => linea.length)
    .map(campos => campos
      .split(sepCampos)
      .map(campos => campos.trim())
      // .filter(campos => campos[2] == "2023-11-30")
    );

  const cabecera = extraerCabecera(array);

  let arrayObjetos = array.map(fila => {
    return aObjeto(fila, cabecera);
  })

  return arrayObjetos
}

// funcion para tener solo el array
function csv2array(cadena, sepLinea, sepCampos) {
  return cadena
    .split(sepLinea)
    .map(linea => linea.trim())
    .filter(linea => linea.length)
    .map(campos => campos
      .split(sepCampos)
      .map(campos => campos.trim())
      // .filter(campos => campos[2] == "2023-11-30")
    );

}
// funcion para extraer cabecera 
function extraerCabecera(array) {
  return array.shift();
}

const cabecera = csv2array(datos, "\n", ";")[0];

// funcion para crear el objeto
function aObjeto(array, nomCampos) {
  return array
    .reduce((acc, v, i) => {
      acc[nomCampos[i]] = v;
      return acc;
    }, {})
}

const datosArrayObjetos = tratarDatosEntrada(datos, "\n", ";");


/*
++ salida en la variable salP3 
*/
function filtarPorFecha(array, campo, fecha) {
  let fechacomparar = new Date(fecha);
  fechafinal = fechacomparar.getFullYear() + "-" + (fechacomparar.getMonth() + 1) + "-" + fechacomparar.getDate();
  return array.filter(objeto => objeto[campo] == fechafinal);
}

console.log(filtarPorFecha(datosArrayObjetos,'date','2023-11-30'));

// aqui creo otra array para modificarla como me de la gana
const datosArrayObjetos2 = tratarDatosEntrada(datos, "\n", ";");

// funcion para seleccionar los campos deseados
function objetosConCampos(arrayObj, campos) {
  return arrayObj.map(fila => {
    return aObjetofiltrado(fila, campos);
  })

  function aObjetofiltrado(objeto, nomCampos) {
    for (prop in objeto) {
      if (!nomCampos.includes(prop)) {
        delete (objeto[prop]);
      }
    }
    return objeto;
  }
}


console.log(objetosConCampos(datosArrayObjetos2, ['ccaa', 'ine_code', 'ia7d', 'ia14d']));

/*
++ salida en la variable salP5 
*/
function realizarTablaIncidencias(arrayObj) {
  // Las fórmulas son:

  // Para 7 días
  // Si hay un valor en cases_PCR_7days, utilizarlo. Si no, utilizar el valor de cases_7days
  // La incidencia se calcula con el valor anterior dividido entre la población y multiplicado por 1000000

  // Para 14 días
  // Si hay un valor en cases_PCR_14days, utilizarlo. Si no, utilizar el valor de cases_14days
  // La incidencia se calcula con el valor anterior dividido entre la población y multiplicado por 1000000

}


// funcion para crear nodos
function crearNodo(elemento, elementoTexto) {
  let ele = document.createElement(elemento);
  if (elementoTexto) {
    let eleTxt = document.createTextNode(elementoTexto);
    ele.appendChild(eleTxt);
  }
  return ele;
}

// funcion para crear la tabla
function crearTablaHTML(arrayObj) {
  /*
    table
      caption 
      thead
        tr
          th
      tbody
        tr
          td
      tfoot
        tr
          td
  */

  function crearThead() {
    // lo hago de esta manera porque en el papel especifica esos 4 nada mas si no lo haria con bucle y demas
    let thead = crearNodo('thead');
    let tr = crearNodo('tr');
    let th1 = crearNodo('th', 'ine_code');
    let th2 = crearNodo('th', 'ccaa');
    let th3 = crearNodo('th', 'ia7d');
    let th4 = crearNodo('th', 'ia14d');
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    thead.appendChild(tr);
    return thead;
  }


  function crearTbody() {
    let tbody = crearNodo('tbody');
    arrayObj.forEach(objeto => {
      let tr = crearNodo('tr');
      for (prop in objeto) {
        let td = crearNodo('td', objeto[prop])
        tr.appendChild(td);
      }
      tbody.appendChild(tr)
    });
    return tbody;
  }

  function crearTfoot() {
    function calcularMedia(array,campo) {
      let suma = 0;
      array.forEach(objeto => {
        suma += parseInt(objeto[campo]);
      })
      let resultado = suma / array.length;
      return Math.round(resultado);
    }

    // lo hago de esta manera porque en el papel especifica esos 4 nada mas si no lo haria con bucle y demas
    let tfoot = crearNodo('tfoot');
    let tr = crearNodo('tr');
    let td1 = crearNodo('td');
    let td2 = crearNodo('td');
    let td3 = crearNodo('td',calcularMedia(arrayObj,'ia7d'));
    let td4 = crearNodo('td',calcularMedia(arrayObj,'ia14d'));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tfoot.appendChild(tr);
    return tfoot;

 
  }
  let tabla = crearNodo('table');
  let caption = crearNodo('caption', 'Incidencias al 30/11');
  let thead = crearThead();
  let tbody = crearTbody();
  let tfoot = crearTfoot();
  
  tabla.appendChild(caption);
  tabla.appendChild(thead);
  tabla.appendChild(tbody);
  tabla.appendChild(tfoot);

  document.body.appendChild(tabla);
}

crearTablaHTML(salP5);

}