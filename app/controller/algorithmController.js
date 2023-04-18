const patientsDatamapper= require('../model/patients');
therapistsDatamapper = require('../model/therapists')

const algorithmController = {

    async getTherapistBySurvey(req,res) {
        const id = req.params.id
        const getSurveyAnswer = await patientsDatamapper.getSurveyAnswer(id);
        let result = null
        let gender = null
        for (const answer of getSurveyAnswer) {
            // Algo couple avec les deux possibilités (oui & non ) 
            if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === true) {
                getCoupleTherapist = await therapistsDatamapper.findAllTherapistBySpecialties(2);
                console.log(getCoupleTherapist)
                result = getCoupleTherapist
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && (answer.answer_7 === true ||  answer.answer_8 === true ||  answer.answer_9 === true) && answer.answer_18 === true) {
                gender = 'Femme'
                getTraumaTherapistWommen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(3,gender)
                result =getTraumaTherapistWommen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && (answer.answer_7 === true ||  answer.answer_8 === true ||  answer.answer_9 === true) && answer.answer_18 === false) {
                gender ='Homme'
                getTraumaTherapistMen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(3,gender)
                result = getTraumaTherapistMen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && (answer.answer_10 === true ||  answer.answer_11 === true ||  answer.answer_12 === true) && answer.answer_18 === true) {
                gender = 'Femme'
                getTCCTherapistWommen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(4,gender)
                result =getTCCTherapistWommen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && (answer.answer_10 === true ||  answer.answer_11 === true ||  answer.answer_12 === true) && answer.answer_18 === false) {
                gender = 'Homme'
                getTCCTherapistMen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(4,gender)
                result =getTCCTherapistMen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && (answer.answer_13 === true ||  answer.answer_14 === true) && answer.answer_18 === true) {
                gender = 'Femme'
                getCoachingTherapistWomen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(5,gender)
                result =getCoachingTherapistWomen
                gender = null
            }  else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && (answer.answer_13 === true ||  answer.answer_14 === true) && answer.answer_18 === false) {
                gender = 'Homme'
                getCoachingTherapistMen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(5,gender)
                result =getCoachingTherapistMen
                gender = null
            }
        }
        res.json(result);
    },
}

module.exports = algorithmController;
