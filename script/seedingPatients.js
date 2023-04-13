import * as dotenv from "dotenv";
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool();

import { faker } from '@faker-js/faker';
faker.locale = 'fr';

import adressesP2 from './Paris02.js';
const adresse = adressesP2
const patients = [];

//patient seeding
console.time("Ajout des utilisateurs");
for (let counter = 0; counter < 10; counter++) {
const patient = {
email : faker.internet.email(),
lastname: faker.name.lastName(),
firstname: faker.name.firstName(),
password:faker.internet.password(),
phonenumber: faker.phone.number('06########'),
profilpicture: "NULL",
streetname : adresse[counter % adresse.length].libelle_voie_complet,
zipcode : adresse[counter % adresse.length].code_commune,
city : "Paris",
complement : faker.lorem.text(100),
quizz_id : counter + 1
};
console.log(patient);
patients.push(patient);

}
console.log("Nombre de patients : ", patients.length);
console.timeEnd("Ajout des patients");

async function importData() {
    await pool.connect();
  
    let values = [];
    let parameters = [];
    let parameterCounter = 1;
    let requestCount = 0;
  
    for (const patient of patients) {
      // Ajouter l'utilisateur
      values.push(patient.email);
      values.push(patient.lastname);
      values.push(patient.firstname);
      values.push(patient.password);
      values.push(patient.phonenumber);
      values.push(patient.profilpicture);
      values.push(patient.streetname);
      values.push(patient.zipcode);
      values.push(patient.city);
      values.push(patient.complement);
      values.push(patient.quizz_id);
  
      parameters.push(`($${parameterCounter},$${parameterCounter + 1},$${parameterCounter + 2},$${parameterCounter + 3},$${parameterCounter + 4},$${parameterCounter + 5},$${parameterCounter + 6},$${parameterCounter + 7},$${parameterCounter + 8},$${parameterCounter + 9},$${parameterCounter + 10})`);
      parameterCounter += 11;
    }
  
    if (values.length > 0) {
      const sqlQuery = `INSERT INTO "patients" (email,lastname,firstname,password, phonenumber,profilpicture,streetname,zipcode, city,complement,quizz_id) VALUES ${parameters.join()}`;
      await pool.query(sqlQuery, values);
      requestCount++;
    }
  
    console.timeEnd("Ajout des patients");
    console.log("Nombre de requêtes : ", requestCount);
  
    await pool.end();
  }
  
  importData();