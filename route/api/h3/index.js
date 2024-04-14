const express = require("express");
const CONTRACT = require("../../../model/contract");
const H3Contract = require("../../../service/h3_contract");
const isAuthenticated = require('../../../service/is_authentificated');
const router = express.Router();
const { getWallet, getSigner } = require("../../../service/wallet_service");

router.use(isAuthenticated)
router.use(getWallet)
router.use(getSigner)
//Route
router.post('/contract', async (req, res) => {
    const community = req.body.community;
    const communitySymbol = req.body.communitySymbol;
    const isPublic = req.body.isPublic;
    const isOpen = req.body.isOpen;
    const h3Price = req.body.h3Price;
    const contract = await H3Contract.deployContract(signer, signer.address, community, communitySymbol, isPublic, isOpen, h3Price);
    CONTRACT.create({
        address: await contract.getContractAddress(),
        owner: wallet.address,
        community: community,
        communitySymbol: communitySymbol,
        isPublic: isPublic,
        isOpen: isOpen,
        h3Price: h3Price
    }).then((result) => {
        res.status(200).send({ 'contract': contract.toJSON() })
    }).catch((err) => {
        res.status(500).send(err)
    });
    res.status(200).send({ 'user': req.user.toJSON() })
})

router.use(isAuthenticated)
//Route
router.post('/list', (req, res) => {
    CONTRACT.findAll().then((result) => {
        res.status(200).send({ 'contracts': result })
    }
    ).catch((err) => {
        res.status(500).send(err)
    }
    );
});

router.use(isAuthenticated)
router.use(getWallet)
router.use(getSigner)
//Route
router.post('/h3', async (req, res) => {
    try {
        const signer = req.signer;
        const latitud = req.body.latitud;
        const longitud = req.body.longitud;
        const level = req.body.level;
        const contract_id = req.body.contract;

        console.log("Get H3 %s %s %s %s", latitud, longitud, level, req.body);

        const h3Contract = await H3Contract.connectContract(signer, contract_id);
        nft_list = await h3Contract.get_full_H3(latitud, longitud, level);

        res.status(200).send({ 'nft_list': nft_list })
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
});

router.use(isAuthenticated)
router.use(getWallet)
//Route
router.post('/nft', async (req, res) => {
    try {
        const signer = req.signer;
        console.log(req.body);
        const contractAddress = req.body.contract;
        /*
        contract_db = await CONTRACT.findOne(
            {
                where: {
                    address: contract_id
                }
            }
        );
        */

        const h3Contract = await H3Contract.connectContract(signer, contractAddress);
        console.log("Mint nft %s", req.body.name);
        await h3Contract.createNFTH3(
            req.body.name,
            req.body.description,
            req.body.imageURI,
            req.body.latitud,
            req.body.longitud,
            req.body.level_min,
            req.body.level_max,
        );
        console.log("Minted nft %s", req.body.name);
        res.status(200).send({ 'status': 'ok' })
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
});

module.exports = router;