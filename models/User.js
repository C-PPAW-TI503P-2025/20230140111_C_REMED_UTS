const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Username tidak boleh kosong'
            },
            notNull: {
                msg: 'Username wajib diisi'
            },
            len: {
                args: [3, 50],
                msg: 'Username harus 3-50 karakter'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Password tidak boleh kosong'
            },
            notNull: {
                msg: 'Password wajib diisi'
            },
            len: {
                args: [6, 100],
                msg: 'Password minimal 6 karakter'
            }
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: {
                args: [['admin', 'user']],
                msg: 'Role harus admin atau user'
            }
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        // Hash password sebelum create
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        // Hash password sebelum update
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Method untuk compare password
User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
