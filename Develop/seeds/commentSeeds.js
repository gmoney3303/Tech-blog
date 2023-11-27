const { Comment } = require('../models');

const commentSeeds = [

    {
        user_id: 2,
        post_id: 1,
        comment_date: 'October 31, 2023 13:00:00',
        comment_text: 'Happy Halloween to you too!'

    },

    {
        user_id: 1,
        post_id: 1,
        comment_date: 'October 31, 2023 13:12:22',
        comment_text: 'Have a good one :)'

    }

];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;