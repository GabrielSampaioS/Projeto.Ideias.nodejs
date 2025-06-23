const User = require('../models/user');

module.exports = class AuthController {
    static Login(req, res) {
        res.render('auth/login');
    }

    static Register(req, res) {
        res.render('auth/register');
    }

    static async RegisterPost(req, res) {
        const bcrypt = require('bcryptjs');

        const { name, email, password, confirmpassword } = req.body;

        // Check if name is empty
        if (!name || name.trim() === '') {
            req.flash('message', 'Username is required!');
            return res.redirect('/register');
        }

        // Check if email is empty
        if (!email || email.trim() === '') {
            req.flash('message', 'Email is required!');
            return res.redirect('/register');
        }

        // Check if password is empty
        if (!password || password.trim() === '') {
            req.flash('message', 'Password is required!');
            return res.redirect('/register');
        }

        if (password !== confirmpassword) {
            req.flash('message', 'Passwords do not match!');
            return res.redirect('/register');
        }

        // Check if user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            req.flash('message', 'User already exists!');
            return res.redirect('/register');
        }

        // Create user
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            password: passwordHash,
        };

        try {
            const createdUser = await User.create(user);

            req.session.userid = createdUser.id;
            req.flash('message', 'User created successfully!');
            req.session.save(() => {
                res.redirect('/');
            });
        } catch (error) {
            console.error('Error creating user:', error);
            req.flash('message', 'An error occurred while creating the user.');
            res.redirect('/register');
        }
    }

    static async LoginPost(req, res) {
        const bcrypt = require('bcryptjs');
        const { email, password } = req.body;

        //1 bloco de validacao
        // Check if email is empty
        if (!email || email.trim() === '') {
            req.flash('message', 'Email is required!');
            return res.redirect('/login');
        }
        // Check if password is empty
        if (!password || password.trim() === '') {
            req.flash('message', 'Password is required!');
            return res.redirect('/login');
        }

        //2 bloco de validacao
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            req.flash('message', 'User not found!');
            return res.redirect('/login');
        }
        // Check if password is correct
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            req.flash('message', 'Invalid password!');
            return res.redirect('/login');
        }

        // Create session
        //req.session.authenticated = true;
        req.session.userid = user.id;
        // If everything is ok, save user id in session
        req.session.save(() => {
            res.redirect('/');
        });

    }

    static Lougout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }
};
