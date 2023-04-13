-- Deploy mytherapist:1.create_tables to pg


BEGIN;

--Les expressions régulières (REGEX) sont souvent utilisées pour valider les entrées utilisateur et protéger contre les injections SQL.
--Les expressions régulières peuvent aider à empêcher les attaques d'injection SQL en limitant les entrées utilisateur aux formats attendus.

---------------------------------------------------------------------------------------------------

-- Création de domain utilisant des REGEX pour les code postaux
CREATE DOMAIN "postal_code_fr" AS text
CHECK(
    value ~ '^\d{5}$' -- code postaux metropole de 01 a 09
    OR value ~ '^0[1-9]\d{3}$' -- code postaux metropole de 01 a 09
    OR value ~ '^20[1-2]\d{2}$|^20300$' -- code postaux de la Corse
    OR value ~ '^[13-8]\d{4}$' -- code postaux les plus génériques
    OR value ~ '^9[0-6]\d{3}$' -- code postaux metropole commencant par 9
    OR value ~ '^97[1-6]\d{2}$' -- code postaux DOM
    OR value ~ '^98[4678]\d{2}$' -- code postaux TOM
    OR value ~ '^9{5}$' -- code postal de la poste
    
);

--Création de domain utilisant des REGEX pour les emails
CREATE DOMAIN "email" AS text
CHECK(
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

-- Création de domain utilisant des REGEX pour les nom & prenom + nom de la ville 

CREATE DOMAIN "firstnames_lastnames_cities" AS text --
CHECK(
    value ~ '^[a-zA-ZÀ-ÿ. -]*$'
);

-- Création de domain utilisant des REGEX pour les mdp (au minimim 8 caractères, un lettre, un numéro et un caractère spécial)
CREATE DOMAIN "passwords" AS text
CHECK(
    value ~ '^[a-zA-Z0-9@$!%*#?&_]{8,}$'
);


-- Création de domain utilisant des REGEX pour les numéro de telephone 
CREATE DOMAIN "phone_number" AS text
CHECK(
    value ~  '^[0-9]{10}$'

);

-- Création de domain utilisant des REGEX pour les numéro adeli 
CREATE DOMAIN "adeli_number" AS text
CHECK(
    value ~  '^[0-9]{9}$'
);    

--Création de domain utilisant des REGEX pour profil presentation(500 caractères MAX)
CREATE DOMAIN "profil_presentation" AS text
CHECK(
    -- value ~ '^[a-zA-Z0-9À-ÿ\s''’‘".,;:()-]{1,500}$'
    value ~ '^[a-zA-Z0-9À-ÿ\s''’‘".,;:()-]*$' 
    AND length(value) < 1000
);

-- Création de domain utilisant REGEX pour les rues 
CREATE DOMAIN "streets" AS text
CHECK(
    value ~  '^[a-zA-Z0-9À-ÿ\s''’‘]*$'
); 

--Création de domain utilsant des REGEX pour les messages (1000 caracteres max)
CREATE DOMAIN "messages" AS text
CHECK (
    value ~ '^[a-zA-Z0-9À-ÿ\s''’‘".,;:()!?-]*$' 
    AND length(value) < 1000
);




---------------------------------------------------------------------------------------------------


CREATE TABLE therapists (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" email NOT NULL UNIQUE, --REGEX
    "lastname" firstnames_lastnames_cities  NOT NULL, --REGEX
    "firstname" firstnames_lastnames_cities  NOT NULL, --REGEX
    "password" passwords NOT NULL UNIQUE,
    "phonenumber" phone_number NOT NULL UNIQUE, --REGEX
    "adelinumber" adeli_number  NOT NULL UNIQUE, --REGEX
    "profilpicture" TEXT NULL,
    "profilpresentation" profil_presentation NULL, --REGEX
    -- "profilpresentation" TEXT NULL, --REGEX
    "streetname" streets  NOT NULL, --REGEX
    "zipcode" postal_code_fr NOT NULL, --REGEX
    "city" firstnames_lastnames_cities NOT NULL, --REGEX
    "complement" TEXT NULL, --REGEX 
    "videosession" BOOLEAN NULL,
    "audiosession" BOOLEAN NULL,
    "chatsession" BOOLEAN NULL,
    "sessionatoffice" BOOLEAN NULL,
    "gender" TEXT NOT NULL
);

----------

CREATE TABLE quizz (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "quizz_1" TEXT NULL,
    "answer_1" BOOLEAN NULL,
    "quizz_2" TEXT NULL,
    "answer_2" BOOLEAN NULL,
    "quizz_3" TEXT NULL,
    "answer_3" BOOLEAN NULL,
    "quizz_4" TEXT NULL,
    "answer_4" BOOLEAN NULL,
    "quizz_5" TEXT NULL,
    "answer_5" BOOLEAN NULL,
    "quizz_6" TEXT NULL,
    "answer_6" BOOLEAN NULL,
    "quizz_7" TEXT NULL,
    "answer_7" BOOLEAN NULL,
    "quizz_8" TEXT NULL,
    "answer_8" BOOLEAN NULL,
    "quizz_9" TEXT NULL,
    "answer_9" BOOLEAN NULL,
    "quizz_10" TEXT NULL,
    "answer_10" BOOLEAN NULL,
    "quizz_11" TEXT NULL,
    "answer_11" BOOLEAN NULL,
    "quizz_12" TEXT NULL,
    "answer_12" BOOLEAN NULL,
    "quizz_13" TEXT NULL,
    "answer_13" BOOLEAN NULL,
    "quizz_14" TEXT NULL,
    "answer_14" BOOLEAN NULL,
    "quizz_15" TEXT NULL,
    "answer_15" BOOLEAN NULL,
    "quizz_16" TEXT NULL,
    "answer_16" BOOLEAN NULL,
    "quizz_17" TEXT NULL,
    "answer_17" BOOLEAN NULL,
    "quizz_18" TEXT NULL,
    "answer_18" BOOLEAN NULL
);


CREATE TABLE patients (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" email  NOT NULL UNIQUE, --REGEX
    "lastname" firstnames_lastnames_cities NOT NULL, --REGEX
    "firstname" firstnames_lastnames_cities NOT NULL, --REGEX
    "password" passwords NOT NULL UNIQUE, --REGEX
    "phonenumber" phone_number NOT NULL UNIQUE, --REGEX
    "profilpicture" TEXT NULL,
    "streetname" streets NOT NULL, --REGEX
    "zipcode" postal_code_fr NOT NULL, --REGEX
    "city" firstnames_lastnames_cities NOT NULL, --REGEX 
    "complement" TEXT NULL, --REGEX
    "quizz_id" INTEGER REFERENCES quizz(id)
);

CREATE TABLE reviews (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "messages" messages NULL, --REGEX
    -- "messages" TEXT NULL, --REGEX
    "negatifreviews" INTEGER NULL,
    "positifreviews" INTEGER NULL,
    "patients_id"  INTEGER REFERENCES patients(id),
    "therapists_id" INTEGER REFERENCES therapists(id)
);

CREATE TABLE conversations (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "messages" messages NULL, --REGEX
    -- "messages" TEXT NULL, --REGEX
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


