// Configurando Server

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express();

//definir oartials
const hbs = exphbs.create({
    partialsDir:['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//conseguir visualizar a pasta public
app.use(express.static(path.join(__dirname,'public')))

// Configurando Server -- FIM

// Lidando com rotas


// Lidando com rotas -- FIM

app.get('/', (req, res) => {

    const posts = [
        {
          nome: "João Silva",
          idade: 30,
          profissao: "Engenheiro de Software",
          cidade: "São Paulo",
          interesses: ["Programação", "Futebol", "Música"]
        },
        {
          nome: "Maria Oliveira",
          idade: 25,
          profissao: "Designer Gráfico",
          cidade: "Rio de Janeiro",
          interesses: ["Design", "Fotografia", "Viagens"]
        },
        {
          nome: "Carlos Pereira",
          idade: 28,
          profissao: "Analista de Dados",
          cidade: "Belo Horizonte",
          interesses: ["Estatística", "Tecnologia", "Cinema"]
        }
      ];
      

    res.render('home', {posts})
})

app.listen(3000, () => {
    console.log(`Servidorr na porta 3000`)
})