const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const sequelize = require('./src/db/sequelize');
const res = require('express/lib/response');

const app = express()
const port = process.env.PORT || 3000  //  variable port pour l'environement de production

// middleware pour afficher le log  url dans la console (remplacer par morgan)
/* const logger = (req, res, next) => {
    console.log(`url : ${req.url}`);
    next();
}
app.use(logger); */
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())


sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Hello, ovh !')
})

// points de terminaison
// syntaxe courante remplacer par une astuce de syntaxe -> require('./src/routes/findAllPokemons')(app)
/* const findAllPokemons = require('./src/routes/findAllPokemons')
findAllPokemons(app) */

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//gestion des erreurs 404
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressourcce demandée ! Vous pouvez essayer une aitre url.'
    res.status(404).json({ message })
})

app.listen(port, () => console.log(`Notre première application est démarrer sur : http://localhost:${port}`))
