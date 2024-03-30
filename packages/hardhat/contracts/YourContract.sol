//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC4907.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract YourContract is ERC4907 {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;
	struct SubInfo {
		uint256 tokenId;
		address creatorAddress;
	}
	event NewSub(
		uint256 indexed tokenId,
		address indexed user,
		address indexed creatorAddress,
		uint64 expires
	);
	event SubscriptionUpdate(address indexed creatorAddress, uint256 subRate);
	struct SubRate {
		uint256 subRate;
		address creatorAddress;
	}

	mapping(uint256 => SubInfo) internal _subInfo;
	mapping(address => SubRate) internal _subRate;

	constructor(
		string memory name,
		string memory symbol
	) ERC4907(name, symbol) {}

	// mint a new subscription for the 0xXXX creator
	function mint(address to, address creatorAddress) public payable {
		uint256 tokenId = _tokenIds.current();
		require(
			msg.value == _subRate[creatorAddress].subRate,
			"Incorrect subscription rate"
		);
		_mint(to, tokenId);
		_subInfo[tokenId] = SubInfo({
			tokenId: tokenId,
			creatorAddress: creatorAddress
		});

		uint64 expires = uint64(block.timestamp) + 60 * 60 * 24 * 30;
		emit NewSub(tokenId, to, creatorAddress, expires);
		UserInfo storage info = _users[tokenId];
		info.user = to;
		info.expires = expires;
		emit UpdateUser(tokenId, to, expires);
		_tokenIds.increment();
	}

	// update payment Rate for creator subscription
	function addCreator(address creatorAddress, uint256 monthlyRate) public {
		require(
			msg.sender == creatorAddress,
			"Only the creator can update monthlyRate"
		);
		_subRate[creatorAddress] = SubRate({
			subRate: monthlyRate,
			creatorAddress: creatorAddress
		});
		emit SubscriptionUpdate(creatorAddress, monthlyRate);
	}

	function isCreator(address userAddress) public view returns (bool) {
		return userAddress == _subRate[userAddress].creatorAddress;
	}

	function getCurrentTokenId() public view returns (uint256) {
		return _tokenIds.current();
	}

	function creatorMonthlyRate(
		address userAddress
	) public view returns (uint256) {
		return _subRate[userAddress].subRate;
	}

	// bump subscription another 30 days
	function bumpSubscription(uint256 tokenId, address user) public payable {
		address creatorAddress = _subInfo[tokenId].creatorAddress;
		require(
			msg.value == _subRate[creatorAddress].subRate,
			"Incorrect subscription rate"
		);
		require(
			_isApprovedOrOwner(msg.sender, tokenId),
			"ERC721: transfer caller is not owner nor approved"
		);
		UserInfo storage info = _users[tokenId];
		info.user = user;
		uint64 expires = uint64(block.timestamp) + 60 * 60 * 24 * 30;
		info.expires = expires;
		emit UpdateUser(tokenId, user, expires);
	}
}
