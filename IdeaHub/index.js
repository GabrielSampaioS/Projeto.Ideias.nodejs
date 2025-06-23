// =======================
// Importação de módulos
// =======================
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash'); // Corrigido nome do pacote
const path = require('path');

// =======================
// Inicialização do app
// =======================
const app = express();

// =======================
// Conexão com o banco de dados
// =======================
const conn = require('./db/conn');

// =======================
// Importação dos Models
// =======================
const Idea = require('./models/idea');
const User = require('./models/user');

// =======================
// Importação dos Controllers e Rotas
// =======================
const ideiasController = require('./controllers/IdeiasControllers');
const ideiaRoutes = require('./routes/ideiaRoutes');

const authController = require('./controllers/AuthController');
const authRoute = require('./routes/authRoutes');

// =======================
// Configuração do Handlebars (Template Engine)
// =======================
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// =======================
// Configuração de arquivos estáticos
// =======================
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// Middlewares para receber dados do body
// =======================
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// =======================
// Configuração de sessão
// =======================
app.use(
    session({
        name: 'session',
        secret: 'mysecret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: path.join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false, // true se usar https
            maxAge: 1000 * 60 * 60 * 24, // 24 horas
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true, // Corrigido: era 'hreadOnly'
        },
    })
);

// =======================
// Flash messages
// =======================
app.use(flash());

// =======================
// Middleware para disponibilizar mensagens flash e sessão nas views
// =======================
app.use((req, res, next) => {
    // não fucniona
    //res.locals.messages = req.flash(); //tentar corrigir o erro de mensagens não definidas
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

// =======================
// Rotas
// =======================

// Página inicial
app.use('/Ideias', ideiaRoutes);
app.use('/', authRoute)

// Demias rotas
app.get('/', ideiasController.showIdeias);

// =======================
// Inicialização do servidor
// =======================
conn
    //.sync({ force: true }) // Use com cuidado em produção!
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados:', err);
    });
