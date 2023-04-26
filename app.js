const express = require('express');
const cors = require('cors');
const app = express();
const { Worker } =  require("worker_threads");
const CronJob = require('cron').CronJob;
const connectDB = require('./config/db.js');
const helmet = require("helmet");
const { NotFoundMiddleware, ErrorMiddleware} = require('./middlewares');
const rateLimit = require('express-rate-limit');
const compression = require('compression')

require('dotenv').config();

const {
  Loreto, 
  Amazonas,
  Tumbes,
  Piura,
  Lambayeque,
  Cajamarca,
  LaLibertad,
  Ancash,
  SanMartin,
  Huanuco,
  Ucayali,
  Pasco,
  Lima,
  Junin,
  Huancavelica,
  Ica,
  Ayacucho,
  Apurimac,
  Cusco,
  MadreDeDios,
  Puno,
  Arequipa,
  Moquegua,
  Tacna,
  Callao} = require('./models/DepartamentoModel.js');
const Peru = require('./models/PeruModel');

const apiLimiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000, // 24 horas
	max: 100, // Limit each IP to 100 requests per `window` (here, per 24 horas)
  message: "Demasiadas peticiones realizadas a partir de esta IP, intente nuevamente después de 24 horas",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

require('dotenv').config();
const port = process.env.PORT || 4000;
connectDB()
.then(() => {

  //Cron Job  
  //CONSTRUCTOR
  // constructor(cronTime, onTick, onComplete, start, timezone, context, runOnInit, utcOffset, unrefTimeout)
  //    * cronTime(Required): El momento de iniciar tu trabajo. Esto puede ser en forma de sintaxis cron o un objeto JS Date.
  //      Seconds: 0-59
  //      Minutes: 0-59
  //      Hours: 0-23
  //      Day of Month: 1-31
  //      Months: 0-11 (Jan-Dec)
  //      Day of Week: 0-6 (Sun-Sat)
  //    * onTick(Required): La función para disparar a la hora especificada. Si se proporcionó una devolución de llamada onComplete, onTick la recibirá como argumento. onTick puede llamar a onComplete cuando haya terminado su trabajo.
  //    * onComplete(Optional): Una función que se activará cuando el trabajo se detenga con job.stop(), y onTick también puede llamarla al final de cada ejecución.
  //    * start(Optional): Especifica si inicia el trabajo justo antes de salir del constructor (new CronJob()). De forma predeterminada, esto se establece en falso. Si se deja en forma predeterminada, deberá llamar a job.start() para iniciar el trabajo (suponiendo que job sea la variable en la que configuró el cronjob). Esto no activa inmediatamente su función onTick, solo le da más control sobre el comportamiento de sus trabajos.
  //    * timezone(Optional): Especifique la zona horaria para la ejecución. Esto modificará la hora real relativa a su zona horaria. Si la zona horaria no es válida, se genera un error. Puede consultar todas las zonas horarias disponibles en el sitio web Moment Timezone. Probablemente no use timeZone y utcOffset juntos o pueden suceder cosas extrañas.
  //    * context(Optional): El contexto dentro del cual ejecutar el método onTick. Esto por defecto es el cronjob en sí mismo, lo que le permite llamar a this.stop(). Sin embargo, si cambia esto, tendrá acceso a las funciones y valores dentro de su objeto de contexto.
  //    * runOnInit(Optional): Esto activará inmediatamente su función onTick tan pronto como haya ocurrido la inicialización requerida. Esta opción se establece en falso de forma predeterminada para la compatibilidad con versiones anteriores.
  //    * utcOffset(Optional): Esto le permite especificar el desplazamiento de su zona horaria en lugar de usar el parámetro timeZone. Debe ser una cantidad entera que represente el número de minutos de compensación (como 120 para +2 horas o -90 para -1,5 horas). Probablemente no use timeZone y utcOffset juntos o pueden suceder cosas extrañas.
  //    * unrefTimeout(Optional): Si tiene un código que mantiene el bucle de eventos en ejecución y desea detener el proceso del nodo cuando finaliza independientemente del estado de su cronjob, puede hacerlo utilizando este parámetro. Esto está desactivado de forma predeterminada y cron se ejecutará como si necesitara controlar el ciclo de eventos. Para obtener más información, consulte timers#timers_timeout_unref en los documentos de NodeJS.

  //METODOS DEL CONSTRUCTOR
  // * start: Ejecuta tu trabajo.
  // * stop: Detiene su trabajo.
  // * setTime: Detiene y cambia la hora del CronJob. Parametro debe ser un CronTime.
  // * lastDate: Te dice la última fecha de ejecución.
  // * nextDates: Proporciona una matriz del siguiente conjunto de fechas que activará un onTick.
  // * fireOnTick: Le permite anular el comportamiento de llamada de onTick. Esto es importante, así que solo hazlo si tienes una muy buena razón para hacerlo.
  // * addCallback: Le permite agregar devoluciones de llamada onTick.


  //EJEMPLOS DE TIEMPOS
  //(EJEMPLOS PARA TIEMPOS COTIDIANOS)
  //*: Significa todos los valores que permite cada posición, como por ejemplo en los segundos sería así => 0,1,2,3,4,5,6....59, entonces si tu pones */60, sería cada 60 de estos, en total un minuto, como tope maximo es pues entre 60 y de igual forma para los otros valores
  //Cada 30 segundo: '*/30 * * * * *' => esto pues significa cada 30 segundos de cada minuto de cada hora de cada dia de cada mes de cada mes de cada día de la semana
  //Cada 2 minuto: '0 */2 * * * *' === '*/2 * * * *' => esto significa cada dos minuto de cada hora de cada día de cada mes.........
  //Cada 1 hora: '0 0 */1 * * *' === '*/1 * * *' => esto significa cada hora de cada día de cada mes.........

  //(EJEMPLOS PARA FECHAS ESPECIFICAS)
  //'0 30 4 1,15 * 5' => haría que se ejecutara un comando a las 4:30 am los días 1 y 15 de cada mes, además de todos los viernes.
  //'5 0 * * *' => correr cinco minutos después de la medianoche, todos los días
  //'0 10 23 * * *' => me ejecuta cada 23 horas con 10 minutos de cada día de cada mes de cada día de la semana
  //'15 14 1 * *' => se ejecuta a las 2:15 p. m. el primer día de cada mes;
  //'0 22 * * 1-5' => ejecutar a las 10 pm cada día de la semana;
  //'23 0-23/2 * * *' => correr 23 minutos después de la medianoche, 2am, 4am..., todos los días
  //'5 4 * * sun' => correr a las 5 después de las 4 am todos los domingos
  let job = new CronJob(
      '0 56 22 * * *',
      function() {
        console.log('You will see this message every 22 hours of everyday');
          //Create Worker
          const worker = new Worker("./worker.js");
          //Eventos del Worker
          worker.on("error", function(e){
            //Error de sintaxis en tu worker
            console.log(e);
            console.error(`Main: There is an error with your worker!`);
            console.log("Deteniendo el worker");
            worker.terminate();
          })
          worker.on("message", async function(result){
            try{
              console.log(`Main: Message received from worker`);
              const message = result.message
              //PERU
              // const response = await Peru.insertMany(result.data);
              // console.log({
              //   response
              // })

              //DEPARTAMENTO
              // const response = await Ucayali.insertMany(result.data);
              // console.log({
              //   response
              // })

              //SCRIPT A DIARIO
              let responses = result.data;
              let responsePromises = await Promise.all([
                Peru.create(responses[0]), 
                Amazonas.create(responses[1]),
                Ancash.create(responses[2]),
                Apurimac.create(responses[3]),
                Arequipa.create(responses[4]),
                Ayacucho.create(responses[5]),
                Cajamarca.create(responses[6]),
                Callao.create(responses[7]),
                Cusco.create(responses[8]),
                Huancavelica.create(responses[9]),
                Huanuco.create(responses[10]),
                Ica.create(responses[11]),
                Junin.create(responses[12]),
                LaLibertad.create(responses[13]),
                Lambayeque.create(responses[14]),
                Lima.create(responses[15]),
                Loreto.create(responses[16]),
                MadreDeDios.create(responses[17]),
                Moquegua.create(responses[18]),
                Pasco.create(responses[19]),
                Piura.create(responses[20]),
                Puno.create(responses[21]),
                SanMartin.create(responses[22]),
                Tacna.create(responses[23]),
                Tumbes.create(responses[24]),
                Ucayali.create(responses[25]),
              ]);

              if(result.status === "finished"){
                console.log(message);
                console.log("Deteniendo el worker");
                worker.terminate();
              }
              if(result.status === "error"){
                console.log(message);
                worker.terminate();                
              }
            }catch(err){
              console.log(err.message);
              console.log("Deteniendo el worker");
              worker.terminate();
            }
            
          })
          worker.on("messageerror", function(e){
            //Aun nose como se genera este error
            console.log(e);
            console.error(`Main: Error receiving message from worker`);
            console.log("Deteniendo el worker");
            worker.terminate();
          })
      },
      null,
      true,
      'America/Lima' //Zona Horaria de Perú => https://momentjs.com/timezone/
  );


  //Middlewares
  app.use(express.json());

  app.use(helmet());
  app.use(compression());


  //APIS
  app.use('/', cors({origin: process.env.REACT_APP_FRONTEND_URL}), require('./routes/AppRoute'));
  app.use('/api', cors({origin: "*"}), apiLimiter, require('./routes/GeneralApi'));
  app.use('/api', cors({origin: "*"}), apiLimiter, require('./routes/DepartamentoApi'));
  app.use('/api', cors({origin: "*"}), apiLimiter, require('./routes/ProvinciaApi'));

  //Middlewares
  app.use(NotFoundMiddleware);
  app.use(ErrorMiddleware);

  app.listen(port, () => {
    console.log(`Server run on port ${port}`);
  })

})
.catch(err => {
  console.log(err)
  process.exit(1);
});




