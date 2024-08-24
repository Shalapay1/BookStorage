const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
})

const BasketBook = sequelize.define('basket_book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
})

const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Autor = sequelize.define('autor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}, 
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}, 
})

const BookInfo = sequelize.define('book_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tittle: {type: DataTypes.STRING, allowNull: false}, 
    description: {type: DataTypes.STRING, allowNull: false},
})

const GenreAutor = sequelize.define('genre_autor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketBook)
BasketBook.belongsTo(Basket)

Genre.hasMany(Book)
Book.belongsTo(Genre)

Autor.hasMany(Book)
Book.belongsTo(Autor)

Book.hasMany(Rating)
Rating.belongsTo(Book)

Book.hasMany(BasketBook)
BasketBook.belongsTo(Book)

Book.hasMany(BookInfo, {as: 'info'})
BookInfo.belongsTo(Book)

Genre.belongsToMany(Autor, {through: GenreAutor})
Autor.belongsToMany(Genre, {through: GenreAutor})

// New association to link BasketBook with User
User.hasMany(BasketBook, { foreignKey: 'user_id' });
BasketBook.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketBook);
BasketBook.belongsTo(Basket);

Book.hasMany(BasketBook);
BasketBook.belongsTo(Book);

module.exports = {
    User,
    Basket,
    BasketBook,
    Book,
    Genre,
    Autor,
    Rating,
    GenreAutor,
    BookInfo
}