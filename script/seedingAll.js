import * as dotenv from "dotenv";
dotenv.config();
import pkg from 'pg';
const {
    Pool
} = pkg;
const pool = new Pool();


import {
    faker
} from '@faker-js/faker';
faker.locale = 'fr';

/*********************************************/
/************** therapists seeding ***************/
/*********************************************/

import adresses from './Paris01.js';
const adresse = adresses
const therapists = [];

//therapist seeding
console.time("Ajout des utilisateurs");
for (let counter = 0; counter < 50; counter++) {
    const therapist = {
        email: faker.internet.email(),
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        password: faker.internet.password(),
        phonenumber: faker.phone.number('06########'),
        adelinumber: faker.random.numeric(9),
        profilpicture: "NULL",
        profilpresentation: faker.lorem.text(100),
        streetname: adresse[counter % adresse.length].libelle_voie_complet,
        zipcode: adresse[counter % adresse.length].code_commune,
        city: "Paris",
        complement: faker.lorem.text(100),
        videosession: faker.datatype.boolean(),
        audiosession: faker.datatype.boolean(),
        chatsession: faker.datatype.boolean(),
        sessionatoffice: faker.datatype.boolean(),
        gender: faker.name.sex(),
        updated_at: "2020-04-20 14:00:00-04",
        role: "therapist",
    };

    // console.log(therapist);

    therapists.push(therapist);
}
console.log("Nombre de therapistes : ", therapists.length);
console.time("Ajout des therapistes");




async function importDataTherapists() {
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
        values.push(therapist.updated_at);
        values.push(therapist.role);

        parameters.push(`($${parameterCounter},$${parameterCounter + 1},$${parameterCounter + 2},$${parameterCounter + 3},$${parameterCounter + 4},$${parameterCounter + 5},$${parameterCounter + 6},$${parameterCounter + 7},$${parameterCounter + 8},$${parameterCounter + 9},$${parameterCounter + 10},$${parameterCounter + 11},$${parameterCounter + 12},$${parameterCounter + 13},$${parameterCounter + 14},$${parameterCounter + 15},$${parameterCounter + 16},$${parameterCounter + 17},$${parameterCounter + 18})`);
        parameterCounter += 19;
    }

    if (values.length > 0) {
        const sqlQuery = `INSERT INTO "therapists" (email,lastname,firstname,password, phonenumber,adelinumber,profilpicture, profilpresentation, streetname,zipcode, city,complement, videosession, audiosession, chatsession, sessionatoffice,gender,updated_at,role) VALUES ${parameters.join()}`;
        await pool.query(sqlQuery, values);
        requestCount++;
    }

    console.timeEnd("Ajout des therapistes");
    console.log("Nombre de requêtes : ", requestCount);

    await pool.end();
}

/*********************************************/
/************** quizz seeding ***************/
/*********************************************/
//quizz seeding
const quizzes = [];
console.time("Ajout des utilisateurs");
for (let counter = 0; counter < 50; counter++) {
    const quizz = {
        quizz_1: "Vous-êtes un particulier ?",
        answer_1: faker.datatype.boolean(),
        quizz_2: "Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?",
        answer_2: faker.datatype.boolean(),
        quizz_3: "Souhaitez-vous prendre rendez-vous pour vous ?",
        answer_3: faker.datatype.boolean(),
        quizz_4: "Souhaitez-vous prendre rendez-vous pour un de vos proches ?",
        answer_4: faker.datatype.boolean(),
        quizz_5: "Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?",
        answer_5: faker.datatype.boolean(),
        quizz_6: "Avez-vous des problématiques à régler dans votre couple ?",
        answer_6: faker.datatype.boolean(),
        quizz_7: "Sur quoi souhaitez-vous travailler, sur un Accident ?",
        answer_7: faker.datatype.boolean(),
        quizz_8: "Sur quoi souhaitez-vous travailler, sur une Agression ?",
        answer_8: faker.datatype.boolean(),
        quizz_9: "Sur quoi souhaitez-vous travailler, sur un Deuil ?",
        answer_9: faker.datatype.boolean(),
        quizz_10: "Sur quoi souhaitez-vous travailler, sur une Phobie ?",
        answer_10: faker.datatype.boolean(),
        quizz_11: "Sur quoi souhaitez-vous travailler, sur une Anxiété ?",
        answer_11: faker.datatype.boolean(),
        quizz_12: "Sur quoi souhaitez-vous travailler, sur une Depression ?",
        answer_12: faker.datatype.boolean(),
        quizz_13: "Sur quoi souhaitez-vous travailler, sur une Solitude ?",
        answer_13: faker.datatype.boolean(),
        quizz_14: "Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?",
        answer_14: faker.datatype.boolean(),
        quizz_15: "'Sur quoi souhaitez-vous travailler, sur une Addictions ?",
        answer_15: faker.datatype.boolean(),
        quizz_16: "Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?",
        answer_16: faker.datatype.boolean(),
        quizz_17: "Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?",
        answer_17: faker.datatype.boolean(),
        quizz_18: "Préférez-vous un praticien Femme ? ",
        answer_18: faker.datatype.boolean()
    };

    // console.log(quizz);

    quizzes.push(quizz);
}
console.log("Nombre de quizz : ", quizzes.length);
console.time("Ajout des quizz");


