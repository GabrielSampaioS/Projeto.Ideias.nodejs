const { create } = require('express-handlebars');
const Idea = require('../models/idea');
const User = require('../models/user');
const { where } = require('sequelize');

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
                    id: ideia.IdIdeia,
                    title: ideia.title,
                    description: ideia.description,
                    userName: ideia.IdUser ? ideia.User.name : '',
                    dataFormatada,
                };
            });
            res.render('ideias/home', { ideiasRetorno });
        } catch (error) {
            console.error(error);
            req.flash('message', 'Erro ao carregar ideias.');
            res.redirect('/');
        }
    }

    static async showDashboard(req, res) {
        const useridSession = req.session.userid;

        const user = await User.findOne({
            where: { IdUser: useridSession },
            include: Idea,
            plain: true, // Retorna um único usuário
        });

        if (!user) {
            return res.redirect('/login');
        }

        // Pega as ideias associadas ao usuário
        // como isso funciona:
        // O Sequelize já faz a junção entre User e Idea, então podemos acessar as ideias
        const ideias = user.Ideas || [];

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
        const idUserFront = req.session.userid;

        if (!titulo || !descricao) {
            req.flash('message', 'Please fill in all fields.');
            res.render('ideias/criarIdeia');
            return;
        }

        try {
            const idea = {
                title: titulo,
                description: descricao,
                IdUser: idUserFront
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

    static async deletarIdeia(req, res) {
        const idIdeiaFront = req.body.id;
        const idUserFront = req.session.userid;


        try {
            await Idea.destroy({
                where: {
                    IdIdeia: idIdeiaFront,
                    IdUser: idUserFront
                }
            })
            req.flash('message', 'Idea deleting successfully!');
            res.redirect('/ideias/dashboard');
        } catch (error) {

            req.flash('message', 'An error occurred while deleting the idea.');
            res.render('ideias/dashboard');

        }


    }

    static async editarIdeia(req, res) {
        const idUserFront = req.session.userid;
        const idIdeiaFront = req.params.id;
        const ideia = await Idea.findOne({
            where: {
                IdIdeia: idIdeiaFront,
                IdUser: idUserFront
            }
        })

        if (!ideia) {
            req.flash('message', 'Ideia não encontrada ou você não tem permissão.');
            return res.redirect('/ideias/dashboard')
        }

        res.render('ideias/edit', { ideia: ideia.dataValues })

    }

    static async editarIdeiaPost(req, res) {
        const idIdeiaFront = req.body.id;
        const idUserFront = req.session.userid;

        const ideaAtualizada = {
            title: req.body.title,
            description: req.body.description,
        };

        // Debug dos valores recebidos
        /*console.log('Atualizando ideia:', {
            IdIdeia: idIdeiaFront,
            IdUser: idUserFront,
            ...ideaAtualizada
        });*/

        try {
            const resultado = await Idea.update(ideaAtualizada, {
                where: {
                    IdIdeia: idIdeiaFront,
                    IdUser: idUserFront
                },
                logging: console.log
            });
            if (resultado[0] === 0) {
                req.flash('message', 'Ideia não encontrada ou você não tem permissão.');
                return res.redirect('/ideias/dashboard');
            }

            req.flash('message', 'Ideia editada com sucesso!');
            return res.redirect('/ideias/dashboard');
        } catch (erro) {
            console.log(erro);
            req.flash('message', 'Erro ao editar ideia.');
            return res.redirect('/ideias/dashboard');
        }
    }
}