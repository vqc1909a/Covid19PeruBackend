// Este es el código del Worker Thread que se ejecutará en un hilo separado

console.log("Ejecutando un worker")
const { parentPort } = require('worker_threads');
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
// const stream = require('stream');


const resInfectados = [];
const resFallecidos = [];
const resPoblacion = [];

function fechaEnFormatoDate(fecha) {
  const fechaFormateada = `${fecha.slice(0,4)}-${fecha.slice(4,6)}-${fecha.slice(6,8)}`;
  return fechaFormateada;
}
// axios.get('https://files.minsa.gob.pe/s/eRqxR35ZCxrzNgr/download')
// .then(response => {

//   // Creamos un stream de lectura a partir de los datos descargados
//   const dataStream = stream.Readable.from(response.data);

//   // Creamos un stream de lectura a partir del stream de datos
//   const csvStream = dataStream.pipe(csv({ separator: ';' }));

//   csvStream.on('data', data => {
//     resInfectados.push(data);
//   })

//   csvStream.on('end', () => {
//     //Array de objetos, cada objeto es una fila de la tabla de datos
//     console.log(resInfectados)
//     console.log(resInfectados.length);
//     let fechasConRepeticiones = resInfectados.map(fila => fila.FECHA_RESULTADO);
//     let fechasSinRepeticiones =  [...new Set(fechasConRepeticiones)].filter(fecha => fecha.trim() !== "");
//     //Ordenamos las fechas de forma ascendente
//     fechasSinRepeticiones.sort((fechaAnterior, fechaSiguiente) => fechaAnterior - fechaSiguiente);


//     console.log({
//       fechasSinRepeticiones: fechasSinRepeticiones,
//       cantidad: fechasSinRepeticiones.length,
//       ultimafecha: fechasSinRepeticiones[fechasSinRepeticiones.length - 1]
//     })

//     parentPort.postMessage({
//       status: "finished",
//       message: "Datos parseados correctamente",
//       data: resInfectados
//     })
//   })
// })


// Creamos un stream de lectura del archivo CSV
const streamInfectados = fs.createReadStream("./positivos_covid.csv");
const streamFallecidos = fs.createReadStream("./fallecidos_covid.csv");
const streamPoblacion = fs.createReadStream("./poblacion.csv");


// Creamos un stream de lectura a partir del stream de datos
const csvStreamInfectados = streamInfectados.pipe(csv({ separator: ';' }));
const csvStreamFallecidos= streamFallecidos.pipe(csv({ separator: ';' }));
const csvStreamPoblacion= streamPoblacion.pipe(csv({ separator: ',' }));




// Escuchamos el evento "data" del stream para procesar cada fila del CSV
csvStreamInfectados.on('data', data => {
  resInfectados.push(data);
});

csvStreamFallecidos.on('data', data => {
  resFallecidos.push(data);
})

csvStreamPoblacion.on('data', data => {
  resPoblacion.push(data);
})

// Escuchamos el evento "end" del stream para saber cuándo se ha terminado de procesar el CSV
const promesaInfectados = new Promise((resolve) => {
  csvStreamInfectados.on('end', () => {
    console.log('Stream Infectados terminó');
    resolve();
  });
});

const promesaFallecidos = new Promise((resolve) => {
  csvStreamFallecidos.on('end', () => {
    console.log('Stream Fallecidos terminó');
    resolve();
  });
});
const promesaPoblacion = new Promise((resolve) => {
  csvStreamPoblacion.on('end', () => {
    console.log('Stream Población terminó');
    resolve();
  });
});

