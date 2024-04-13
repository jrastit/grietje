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

export default router;