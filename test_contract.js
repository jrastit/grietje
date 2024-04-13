
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("H3", function () {
    let H3, h3, owner, addr1, addr2;

    beforeEach(async function () {
        H3 = await ethers.getContractFactory("H3");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        h3 = await H3.deploy(owner.address, 100);
        await h3.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await h3.owner()).to.equal(owner.address);
        });
    });

    describe("Transactions", function () {
        it("Should create a new NFT", async function () {
            await h3.connect(addr1).createNFT(
                1,
                {
                    name: "Test NFT",
                    description: "This is a test NFT",
                    imageURI: "https://example.com/image.png",
                    position: "0,0,0"
                },
                0, 0, 0, 0, 0, 0, 0, 0,
                { value: ethers.utils.parseEther("1") }
            );

            const metadata = await h3.getTokenMetadata(1);
            expect(metadata.name).to.equal("Test NFT");
            expect(metadata.description).to.equal("This is a test NFT");
            expect(metadata.imageURI).to.equal("https://example.com/image.png");
            expect(metadata.position).to.equal("0,0,0");
        });
    });
});