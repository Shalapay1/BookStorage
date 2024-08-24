const {Autor} = require('../models/models')
const ApiError = require('../error/ApiError')

class AutorController {
    async create(req, res){
        const {name} = req.body
        const autors = await Autor.create({name})
        return res.json(autors)

    }

    async getAll(req, res){
        const autors = await Autor.findAll()
        return res.json(autors)
    }   

}

module.exports = new AutorController()