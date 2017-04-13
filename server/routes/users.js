const router = require('express').Router();
const User = require('../models').User;

router.get('/', (req, res) => {
    User.findAll().then(user => res.json(user)).catch(err => res.json(err));
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => res.json(err));
});

router.post('/', (req, res) => {
    User
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

router.put('/:id', (req, res) => {
    User
        .update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        .then(count =>
            User.findById(req.params.id)
                .then(user => res.json(user).catch(err => res.json(err))))
        .catch(err => res.json(err));
});

router.delete('/:id', (req, res) => {
    User
        .destroy({
            where: {
                id: req.params.id,
            },
        })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

module.exports = router;
