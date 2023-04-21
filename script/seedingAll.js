const dotenv = require('dotenv');
dotenv.config();
const {
    Pool
} = require('pg');
const pool = new Pool();

const {
    faker
} = require('@faker-js/faker');
faker.locale = 'fr';
/*********************************************/
/************** GetPicture Men function ***************/
/*********************************************/
const path = require('path');
const fs = require('fs').promises;
//const fs = require('fs')

async function getPictures(pathToImages) {
    let pictureTherapistMens = [];
    const directoryPath = path.join(__dirname, '../Images/' + pathToImages);

    return await fs.readdir(directoryPath)
    .then(files => {
        pictureTherapistMens = files.map(file => {
            return { "picture": `../Images/${pathToImages}/${file}` };
        });
        
        return pictureTherapistMens;
    })
    .catch(err => {
    console.error(err);
    return [];
    });
  };

  // Retourner le tableau à la fin de la fonction
 




/*********************************************/
/************** Data Reset Before Seed ***************/
/*********************************************/

async function resetDB() {
    console.log('Start DB Reset')

    const sqlQuery = `TRUNCATE TABLE "therapists", "patients", "appointments", "specialties", "quizz", "reviews", "therapists_has_patients", "therapists_own_specialties" RESTART IDENTITY CASCADE;`;

    await pool.query(sqlQuery);

    console.log('End DB Reset')
}

/*********************************************/
/************** therapists Homme seeding ***************/
/*********************************************/
const adresses = require('./Paris01.js');
const adresse = adresses

function generateFakeDataMen(pictureTherapistMen)
{
    const therapists = [];
    
    //console.log(pictureTherapistMen)
    //therapist seeding
    for (let counter = 0; counter < 25; counter++) {
        const therapist = {
            email: faker.internet.email(),
            lastname: faker.name.lastName(),
            firstname: faker.name.firstName('male'),
            password: faker.internet.password(),
            phonenumber: faker.phone.number('06########'),
            adelinumber: faker.random.numeric(9),
            profilpicture: pictureTherapistMen[counter % pictureTherapistMen.length].picture,
            profilpresentation: faker.lorem.text(100),
            streetname: adresse[counter % adresse.length].libelle_voie_complet,
            zipcode: adresse[counter % adresse.length].code_commune,
            city: "Paris",
            complement: faker.lorem.text(100),
            videosession: faker.datatype.boolean(),
            audiosession: faker.datatype.boolean(),
            chatsession: faker.datatype.boolean(),
            sessionatoffice: faker.datatype.boolean(),
            gender: "Homme",
            updated_at: "2020-04-20 14:00:00-04",
            role: "therapist",
        };
        
        // console.log(therapist);
    
        therapists.push(therapist);
    }

    return therapists;
}



async function importDataTherapists(therapists) {
    console.time("Ajout des thérapistes Hommes");

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

    console.log("Nombre de therapistes : ", therapists.length);
    console.log("Nombre de requêtes : ", requestCount);
    console.timeEnd("Ajout des thérapistes Hommes");

}

/*********************************************/
/************** therapists FEMME seeding ***************/
/*********************************************/
function generateFakeDataWoman(pictureTherapistWomen)
{
const therapistsFemmes = [];

//therapist seeding
for (let counter = 0; counter < 25; counter++) {
    const therapistFemme = {
        email: faker.internet.email(),
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName('female'),
        password: faker.internet.password(),
        phonenumber: faker.phone.number('06########'),
        adelinumber: faker.random.numeric(9),
        profilpicture: pictureTherapistWomen[counter % pictureTherapistWomen.length].picture,
        profilpresentation: faker.lorem.text(100),
        streetname: adresse[counter % adresse.length].libelle_voie_complet,
        zipcode: adresse[counter % adresse.length].code_commune,
        city: "Paris",
        complement: faker.lorem.text(100),
        videosession: faker.datatype.boolean(),
        audiosession: faker.datatype.boolean(),
        chatsession: faker.datatype.boolean(),
        sessionatoffice: faker.datatype.boolean(),
        gender: "Femme",
        updated_at: "2020-04-20 14:00:00-04",
        role: "therapist",
    };

    // console.log(therapistFemme);

    therapistsFemmes.push(therapistFemme);
}
return therapistsFemmes;
}


