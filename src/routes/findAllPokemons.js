const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        if (req.query.name) {                       // condition pour la recherche par parametre de requete name
            const name = req.query.name                 // recherche par parametre name de l'url
            const limit = parseInt(req.query.limit) || 5 // limite par defaut si pas de parametre url passé pour limit

            if (name.length < 2) {
                const message = 'Le terme de recherche doit contenir au moins 2 caractères.'
                res.status(400).json({ message })
            }

            return Pokemon.findAndCountAll({
                where: {
                    name: {                 // 'name' est la propriété du model Pokemon
                        [Op.like]: `%${name}%`      // 'name' est le critère de recherche de l'url / %${name}% -> syntaxe veut dire contient ... ${name}% -> commence par... %${name} -> fini par./..
                    }
                },
                order: ['name'],    // raccourci pour ['name', 'ASC']
                limit: limit
            })
                .then(({ count, rows }) => {
                    const message = `Il y'a ${count} pokémons pour cette recherches.`
                    res.json({ message, data: rows })
                })
        } else {
            Pokemon.findAll({ order: ['name'] })
                .then(datas => {
                    const message = 'La liste des pokémons a bien été récupérée.'
                    res.json({ message, data: datas })
                })
                .catch(error => {
                    const message = `La liste des pokémons n'a pas pu être récupérée. Réessayer dans quelques instants.`
                    res.status(500).json({ message, data: error })
                })
        }
    })
}