const hre = require("hardhat");
const H3JS = require("h3-js");

class H3Contract {

    h3Contract = null;

    constructor(h3Contracts = null) {
        this.h3Contract = h3Contracts;
    }

    static async connectContract(address) {
        // Get the contract factory
        const H3Contract = await hre.ethers.getContractFactory("H3Contract");

        // Connect to the contract
        const h3Contract = H3Contract.attach(address);

        return new H3Contract(h3Contract);
    }

    static async deployContract(owner, community, communitySymbol, isPublic, isOpen, h3Price) {
        // Get the contract factory
        const H3Contract = await hre.ethers.getContractFactory("H3Contract");

        // Deploy the contract
        const h3Contract = await H3Contract.deploy(owner, community, communitySymbol, isPublic, isOpen, h3Price);

        // Wait for the contract to be deployed
        await h3Contract.waitForDeployment();

        return new H3Contract(h3Contract);
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

    async get_full_H3(latitud, longitud, level) {
        h3_level = convert_level(level);
        index = H3JS.latLngToCell(latitud, longitud, convert_level(h3_level));
        const neighbours = H3JS.gridDisk(index, 1);
        neighbours.push(index);
        ret = [];
        for (let i = 0; i < neighbours.length; i++) {
            if (h3_level == 1) {
                ret = ret.concat(await getH3_1(neighbours[i]));
            }
            if (h3_level == 2) {
                ret = ret.concat(await getH3_2(neighbours[i]));
            }
            if (h3_level == 4) {
                ret = ret.concat(await getH3_4(neighbours[i]));
            }
            if (h3_level == 6) {
                ret = ret.concat(await getH3_6(neighbours[i]));
            }
            if (h3_level == 8) {
                ret = ret.concat(await getH3_8(neighbours[i]));
            }
            if (h3_level == 10) {
                ret = ret.concat(await getH3_10(neighbours[i]));
            }
            if (h3_level == 12) {
                ret = ret.concat(await getH3_12(neighbours[i]));
            }
            if (h3_level == 14) {
                ret = ret.concat(await getH3_14(neighbours[i]));
            }
        }
        for (let i = 0; i < ret.length; i++) {
            ret[i] = await getTokenMetadata(ret[i]);
        }
    }

    async createNFTH3(tokenId, name, description, imageURI, latitud, longitud, level_min, level_max) {
        let h3_min = convert_level(level_min);
        let h3_max = convert_level(level_max);

        h3_1 = 0;
        if (h3_min <= 1 && h3_max >= 1) h3_1 = H3JS.latLngToCell(latitud, longitud, 1);
        if (h3_min <= 2 && h3_max >= 2) h3_2 = H3JS.latLngToCell(latitud, longitud, 2);
        if (h3_min <= 4 && h3_max >= 4) h3_4 = H3JS.latLngToCell(latitud, longitud, 4);
        if (h3_min <= 6 && h3_max >= 6) h3_6 = H3JS.latLngToCell(latitud, longitud, 6);
        if (h3_min <= 8 && h3_max >= 8) h3_8 = H3JS.latLngToCell(latitud, longitud, 8);
        if (h3_min <= 10 && h3_max >= 10) h3_10 = H3JS.latLngToCell(latitud, longitud, 10);
        if (h3_min <= 12 && h3_max >= 12) h3_12 = H3JS.latLngToCell(latitud, longitud, 12);
        if (h3_min <= 14 && h3_max >= 14) h3_14 = H3JS.latLngToCell(latitud, longitud, 14);

        await this.h3Contract.createNFT(tokenId, { name, description, imageURI, latitud, longitud }, h3_1, h3_2, h3_4, h3_6, h3_8, h3_10, h3_12, h3_14);

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


