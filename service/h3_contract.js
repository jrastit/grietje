const hre = require("hardhat");
const H3JS = require("h3-js");


class H3Contract {

    h3Contract = null;

    constructor(h3Contracts = null) {
        this.h3Contract = h3Contracts;
    }

    static getSigner(wallet) {
        return getSigner(wallet);
    }

    static async connectContract(signer, contract_address) {

        // Get the contract factory
        const contractFactory = await hre.ethers.getContractFactory("H3", signer);

        // Connect to the contract
        const contract = contractFactory.attach(contract_address);

        return new H3Contract(contract);
    }

    static async deployContract(signer, owner, community, communitySymbol, isPublic, isOpen, h3Price) {

        // Get the contract factory
        const contractFactory = await hre.ethers.getContractFactory("H3", signer);

        // Deploy the contract
        const contract = await contractFactory.deploy(owner, community, communitySymbol, isPublic, isOpen, h3Price);

        // Wait for the contract to be deployed
        await contract.waitForDeployment();

        return new H3Contract(contract);
    }

    async getContractAddress() {
        return this.h3Contract.address;
    }

    async getOwner() {
        return this.h3Contract.owner();
    }

    async withdraw() {
        await this.h3Contract.withdraw();
    }

    async addMember(member) {
        await this.h3Contract.addMember(member);
    }

    async removeMember(member) {
        await this.h3Contract.removeMember(member);
    }

    async addViewer(viewer) {
        await this.h3Contract.addViewer(viewer);
    }

    async removeViewer(viewer) {
        await this.h3Contract.removeViewer(viewer);
    }

    async i_am_member() {
        return this.h3Contract.i_am_member();
    }

    async i_am_viewer() {
        return this.h3Contract.i_am_viewer();
    }

    async convert_level(level) {
        if (level == 0) return 0;
        if (level == 1) return 1;
        if (level == 2) return 2;
        if (level == 3) return 4;
        if (level == 4) return 6;
        if (level == 5) return 8;
        if (level == 6) return 10;
        if (level == 7) return 12;
        if (level == 8) return 14;
    }

    async get_nft_list(h3_index, h3_level) {
        nft_list = [];
        if (h3_level == 1) {
            nft_list = await this.h3Contract.getH3_1(h3_index);
        }
        else if (h3_level == 2) {
            nft_list = await this.h3Contract.getH3_2(h3_index);
        }
        else if (h3_level == 4) {
            nft_list = await this.h3Contract.getH3_4(h3_index);
        }
        else if (h3_level == 6) {
            nft_list = await this.h3Contract.getH3_6(h3_index);
        }
        else if (h3_level == 8) {
            nft_list = await this.h3Contract.getH3_8(h3_index);
        }
        else if (h3_level == 10) {
            nft_list = await this.h3Contract.getH3_10(h3_index);
        }
        else if (h3_level == 12) {
            nft_list = await this.h3Contract.getH3_12(h3_index);
        }
        else if (h3_level == 14) {
            nft_list = await this.h3Contract.getH3_14(h3_index);
        }

        for (let nft of nft_list) {
            nft.contract_address = this.h3Contract.address;
        }
        return nft_list;

    }

    async get_full_H3(latitud, longitud, level) {
        h3_level = convert_level(level);
        index = H3JS.latLngToCell(latitud, longitud, convert_level(h3_level));
        const neighbours = H3JS.gridDisk(index, 1);
        neighbours.push(index);
        ret = [];
        for (let i = 0; i < neighbours.length; i++) {
            ret = ret.concat(await this.get_nft_list(neighbours[i], h3_level));
        }
        for (let i = 0; i < ret.length; i++) {
            ret[i] = await getTokenMetadata(ret[i]);
        }
    }

    async createNFTH3(tokenId, name, description, imageURI, latitud, longitud, level_min, level_max) {
        const h3_min = this.convert_level(level_min);
        const h3_max = this.convert_level(level_max);

        let h3_1 = 0;
        let h3_2 = 0;
        let h3_4 = 0;
        let h3_6 = 0;
        let h3_8 = 0;
        let h3_10 = 0;
        let h3_12 = 0;
        let h3_14 = 0;
        if (h3_min <= 1 && h3_max >= 1) h3_1 = H3JS.latLngToCell(latitud, longitud, 1);
        if (h3_min <= 2 && h3_max >= 2) h3_2 = H3JS.latLngToCell(latitud, longitud, 2);
        if (h3_min <= 4 && h3_max >= 4) h3_4 = H3JS.latLngToCell(latitud, longitud, 4);
        if (h3_min <= 6 && h3_max >= 6) h3_6 = H3JS.latLngToCell(latitud, longitud, 6);
        if (h3_min <= 8 && h3_max >= 8) h3_8 = H3JS.latLngToCell(latitud, longitud, 8);
        if (h3_min <= 10 && h3_max >= 10) h3_10 = H3JS.latLngToCell(latitud, longitud, 10);
        if (h3_min <= 12 && h3_max >= 12) h3_12 = H3JS.latLngToCell(latitud, longitud, 12);
        if (h3_min <= 14 && h3_max >= 14) h3_14 = H3JS.latLngToCell(latitud, longitud, 14);

        await this.h3Contract.createNFT(tokenId, { name, description, imageURI, position: "(" + latitud + ', ' + longitud + ")" }, h3_1, h3_2, h3_4, h3_6, h3_8, h3_10, h3_12, h3_14);

    }


    async createNFT(tokenId, name, description, imageURI, position, h3_1, h3_2, h3_4, h3_6, h3_8, h3_10, h3_12, h3_14) {
        await this.h3Contract.createNFT(tokenId, { name, description, imageURI, position }, h3_1, h3_2, h3_4, h3_6, h3_8, h3_10, h3_12, h3_14);
    }

    async getTokenMetadata(tokenId) {
        return this.h3Contract.getTokenMetadata(tokenId);
    }

    async getTokenURI(tokenId) {
        return this.h3Contract.getTokenURI(tokenId);
    }
}

module.exports = H3Contract;


