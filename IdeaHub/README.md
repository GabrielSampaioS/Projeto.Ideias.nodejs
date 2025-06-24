
# 💡 IdeaHub

**IdeaHub** é uma aplicação web desenvolvida em **Node.js** com **Express** e **Sequelize**, que permite aos usuários cadastrar, visualizar, editar e excluir ideias. O sistema possui autenticação de usuários, dashboard pessoal, mensagens flash e uma interface amigável.

---

## ✨ Funcionalidades

- Cadastro e login de usuários
- Criação de ideias com título e descrição
- Edição e exclusão de ideias (apenas pelo dono)
- Dashboard pessoal com listagem das próprias ideias
- Visualização pública das ideias de todos os usuários
- Mensagens de feedback (flash messages)
- Interface responsiva com Handlebars

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- MySQL (ou outro banco relacional compatível)
- express-session
- express-handlebars
- express-flash
- bcryptjs
- nodemon (para desenvolvimento)

---

## 📁 Estrutura de Pastas

```
IdeaHub/
│
├── controllers/       # Lógica de controle
├── db/                # Conexão com banco de dados
├── helpers/           # Helpers para views
├── models/            # Modelos Sequelize (User, Idea)
├── public/            # Arquivos estáticos (CSS, JS)
├── routes/            # Rotas da aplicação
├── views/             # Templates Handlebars
└── app.js             # Arquivo principal da aplicação
```

---

## 🔑 Autenticação

- Usuários se cadastram e fazem login.
- Senhas são criptografadas com `bcryptjs`.
- Sessões são mantidas com `express-session` e `session-file-store`.

---

## 📝 Como rodar o projeto

### 1. Clone o repositório:

```bash
git clone https://github.com/GabrielSampaioS/projetos-nodejs.git
cd projetos-nodejs/IdeaHub
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Configure o banco de dados:

Edite o arquivo `db/conn.js` com suas credenciais do MySQL (ou outro banco suportado pelo Sequelize).

O Sequelize criará as tabelas automaticamente na primeira execução com `sequelize.sync()`.

### 4. Rode o projeto:

```bash
npm start
```

Ou, para desenvolvimento com atualização automática:

```bash
npm run dev
```

### 5. Acesse no navegador:

```
http://localhost:3000
```

---

## 🛠️ Possíveis melhorias

- Adicionar upload de imagens para ideias
- Implementar paginação nas listagens
- Permitir comentários em ideias e likes
- criar a responsividade do layout

---

## 🙏 Créditos

Este projeto foi fortemente inspirado nas aulas do [Matheus Battisti](https://www.youtube.com/@MatheusBattisti) do canal Hora de Codar.

A estrutura do sistema e o CSS foram baseados no projeto desenvolvido durante o curso, com adaptações e melhorias feitas por mim ao longo do aprendizado.

---

## 📝 Licença

Este projeto é **open-source** e pode ser usado livremente para fins de estudo e aprimoramento.

Desenvolvido por **Gabriel Sampaio**  

Se gostou, deixe uma estrela no repositório! ⭐
