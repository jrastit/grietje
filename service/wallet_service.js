const hre = require("hardhat");
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
    const provider = hre.ethers.provider;
    const privKey = wallet.key;
    const signer_wallet = new hre.ethers.Wallet(privKey);
    const signer = signer_wallet.connect(provider);
    return signer;
}

const getWallet = async (req, res, next) => {
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
}

const getSigner = async (req, res, next) => {
    const wallet = req.wallet;
    const provider = hre.ethers.provider;
    const privKey = wallet.key;
    const signer_wallet = new hre.ethers.Wallet(privKey);
    const signer = signer_wallet.connect(provider);
    if (signer == null) {
        res.status(404).send({ 'error': 'Signer not found' });
    }
    req.signer = signer;
    next();
}

module.exports = { getSignerForUser, getWallet, getSigner, getUser };
