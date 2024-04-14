
const { expect } = require("chai");
const { ethers } = require("hardhat");
const H3Contract = require("./service/h3_contract");
const { getUser, getSignerForUser } = require("./service/wallet_service");

describe("H3", function () {
    let H3, h3, owner, addr1, addr2;

    beforeEach(async function () {
        H3 = await ethers.getContractFactory("H3");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        console.log("Owner %s", owner.address);
        h3 = await H3.deploy(owner.address, "1 comunity", "1", true, true, 100);
        await h3.waitForDeployment();
        console.log("H3 address %s", await h3.getAddress());
        expect(await h3.getAddress()).not.undefined;
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await h3.owner()).to.equal(owner.address);
        });
    });

    describe("Transactions", function () {
        it("Should create a new NFT", async function () {
            await h3.connect(owner).createNFT(
                1,
                {
                    name: "Test NFT",
                    description: "This is a test NFT",
                    imageURI: "https://example.com/image.png",
                    position: "0,0,0"
                },
                0, 0, 0, 0, 0, 0, 0, 1,
                { value: 100 }
            );

            const metadata = await h3.getTokenMetadata(1);
            expect(metadata.name).to.equal("Test NFT");
            expect(metadata.description).to.equal("This is a test NFT");
            expect(metadata.imageURI).to.equal("https://example.com/image.png");
            expect(metadata.position).to.equal("0,0,0");
        });
    });

    describe("H3 Contract", function () {
        it("Should create a new NFT", async function () {
            const user = getUser("test");
            const signer = getSignerForUser(user);
            const h3Contract = await H3Contract.connectContract(signer, await h3.getAddress());
            expect(h3Contract).not.undefined;
            expect(h3Contract.h3Contract).not.undefined;
            console.log("H3 Contract %s", h3Contract.h3Contract);
            await h3Contract.createNFTH3(1, "Test NFT", "This is a test NFT", "https://example.com/image.png", 52.370216, 4.895168, 1, 8);

            const metadata = await h3Contract.getTokenMetadata(1);
            expect(metadata.name).to.equal("Test NFT");
            expect(metadata.description).to.equal("This is a test NFT");
            expect(metadata.imageURI).to.equal("https://example.com/image.png");
            expect(metadata.position).to.equal("(52.370216, 4.895168)");
        });
    });
});