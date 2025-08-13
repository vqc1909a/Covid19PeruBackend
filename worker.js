// Este es el código del Worker Thread que se ejecutará en un hilo separado
console.log("Ejecutando un worker")
const { parentPort } = require('worker_threads');
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
// const stream = require('stream');
const slug = require("slug");
const DEPARTAMENTOS = require("./helpers/departamentos");
const resInfectados = [];
const resFallecidos = [];
const resPoblacion = [];
const {DateTime} = require("luxon");

// function fechaEnFormatoDate(fecha) {
//   const fechaFormateada = `${fecha.slice(0,4)}-${fecha.slice(4,6)}-${fecha.slice(6,8)}`;
//   return new Date(fechaFormateada);
// }

const URL_INFECTADOS = "https://files.minsa.gob.pe/s/qWfz3p5mJBtmMEp/download";
const URL_FALLECIDOS = "https://files.minsa.gob.pe/s/t9AFqRbXw3F55Ho/download";
const URL_POBLACION = "https://cloud.minsa.gob.pe/s/Jwck8Z59snYAK8S/download";
const urls = [
  URL_INFECTADOS,
  URL_FALLECIDOS,
  URL_POBLACION
]
const filenames = [
  'positivos_covid.csv',
  'fallecidos_covid.csv',
  'poblacion.csv'
]

// Arreglo de promesas
const promises = [];
// Descargar y guardar los archivos CSV
for (let i = 0; i < urls.length; i++) {
  promises.push(
    axios.get(urls[i])
      .then(response => {
        fs.writeFileSync(filenames[i], response.data);
        console.log(`Archivo ${filenames[i]} descargado y guardado exitosamente.`);
      })
      .catch(error => {
        console.error(`Error al descargar el archivo ${filenames[i]}: ${error}`);
      })
  );
}

