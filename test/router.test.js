const request = require('supertest');
const assert = require('assert');
const express = require('express');
const expect = require('chai');

const app = require('../app/router/therapistsRouter.js');


  describe('GET /therapists', function() {
      it('responds with json', function(done) {
        request(app)
          .get('/therapists')
          .expect('Content-Type', /json/)
          .expect(200, done)
          return done()
      });
    });

    const balbla= {
      "firstname": "john",
            "lastname": "fafa",
            "password": "aaaddadaf",
            "adelinumber": "147896526",
            "streetname" : "zobzob zob",
            "zipcode" : "56100",
            "email" : "rerefaz@hotmail.com",
            "city" : "panam",
            "gender" : "Homme"
    }
console.log(JSON.stringify(balbla))
    

    describe('POST /therapists', function() {
      it('responds with json', function(done) {
        request(app)
          .post('/therapists')
          
          .send({"firstname": "john",
            "lastname": "fafa",
            "password": "aaaddadaf",
            "adelinumber": "147896526",
            "streetname" : "zobzob zob",
            "zipcode" : "56100",
            "email" : "rerefaz@hotmail.com",
            "city" : "panam",
            "gender" : "Homme",
            "role": "therapist"
           })
          
          .expect(200)
          .end(function(err, res) {
            console.log(err)
            if (err) return done(err);
            return done();
          });
      });
      // it ('should handle no message body', function(done) {
      //       request(app)
      //       .post('/therapists')
      //       .set('Content-Type', 'application/json')
      //       .end(function(err, res) {
      //             res.should.have.status(200)
      //             });

      })
   


    describe('GET /therapists/id', function() {
      it('responds with json', function(done) {
        request(app)
          .get('/therapists')
          .expect('Content-Type', /json/)
          .expect(200, done)
          return done()
      });
    });

 /*    const therapistInfo = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      adelinumber: req.body.adelinumber,
      phonenumber: req.body.phonenumber,
      streetname: req.body.streetname,
      zipcode: req.body.zipcode,
      email:req.body.email,
      city:req.body.city,
      gender:req.body.gender,} */