const ethers = require("ethers");
const sapphire = require("@oasisprotocol/sapphire-paratime");
const WALLET = require("../model/wallet");

const getUser = async (login) => {
    return await WALLET.findOne({
        where: {
            login: login
        }
    });
}

const getSignerForUser = async (user) => {
    const wallet = await WALLET.findOne({
        where: {
            userId: user.id
        }
    });
    const privKey = wallet.key;
    const provider = new ethers.JsonRpcProvider('https://testnet.sapphire.oasis.io')
    const signer = sapphire.wrap(
        new ethers.Wallet(privKey, provider),
    );
    return signer;
}

const getWallet = async (req, res, next) => {
    try {
        console.log("get wallet for %s", req.user.id);
        const wallet = await WALLET.findOne({
            where: {
                userId: req.user.id
            }
        });
        if (wallet == null) {
            res.status(404).send({ 'error': 'Wallet not found' });
        }
        req.wallet = wallet;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({ 'error': error });
    }
}

const getSigner = async (req, res, next) => {
    try {
        console.log("get signer for %s", req.user.id);
        const wallet = req.wallet;
        const privKey = wallet.key;
        const provider = new ethers.JsonRpcProvider('https://testnet.sapphire.oasis.io')
        const signer = sapphire.wrap(
            new ethers.Wallet(privKey, provider),
        );
        if (signer == null) {
            res.status(404).send({ 'error': 'Signer not found' });
        }
        req.signer = signer;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({ 'error': error });
    }
}

module.exports = { getSignerForUser, getWallet, getSigner, getUser };