// Ejecutar una acción cuando se hayan descargado y guardado todos los archivos
Promise.all(promises)
.then(() => {
  console.log('Todas las descargas y guardados se han completado exitosamente.');
  // Ejecutar la acción que deseas realizar aquí

  // When you use fs.createReadStream, you create a readable stream from a file. This stream reads the file chunk by chunk and emits events like data (when a chunk is available) and end (when reading is finished). 
  const streamInfectados = fs.createReadStream("./positivos_covid.csv");
  const streamFallecidos = fs.createReadStream("./fallecidos_covid.csv");
  const streamPoblacion = fs.createReadStream("./poblacion.csv");

  // Creates a stream that parses each row of the CSV file into a JavaScript object as the file is read.
  const csvStreamInfectados = streamInfectados.pipe(csv({ separator: ';' }));
  const csvStreamFallecidos= streamFallecidos.pipe(csv({ separator: ';' }));
  const csvStreamPoblacion= streamPoblacion.pipe(csv({ separator: ';' }));

  // You create the array of objects by listening to the 'data' event:
  csvStreamInfectados.on('data', data => {
    resInfectados.push(data);
  });
  csvStreamFallecidos.on('data', data => {
    resFallecidos.push(data);
  })
  csvStreamPoblacion.on('data', data => {
    resPoblacion.push(data);
  })

  // The 'end' event is emitted by a stream when it has finished reading all data. In your code, you listen for the 'end' event on each CSV stream to know when the parsing of the file is complete:

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

    //Fecha Actual
    let date = DateTime.now().setZone("America/Lima");
    let day = date.day;
    let month = date.month;
    let year = date.year;
    day = String(day).length === 1 ? `0${day}` : day;
    month = String(month).length === 1 ? `0${month}` : month;

    //Esto lo usaremos para el script diario que se haría
    
    const obtenerDatosPoblacionPorDepartamento = (departamento) => {
      return resPoblacion.filter(fila => fila.Departamento.trim() === departamento);
    }
    const calcularTotalPoblacionPorDepartamento = (departamento) => {
      return obtenerDatosPoblacionPorDepartamento(departamento).reduce((accumulator, currentValue) => accumulator + (Number(currentValue.Cantidad) || 0), initialValue)
    }

    //Array de objetos, cada objeto es una fila de la tabla de datos
    let fechasConRepeticiones = [];
		for (let i = 0; i < resInfectados.length; i++) {
			fechasConRepeticiones.push(
				resInfectados[i].FECHA_RESULTADO.trim()
			);
		}

    let fechasSinRepeticiones = [];
		let seen = new Set();

		for (let i = 0; i < fechasConRepeticiones.length; i++) {
			let fecha = fechasConRepeticiones[i];
			if (fecha !== "" && !seen.has(fecha)) {
				seen.add(fecha);
				fechasSinRepeticiones.push(fecha);
			}
		}

    //Ordenamos las fechas de forma ascendente, en este caso trabajamos con la fecha de los infectados porque hay mas fechas ahi
    //NOTA: Hay fechas vacías "", la cantidad de ello lo aumentaremos en cada una de las fechas, asi que no hay problema
    fechasSinRepeticiones.sort((fechaAnterior, fechaSiguiente) => fechaAnterior - fechaSiguiente);
    
    //PERÚ
    
    //DEPARTAMENTO

    //SCRIPT A DIARIO
    let responses = [];

    // let filasInfectados = resInfectados.filter(fila => fila.FECHA_RESULTADO <= "20230507");
    // let filasFallecidos = resFallecidos.filter(fila => fila.FECHA_FALLECIMIENTO <= "20230507");

    let filasInfectados = resInfectados;
    let filasFallecidos = resFallecidos;

    let totalInfectados = filasInfectados.length;
    let totalInfectadosHombres = filasInfectados.filter(fila => fila.SEXO.trim() === "MASCULINO").length;
    let totalInfectadosMujeres = filasInfectados.filter(fila => fila.SEXO.trim() === "FEMENINO").length;

    let totalFallecidos = filasFallecidos.length;
    let totalFallecidosHombres = filasFallecidos.filter(fila => fila.SEXO.trim() === "MASCULINO").length;
    let totalFallecidosMujeres = filasFallecidos.filter(fila => fila.SEXO.trim() === "FEMENINO").length;

    let totalFallecidosPreinfancia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 0 && Number(fila.EDAD_DECLARADA.trim()) <= 5).length;
    let totalFallecidosInfancia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 6 && Number(fila.EDAD_DECLARADA.trim()) <= 11).length;
    let totalFallecidosAdolescencia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 12 && Number(fila.EDAD_DECLARADA.trim()) <= 18).length;
    let totalFallecidosJuventud = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 19 && Number(fila.EDAD_DECLARADA.trim()) <= 26).length;
    let totalFallecidosAdultez = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 27 && Number(fila.EDAD_DECLARADA.trim()) <= 59).length;
    let totalFallecidosPersonaMayor = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 60).length;

    const responsePeru = {
        "name": "peru",
        "poblacion": totalPoblacion,
        "positivos": totalInfectados,
        "hombres_infectados": totalInfectadosHombres,
        "mujeres_infectados": totalInfectadosMujeres,
        "fallecidos": totalFallecidos,
        "hombres_fallecidos": totalFallecidosHombres,
        "mujeres_fallecidos": totalFallecidosMujeres,
        "etapa_de_vida_fallecidos": {
            "primera_infancia": totalFallecidosPreinfancia,
            "infancia": totalFallecidosInfancia,
            "adolescencia": totalFallecidosAdolescencia,
            "juventud": totalFallecidosJuventud,
            "adultez": totalFallecidosAdultez,
            "persona_mayor": totalFallecidosPersonaMayor
        },
        // "fecha": new Date(`2023-05-01`)
        "fecha": new Date(`${year}-${month}-${day}`)
    }
    const responseDepartamentos = DEPARTAMENTOS.map((DEPARTAMENTO) => {
        // let filasInfectados = resInfectados.filter(fila => fila.DEPARTAMENTO.trim() === DEPARTAMENTO.departamento && fila.FECHA_RESULTADO <= "20230507");
        // let filasFallecidos = resFallecidos.filter(fila => fila.DEPARTAMENTO.trim() === DEPARTAMENTO.departamento && fila.FECHA_FALLECIMIENTO <= "20230507");

        let filasInfectados = resInfectados.filter(fila => fila.DEPARTAMENTO.trim() === DEPARTAMENTO.departamento);
        let filasFallecidos = resFallecidos.filter(fila => fila.DEPARTAMENTO.trim() === DEPARTAMENTO.departamento);

        let totalInfectados = filasInfectados.length;
        let totalInfectadosHombres = filasInfectados.filter(fila => fila.SEXO.trim() === "MASCULINO").length;
        let totalInfectadosMujeres = filasInfectados.filter(fila => fila.SEXO.trim() === "FEMENINO").length;

        let totalFallecidos = filasFallecidos.length;
        let totalFallecidosHombres = filasFallecidos.filter(fila => fila.SEXO.trim() === "MASCULINO").length;
        let totalFallecidosMujeres = filasFallecidos.filter(fila => fila.SEXO.trim() === "FEMENINO").length;

        let totalFallecidosPreinfancia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 0 && Number(fila.EDAD_DECLARADA.trim()) <= 5).length;
        let totalFallecidosInfancia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 6 && Number(fila.EDAD_DECLARADA.trim()) <= 11).length;
        let totalFallecidosAdolescencia = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 12 && Number(fila.EDAD_DECLARADA.trim()) <= 18).length;
        let totalFallecidosJuventud = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 19 && Number(fila.EDAD_DECLARADA.trim()) <= 26).length;
        let totalFallecidosAdultez = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 27 && Number(fila.EDAD_DECLARADA.trim()) <= 59).length;
        let totalFallecidosPersonaMayor = filasFallecidos.filter(fila => Number(fila.EDAD_DECLARADA.trim()) >= 60).length;

        let provincias = DEPARTAMENTO.provincias.map((provincia) => {
          return {
              "name": provincia.toLowerCase(),
              "poblacion": obtenerDatosPoblacionPorDepartamento(DEPARTAMENTO.departamento).filter(fila => fila.Provincia.trim() === provincia).reduce((accumulator, currentValue) => accumulator + (Number(currentValue.Cantidad) || 0), initialValue),
              "positivos": filasInfectados.filter(fila => fila.PROVINCIA.trim() === provincia).length,
              "hombres_infectados": filasInfectados.filter(fila =>  fila.PROVINCIA.trim() === provincia && fila.SEXO.trim() === "MASCULINO").length,
              "mujeres_infectados": filasInfectados.filter(fila => fila.PROVINCIA.trim() === provincia && fila.SEXO.trim() === "FEMENINO").length,
              "fallecidos": filasFallecidos.filter(fila => fila.PROVINCIA.trim() === provincia).length,
              "hombres_fallecidos": filasFallecidos.filter(fila =>  fila.PROVINCIA.trim() === provincia && fila.SEXO.trim() === "MASCULINO").length,
              "mujeres_fallecidos": filasFallecidos.filter(fila => fila.PROVINCIA.trim() === provincia && fila.SEXO.trim() === "FEMENINO").length,
              "type": "Provincia",
              "etapa_de_vida_fallecidos": {
              "primera_infancia": filasFallecidos.filter(fila => fila.PROVINCIA.trim() === provincia && Number(fila.EDAD_DECLARADA.trim()) >= 0 && Number(fila.EDAD_DECLARADA.trim()) <= 5).length,
              "infancia": filasFallecidos.filter(fila => fila.PROVINCIA.trim() === provincia && Number(fila.EDAD_DECLARADA.trim()) >= 6 && Number(fila.EDAD_DECLARADA.trim()) <= 11).length,
              "adolescencia": filasFallecidos.filter(fila => fila.PROVINCIA.trim() === provincia && Number(fila.EDAD_DECLARADA.trim()) >= 12 && Number(fila.EDAD_DECLARADA.trim()) <= 18).length,
              "juventud": filasFallecidos.filter(fila => fila.PROVINCIA.trim() === provincia && Number(fila.EDAD_DECLARADA.trim()) >= 19 && Number(fila.EDAD_DECLARADA.trim()) <= 26).length,
              "adultez": filasFallecidos.filter(fila => fila.PROVINCIA.trim() === provincia && Number(fila.EDAD_DECLARADA.trim()) >= 27 && Number(fila.EDAD_DECLARADA.trim()) <= 59).length,
              "persona_mayor": filasFallecidos.filter(fila => fila.PROVINCIA.trim() === provincia && Number(fila.EDAD_DECLARADA.trim()) >= 60).length
              },
              // "fecha": new Date(`2023-05-01`)
              "fecha": new Date(`${year}-${month}-${day}`) 
          }
        })
        return {
            "name": DEPARTAMENTO.departamento.toLowerCase(),
            "poblacion": calcularTotalPoblacionPorDepartamento(DEPARTAMENTO.departamento),
            "positivos": totalInfectados,
            "hombres_infectados": totalInfectadosHombres,
            "mujeres_infectados": totalInfectadosMujeres,
            "fallecidos": totalFallecidos,
            "hombres_fallecidos": totalFallecidosHombres,
            "mujeres_fallecidos": totalFallecidosMujeres,
            "type": "Departamento",
            "etapa_de_vida_fallecidos": {
                "primera_infancia": totalFallecidosPreinfancia,
                "infancia": totalFallecidosInfancia,
                "adolescencia": totalFallecidosAdolescencia,
                "juventud": totalFallecidosJuventud,
                "adultez": totalFallecidosAdultez,
                "persona_mayor": totalFallecidosPersonaMayor
            },
            "url": slug(DEPARTAMENTO.departamento.toLowerCase()),
            "provincias": provincias,
            // "fecha": new Date(`2023-05-01`)
            "fecha": new Date(`${year}-${month}-${day}`)

        }
    })

    console.log({
      dataMemory: process.memoryUsage(),
      heapMemory: process.memoryUsage().heapUsed,
      totalMemory: process.memoryUsage().rss
    })
    responses = [responsePeru, ...responseDepartamentos];
    parentPort.postMessage({
      status: "finished",
      message: "Datos parseados correctamente",
      data: responses
    })
  }).catch(err => {
    parentPort.postMessage({
        status: "error",
        message: `Ocurrio un error al procesar los archivos csv en objetos javascript ${err.message}`,
    });
  });

  // Manejamos el evento "error" en caso de que haya algún problema con los archivos
  streamInfectados.on('error', error => {
    parentPort.postMessage({
        status: "error",
        message: error,
    })
  });
  streamFallecidos.on('error', error => {
    parentPort.postMessage({
        status: "error",
        message: error,
    })
  });
  streamPoblacion.on('error', error => {
      parentPort.postMessage({
        status: "error",
        message: error,
    })
  });  
})
.catch(err => {
    parentPort.postMessage({
        status: "error",
        message: `Ocurrió un error al descargar y guardar los archivos: ${err.message}`,
    })
});


