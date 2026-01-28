const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BorrowLog = sequelize.define('BorrowLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'User ID wajib diisi'
            },
            isInt: {
                msg: 'User ID harus berupa angka'
            }
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'books',
            key: 'id'
        },
        validate: {
            notNull: {
                msg: 'Book ID wajib diisi'
            }
        }
    },
    borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Latitude wajib diisi'
            },
            isFloat: {
                msg: 'Latitude harus berupa angka desimal'
            }
        }
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Longitude wajib diisi'
            },
            isFloat: {
                msg: 'Longitude harus berupa angka desimal'
            }
        }
    }
}, {
    tableName: 'borrow_logs',
    timestamps: true
});

module.exports = BorrowLog;
