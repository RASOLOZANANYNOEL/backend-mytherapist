// Cette ligne charge les variables d'environnement depuis le fichier .env
require("dotenv").config();
const cors = require('cors');
// Cette ligne importe le module express
const express = require("express");

// Cette ligne crée une instance d'application express
const app = express();


const multer = require('multer');
const bodyParser = multer();

/*********************************************/
/********* swagger-jsdoc *********/
/*********************************************/

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My Therapist API',
        version: '1.0.0',
        description: 'My Therapist API',
      },
      servers: [
        {
          url: 'http://localhost:3010',
        },
      ]
    },
    apis: ['./app/router/*.js'], // files containing annotations as above
  };
  
const openapiSpecification = swaggerJsdoc(options);
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// on autorise les requêtes depuis d'autres domaines que celui de notre API
// important => appeler ce middleware avant le routeur


app.use( bodyParser.none() )

// Cette ligne configure l'analyseur de corps JSON pour l'application express
app.use(cors());
app.use(express.json());

/*********************************************/
/************** Config Express ***************/
/*********************************************/

const routerTherapists =require('./app/router/therapistsRouter');
const routerSpecialties =require('./app/router/specialtiesRouter');
const routerAdmin =require('./app/router/adminRouter');
const routerPatients = require("./app/router/patientsRouter");
const routerAlgorithm = require("./app/router/algorithmRouter");
const routerQuizz = require('./app/router/quizzRouter');
const routerAuth = require("./app/router/authRouter");

app.use('/auth', routerAuth);
app.use('/therapists',routerTherapists);
app.use('/specialties',routerSpecialties);
app.use('/admin',routerAdmin);
app.use('/patients',routerPatients);
app.use('/algorithm',routerAlgorithm);
app.use('/quizz',routerQuizz);


// Cette ligne définit le port sur lequel le serveur écoutera les connexions
// Si la variable d'environnement PORT n'est pas définie, le port 3000 sera utilisé
const PORT = process.env.PORT ?? 3000;

// Cette ligne lance le serveur express pour qu'il écoute les connexions entrantes
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT +'/api-docs')
});
