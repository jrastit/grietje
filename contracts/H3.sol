// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

contract H3 is ERC721, ERC721Burnable, Ownable {
    struct NFTMetadata {
        string name;
        string description;
        string imageURI;
        string position;
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

    constructor(
        address initialOwner
    ) ERC721("H3", "H3") Ownable(initialOwner) {}

    function createNFT(
        uint256 tokenId,
        NFTMetadata memory metadata,
        uint64 h3_1,
        uint64 h3_2,
        uint64 h3_4,
        uint64 h3_6,
        uint64 h3_8,
        uint64 h3_10,
        uint64 h3_12,
        uint64 h3_14
    ) external onlyOwner {
        _mint(msg.sender, tokenId);
        _setTokenMetadata(tokenId, metadata);
        _h3_1[h3_1].push(tokenId);
        _h3_2[h3_2].push(tokenId);
        _h3_4[h3_4].push(tokenId);
        _h3_6[h3_6].push(tokenId);
        _h3_8[h3_8].push(tokenId);
        _h3_10[h3_10].push(tokenId);
        _h3_12[h3_12].push(tokenId);
        _h3_14[h3_14].push(tokenId);
    }

    function _setTokenMetadata(
        uint256 tokenId,
        NFTMetadata memory metadata
    ) internal {
        _tokenMetadata[tokenId] = metadata;
    }

    function getTokenMetadata(
        uint256 tokenId
    ) external view returns (NFTMetadata memory) {
        return _tokenMetadata[tokenId];
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
