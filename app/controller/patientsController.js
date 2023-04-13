const patientsDatamapper= require('../model/patients');

const patientsController = {
    async getAll(_,res) {
        const allPatients= await patientsDatamapper.findAll();
        res.json(allPatients);
    },

    async getById(req,res) {
        const id = req.params.id
        const onePatientsById = await patientsDatamapper.findByPk(id);
        res.json(onePatientsById);
    },
    
    async createPatients(req,res) {
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
        const createPatients = await patientsDatamapper.create(patientsInfo);
        res.json(createPatients)
    },

    async updatePatients(req,res){
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
        const updatePatients = await patientsDatamapper.update({id},patientsInfo);
        res.json(updatePatients);
    },

    async deletePatients(req,res){
        const id = req.params.id
        const deletePatients = await patientsDatamapper.delete(id);
        res.json(deletePatients);
    }
     

};


module.exports = patientsController;