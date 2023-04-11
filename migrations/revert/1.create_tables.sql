-- Revert mytherapist:1.create_tables from pg

BEGIN;

DROP TABLE therapists,quizz,patients,reviews,conversations,appointments,specialties,therapists_has_patients,therapists_own_specialties

COMMIT;
