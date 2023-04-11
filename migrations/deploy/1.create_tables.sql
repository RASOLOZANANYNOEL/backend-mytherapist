-- Deploy mytherapist:1.create_tables to pg

BEGIN;

CREATE TABLE therapists (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    lastname TEXT NOT NULL,
    firstname TEXT NOT NULL,
    phonenumber TEXT NOT NULL UNIQUE,
    adelinumber INTEGER NOT NULL UNIQUE,
    profilpicture TEXT NULL,
    profilpresentation TEXT NULL,
    streetname TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    city TEXT NOT NULL,
    complement TEXT NULL,
    videosession BOOLEAN NULL,
    audiosession BOOLEAN NULL,
    chatsession BOOLEAN NULL,
    gender TEXT NOT NULL
);

CREATE TABLE quizz (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quizzes TEXT NOT NULL,
    answers BOOLEAN NOT NULL
);


CREATE TABLE patients (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    lastname TEXT NOT NULL,
    firstname TEXT NOT NULL,
    phonenumber TEXT NOT NULL UNIQUE,
    profilpicture TEXT NULL,
    profilpresentation TEXT NULL,
    streetname TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    city TEXT NOT NULL,
    complement TEXT NULL,
    quizz_id INTEGER REFERENCES quizz(id)
);

CREATE TABLE reviews (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    messages TEXT NULL,
    negatifreviews INTEGER NULL,
    positifreviews INTEGER NULL,
    patients_id  INTEGER REFERENCES patients(id),
    therapists_id INTEGER REFERENCES therapists(id)
);

CREATE TABLE conversations (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    messages TEXT NULL,
    patients_id  INTEGER REFERENCES patients(id),
    therapists_id INTEGER REFERENCES therapists(id)
);

CREATE TABLE appointments(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    beginninghour TIMESTAMPTZ NOT NULL,
    endtime TIMESTAMPTZ NOT NULL,
    patients_id  INTEGER REFERENCES patients(id),
    therapists_id INTEGER REFERENCES therapists(id),
    videosession BOOLEAN NULL,
    audiosession BOOLEAN NULL,
    chatsession BOOLEAN NULL,

);



COMMIT;
