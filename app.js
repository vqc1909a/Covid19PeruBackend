const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db.js');
const { Worker } =  require("worker_threads");
const { NotFoundMiddleware, ErrorMiddleware} = require('./middlewares');

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

require('dotenv').config();
const port = process.env.PORT || 4000;
connectDB()
.then(() => {
  //Create Worker
  const worker = new Worker("./worker.js");
  // worker.postMessage(5);

  //Eventos del Worker
  worker.on("error", function(e){
    //Erro de sintaxis en tu worker
    console.log(e);
    console.error(`Main: There is an error with your worker!`);
  })
  worker.on("message", async function(result){
    console.log(`Main: Message received from worker`);
    // const response = await Peru.insertMany(result.data);
    // console.log({
    //   response
    // })
    if(result.status === "finished"){
      console.log("Deteniendo el worker");
      worker.terminate();
    }
  })
  worker.on("messageerror", function(e){
    //Aun nose como se generar este error
    console.log(e);
    console.error(`Main: Error receiving message from worker`);
  })


  //Middlewares
  app.use(cors());
  app.use(express.json());

  global.peru = {};
  global.amazonas = {};
  global.ancash = {};
  global.apurimac = {};
  global.arequipa = {};
  global.ayacucho = {};
  global.cajamarca = {};
  global.callao = {};
  global.cusco = {};
  global.huancavelica = {};
  global.huanuco = {};
  global.ica = {};
  global.junin = {};
  global.lalibertad = {};
  global.lambayeque = {};
  global.lima = {};
  global.loreto = {};
  global.madrededios = {};
  global.moquegua = {};
  global.pasco = {};
  global.piura = {};
  global.puno = {};
  global.sanmartin = {};
  global.tacna = {};
  global.tumbes = {};
  global.ucayali = {};


  //APIS
  app.use('/', require('./routes/AppRoute'));
  app.use('/api', require('./routes/GeneralApi'));
  app.use('/api', require('./routes/DepartamentoApi'));
  app.use('/api', require('./routes/ProvinciaApi'));

  //Middleware
  app.use(NotFoundMiddleware);
  app.use(ErrorMiddleware);

  app.listen(port, () => {
    console.log(`Server run on port ${port}`);
  })

})
.catch(err => {
  console.log(err)
});




