-- Revert mytherapist:1.create_tables from pg

BEGIN;

DROP TABLE therapists,quizz,patients,reviews,conversations,appointments,specialties,therapists_has_patients,therapists_own_specialties;

DROP DOMAIN "postal_code_fr";
DROP DOMAIN "email";
DROP DOMAIN "firstnames_lastnames_cities";
DROP DOMAIN "passwords";
DROP DOMAIN "phone_number";
DROP DOMAIN "adeli_number";
DROP DOMAIN IF EXISTS "profil_presentation";
DROP DOMAIN "streets";
DROP DOMAIN IF EXISTS "messages";
DROP TYPE "type_role";

COMMIT;