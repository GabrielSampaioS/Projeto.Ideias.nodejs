const { create } = require('express-handlebars');
const Idea = require('../models/idea');
const User = require('../models/user');

module.exports = class IdeiasController {
    static async showIdeias(req, res) {
        try {
            const ideias = await Idea.findAll({
                include: {
                    model: User,
                    attributes: ['name'], // Só traz o nome do usuário
                },
                order: [['createdAt', 'DESC']],
            });

            // Formata o retorno
            const ideiasRetorno = ideias.map((ideia) => {
                const data = ideia.createdAt;
                // Formata para "HH:mm DD/MM/YY"
                const dataFormatada = data
                    ? data.toLocaleString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                    })
                    : '';
                
                    
                return {
                    id: ideia.id,
                    title: ideia.title,
                    description: ideia.description,
                    userName: ideia.User ? ideia.User.name : '',
                    dataFormatada,
                };
            });
            console.log(ideiasRetorno);
            res.render('ideias/home', { ideiasRetorno });
        } catch (error) {
            console.error(error);
            req.flash('message', 'Erro ao carregar ideias.');
            res.redirect('/');
        }
    }

    static async showDashboard(req, res) {
        const UserId = req.session.userid;

        const user = await User.findOne({
            where: { id: UserId },
            include: Idea,
            plain: true, // Retorna um único usuário
        });

        if (!user) {
            return res.redirect('/login');
        }

        // Pega as ideias associadas ao usuário
        // como isso funciona:
        // O Sequelize já faz a junção entre User e Idea, então podemos acessar as ideias
        const ideias = user.Ideas ? user.Ideas : [];

        const ideiasRetorno = ideias.map((ideias) => ideias.dataValues);

        res.render('ideias/dashboard', { ideiasRetorno });
    }

    static criarIdeia(req, res) {
        res.render('ideias/criarIdeia')
    }

    static async criarIdeiaPost(req, res) {
        const { titulo, descricao } = req.body;

        // Obtém o ID do usuário da sessão
        //Poderiamos criar outra validação, verificando se o ID existe no banco de dados
        const UserId = req.session.userid;

        if (!titulo || !descricao) {
            req.flash('message', 'Please fill in all fields.');
            res.render('ideias/criarIdeia');
            return;
        }

        try {
            const idea = {
                title: titulo,
                description: descricao,
                UserId: UserId
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