async function importDataQuizzes() {
    await pool.connect();

    let values = [];
    let parameters = [];
    let parameterCounter = 1;
    let requestCount = 0;

    for (const quizz of quizzes) {
        // Ajouter l'utilisateur
        values.push(quizz.quizz_1);
        values.push(quizz.answer_1);
        values.push(quizz.quizz_2);
        values.push(quizz.answer_2);
        values.push(quizz.quizz_3);
        values.push(quizz.answer_3);
        values.push(quizz.quizz_4);
        values.push(quizz.answer_4);
        values.push(quizz.quizz_5);
        values.push(quizz.answer_5);
        values.push(quizz.quizz_6);
        values.push(quizz.answer_6);
        values.push(quizz.quizz_7);
        values.push(quizz.answer_7);
        values.push(quizz.quizz_8);
        values.push(quizz.answer_8);
        values.push(quizz.quizz_9);
        values.push(quizz.answer_9);
        values.push(quizz.quizz_10);
        values.push(quizz.answer_10);
        values.push(quizz.quizz_11);
        values.push(quizz.answer_11);
        values.push(quizz.quizz_12);
        values.push(quizz.answer_12);
        values.push(quizz.quizz_13);
        values.push(quizz.answer_13);
        values.push(quizz.quizz_14);
        values.push(quizz.answer_14);
        values.push(quizz.quizz_15);
        values.push(quizz.answer_15);
        values.push(quizz.quizz_16);
        values.push(quizz.answer_16);
        values.push(quizz.quizz_17);
        values.push(quizz.answer_17);
        values.push(quizz.quizz_18);
        values.push(quizz.answer_18);


        parameters.push(`($${parameterCounter},$${parameterCounter + 1},$${parameterCounter + 2},$${parameterCounter + 3},$${parameterCounter + 4},$${parameterCounter + 5},$${parameterCounter + 6},$${parameterCounter + 7},$${parameterCounter + 8},$${parameterCounter + 9},$${parameterCounter + 10},$${parameterCounter + 11},$${parameterCounter + 12},$${parameterCounter + 13},$${parameterCounter + 14},$${parameterCounter + 15},$${parameterCounter + 16},$${parameterCounter + 17},$${parameterCounter + 18},
            $${parameterCounter + 19},$${parameterCounter + 20},$${parameterCounter + 21},$${parameterCounter + 22},$${parameterCounter + 23},$${parameterCounter + 24},$${parameterCounter + 25},$${parameterCounter + 26},$${parameterCounter + 27},$${parameterCounter + 28},$${parameterCounter + 29},$${parameterCounter + 30},$${parameterCounter + 31},$${parameterCounter + 32},$${parameterCounter + 33},$${parameterCounter + 34},$${parameterCounter + 35})`);
        parameterCounter += 36;
    }

    if (values.length > 0) {
        const sqlQuery = `INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18") VALUES ${parameters.join()}`;
        await pool.query(sqlQuery, values);
        requestCount++;
    }

    console.timeEnd("Ajout des quizz");
    console.log("Nombre de requêtes : ", requestCount);

    await pool.end();
}

/*********************************************/
/************** patients seeding ***************/
/*********************************************/
import adressesP2 from './Paris02.js';
const adresseParisDeux = adressesP2
const patients = [];

//patient seeding
console.time("Ajout des utilisateurs");
for (let counter = 0; counter < 50; counter++) {
    const patient = {
        email: faker.internet.email(),
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        password: faker.internet.password(),
        phonenumber: faker.phone.number('06########'),
        profilpicture: "NULL",
        streetname: adresseParisDeux[counter % adresse.length].libelle_voie_complet,
        zipcode: adresseParisDeux[counter % adresse.length].code_commune,
        city: "Paris",
        complement: faker.lorem.text(100),
        role: "patient",
        updated_at : "2020-04-20 15:00:00-04",
        quizz_id: counter + 1,
    };
    // console.log(patient);
    patients.push(patient);

}
console.log("Nombre de patients : ", patients.length);
console.timeEnd("Ajout des patients");

