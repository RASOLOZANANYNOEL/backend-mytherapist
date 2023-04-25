const request = require('supertest');
const assert = require('assert');
const express = require('express');

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

    describe('POST /therapists', function() {
      it('responds with json', function(done) {
        request(app)
          .post('/therapists')
          .send({firstname: 'john',
            lastname: 'fafa',
            password: 'aaaddadaf',
            adelinumber: '147896526',
            streetname : 'zobzob zob',
            zipcode : '56100',
            email : 'rerefaz@hotmail.com',
            city : 'panam',
            gender : 'Homme' })
          .set('Accept', 'application/json')
          .expect('Content-Type', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
      });
    });


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