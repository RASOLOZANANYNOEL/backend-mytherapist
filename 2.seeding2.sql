-- Deploy mytherapist:2.seeding to pg

BEGIN;

-- seeding table specialties 

INSERT INTO specialties ("label") VALUES ('Psychologue du travail');
INSERT INTO specialties ("label") VALUES ('Psychologue thérapie de couple');
INSERT INTO specialties ("label") VALUES ('Psychologue spécialisé en traumatologie');
INSERT INTO specialties ("label") VALUES ('Psychologue TCC');
INSERT INTO specialties ("label") VALUES ('Psychologue-coaching');
INSERT INTO specialties ("label") VALUES ('Psychologue spécialisé en addictologie');
INSERT INTO specialties ("label") VALUES ('Psychologue du développement de l''enfance et de l''adolescence');
INSERT INTO specialties ("label") VALUES ('Psychologue clinicien');

--seeding table quizz 

-- INSERT INTO "quizz" (
-- "quizz_1",
-- "answer_1",
-- "quizz_2",
-- "answer_2",
-- "quizz_3",
-- "answer_3",
-- "quizz_4",
-- "answer_4",
-- "quizz_5",
-- "answer_5",
-- "quizz_6",
-- "answer_6",
-- "quizz_7",
-- "answer_7",
-- "quizz_8",
-- "answer_8",
-- "quizz_9",
-- "answer_9",
-- "quizz_10",
-- "answer_10",
-- "quizz_11",
-- "answer_11",
-- "quizz_12",
-- "answer_12",
-- "quizz_13",
-- "answer_13",
-- "quizz_14",
-- "answer_14",
-- "quizz_15",
-- "answer_15",
-- "quizz_16",
-- "answer_16",
-- "quizz_17",
-- "answer_17",
-- "quizz_18",
-- "answer_18"
-- )
-- VALUES (
-- 'Vous-êtes un particulier ?',
-- true,
-- 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?',
-- false,
-- 'Souhaitez-vous prendre rendez-vous pour vous ?',
-- true,
-- 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?',
-- false,
-- 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?',
-- true,
-- 'Avez-vous des problématiques à régler dans votre couple ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur un Accident ?',
-- true,
-- 'Sur quoi souhaitez-vous travailler, sur une Agression ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur un Deuil ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur une Phobie ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur une Depression ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur une Solitude ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur une Addictions ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?',
-- false,
-- 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?',
-- false,
-- 'Préférez-vous un praticien Femme ou Homme ? ',
-- true
-- );

INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18") 
VALUES ('Vous-êtes un particulier ?', false, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', false, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);
INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18")
VALUES ('Vous-êtes un particulier ?', true, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', false, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);
INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18")
VALUES ('Vous-êtes un particulier ?', false, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', false, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);
INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18")
VALUES ('Vous-êtes un particulier ?', true, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', false, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);
INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18")
VALUES ('Vous-êtes un particulier ?', true, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', false, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);
INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18")
VALUES ('Vous-êtes un particulier ?', true, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', false, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);
INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18")
VALUES ('Vous-êtes un particulier ?', false, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', false, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);
INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18")
VALUES ('Vous-êtes un particulier ?', true, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', true, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);
INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18")
VALUES ('Vous-êtes un particulier ?', true, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', false, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);
INSERT INTO "quizz" ("quizz_1", "answer_1", "quizz_2", "answer_2", "quizz_3", "answer_3", "quizz_4", "answer_4", "quizz_5", "answer_5", "quizz_6", "answer_6", "quizz_7", "answer_7", "quizz_8", "answer_8", "quizz_9", "answer_9", "quizz_10", "answer_10", "quizz_11", "answer_11", "quizz_12", "answer_12", "quizz_13", "answer_13", "quizz_14", "answer_14", "quizz_15", "answer_15", "quizz_16", "answer_16", "quizz_17", "answer_17", "quizz_18", "answer_18")
VALUES ('Vous-êtes un particulier ?', true, 'Souhaitez-vous faire intervenir un praticiens dans votre entreprise ?', false, 'Souhaitez-vous prendre rendez-vous pour vous ?', true, 'Souhaitez-vous prendre rendez-vous pour un de vos proches ?', false, 'Souhaitez-vous prendre rendez-vous pour un ou plusieurs de vos enfants ?', true, 'Avez-vous des problématiques à régler dans votre couple ?', false, 'Sur quoi souhaitez-vous travailler, sur un Accident ?', true, 'Sur quoi souhaitez-vous travailler, sur une Agression ?', false, 'Sur quoi souhaitez-vous travailler, sur un Deuil ?', false, 'Sur quoi souhaitez-vous travailler, sur une Phobie ?', false, 'Sur quoi souhaitez-vous travailler, sur une Anxiété ?', false, 'Sur quoi souhaitez-vous travailler, sur une Depression ?', false, 'Sur quoi souhaitez-vous travailler, sur une Solitude ?', false, 'Sur quoi souhaitez-vous travailler, sur une Confiance/Estime de soi ?', false, 'Sur quoi souhaitez-vous travailler, sur une Addictions ?', false, 'Sur quoi souhaitez-vous travailler, sur une Evalution/Bilan psychologique et/ou test psychométriques ?', false, 'Sur quoi souhaitez-vous travailler, sur une Vie profesionnel ?', false, 'Préférez-vous un praticien Femme ou Homme ? ', true);



-- -- --seeding table avis 

-- INSERT INTO reviews ("messages", "negatifreviews", "positifreviews", "patients_id", "therapists_id")
-- VALUES ('Je suis très satisfait de ma thérapie, merci beaucoup !', 0, 1, 1, 1);
-- INSERT INTO reviews ("messages", "negatifreviews", "positifreviews", "patients_id", "therapists_id")
-- VALUES ('J n''i pas du tout aimé la façon dont le thérapeute m''atraité.', 1, 0, 2, 1);
-- INSERT INTO reviews ("messages", "negatifreviews", "positifreviews", "patients_id", "therapists_id")
-- VALUES (' thérapeute était compétent mais j''eu du mal à me connecter avec lui.', 1, 0, 3, 2);
-- INSERT INTO reviews ("messages", "negatifreviews", "positifreviews", "patients_id", "therapists_id")
-- VALUES ('J''i vraiment apprécié la façon dont le thérapeute a su m''couter et m''ncourager.',0, 1, 4, 3);
-- INSERT INTO reviews ("messages", "negatifreviews", "positifreviews", "patients_id", "therapists_id")
-- VALUES ('Je n''ai pas ressenti de progrès significatifs pendant la thérapie.', 1, 0, 5, 2);
-- INSERT INTO reviews ("messages", "negatifreviews", "positifreviews", "patients_id", "therapists_id")
-- VALUES ('Le thérapeute était très compétent et m''a aidé à surmonter mes difficultés.', 0, 1, 6, 4);


-- seeding patient_has_specialities 

INSERT INTO "therapists_own_specialties" ("therapists_id","specialties_id") 
VALUES (1,1);
INSERT INTO "therapists_own_specialties" ("therapists_id","specialties_id") 
VALUES (1,2);
INSERT INTO "therapists_own_specialties" ("therapists_id","specialties_id") 
VALUES (2,2);
INSERT INTO "therapists_own_specialties" ("therapists_id","specialties_id") 
VALUES (3,2);
INSERT INTO "therapists_own_specialties" ("therapists_id","specialties_id") 
VALUES (4,2);
INSERT INTO "therapists_own_specialties" ("therapists_id","specialties_id") 
VALUES (5,2);


-- seeding appointement 

INSERT INTO "appointments" ("beginninghour", "endtime","patients_id","therapists_id","videosession","audiosession","chatsession","sessionatoffice")
VALUES (TIMESTAMPTZ '2023-04-13 10:00:00-04', TIMESTAMPTZ '2023-04-13 11:00:00-04', 11,1,true,false,false,false);
INSERT INTO "appointments" ("beginninghour", "endtime","patients_id","therapists_id","videosession","audiosession","chatsession","sessionatoffice")
VALUES (TIMESTAMPTZ '2023-04-13 10:00:00-04', TIMESTAMPTZ '2023-04-13 11:00:00-04', 12,2,true,false,false,false);
INSERT INTO "appointments" ("beginninghour", "endtime","patients_id","therapists_id","videosession","audiosession","chatsession","sessionatoffice")
VALUES (TIMESTAMPTZ '2023-04-13 10:00:00-04', TIMESTAMPTZ '2023-04-13 11:00:00-04', 13,3,true,false,false,false);





COMMIT;
