

therapistsDatamapper = require('../model/therapists')

const therapistsController = {
    async getAll(_,res) {
        const allTherapists = await therapistsDatamapper.findAll();
        res.json(allTherapists)
    },
    async getById(req,res) {
        const id = req.params.id
        const getTherapistById = await therapistsDatamapper.findByPk(id);
        res.json(getTherapistById)
    },
    async creatTherapist (req,res) {
        const therapistInfo = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            adelinumber: req.body.adelinumber,
            phonenumber: req.body.phonenumber,
            streetname: req.body.streetname,
            zipcode: req.body.zipcode,
            email:req.body.email,
            city:req.body.city,
            gender:req.body.gender,
        }
        const creatTherapist = await therapistsDatamapper.create(therapistInfo);
        res.json(creatTherapist)
    },
    async updateTherapist (req,res) {
        const id = req.params.id
        const therapistInfo = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            adelinumber: req.body.adelinumber,
            phonenumber: req.body.phonenumber,
            streetname: req.body.streetname,
            zipcode: req.body.zipcode,
            email:req.body.email,
            city:req.body.city,
            gender:req.body.gender,
        }
        
        const updateTherapist = await therapistsDatamapper.update({id},therapistInfo)
        res.json(updateTherapist)
    },

    async deleteTherapist (req,res) { 
        const id = req.params.id
        const deleteTherapist = await therapistsDatamapper.delete(id)
        res.json(deleteTherapist)
    },

    async findTherapistsWithSpecialities (req,res) {
        const id = req.params.id
        const findTherapistsWithSpecialities = await therapistsDatamapper.findTherapistsWithSpecialities(id);
        res.json(findTherapistsWithSpecialities)
    },
    
    async findAllTherapistsWithSpecialities (req,res) {
        const findAllTherapistsWithSpecialities = await therapistsDatamapper.AllTherapistsWithSpecialities();
        res.json(findAllTherapistsWithSpecialities)
    },

    async addSpecialtiesToTherapist (req,res) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId
        const addSpecialtiesToTherapist = await therapistsDatamapper.addSpecialtiesToTherapist(therapistId, specialityId);
        res.json(addSpecialtiesToTherapist)
    },

    async removeSpecialtiesFromTherapist (req,res) {
        const therapistId = req.params.therapistId
        const specialityId = req.params.specialityId
        const removeSpecialtiesToTherapist = await therapistsDatamapper.removeSpecialtiesFromTherapist(therapistId, specialityId);
        res.json(removeSpecialtiesToTherapist)
    }
}

module.exports = therapistsController;