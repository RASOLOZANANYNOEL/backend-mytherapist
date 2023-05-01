// Cette ligne charge les variables d'environnement depuis le fichier .env
require("dotenv").config();
const app = require('./app.js');

// Cette ligne définit le port sur lequel le serveur écoutera les connexions
// Si la variable d'environnement PORT n'est pas définie, le port 3000 sera utilisé
const PORT = process.env.PORT ?? 3000;

// Cette ligne lance le serveur express pour qu'il écoute les connexions entrantes
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT +'/api-docs')
});