async function importDataPatients() {
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
        values.push(patient.role);
        values.push(patient.updated_at);
        values.push(patient.quizz_id);

        parameters.push(`($${parameterCounter},$${parameterCounter + 1},$${parameterCounter + 2},$${parameterCounter + 3},$${parameterCounter + 4},$${parameterCounter + 5},$${parameterCounter + 6},$${parameterCounter + 7},$${parameterCounter + 8},$${parameterCounter + 9},$${parameterCounter + 10},$${parameterCounter + 11},$${parameterCounter + 12})`);
        parameterCounter += 13;
    }

    if (values.length > 0) {
        const sqlQuery = `INSERT INTO "patients" (email,lastname,firstname,password, phonenumber,profilpicture,streetname,zipcode, city,complement,role,updated_at,quizz_id) VALUES ${parameters.join()}`;
        await pool.query(sqlQuery, values);
        requestCount++;
    }

    console.timeEnd("Ajout des patients");
    console.log("Nombre de requêtes : ", requestCount);

    await pool.end();
}

/*********************************************/
/************** specialties seeding ***************/
/*********************************************/

import allSpecialties from './specialties.js';
const oneSpecialties = allSpecialties
const specialties = [];


console.time("Ajout des specialties");
for (let counter = 0; counter < allSpecialties.length; counter++) {
    const specialty = {
        label: allSpecialties[counter].label,

    };
    // console.log(specialty);
    specialties.push(specialty);

}
console.log("Nombre de specialties : ", specialties.length);
console.timeEnd("Ajout des specialties");

async function importDataSpecialties() {
    await pool.connect();

    let values = [];
    let parameters = [];
    let parameterCounter = 1;
    let requestCount = 0;

    for (const specialty of specialties) {
        // Ajouter l'utilisateur
        values.push(specialty.label);

        parameters.push(`($${parameterCounter})`);
        parameterCounter += 1;
    }

    if (values.length > 0) {
        const sqlQuery = `INSERT INTO specialties ("label") VALUES ${parameters.join()}`;
        await pool.query(sqlQuery, values);
        requestCount++;
    }

    console.timeEnd("Ajout des specialties");
    console.log("Nombre de requêtes : ", requestCount);

    await pool.end();
}

/*********************************************/
/***** therapist_own_specialties seeding *****/
/*********************************************/

const therapist_own_specialties = [];

console.time("Ajout des utilisateurs");
for (let counter = 0; counter < 50; counter++) {
    const therapist_own_specialty = {
        therapists_id: counter + 1,
        specialties_id: faker.random.numeric(1,{ bannedDigits: ['9'] }),

    };
    // console.log(therapist_own_specialty);
    therapist_own_specialties.push(therapist_own_specialty);

}
console.log("Nombre de therapist_own_specialties : ", therapist_own_specialties.length);
console.timeEnd("Ajout des therapist_own_specialties");

async function importDataTherapistOwnSpecialties() {
    await pool.connect();

    let values = [];
    let parameters = [];
    let parameterCounter = 1;
    let requestCount = 0;

    for (const therapist_own_specialty of therapist_own_specialties) {
        // Ajouter l'utilisateur
        values.push(therapist_own_specialty.therapists_id);
        values.push(therapist_own_specialty.specialties_id);

        parameters.push(`($${parameterCounter},$${parameterCounter + 1})`);
        parameterCounter += 2;
    }

    if (values.length > 0) {
        const sqlQuery = `INSERT INTO "therapists_own_specialties" ("therapists_id","specialties_id") VALUES ${parameters.join()}`;
        await pool.query(sqlQuery, values);
        requestCount++;
    }

    console.timeEnd("Ajout des therapists_own_specialties");
    console.log("Nombre de requêtes : ", requestCount);

    await pool.end();
}

/*********************************************/
/*************** review seeding *************/
/*********************************************/

import allreviews from './reviews.js';
const oneReview = allreviews
const reviews = [];


console.time("Ajout des reviews");
for (let counter = 0; counter < 50; counter++) {
    const review = {
        messages: oneReview[counter % oneReview.length].message,
        negatifreviews: faker.random.numeric({
            'min': 0,
            'max': 1
        }),
        positifreviews: faker.random.numeric({
            'min': 0,
            'max': 1
        }),
        patients_id: faker.datatype.number({min : 51, max: 100}),
        therapists_id: faker.random.numeric({
            'min': 1,
            'max': 50
        }),

    };
    console.log(review);
    reviews.push(review);

}
console.log("Nombre de reviews : ", reviews.length);
console.timeEnd("Ajout des review");