Promise.all([promesaInfectados, promesaFallecidos, promesaPoblacion])
.then( async () => {
  console.log('Los Tres streams terminaron');
  const initialValue = 0;
  let totalPoblacion = resPoblacion.reduce((accumulator, currentValue) => accumulator + (Number(currentValue.Cantidad) || 0), initialValue);
  //Array de objetos, cada objeto es una fila de la tabla de datos
  let fechasConRepeticiones = resInfectados.map(fila => fila.FECHA_RESULTADO.trim());
  let fechasSinRepeticiones =  [...new Set(fechasConRepeticiones)].filter(fecha => fecha !== "");
  

  //Ordenamos las fechas de forma ascendente, en este caso trabajamos con la fecha de los infectados porque hay mas fechas ahi
  //NOTA: Hay fechas vacías "", la cantidad de ello lo aumentaremos en cada una de las fechas, asi que no hay problema
  fechasSinRepeticiones.sort((fechaAnterior, fechaSiguiente) => fechaAnterior - fechaSiguiente);

  //Extraer datos por cada fecha (Perú)
  // let responsesPeru = fechasSinRepeticiones.map((fecha) => {
  //   let filasInfectados = resInfectados.filter(fila => Number(fila.FECHA_RESULTADO.trim()) <= Number(fecha) || fila.FECHA_RESULTADO.trim() === "");
  //   let filasFallecidos = resFallecidos.filter(fila => Number(fila.FECHA_FALLECIMIENTO.trim()) <= Number(fecha) || fila.FECHA_FALLECIMIENTO.trim() === "");

  //   let totalInfectados = filasInfectados.length;
  //   let totalInfectadosHombres = filasInfectados.filter(fila => fila.SEXO.trim() === "MASCULINO").length;
  //   let totalInfectadosMujeres = filasInfectados.filter(fila => fila.SEXO.trim() === "FEMENINO").length;
    
  //   let totalFallecidos = filasFallecidos.length;
  //   let totalFallecidosHombres = filasFallecidos.filter(fila => fila.SEXO.trim() === "MASCULINO").length;
  //   let totalFallecidosMujeres = filasFallecidos.filter(fila => fila.SEXO.trim() === "FEMENINO").length;
    
  //   let totalFallecidosPreinfancia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 0 && Number(fila.EDAD_DECLARADA.trim()) <= 5).length;
  //   let totalFallecidosInfancia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 6 && Number(fila.EDAD_DECLARADA.trim()) <= 11).length;
  //   let totalFallecidosAdolescencia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 12 && Number(fila.EDAD_DECLARADA.trim()) <= 18).length;
  //   let totalFallecidosJuventud = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 19 && Number(fila.EDAD_DECLARADA.trim()) <= 26).length;
  //   let totalFallecidosAdultez = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 27 && Number(fila.EDAD_DECLARADA.trim()) <= 59).length;
  //   let totalFallecidosPersonaMayor = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 60).length;

  //   return {
  //     "name": "peru",
  //     "poblacion": totalPoblacion,
  //     "positivos": totalInfectados,
  //     "hombres_infectados": totalInfectadosHombres,
  //     "mujeres_infectados": totalInfectadosMujeres,
  //     "fallecidos": totalFallecidos,
  //     "hombres_fallecidos": totalFallecidosHombres,
  //     "mujeres_fallecidos": totalFallecidosMujeres,
  //     "etapa_de_vida_fallecidos": {
  //         "primera_infancia": totalFallecidosPreinfancia,
  //         "infancia": totalFallecidosInfancia,
  //         "adolescencia": totalFallecidosAdolescencia,
  //         "juventud": totalFallecidosJuventud,
  //         "adultez": totalFallecidosAdultez,
  //         "persona_mayor": totalFallecidosPersonaMayor
  //     },
  //     "fecha": new Date(fechaEnFormatoDate(fecha))
  //   }
  // })

  //Extraer datos por cada fecha (Amazonas)
   // let responsesPeru = fechasSinRepeticiones.map((fecha) => {
  //   let filasInfectados = resInfectados.filter(fila => Number(fila.FECHA_RESULTADO.trim()) <= Number(fecha) || fila.FECHA_RESULTADO.trim() === "");
  //   let filasFallecidos = resFallecidos.filter(fila => Number(fila.FECHA_FALLECIMIENTO.trim()) <= Number(fecha) || fila.FECHA_FALLECIMIENTO.trim() === "");

  //   let totalInfectados = filasInfectados.length;
  //   let totalInfectadosHombres = filasInfectados.filter(fila => fila.SEXO.trim() === "MASCULINO").length;
  //   let totalInfectadosMujeres = filasInfectados.filter(fila => fila.SEXO.trim() === "FEMENINO").length;
    
  //   let totalFallecidos = filasFallecidos.length;
  //   let totalFallecidosHombres = filasFallecidos.filter(fila => fila.SEXO.trim() === "MASCULINO").length;
  //   let totalFallecidosMujeres = filasFallecidos.filter(fila => fila.SEXO.trim() === "FEMENINO").length;
    
  //   let totalFallecidosPreinfancia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 0 && Number(fila.EDAD_DECLARADA.trim()) <= 5).length;
  //   let totalFallecidosInfancia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 6 && Number(fila.EDAD_DECLARADA.trim()) <= 11).length;
  //   let totalFallecidosAdolescencia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 12 && Number(fila.EDAD_DECLARADA.trim()) <= 18).length;
  //   let totalFallecidosJuventud = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 19 && Number(fila.EDAD_DECLARADA.trim()) <= 26).length;
  //   let totalFallecidosAdultez = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 27 && Number(fila.EDAD_DECLARADA.trim()) <= 59).length;
  //   let totalFallecidosPersonaMayor = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 60).length;

  //   return {
  //     "name": "peru",
  //     "poblacion": totalPoblacion,
  //     "positivos": totalInfectados,
  //     "hombres_infectados": totalInfectadosHombres,
  //     "mujeres_infectados": totalInfectadosMujeres,
  //     "fallecidos": totalFallecidos,
  //     "hombres_fallecidos": totalFallecidosHombres,
  //     "mujeres_fallecidos": totalFallecidosMujeres,
  //     "etapa_de_vida_fallecidos": {
  //         "primera_infancia": totalFallecidosPreinfancia,
  //         "infancia": totalFallecidosInfancia,
  //         "adolescencia": totalFallecidosAdolescencia,
  //         "juventud": totalFallecidosJuventud,
  //         "adultez": totalFallecidosAdultez,
  //         "persona_mayor": totalFallecidosPersonaMayor
  //     },
  //     "fecha": new Date(fechaEnFormatoDate(fecha))
  //   }
  // })

  console.log({
    // totalPoblacion,
    // totalInfectados,
    // totalInfectadosHombres,
    // totalInfectadosMujeres,
    // totalFallecidos,
    // totalFallecidosHombres,
    // totalFallecidosMujeres,
    // totalFallecidosPreinfancia,
    // totalFallecidosInfancia,
    // totalFallecidosAdolescencia,
    // totalFallecidosJuventud,
    // totalFallecidosAdultez,
    // totalFallecidosPersonaMayor,
    dataMemory: process.memoryUsage(),
    heapMemory: process.memoryUsage().heapUsed,
    totalMemory: process.memoryUsage().rss
  })

  parentPort.postMessage({
    status: "finished",
    message: "Datos parseados correctamente",
    data: responsesPeru
  })

}).catch(err => {
  console.log(err);
});


// Manejamos el evento "error" en caso de que haya algún problema con el archivo
streamInfectados.on('error', error => {
  console.log(error);
});

streamFallecidos.on('error', error => {
  console.log(error);
});




// Se escucha el evento 'message' que se envía desde el hilo principal
parentPort.on('message', function(data) {
  // Se realiza el procesamiento en el Worker Thread
  var result = data * 2;

  // Se envía el resultado de vuelta al hilo principal
  parentPort.postMessage(result);
});