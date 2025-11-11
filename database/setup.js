const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

const db = new Sequelize({ 
    dialect: 'sqlite', 
    storage: `database/${process.env.DB_NAME}` || 'database/library.db', 
    logging: console.log // Not necessary, but shows SQL queries in the console 
})

const Book = db.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    unique: true
  },
  genre: {
    type: DataTypes.STRING
  },
  publishedYear: {
    type: DataTypes.INTEGER
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

async function setupDatabase() { 
    try { 
        await db.authenticate(); 
        console.log('Connection to database established successfully.'); 

        await db.sync({ force: true })
        console.log('Database file created at:',`database/${process.env.DB_NAME}`); 

        await db.close(); 
    } catch (error) { 
         console.error('Unable to connect to the database:', error); 
    } 
}

if (require.main === module) {
    setupDatabase();
}

module.exports = { db, Book };