async function importDataReviews() {
    await pool.connect();

    let values = [];
    let parameters = [];
    let parameterCounter = 1;
    let requestCount = 0;

    for (const review of reviews) {
        // Ajouter l'utilisateur
        values.push(review.messages);
        values.push(review.negatifreviews);
        values.push(review.positifreviews);
        values.push(review.patients_id);
        values.push(review.therapists_id);

        parameters.push(`($${parameterCounter},$${parameterCounter + 1},$${parameterCounter + 2},$${parameterCounter + 3},$${parameterCounter + 4})`);
        parameterCounter += 5;
    }

    if (values.length > 0) {
        const sqlQuery = `INSERT INTO reviews ("messages", "negatifreviews", "positifreviews", "patients_id", "therapists_id") VALUES ${parameters.join()}`;
        await pool.query(sqlQuery, values);
        requestCount++;
    }

    console.timeEnd("Ajout des reviews");
    console.log("Nombre de requêtes : ", requestCount);

    await pool.end();
}
/*********************************************/
/*************** appointment seeding *************/
/*********************************************/

import allAppointments from './appointments.js';
const oneAppointments = allAppointments
const appointments = [];


console.time("Ajout des allAppointments");
for (let counter = 0; counter < 50; counter++) {
    const appointment = {
        beginninghour: oneAppointments[counter % oneAppointments.length].beginninghour,
        endtime: oneAppointments[counter % oneAppointments.length].endtime,
        patients_id: faker.datatype.number({min : 51, max: 100}),
        therapists_id: faker.random.numeric({
            'min': 1,
            'max': 50
        }),
        videosession: faker.datatype.boolean(),
        audiosession: faker.datatype.boolean(),
        chatsession: faker.datatype.boolean(),
        sessionatoffice: faker.datatype.boolean()


    };
    // console.log(appointments);
    appointments.push(appointment);

}
console.log("Nombre de allAppointments : ", appointments.length);
console.timeEnd("Ajout des allAppointments");

async function importDataAppointments() {
    await pool.connect();

    let values = [];
    let parameters = [];
    let parameterCounter = 1;
    let requestCount = 0;

    for (const appointment of appointments) {
        // Ajouter l'utilisateur
        values.push(appointment.beginninghour);
        values.push(appointment.endtime);
        values.push(appointment.patients_id);
        values.push(appointment.therapists_id);
        values.push(appointment.videosession);
        values.push(appointment.audiosession);
        values.push(appointment.chatsession);
        values.push(appointment.sessionatoffice);

        parameters.push(`($${parameterCounter},$${parameterCounter + 1},$${parameterCounter + 2},$${parameterCounter + 3},$${parameterCounter + 4},$${parameterCounter + 5},$${parameterCounter + 6},$${parameterCounter + 7})`);
        parameterCounter += 8;
    }

    if (values.length > 0) {
        const sqlQuery = `INSERT INTO "appointments" ("beginninghour", "endtime","patients_id","therapists_id","videosession","audiosession","chatsession","sessionatoffice") VALUES ${parameters.join()}`;
        await pool.query(sqlQuery, values);
        requestCount++;
    }

    console.timeEnd("Ajout des allAppointments");
    console.log("Nombre de requêtes : ", requestCount);

    await pool.end();
}


/*********************************************/
/******* therapists_has_patients seeding *******/
/*********************************************/


const therapists_has_patients = [];

console.time("Ajout des utilisateurs");
for (let counter = 0; counter < 50; counter++) {
    const therapists_has_patient = {
      patients_id: faker.datatype.number({min : 51, max: 100}),
      therapists_id: counter + 1,
     

    };
    // console.log(therapists_has_patient);
    therapists_has_patients.push(therapists_has_patient);

}
console.log("Nombre de therapists_has_patients : ", therapists_has_patients.length);
console.timeEnd("Ajout des therapists_has_patients");

async function importDataTherapistHasPatients() {
    await pool.connect();

    let values = [];
    let parameters = [];
    let parameterCounter = 1;
    let requestCount = 0;

    for (const therapists_has_patient of therapists_has_patients) {
        // Ajouter l'utilisateur
        values.push(therapists_has_patient.patients_id);
        values.push(therapists_has_patient.therapists_id);

        parameters.push(`($${parameterCounter},$${parameterCounter + 1})`);
        parameterCounter += 2;
    }

    if (values.length > 0) {
        const sqlQuery = `INSERT INTO "therapists_has_patients" ("patients_id","therapists_id") VALUES ${parameters.join()}`;
        await pool.query(sqlQuery, values);
        requestCount++;
    }

    console.timeEnd("Ajout des therapists_has_patients");
    console.log("Nombre de requêtes : ", requestCount);

    await pool.end();
}




await importDataTherapists();
await importDataQuizzes();
await importDataPatients();
await importDataSpecialties();
await importDataTherapistOwnSpecialties();
await importDataReviews();
await importDataAppointments();
await importDataTherapistHasPatients();