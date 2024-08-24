const uuid = require('uuid')
const path = require('path')
const {Book, BookInfo, BasketBook, User, Basket} = require('../models/models')
const { Sequelize } = require('sequelize')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')
const { title } = require('process')
const { Op } = require('sequelize');

class BookController {
    async create(req, res, next){
        try {
            const {name, price, autorId, genreId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const book = await Book.create({name, price, genreId, autorId, img: fileName})

            if(info ) {
                info = JSON.parse(info)
                info.forEach(i => {
                    BookInfo.create({
                        title: i.title,
                        description: i.description,
                        bookId: book.id

                    })                
                });
            }

        
            return res.json(book)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let {autorId, genreId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let books
        if(!autorId && !genreId){
            books = await Book.findAndCountAll({limit, offset})

        }
        if(autorId && !genreId){
            books = await Book.findAndCountAll({where:{autorId}, limit, offset})
        }
        if(!autorId && genreId){
            books = await Book.findAndCountAll({where:{genreId}, limit, offset})
        }
        if(autorId && genreId){
            books = await Book.finfindAndCountAlldAll({where:{genreId, autorId}, limit, offset})
        }
        return res.json(books)
    }   

    async GetOne(req, res){
        const {id} = req.params
        const book = await Book.findOne(
            {
                where:{id},
                include: [{model: BookInfo, as: 'info'}]
        
            },
            
        )
        return res.json(book)
    }
    async GetOndeByTitle (req, res){
        try {
    
            const {title} = req.params.title
            const book = await Book.findOne(
                {
                    where:{title},
                    include: [{model: BookInfo, as: 'info'}]
            
                },
                
            )
            return res.json(book)     
          
        } catch (error) {
          res.status(500).json({ message: 'Ошибка сервера' });
        }
      }
      async getBooksByReader(req, res) {
        try {
          const { user_id } = req.params;
          const basketBooks = await BasketBook.findAll({ where: { user_id } });
          const bookIds = basketBooks.map(b => b.bookId);
          const books = await Book.findAll({ where: { id: bookIds } });
    
          return res.json(books);
        } catch (error) {
          res.status(500).json({ message: 'Ошибка сервера' });
        }
      }
      async getBookAssignmentDate(req, res) {
        const { bookId, user_id } = req.params;
        try {
          const basketBook = await BasketBook.findOne({
            where: { bookId, user_id },
            attributes: ['createdAt']
          });
    
          if (!basketBook) {
            return res.status(404).json({ message: 'Запись не найдена' });
          }
    
          return res.json(basketBook);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Ошибка сервера' });
        }
      }
      async getReadersWithOldBooks(req, res) {
        try {
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
          const oldBooks = await BasketBook.findAll({
            where: {
              updatedAt: {
                [Op.lt]: oneMonthAgo
              }
            },
            include: [
              { model: User, attributes: ['email'] },
              { model: Book, attributes: ['name'] }
            ]
          });
    
          return res.json(oldBooks);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Ошибка сервера' });
        }
      }

      async getUsersWithMultipleBookAssignments(req, res) {
        try {
            const usersWithMultipleAssignments = await BasketBook.findAll({
                attributes: ['user_id'],
                group: ['user_id'],
                having: Sequelize.literal('COUNT(*) < 2')
            });
    
            const userIds = usersWithMultipleAssignments.map(item => item.user_id);
    
            const users = await User.findAll({
                attributes: ['id', 'email'],
                where: { id: userIds }
            });
    
            return res.json(users);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Ошибка сервера' });
        }
      }

      async deleteBookByName(req, res) {
        try {
          const { name } = req.params;
          
          // Найдем книгу по названию
          const book = await Book.findOne({ where: { name } });
          if (!book) {
            return res.status(404).json({ message: 'Книга не найдена' });
          }
      
          const bookId = book.id;
      
          // Удалим все записи из basket_books по ID книги
          await BasketBook.destroy({ where: { bookId } });
      
          // Удалим книгу из таблицы books
          await Book.destroy({ where: { id: bookId } });
      
          return res.json({ message: 'Книга успешно удалена' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Ошибка сервера' });
        }
      }

      async deleteBookById(req, res) {
        try {
          const { id } = req.params;
      
          // Удалим все записи из basket_books по ID книги
          await BasketBook.destroy({ where: { bookId: id } });
      
          // Удалим книгу из таблицы books
          await Book.destroy({ where: { id } });
      
          return res.json({ message: 'Книга успешно удалена' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Ошибка сервера' });
        }
      }
      
      
      
}

module.exports = new BookController()