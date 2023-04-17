// Cette ligne charge les variables d'environnement depuis le fichier .env
require("dotenv").config();
// Cette ligne importe le module express
const express = require("express");

// Cette ligne crée une instance d'application express
const app = express();

// Cette ligne configure l'analyseur de corps JSON pour l'application express
app.use(express.json());

const routerTherapists =require('./app/router/therapistsRouter');
const routerSpecialties =require('./app/router/specialtiesRouter');
const routerAdmin =require('./app/router/adminRouter');
const routerPatients = require("./app/router/patientsRouter");

app.use('/therapists',routerTherapists);
app.use('/specialties',routerSpecialties);
app.use('/admin',routerAdmin);
app.use('/patients',routerPatients);



// Cette ligne définit le port sur lequel le serveur écoutera les connexions
// Si la variable d'environnement PORT n'est pas définie, le port 3000 sera utilisé
const PORT = process.env.PORT ?? 3000;

// Cette ligne lance le serveur express pour qu'il écoute les connexions entrantes
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});