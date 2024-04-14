import { route } from "../test";

const express = require("express");
const CONTRACT = require("../../../model/contract");
const WALLET = require("../../../model/wallet");
const H3Contract = require("../../../service/h3_contract");
const router = express.Router();

router.use(isAuthenticated)
//Route
router.post('/contract', async (req, res) => {
    userId = req.user.id;
    address = req.body.address;
    const wallet = await WALLET.findOne({
        where: {
            userId: userId,
            address: address
        }
    });
    if (wallet == null) {
        res.status(404).send({ 'error': 'Wallet not found' });
    }
    community = req.body.community;
    communitySymbol = req.body.communitySymbol;
    isPublic = req.body.isPublic;
    isOpen = req.body.isOpen;
    h3Price = req.body.h3Price;
    const contract = await H3Contract.deployContract(wallet, wallet.address, community, communitySymbol, isPublic, isOpen, h3Price);
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
//Route
router.post('/h3', async (req, res) => {
    try {
        latitud = req.params.latitud;
        longitud = req.params.longitud;
        level = req.params.level;
        contract_id = req.params.contract_id;
        contract_db_list = await CONTRACT.findOne(
            {
                where: {
                    id: contract_id
                }
            }
        );
        nft_list = [];
        for (contract in contract_db_list) {
            h3Contract = await H3Contract.connectContract(contract.address);
            nft_list_contract = await h3Contract.get_full_H3(latitud, longitud, level);
            nft_list.concat(nft_list_contract);
        }
        res.status(200).send({ 'nft_list': nft_list })
    } catch (err) {
        res.status(500).send(err)
    }
});

router.use(isAuthenticated)
//Route
router.post('/nft', async (req, res) => {
    try {
        contract_id = req.params.contract_id;
        contract_db_list = await CONTRACT.findOne(
            {
                where: {
                    id: contract_id
                }
            }
        );
        nft_list = [];
        for (contract in contract_db_list) {
            h3Contract = await H3Contract.connectContract(contract.address);
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