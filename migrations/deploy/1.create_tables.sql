-- Deploy mytherapist:1.create_tables to pg

BEGIN;

--Regular expressions (REGEX) are often used to validate user input and protect against SQL injections. 
--Regular expressions can help prevent SQL injection attacks by limiting user input to expected formats.

---------------------------------------------------------------------------------------------------

-- Creation of domain using REGEX for postal codes.
CREATE DOMAIN "postal_code_fr" AS text
CHECK(
    value ~ '^\d{5}$' -- Postal codes for mainland France from 01 to 09.
    OR value ~ '^0[1-9]\d{3}$' -- Postal codes for mainland France from 01 to 09.
    OR value ~ '^20[1-2]\d{2}$|^20300$' -- Postal codes for Corsica
    OR value ~ '^[13-8]\d{4}$' -- Most generic postal codes.
    OR value ~ '^9[0-6]\d{3}$' -- Postal codes for mainland France starting with 9.
    OR value ~ '^97[1-6]\d{2}$' -- Postal codes for French Overseas Departments (DOM).
    OR value ~ '^98[4678]\d{2}$' -- Postal codes for French Overseas Territories (TOM).
    OR value ~ '^9{5}$' -- Postal code for the post office.
    
);

--Creation of domain using REGEX for emails.
CREATE DOMAIN "email" AS text
CHECK(
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

-- Creation of domain using REGEX for names & surnames + city names

CREATE DOMAIN "firstnames_lastnames_cities" AS text --
CHECK(
    value ~ '^[a-zA-ZÀ-ÿ. -]*$'
);

-- Creation of domain using REGEX for passwords (minimum 8 characters, one letter, one number, and one special character).
CREATE DOMAIN "passwords" AS text
CHECK(
    value ~ '^[a-zA-Z0-9@$.!/%*#?&_]{8,}$'
);

-- Creation of domain using REGEX for phone numbers.
CREATE DOMAIN "phone_number" AS text
CHECK(
    value ~  '^[0-9]{10}$'

);

-- Creation of domain using REGEX for Adeli numbers.
CREATE DOMAIN "adeli_number" AS text
CHECK(
    value ~  '^[0-9]{9}$'
);    

--Creation of domain using REGEX for profile presentation (maximum 1000 characters).
CREATE DOMAIN "profil_presentation" AS text
CHECK(
    value ~ '^[a-zA-Z0-9À-ÿ\s''’‘".,;:()-]*$' 
    AND length(value) < 1000
);

--Creation of domain using REGEX for street names.
CREATE DOMAIN "streets" AS text
CHECK(
    value ~  '^[a-zA-Z0-9À-ÿ\s''’‘-]*$'
); 

--Creation of domain using REGEX for messages (maximum 1000 characters).
CREATE DOMAIN "messages" AS text
CHECK (
    value ~ '^[a-zA-Z0-9À-ÿ\s''’‘".,;:()!?-]*$' 
    AND length(value) < 1000
);

-- Creation of a type ENUM for roles. 
CREATE TYPE type_role AS ENUM ('admin', 'therapist','patient');
-- Creation of a type ENUM for relevant persons. 
CREATE TYPE relevant_person AS ENUM ('none', 'me', 'relation', 'child');
-- Creation of a type ENUM for "pathologies". 
CREATE TYPE pathology AS ENUM ('none', 'professionnal', 'accident', 'aggression', 'death', 'phobia', 'anxiety', 'depression', 'loneliness', 'confidence', 'addiction', 'evaluation', 'couple');


---------------------------------------------------------------------------------------------------
-- Tables are created below 

CREATE TABLE therapists (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" email NOT NULL UNIQUE, 
    "lastname" firstnames_lastnames_cities  NOT NULL, 
    "firstname" firstnames_lastnames_cities  NOT NULL, 
    "password" passwords NOT NULL,
    "phonenumber" phone_number NOT NULL UNIQUE, 
    "adelinumber" adeli_number  NOT NULL UNIQUE, 
    "profilpicture" TEXT NULL,
    "profilpresentation" profil_presentation NULL, 
    "streetname" streets  NOT NULL, 
    "zipcode" postal_code_fr NOT NULL, 
    "city" firstnames_lastnames_cities NOT NULL, 
    "complement" TEXT NULL, 
    "videosession" BOOLEAN NULL,
    "audiosession" BOOLEAN NULL,
    "chatsession" BOOLEAN NULL,
    "sessionatoffice" BOOLEAN NULL,
    "gender" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ DEFAULT NOW(),
    "role" type_role
);

----------
-- the questions are in french.
CREATE TABLE quizz (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- Etes vous un particulier ?
    "question_1" text not null ,
    "answer_1" boolean not null,
    -- Pour qui voulez vous prendez rendez-vous ?
    "question_2" text not null, 
    "answer_2" relevant_person default 'none',
    -- Sur quoi voulez vous travailler ?
    "question_3" text not null,
    "answer_3" pathology default 'none',
    -- Préférez-vous un practicien homme ou femme ?
    "question_4" text not null,
    "answer_4" boolean default null     
);


CREATE TABLE patients (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" email  NOT NULL UNIQUE, 
    "lastname" firstnames_lastnames_cities NOT NULL, 
    "firstname" firstnames_lastnames_cities NOT NULL, 
    "password" passwords NOT NULL, 
    "phonenumber" phone_number NOT NULL UNIQUE, 
    "profilpicture" TEXT NULL,
    "streetname" streets NOT NULL, 
    "zipcode" postal_code_fr NOT NULL, 
    "city" firstnames_lastnames_cities NOT NULL, 
    "complement" TEXT NULL, 
    "role" type_role,
    "updated_at"  TIMESTAMPTZ DEFAULT NOW(),
    "quizz_id" INTEGER NOT NULL REFERENCES quizz(id) UNIQUE
);

CREATE TABLE reviews (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "messages" messages NULL, 
    "negatifreviews" INTEGER NULL,
    "positifreviews" INTEGER NULL,
    "patients_id"  INTEGER REFERENCES patients(id),
    "therapists_id" INTEGER REFERENCES therapists(id)
);

CREATE TABLE conversations (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "messages" messages NULL, 
    "patients_id"  INTEGER REFERENCES patients(id),
    "therapists_id" INTEGER REFERENCES therapists(id),
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE appointments(
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "beginninghour" TIMESTAMPTZ NOT NULL,
    "endtime" TIMESTAMPTZ NOT NULL,
    "patients_id"  INTEGER REFERENCES patients(id),
    "therapists_id" INTEGER REFERENCES therapists(id),
    "videosession" BOOLEAN NULL,
    "audiosession" BOOLEAN NULL,
    "chatsession" BOOLEAN NULL,
    "sessionatoffice" BOOLEAN NULL

);

CREATE TABLE specialties(
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NULL 
);

CREATE TABLE therapists_has_patients(
    "patients_id"  INTEGER REFERENCES patients(id),
    "therapists_id" INTEGER REFERENCES therapists(id)
);

CREATE TABLE therapists_own_specialties(
    "therapists_id"  INTEGER REFERENCES therapists(id),
    "specialties_id" INTEGER REFERENCES specialties(id)
);

COMMIT;

