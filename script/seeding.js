import { faker } from '@faker-js/faker';
faker.locale = 'fr';

import adresses from './Paris01.js';
const adresse = adresses
const therapists = [];

//therapist seeding
console.time("Ajout des utilisateurs");
for (let counter = 0; counter < 10; counter++) {
const therapist = {
firstName: faker.name.firstName(),
lastName: faker.name.lastName(),
email : faker.internet.email(),
sexe: faker.name.sex(),
phoneNumber: faker.phone.number('06-##-##-##-##'),
password:faker.internet.password(),
adeliNumber:faker.random.numeric(9),
profilPresentation : faker.lorem.text(300),
streetName : adresse[counter % adresse.length].libelle_voie_complet,
zipcode : adresse[counter % adresse.length].code_commune,
city : "Paris",
videosession: faker.datatype.boolean(),
audiosession: faker.datatype.boolean(),
chatsession: faker.datatype.boolean(),
sessionatoffice: faker.datatype.boolean()
};
console.log(therapist);
therapists.push(therapist);
}
console.log("Nombre de therapistes : ", therapists.length);
console.timeEnd("Ajout des therapistes");
