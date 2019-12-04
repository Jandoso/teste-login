const bcrypt = require('bcryptjs');
const bcryptSalt = 10;
const Users = require('../model/users');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

exports.register = async (req, res) => {
    const validateEmail = await Users.findOne({ email: req.body.email })
    if (!validateEmail) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, bcryptSalt);

            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                phones: req.body.phones
            };
            const user = new Users(newUser);
            user.save();

            res.status(201).json({
                user
            });
        } catch {
            res.send({
                "mensagem": "mensagem de erro"
            });
        };
    } else {
        return res.send({
            "mensagem": "E-mail já existente"
        })
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await Users.findOne({ email })

    if (!user) {
        return res.status(400).send({
            "mensagem": 'Usuário e/ou senha inválidos'
        });
    }


    try {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ _id: user._id }, authConfig.secret)
            res.cookie('t', token, { expire: authConfig.expiresIn })
            const { _id, name, email } = user
            return res.status(200).json({ token, user: { _id, email, name } })
        } else {
            return res.status(400).send({
                "mensagem": 'Usuário e/ou senha inválidos'
            });
        }
    } catch {
        return res.send({
            "mensagem": "mensagem de erro"
        });
    }

}

exports.getUserById = (req, res) => {
    const id = req.params.id;

    Users.findOne({ id }, (err, user) => {
        if (err) {
            res.status(404).send({ "mensagem": "mensagem de erro" })
        } else {
            res.status(200).send(user);
        }
    })
}



