patientsDatamapper = require('../model/patients');


const adminController = {
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