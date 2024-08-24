const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')
const {Book} = require('../models/models')

router.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title;
        console.log(`Ищем книгу с названием: ${title}`); // Отладочная информация
        const book = await Book.findOne({ where: { name: title } });
        if (book) {
            console.log(`Книга найдена: ${book.id}`); // Отладочная информация
            return res.json(book);
        } else {
            res.status(404).json({ message: 'Книга не найдена' });
        }
    } catch (error) {
        console.error(error); // Отладочная информация
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.post('/', bookController.create)
router.get('/', bookController.getAll)
router.get('/reader/:user_id', bookController.getBooksByReader);
router.get('/date/:bookId/:user_id', bookController.getBookAssignmentDate);
router.get('/old-books', bookController.getReadersWithOldBooks);
router.get('/few-books', bookController.getUsersWithMultipleBookAssignments);
router.get('/:id', bookController.GetOne)
router.delete('/:id', bookController.deleteBookById);

module.exports = router