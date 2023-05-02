const request = require('supertest');
const assert = require('assert');
// const expect = require('chai').expect;

const app = require('../app.js');

/* describe('GET /therapists', function() {
  it('responds with json', async function(done) {
    const response = await request(app)
      .get('/therapists')
      .expect('Content-Type', /json/)
      .expect(200);

      console.log(response);
      done();
  });
}); */

// describe('GET /therapists', function () {
//   it('responds with json', async function (done) {
//     request(app)
//       .get('/therapists')
//       .expect('Content-Type', /json/)
//       .expect(200);
//     done();
//   });
// });


describe('POST /therapists', function () {
  it('responds with json', function (done) {
    request("http://localhost:3000")
      .post('/therapists')

      .send({
        "firstname": "john",
        "lastname": "fafa",
        "phonenumber": "0606060608",
        "password": "aaaddadaf",
        "adelinumber": "147896526",
        "streetname": "zobzob zob",
        "zipcode": "56100",
        "email": "rerefaz@hotmail.com",
        "city": "panam",
        "gender": "Homme",
        "role": "therapist"
      })

      .expect(201)
      .end(function (err, res) {
        console.log(err)
        if (err) return done(err);
        return done();
      });
  });
  //   // it ('should handle no message body', function(done) {
  //   //       request(app)
  //   //       .post('/therapists')
  //   //       .set('Content-Type', 'application/json')
  //   //       .end(function(err, res) {
  //   //             res.should.have.status(200)
  //   //             });

});



//   describe('GET /therapists/id', function() {
//     it('responds with json', function(done) {
//       request(app)
//         .get('/therapists')
//         .expect('Content-Type', /json/)
//         .expect(200, done)
//         return done()
//     });
//   });


// describe('GET /patients', function() {
//   it('responds with json', function(done) {
//     request(app)
//       .get('/patients')
//       .expect('Content-Type', /json/)
//       .expect(200, done)
//       return done()
//   });
// });