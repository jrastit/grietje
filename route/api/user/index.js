const passport = require('passport')

const isAuthenticated = require('../../../service/is_authentificated');

const express = require("express");

const router = express.Router();

//Login Route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send({ 'user': req.user.toJSON() })
});

//Login Route
router.put('/register', passport.authenticate('local.signup'), (req, res) => {
    res.status(200).send({ 'user': req.user.toJSON() })
});


//Logout Route
router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).send({ 'user': req.user?.toJSON() })
})

router.use(isAuthenticated)
//Route
router.post('/user', (req, res) => {
    res.status(200).send({ 'user': req.user.toJSON() })
})

module.exports = router;