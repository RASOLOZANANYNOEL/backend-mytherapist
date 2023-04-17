specialtiesDatamapper = require('../model/specialties')
therapistsDatamapper = require('../model/therapists')
appointmentsDatamapper = require('../model/appointments')

const adminController = {
    async getAllSpecialties(_,res) {
        const allSpecialties = await specialtiesDatamapper.findAll();
        res.json(allSpecialties);
    },
    async getAllTherapists(_,res) {
        const allTherapists = await therapistsDatamapper.findAll();
        res.json(allTherapists);
    },
    async getAllAppointments(_,res) {
        const allAppointments = await appointmentsDatamapper.getAllAppointments();
        res.json(allAppointments);
    },

    async getOneSpecialties(req,res) {
        const id = req.params.id
        const getOneSpecialties = await specialtiesDatamapper.findByPk(id);
        res.json(getOneSpecialties);
    },
    async getOneTherapists(req,res) {
        const id = req.params.id
        const getOneTherapists = await therapistsDatamapper.findByPk(id);
        res.json(getOneTherapists);
    },

    async getOneAppointments(req,res) {
        const id = req.params.id
        const getOneAppointments = await appointmentsDatamapper.getAllAppointmentOfATherapist(id);
        res.json(getOneAppointments);
    },

    async getAllPatients(_,res){
        const allPatients= await patientsDatamapper.findAll();
        res.json(allPatients);
    },
    async getOnePatients(req,res){
        const id = req.params.id
        const getonePatients = await patientsDatamapper.findByPk(id);
        res.json(getonePatients);
    },

    async updateOnePatients(req,res){
        const id = req.params.id
        const patientsInfo = {
            email : req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password:req.body.password,
            phonenumber: req.body.phonenumber,
            streetname : req.body.streetname,
            zipcode : req.body.zipcode,
            city : req.body.city,
        }
        const updateOnePatients = await patientsDatamapper.update({id},patientsInfo);
        res.json(updateOnePatients);
    },

    async deleteOnePatients(req,res){
        const id = req.params.id
        const deleteOnePatients = await patientsDatamapper.delete(id);
        res.json(deleteOnePatients);
    }


}



module.exports = adminController;
