const patientsDatamapper = require('../model/patients');
const therapistsDatamapper = require('../model/therapists')

/*********************************************/
/********* ALGO *********/
/*********************************************/
const algorithmController = {

    async getTherapistBySurvey(req, res) {
        const id = req.params.id


        async function therapist(id) {

            const getSurveyAnswer = await patientsDatamapper.getSurveyAnswer(id);
            console.log(getSurveyAnswer)
            let result = '';

            for (const answer of getSurveyAnswer) {


                const gender = answer.answer_4 ?
                    'Homme' :
                    'Femme';



                /**
                 * Ici on gére le cas ou le patient est un professionnel ou un particulier ayant des soucis côté professionnelle.
                 */
                if (!answer.answer_1 || answer.answer_3 === 'professionnal') {
                    getWorkTherapistInCompany = await therapistsDatamapper.findAllTherapistBySpecialties(1)
                    console.log(getWorkTherapistInCompany)
                    return res.json(getWorkTherapistInCompany);
                } else {


                    /**
                     * Ici on gère le cas ou la personne concernée est un enfant.
                     */
                    if (answer.answer_2 === 'child') {
                        console.log(`Voici la liste des psychologues pour enfant ${gender} qui sauront vous aider`); //fetch
                        getChildrenTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(7, gender)
                        result = getChildrenTherapist
                        return res.json(result);
                    }
                }


                /**
                 * Ici on gère les autres cas en fonction de la pathologie.
                 */

                switch (answer.answer_3) {
                    case 'death':
                    case 'aggression':
                    case 'accident':
                        let getTraumaTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(3, gender)
                        result = getTraumaTherapist
                        break;
                    case 'phobia':
                    case 'anxiety':
                    case 'depression':

                        getTCCTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(4, gender)


                        result = getTCCTherapist

                        break;
                    case 'loneliness':
                    case 'confidence':


                        let getCoachingTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(5, gender)
                        result = getCoachingTherapist
                        break;
                    case 'addiction':
                        let getAddictionTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(6, gender)
                        result = getAddictionTherapist
                        break;
                    case 'evaluation':
                        getClinicalTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(8, gender)
                        result = getClinicalTherapist
                        break;
                    case 'couple':
                        getCoupleTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(2, gender)
                        result = getCoupleTherapist
                        break;
                    case 'professionnal':
                        getWorkTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(1, gender)
                        result = getWorkTherapist
                        break;
                }
            
                return res.json(result)
            }
        }

        await therapist(id);
    },
}

module.exports = algorithmController;