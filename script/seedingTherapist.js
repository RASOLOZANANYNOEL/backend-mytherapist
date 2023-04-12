import * as dotenv from "dotenv";
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool();


import { faker } from '@faker-js/faker';
faker.locale = 'fr';

import adresses from './Paris01.js';
const adresse = adresses
const therapists = [];

//therapist seeding
console.time("Ajout des utilisateurs");
for (let counter = 0; counter < 50; counter++) {
  const therapist = {
    email : faker.internet.email(),
    lastname: faker.name.lastName(),
    firstname: faker.name.firstName(),
    password:faker.internet.password(),
    phonenumber: faker.phone.number('06########'),
    adelinumber:faker.random.numeric(9),
    profilpicture: "NULL",
    profilpresentation : faker.lorem.text(100),
    streetname : adresse[counter % adresse.length].libelle_voie_complet,
    zipcode : adresse[counter % adresse.length].code_commune,
    city : "Paris",
    complement : faker.lorem.text(100),
    videosession: faker.datatype.boolean(),
    audiosession: faker.datatype.boolean(),
    chatsession: faker.datatype.boolean(),
    sessionatoffice: faker.datatype.boolean(),
    gender: faker.name.sex(),
  };

  // console.log(therapist.profilpresentation);

  therapists.push(therapist);
}
console.log("Nombre de therapistes : ", therapists.length);
console.time("Ajout des therapistes");




async function importData() {
    await pool.connect();
  
    let values = [];
    let parameters = [];
    let parameterCounter = 1;
    let requestCount = 0;
  
    for (const therapist of therapists) {
      // Ajouter l'utilisateur
      values.push(therapist.email);
      values.push(therapist.lastname);
      values.push(therapist.firstname);
      values.push(therapist.password);
      values.push(therapist.phonenumber);
      values.push(therapist.adelinumber);
      values.push(therapist.profilpicture);
      values.push(therapist.profilpresentation);
      values.push(therapist.streetname);
      values.push(therapist.zipcode);
      values.push(therapist.city);
      values.push(therapist.complement);
      values.push(therapist.videosession);
      values.push(therapist.audiosession);
      values.push(therapist.chatsession);
      values.push(therapist.sessionatoffice);
      values.push(therapist.gender);
  
      parameters.push(`($${parameterCounter},$${parameterCounter + 1},$${parameterCounter + 2},$${parameterCounter + 3},$${parameterCounter + 4},$${parameterCounter + 5},$${parameterCounter + 6},$${parameterCounter + 7},$${parameterCounter + 8},$${parameterCounter + 9},$${parameterCounter + 10},$${parameterCounter + 11},$${parameterCounter + 12},$${parameterCounter + 13},$${parameterCounter + 14},$${parameterCounter + 15},$${parameterCounter + 16})`);
      parameterCounter += 17;
    }
  
    if (values.length > 0) {
      const sqlQuery = `INSERT INTO "therapists" (email,lastname,firstname,password, phonenumber,adelinumber,profilpicture, profilpresentation, streetname,zipcode, city,complement, videosession, audiosession, chatsession, sessionatoffice,gender) VALUES ${parameters.join()}`;
      await pool.query(sqlQuery, values);
      requestCount++;
    }
  
    console.timeEnd("Ajout des therapistes");
    console.log("Nombre de requêtes : ", requestCount);
  
    await pool.end();
  }
  
  importData();