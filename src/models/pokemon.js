const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà pris'
            },
            validate: {
                notEmpty: { msg: 'Le nom ne peut pas etre nul.' },
                notNull: { msg: 'Le nom est une propiété requise' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
                notNull: { msg: 'Les points de vie sont une propiété requise' },
                min: {
                    args: [0],
                    msg: 'Les points de vie doivent ête supèreieurs ou égaales à 0'
                },
                max: {
                    args: [999],
                    msg: 'Les points de vie doivent ête infèrieurs à ou égaales 999'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les cp.' },
                notNull: { msg: 'Les cp sont une propiété requise' },
                min: {
                    args: [0],
                    msg: 'Les points de dégat doivent ête supèreieurs ou égaales à 0'
                },
                max: {
                    args: [100],
                    msg: 'Les points de dégat doivent ête infèrieurs à ou égaales 999'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: 'Utilisez uniquement une url valide pour l\'imgae.' },
                notNull: { msg: 'l\'imaage est une propiété requise' }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {  // custom validation
                    if (!value) {
                        throw new Error('un pokémon doit posséder au moins un type.')
                    }
                    if (value.split(',').length > 3) {
                        throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante ${validTypes} `)
                        }
                    });
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}