const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, required: true },
    phones: [{
        number: { type: Number},
        ddd: { type: Number }
    }]
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;

