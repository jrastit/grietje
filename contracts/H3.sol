// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

contract H3 is ERC721, ERC721Burnable {
    event H3Community(
        address owner,
        string name,
        string symbol,
        bool isPublic,
        bool isOpen
    );

    uint256 private _tokenId = 1;

    uint256 _h3_price;

    address payable public owner;

    struct NFTMetadata {
        string name;
        string description;
        string imageURI;
        string position;
    }

    struct NFTPosition {
        uint64 h3_1;
        uint64 h3_2;
        uint64 h3_4;
        uint64 h3_6;
        uint64 h3_8;
        uint64 h3_10;
        uint64 h3_12;
        uint64 h3_14;
    }

    struct NFT {
        NFTMetadata metadata;
        NFTPosition position;
    }

    struct NFTChain {
        NFTChain prev;
        NFTChain next;
        uint256 tokenId;
    }

    mapping(uint256 => NFTMetadata) private _tokenMetadata;
    mapping(uint64 => uint256[]) private _h3_1;
    mapping(uint64 => uint256[]) private _h3_2;
    mapping(uint64 => uint256[]) private _h3_4;
    mapping(uint64 => uint256[]) private _h3_6;
    mapping(uint64 => uint256[]) private _h3_8;
    mapping(uint64 => uint256[]) private _h3_10;
    mapping(uint64 => uint256[]) private _h3_12;
    mapping(uint64 => uint256[]) private _h3_14;

    mapping(address => bool) private _member;
    mapping(address => bool) private _viewer;

    bool public isPublic = false;
    bool public isOpen = false;

    constructor(
        address initialOwner,
        string memory name,
        string memory symbol,
        bool _isPublic,
        bool _isOpen,
        uint256 h3_price
    ) ERC721(name, symbol) {
        owner = payable(initialOwner);
        _h3_price = h3_price;
        isPublic = _isPublic;
        isOpen = _isOpen;
        emit H3Community(owner, name, symbol, isPublic, isOpen);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can call this function");
        owner.transfer(address(this).balance);
    }

    modifier onlyMember() {
        require(
            isOpen == true ||
                msg.sender == owner ||
                _member[msg.sender] == true,
            "Only members can call this function"
        );
        _;
    }

    modifier onlyviewer() {
        require(
            isPublic == true ||
                msg.sender == owner ||
                _member[msg.sender] == true ||
                _viewer[msg.sender] == true,
            "Only viewer can call this function"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function addMember(address member) external onlyOwner {
        _member[member] = true;
    }

    function removeMember(address member) external onlyOwner {
        _member[member] = false;
    }

    function addViewse(address member) external onlyOwner {
        _member[member] = true;
    }

    function removeViewer(address member) external onlyOwner {
        _member[member] = false;
    }

    function i_am_viewer() external view returns (bool) {
        return _viewer[msg.sender];
    }

    function i_am_member() external view returns (bool) {
        return _member[msg.sender];
    }

    function getH3_1(
        uint64 h3_1
    ) external view onlyviewer returns (uint256[] memory) {
        return _h3_1[h3_1];
    }

    function getH3_2(
        uint64 h3_2
    ) external view onlyviewer returns (uint256[] memory) {
        return _h3_2[h3_2];
    }

    function getH3_4(
        uint64 h3_4
    ) external view onlyviewer returns (uint256[] memory) {
        return _h3_4[h3_4];
    }

    function getH3_6(
        uint64 h3_6
    ) external view onlyviewer returns (uint256[] memory) {
        return _h3_6[h3_6];
    }

    function getH3_8(
        uint64 h3_8
    ) external view onlyviewer returns (uint256[] memory) {
        return _h3_8[h3_8];
    }

    function getH3_10(
        uint64 h3_10
    ) external view onlyviewer returns (uint256[] memory) {
        return _h3_10[h3_10];
    }

    function getH3_12(
        uint64 h3_12
    ) external view onlyviewer returns (uint256[] memory) {
        return _h3_12[h3_12];
    }

    function getH3_14(
        uint64 h3_14
    ) external view onlyviewer returns (uint256[] memory) {
        return _h3_14[h3_14];
    }

    function createNFT(
        NFTMetadata memory metadata,
        uint64 h3_1,
        uint64 h3_2,
        uint64 h3_4,
        uint64 h3_6,
        uint64 h3_8,
        uint64 h3_10,
        uint64 h3_12,
        uint64 h3_14
    ) external payable onlyMember {
        uint256 price = 0;
        uint256 tokenId = _tokenId++;
        _mint(msg.sender, tokenId);
        _setTokenMetadata(tokenId, metadata);
        if (h3_1 != 0) {
            _h3_1[h3_1].push(tokenId);
            price += _h3_price * 128;
        }
        if (h3_2 != 0) {
            _h3_2[h3_2].push(tokenId);
            price += _h3_price * 64;
        }
        if (h3_4 != 0) {
            _h3_4[h3_4].push(tokenId);
            price += _h3_price * 32;
        }
        if (h3_6 != 0) {
            _h3_6[h3_6].push(tokenId);
            price += _h3_price * 16;
        }
        if (h3_8 != 0) {
            _h3_8[h3_8].push(tokenId);
            price += _h3_price * 8;
        }
        if (h3_10 != 0) {
            _h3_10[h3_10].push(tokenId);
            price += _h3_price * 4;
        }
        if (h3_12 != 0) {
            _h3_12[h3_12].push(tokenId);
            price += _h3_price * 2;
        }
        if (h3_14 != 0) {
            _h3_14[h3_14].push(tokenId);
            price += _h3_price;
        }
        require(
            msg.sender == owner || msg.value >= price,
            "Insufficient funds"
        );
        owner.transfer(msg.value);
    }

    function _setTokenMetadata(
        uint256 tokenId,
        NFTMetadata memory metadata
    ) private {
        _tokenMetadata[tokenId] = metadata;
    }

    function getTokenMetadata(
        uint256 tokenId
    ) external view onlyviewer returns (NFTMetadata memory) {
        return _tokenMetadata[tokenId];
    }

    function getTokenURI(
        uint256 tokenId
    ) external view onlyMember returns (string memory) {
        return computeMetadataURI(_tokenMetadata[tokenId]);
    }

    function computeMetadataURI(
        NFTMetadata memory metadata
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                metadata.name,
                                '",',
                                '"description":"',
                                metadata.description,
                                '",',
                                '"image":"',
                                metadata.imageURI,
                                '"',
                                '"position":"',
                                metadata.position,
                                "}"
                            )
                        )
                    )
                )
            );
    }
}
