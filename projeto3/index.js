// Configurando Server

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express();

//definir partials
const hbs = exphbs.create({
    partialsDir:['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//conseguir visualizar a pasta public
app.use(express.static(path.join(__dirname,'public')))

// Configurando Server -- FIM


// Criando dados 

const posts = [
  {
    id: 1,
    nome: "João Silva",
    idade: 30,
    profissao: "Engenheiro de Software",
    cidade: "São Paulo",
    interesses: ["Programação", "Futebol", "Música"]
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    idade: 25,
    profissao: "Designer Gráfico",
    cidade: "Rio de Janeiro",
    interesses: ["Design", "Fotografia", "Viagens"]
  },
  {
    id: 3,
    nome: "Carlos Pereira",
    idade: 28,
    profissao: "Analista de Dados",
    cidade: "Belo Horizonte",
    interesses: ["Estatística", "Tecnologia", "Cinema"]
  }
];

// Criando dados -- FIM


app.get('/', (req, res) => {

    res.render('home', {posts})
})

app.get('/perfil/:id', (req, res) => {
  const perfil = posts[parseInt(req.params.id) - 1]

  res.render('perfil', {perfil})
})

app.listen(3000, () => {
    console.log(`Servidorr na porta 3000`)
})