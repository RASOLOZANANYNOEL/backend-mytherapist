const APIError = require("./APIError");
const debug = require("debug")("error");
const path = require("path");
const fs = require('fs').promises;
const createWriteStream = require('fs').createWriteStream;

const errorModule = {
    /**
     * Méthode pour gérer le log d'erreurs et la réponse au client
     * @param {*} err 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async manage(err, req, res, next) {
        // 1. J'enregistre l'erreur avec les infos nécessaires pour pouvoir analyser le soucis (log d'erreur)
        await errorModule.log(err, req.url);

        // 2. J'informe le client/utilisateur
        switch (err.code) {
            case 400:
                res.status(400).json("Bad request");
                break;
            case 404:
                res.status(404).json("Not found");
                break;
            default:
                res.status(err.code).json("Internal server error");
                break;
        }

    },
    /**
     * Gère l'erreur 404
     * @param {*} _ 
     * @param {*} __ 
     * @param {*} next middleware pour indiquer à Express qu'il y a une erreur
     */
    _404(_, __, next) {
        next(new APIError('Not found', 404));
    },
    async log(err, context) {
        debug(err); // <= debug en DEV

        // je vais générer des fichiers textes qui vont enregistrer les erreurs // <= log pour la production
        const fileName = new Date().toISOString().slice(0, 10) + ".log";
        const filePath = path.resolve(__dirname, "../../log") + "/" + fileName;
        const fileBody = `${new Date().toISOString()};${context};${err.message}\n`;

        const isFileExist = await fileExists(filePath);

        try {
           // si le fichier n'existe pas
           if (!isFileExist) {
                await fs.appendFile(filePath,"date;contexte;message\n");
            }

            let file = await fs.open(filePath,"a");
            await file.appendFile(fileBody);
            file.close();
        }
        catch (error) {
            console.log(error);
        }

    }
};

module.exports = errorModule;

async function fileExists (path) {  
    try {
      await fs.access(path)
      return true
    } catch {
      return false
    }
  }
