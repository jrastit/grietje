const passport = require('passport')

const isAuthenticated = require('../../../service/is_authentificated');

const express = require("express");

const router = express.Router();

const WALLET = require("../../../model/wallet");

router.use(isAuthenticated)
//Route
router.post('/wallet', (req, res) => {
    const wallet = getNewWallet(req.user.id);
    WALLET.create(wallet).then((result) => {
        res.status(200).send({ 'wallet': wallet.toJSON() })
    }).catch((err) => {
        res.status(500).send
    });
});

router.use(isAuthenticated)
//Route
router.post('/list', (req, res) => {
    WALLET.findAll({
        where: {
            userId: req.user.id
        }
    }).then((result) => {
        res.status(200).send({ 'wallets': result })
    }).catch((err) => {
        res.status(500).send
    });
});

module.exports = router;