const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Title tidak boleh kosong'
            },
            notNull: {
                msg: 'Title wajib diisi'
            }
        }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Author tidak boleh kosong'
            },
            notNull: {
                msg: 'Author wajib diisi'
            }
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isInt: {
                msg: 'Stock harus berupa angka'
            },
            min: {
                args: [0],
                msg: 'Stock tidak boleh negatif'
            }
        }
    }
}, {
    tableName: 'books',
    timestamps: true
});

module.exports = Book;
