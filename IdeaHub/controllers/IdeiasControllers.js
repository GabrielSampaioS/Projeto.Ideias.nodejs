const Idea = require('../models/idea');
const User = require('../models/user');

module.exports = class IdeiasController {
    static async showIdeias(req, res) {
        res.render('ideias/home')
    }

    static async showDashboard(que, res){
        res.render('ideias/dashboard')
    }

    static async criarIdeia(req, res) {
        res.render('ideias/criarIdeia')
    }
    
    static async criarIdeiaPost(req, res) {
        const {titulo, descricao} = req.body;
        const userId = req.session.userid;

        if (!titulo || !descricao) {
            req.flash('message', 'Please fill in all fields.');
            res.render('ideias/criarIdeia');
            return;
        }

        try{
            const idea = {
                title : titulo,
                description: descricao,
                UserId: userId
            }
            await Idea.create(idea);
            req.flash('message', 'Idea created successfully!');
            res.redirect('/ideias/dashboard');
        } catch (error) {
            console.error(error);
            req.flash('message', 'An error occurred while creating the idea.');
            res.render('ideias/criarIdeia');
        }
    }

    
}