const Router = require('express')
const router = new Router()
const autorsController = require('../controllers/autorsController')



router.post('/', autorsController.create)
router.get('/', autorsController.getAll)

module.exports = router