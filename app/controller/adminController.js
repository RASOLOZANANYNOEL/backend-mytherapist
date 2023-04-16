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


}



module.exports = adminController;
