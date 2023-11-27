const { User } = require('../models');

const userSeeds = [

    {
        user_id: 1,
        user_name: 'Borat',
        email: 'bangbang@gmail.com',
        password: 22,
    },

    {
        user_id: 2,
        user_name: 'derp',
        email: 'mememan420@yahoo.com',
        password: 25,
    },

];

const seedUsers = () => User.bulkCreate(userSeeds);

module.exports = seedUsers;