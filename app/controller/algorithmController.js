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
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && answer.answer_15 && answer.answer_18 === true) {
                gender = 'Femme'
                getAddictionTherapistWomen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(6,gender)
                result =getAddictionTherapistWomen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && answer.answer_15 && answer.answer_18 === false) {
                gender = 'Homme'
                getAddictionTherapistMen= await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(6,gender)
                result =getAddictionTherapistMen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && answer.answer_16 && answer.answer_18 === true) {
                gender = 'Femme'
                getClinicalTherapistWomen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(8,gender)
                result =getClinicalTherapistWomen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && answer.answer_16 && answer.answer_18 === false) {
                gender = 'Homme'
                getClinicalTherapistMen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(8,gender)
                result =getClinicalTherapistMen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && answer.answer_17 && answer.answer_18 === true) {
                gender = 'Femme'
                getWorkTherapistWomen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(1,gender)
                result =getWorkTherapistWomen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === true && answer.answer_6 === false && answer.answer_17 && answer.answer_18 === false) {
                gender = 'Homme'
                getWorkTherapistMen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(1,gender)
                result =getWorkTherapistMen
                gender = null
            }
            // proches -> enfants
            else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === true && answer.answer_18 === true) {
                gender = 'Femme'
                getChildrenTherapistWomen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(7,gender)
                result =getChildrenTherapistWomen
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === true && answer.answer_18 === false) {
                gender = 'Homme'
                getChildrenTherapistMen = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(7,gender)
                result =getChildrenTherapistMen
                gender = null
            }
            // proches 
            else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === false && (answer.answer_7 === true ||  answer.answer_8 === true ||  answer.answer_9 === true) && answer.answer_18 === true) {
                gender = 'Femme'
                getTraumaTherapistWomenButNotForME = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(3,gender)
                result =getTraumaTherapistWomenButNotForME
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === false && (answer.answer_7 === true ||  answer.answer_8 === true ||  answer.answer_9 === true) && answer.answer_18 === false) {
                gender = 'Homme'
                getTraumaTherapistMenButNotForME = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(3,gender)
                result =getTraumaTherapistMenButNotForME
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === false && (answer.answer_10 === true ||  answer.answer_11 === true ||  answer.answer_12 === true) && answer.answer_18 === true) {
                gender = 'Femme'
                getTCCTherapistWomenButNotForME = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(4,gender)
                result =getTCCTherapistWomenButNotForME
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === false && (answer.answer_10 === true ||  answer.answer_11 === true ||  answer.answer_12 === true) && answer.answer_18 === false) {
                gender = 'Homme'
                getTCCTherapistMenButNotForME = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(4,gender)
                result =getTCCTherapistMenButNotForME
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === false && (answer.answer_13 === true ||  answer.answer_14 === true) && answer.answer_18 === true) {
                gender = 'Femme'
                getCoachTherapistWomenButNotForME = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(5,gender)
                result =getCoachTherapistWomenButNotForME
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === false && (answer.answer_13 === true ||  answer.answer_14 === true) && answer.answer_18 === false) {
                gender = 'Homme'
                getCoachTherapistMenButNotForME = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(5,gender)
                result =getCoachTherapistMenButNotForME
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === false && answer.answer_15 === true && answer.answer_18 === true) {
                gender = 'Femme'
                getAddictionTherapistWomenButNotForME = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(6,gender)
                result =getAddictionTherapistWomenButNotForME
                gender = null
            } else if (answer.answer_1 === true && answer.answer_2 === false && answer.answer_3 === false && answer.answer_4 === true && answer.answer_5 === false && answer.answer_15 === true && answer.answer_18 === false) {
                gender = 'Homme'
                getAddictionTherapistMenButNotForME = await therapistsDatamapper.findAllTherapistBySpecialtiesAndGender(6,gender)
                result =getAddictionTherapistMenButNotForME
                gender = null
            }

        }
        res.json(result);
    },
}

module.exports = algorithmController;
