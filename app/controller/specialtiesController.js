specialtiesDatamapper = require('../model/specialties')

const specialtiesController = {
    async getAll(_,res) {
        const allSpecialties = await specialtiesDatamapper.findAll();
        res.json(allSpecialties);
    },
    async getById(req,res) {
        const id = req.params.id
        const getSpecialtyById = await specialtiesDatamapper.findByPk(id);
        res.json(getSpecialtyById)
    },

}

module.exports = specialtiesController;