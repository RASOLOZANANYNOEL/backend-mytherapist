import { faker } from '@faker-js/faker';
faker.locale = 'fr';

const reviews = [];

//reviews seeding
console.time("Ajout des avis");
for (let counter = 0; counter < 10; counter++) {
const review = {
message : faker.lorem.text(300),

};
console.log(review);
reviews.push(review);
}
console.log("Nombre d'avis : ", reviews.length);
console.timeEnd("Ajout des avis");