async function importDataTherapistsFemmes(therapistsWoman) {
    console.time("Ajout des thérapistes femmes");

    let values = [];
    let parameters = [];
    let parameterCounter = 1;
    let requestCount = 0;

    for (const therapistFemme of therapistsWoman) {
        // Ajouter l'utilisateur
        values.push(therapistFemme.email);
        values.push(therapistFemme.lastname);
        values.push(therapistFemme.firstname);
        values.push(therapistFemme.password);
        values.push(therapistFemme.phonenumber);
        values.push(therapistFemme.adelinumber);
        values.push(therapistFemme.profilpicture);
        values.push(therapistFemme.profilpresentation);
        values.push(therapistFemme.streetname);
        values.push(therapistFemme.zipcode);
        values.push(therapistFemme.city);
        values.push(therapistFemme.complement);
        values.push(therapistFemme.videosession);
        values.push(therapistFemme.audiosession);
        values.push(therapistFemme.chatsession);
        values.push(therapistFemme.sessionatoffice);
        values.push(therapistFemme.gender);
        values.push(therapistFemme.updated_at);
        values.push(therapistFemme.role);

        parameters.push(`($${parameterCounter},$${parameterCounter + 1},$${parameterCounter + 2},$${parameterCounter + 3},$${parameterCounter + 4},$${parameterCounter + 5},$${parameterCounter + 6},$${parameterCounter + 7},$${parameterCounter + 8},$${parameterCounter + 9},$${parameterCounter + 10},$${parameterCounter + 11},$${parameterCounter + 12},$${parameterCounter + 13},$${parameterCounter + 14},$${parameterCounter + 15},$${parameterCounter + 16},$${parameterCounter + 17},$${parameterCounter + 18})`);
        parameterCounter += 19;
    }

    if (values.length > 0) {
        const sqlQuery = `INSERT INTO "therapists" (email,lastname,firstname,password, phonenumber,adelinumber,profilpicture, profilpresentation, streetname,zipcode, city,complement, videosession, audiosession, chatsession, sessionatoffice,gender,updated_at,role) VALUES ${parameters.join()}`;
        await pool.query(sqlQuery, values);
        requestCount++;
    }

    console.log("Nombre de therapistes femme : ", therapistsWoman.length);
    console.log("Nombre de requêtes : ", requestCount);
    console.timeEnd("Ajout des thérapistes femmes");

}

/*********************************************/
/************** quizz seeding ***************/
/*********************************************/
//quizz seeding
const quizzes = [];
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


async function importDataQuizzes() {
    console.time("Ajout des quizz");

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

    console.log("Nombre de quizz : ", quizzes.length);
    console.log("Nombre de requêtes : ", requestCount);
    console.timeEnd("Ajout des quizz");

}

/*********************************************/
/************** patients seeding ***************/
/*********************************************/
const adressesP2 = require('./Paris02.js');
const adresseParisDeux = adressesP2
function generateFakeDataPatients (picturePatients)
{
const patients = [];
//patient seeding
for (let counter = 0; counter < 50; counter++) {
    const patient = {
        email: faker.internet.email(),
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        password: faker.internet.password(),
        phonenumber: faker.phone.number('06########'),
        profilpicture: picturePatients[counter % picturePatients.length].picture,
        streetname: adresseParisDeux[counter % adresse.length].libelle_voie_complet,
        zipcode: adresseParisDeux[counter % adresse.length].code_commune,
        city: "Paris",
        complement: faker.lorem.text(100),
        role: "patient",
        updated_at: "2020-04-20 15:00:00-04",
        quizz_id: counter + 1,
    };
    // console.log(patient);
    patients.push(patient);

}
return patients;
}

async function importDataPatients(patients) {
    console.time("Ajout des patients");

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


    console.log("Nombre de patients : ", patients.length);
    console.log("Nombre de requêtes : ", requestCount);
    console.timeEnd("Ajout des patients");

}

/*********************************************/
/************** specialties seeding ***************/
/*********************************************/

const allSpecialties = require('./specialties.js');
const oneSpecialties = allSpecialties
const specialties = [];


