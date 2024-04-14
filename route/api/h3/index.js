import { route } from "../test";

const express = require("express");
const CONTRACT = require("../../../model/contract");
const WALLET = require("../../../model/wallet");
const H3Contract = require("../../../service/h3_contract");
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
        const latitud = req.params.latitud;
        const longitud = req.params.longitud;
        const level = req.params.level;
        const contract_id = req.params.contractId;

        contract_db_list = await CONTRACT.findOne(
            {
                where: {
                    id: contract_id
                }
            }
        );
        nft_list = [];
        for (var contract in contract_db_list) {
            const h3Contract = await H3Contract.connectContract(signer, contract.address);
            nft_list_contract = await h3Contract.get_full_H3(latitud, longitud, level);
            nft_list.concat(nft_list_contract);
        }
        res.status(200).send({ 'nft_list': nft_list })
    } catch (err) {
        res.status(500).send(err)
    }
});

router.use(isAuthenticated)
router.use(getWallet)
//Route
router.post('/nft', async (req, res) => {
    try {
        const signer = req.signer;
        const contract_id = req.params.contract_id;
        contract_db_list = await CONTRACT.findOne(
            {
                where: {
                    id: contract_id
                }
            }
        );
        nft_list = [];
        for (var contract in contract_db_list) {
            const h3Contract = await H3Contract.connectContract(signer, contract.address);
            nft_list_contract = await h3Contract.createNFTH3(
                req.body.tokenId,
                req.body.name,
                req.body.description,
                req.body.imageURI,
                req.body.latitud,
                req.body.longitud,
                req.body.level_min,
                req.body.level_max,
            );
        }
        res.status(200).send({ 'status': 'ok' })
    } catch (err) {
        res.status(500).send(err)
    }
});

export default router;