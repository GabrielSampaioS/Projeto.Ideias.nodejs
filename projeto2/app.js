const express = require("express")
const app = express()
const port = 5000
const path = require('path')

const projectsRoutes = require('./projects')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/projects', projectsRoutes)


app.listen(port, () => {
    console,console.log(`O servidor esta rotando na porta ${port}`);
    
})