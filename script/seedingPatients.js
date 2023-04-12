import { faker } from '@faker-js/faker';
faker.locale = 'fr';

import adresses from './Paris01.js';
const adresse = adresses
const patients = [];

//patient seeding
console.time("Ajout des utilisateurs");
for (let counter = 0; counter < 10; counter++) {
const patient = {
firstName: faker.name.firstName(),
lastName: faker.name.lastName(),
email : faker.internet.email(),
phoneNumber: faker.phone.number('06-##-##-##-##'),
password:faker.internet.password(),
profilPresentation : faker.lorem.text(300),
streetName : adresse[counter % adresse.length].libelle_voie_complet,
zipcode : adresse[counter % adresse.length].code_commune,
city : "Paris",
videosession: faker.datatype.boolean(),
audiosession: faker.datatype.boolean(),
chatsession: faker.datatype.boolean(),
sessionatoffice: faker.datatype.boolean(),
questionId : counter + 1
};
console.log(patient);
patients.push(patient);
}
console.log("Nombre de patients : ", patients.length);
console.timeEnd("Ajout des patients");