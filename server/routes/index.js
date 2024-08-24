const Router = require('express')
const router = new Router()
const bookRouter = require('./bookRouter')
const genreRouter = require('./genreRouter')
const autorRouter = require('./autorRouter')
const userRouter = require('./userRouter')


router.use('/user', userRouter)
router.use('/genre', genreRouter)
router.use('/autor', autorRouter)
router.use('/book', bookRouter)

module.exports = router