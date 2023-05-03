const patientsDatamapper = require('../model/patients');
const therapistsDatamapper = require('../model/therapists')
const jwt = require('jsonwebtoken');

/**********************************************/
/******************* ALGO ********************/
/*********************************************/
const algorithmController = {

    async getTherapistBySurvey(req, res) {

        const token = req.headers.authorization.split(' ')[1];
        

        const decodedToken = jwt.decode(token, {
            complete: true
           });

           console.log(decodedToken)

        
    
        async function therapist(id) {

            const getSurveyAnswer = await patientsDatamapper.getSurveyAnswer(id);

            let result = '';

            for (const answer of getSurveyAnswer) {

                const gender = answer.answer_4 ?
                    'Homme' :
                    'Femme';

                /**
                 * Here we manage the case where the patient is a professional or an individual with professional concerns.
                 */
                if (!answer.answer_1 || answer.answer_3 === 'professionnal') {
                    getWorkTherapistInCompany = await therapistsDatamapper.findAllTherapistBySpecialties(1);

                    return res.json(getWorkTherapistInCompany);
                } else {


                    /**
                     * Here we manage the case where the person concerned is a child.
                     */
                    if (answer.answer_2 === 'child') {
                        getChildrenTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(7, gender);
                        result = getChildrenTherapist
                        return res.json(result);
                    }
                }


                /**
                 * Here we manage the other cases according to the pathology.
                 */

                switch (answer.answer_3) {
                    case 'death':
                    case 'aggression':
                    case 'accident':
                        let getTraumaTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(3, gender);
                        result = getTraumaTherapist
                        break;
                    case 'phobia':
                    case 'anxiety':
                    case 'depression':
                        getTCCTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(4, gender);
                        result = getTCCTherapist
                        break;
                    case 'loneliness':
                    case 'confidence':
                        let getCoachingTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(5, gender);
                        result = getCoachingTherapist
                        break;
                    case 'addiction':
                        let getAddictionTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(6, gender);
                        result = getAddictionTherapist
                        break;
                    case 'evaluation':
                        getClinicalTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(8, gender);
                        result = getClinicalTherapist
                        break;
                    case 'couple':
                        getCoupleTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(2, gender);
                        result = getCoupleTherapist
                        break;
                    case 'professionnal':
                        getWorkTherapist = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(1, gender);
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