for (let counter = 0; counter < allSpecialties.length; counter++) {
    const specialty = {
        label: allSpecialties[counter].label,

    };
    // console.log(specialty);
    specialties.push(specialty);

}

async function importDataSpecialties() {
    console.time("Ajout des specialties");


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

    console.log("Nombre de specialties : ", specialties.length);
    console.log("Nombre de requêtes : ", requestCount);
    console.timeEnd("Ajout des specialties");

}

/*********************************************/
/***** therapist_own_specialties seeding *****/
/*********************************************/

const therapist_own_specialties = [];

for (let counter = 0; counter < 50; counter++) {
    const therapist_own_specialty = {
        therapists_id: counter + 1,
        specialties_id: faker.random.numeric(1, {
            bannedDigits: ['9']
        }),

    };
    // console.log(therapist_own_specialty);
    therapist_own_specialties.push(therapist_own_specialty);

}

async function importDataTherapistOwnSpecialties() {
    console.time("Ajout des spécialités des thérapistes");

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

    console.log("Nombre de therapist_own_specialties : ", therapist_own_specialties.length);
    console.log("Nombre de requêtes : ", requestCount);
    console.timeEnd("Ajout des spécialités des thérapistes");

}

/*********************************************/
/*************** review seeding *************/
/*********************************************/

const allreviews = require('./reviews.js');
const oneReview = allreviews
const reviews = [];

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
        patients_id: faker.datatype.number({
            min: 1,
            max: 50
        }),
        therapists_id: faker.random.numeric({
            'min': 1,
            'max': 50
        }),

    };
    //console.log(review);
    reviews.push(review);


}



async function importDataReviews() {
    console.time("Ajout des reviews");


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

    console.log("Nombre de reviews : ", reviews.length);
    console.log("Nombre de requêtes : ", requestCount);
    console.timeEnd("Ajout des reviews");

}
/*********************************************/
/*************** appointment seeding *************/
/*********************************************/

const allAppointments = require('./appointments.js');
const oneAppointments = allAppointments
const appointments = [];

for (let counter = 0; counter < 50; counter++) {
    const appointment = {
        beginninghour: oneAppointments[counter % oneAppointments.length].beginninghour,
        endtime: oneAppointments[counter % oneAppointments.length].endtime,
        patients_id: faker.datatype.number({
            min: 1,
            max: 50
        }),
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

async function importDataAppointments() {
    console.time("Ajout des rendez-vous");


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

    console.log("Nombre de rendez-vous : ", appointments.length);
    console.log("Nombre de requêtes : ", requestCount);
    console.timeEnd("Ajout des rendez-vous");

}


/*********************************************/
/******* therapists_has_patients seeding *******/
/*********************************************/


const therapists_has_patients = [];

for (let counter = 0; counter < 50; counter++) {
    const therapists_has_patient = {
        patients_id: faker.datatype.number({
            min: 1,
            max: 50
        }),
        therapists_id: counter + 1,


    };
    // console.log(therapists_has_patient);
    therapists_has_patients.push(therapists_has_patient);

}

async function importDataTherapistHasPatients() {
    console.time("Ajout des thérapistes des patients");


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

    console.log("Nombre de thérapistes des patients : ", therapists_has_patients.length);
    console.log("Nombre de requêtes : ", requestCount);
    console.timeEnd("Ajout des thérapistes des patients");

}

(async () => {
    await resetDB();
    const pictureTherapistMen = await getPictures("Therapists profile picture/Therapists mens");
    const pictureTherapistWomen = await getPictures("Therapists profile picture/Therapists womans");
    const picturePatients = await getPictures("Patients profile picture")
    console.log(pictureTherapistMen, pictureTherapistWomen);
    const therapists = generateFakeDataMen(pictureTherapistMen);
    const therapistsWoman = generateFakeDataWoman(pictureTherapistWomen);
    await importDataTherapists(therapists);
    await importDataTherapistsFemmes(therapistsWoman);
    await importDataQuizzes();
    const patients = generateFakeDataPatients(picturePatients);
    await importDataPatients(patients);
    await importDataSpecialties();
    await importDataTherapistOwnSpecialties();
    await importDataReviews();
    await importDataAppointments();
    await importDataTherapistHasPatients();

    await pool.end();
    console.log('Script over');
})();


