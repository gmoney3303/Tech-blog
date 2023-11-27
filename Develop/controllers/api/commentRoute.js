const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/:id', async (req, res) => {
    try {
        const message = await Comment.create({
            ...req.body,body,
            user_id: req.session.user_id,
            post_id: req.params.id
        });
        res.json({message})
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;