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
    async creatPatients(req,res) {
        const patientsInfo = {
            email : req.body.email,
            lastname: req.body.lastName,
            firstname: req.body.firstName,
            password:req.body.password,
            phonenumber: req.body.phonenumber,
            streetname : req.body.streetname,
            zipcode : req.body.zipcodee,
            city : req.body.city,
            complement : req.body.complement,
            

        }
        const creatPatients = await patientsDatamapper.create(patientsInfo);
        res.json(creatPatients)
    },
};


module.exports = patientsController;