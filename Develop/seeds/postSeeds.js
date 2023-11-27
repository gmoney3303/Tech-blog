const { Post } = require('../models');

const postSeeds = [

    {
        title: 'Happy Halloween',
        post_date: 'October 31, 2023 11:30:00',
        post_content: 'Hey everybody, Happy Halloween. Hope you get lots of candy!',
        user_id: 1
    },

    {
        title: 'Loving the weather',
        post_date: 'November 12, 2023 14:00:00',
        post_content: 'Gotta love the seasons changing. Hope you are all healthy & well.',
        user_id: 2
    },

];

const seedPosts = () => Post.bulkCreate(postSeeds);

module.exports = seedPosts;