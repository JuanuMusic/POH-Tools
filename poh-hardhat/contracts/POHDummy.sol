//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/**
 * @title POH Dummy
 * @dev A Dummy implementation of the Proof of Humanity contract for testing purposes.
 */
contract POHDummy {

    /**
     * @dev The registry of humans. Maps address to expiration date.
     */ 
    mapping(address => uint256) registry;

    constructor() {
    }

    /// @dev Registers the calling account by passing an expiration date. Expiration date must be in the future.
    function register(uint256 expiration) public {
        require(expiration > block.timestamp, "registry can't expire in the past");
        require(!isRegistered(msg.sender), "already registered");
        registry[msg.sender] = expiration;
    }

    /// @dev Unregisters a human by setting the expiration date to 0. Human must be registered / not expired.
    function unregister() public {
        require(isRegistered(msg.sender), "not registered");
        registry[msg.sender] = 0;
    }

    /// @dev Indicates if the address is currently registered on the registry.
    function isRegistered(address account) public view returns(bool) {
        return registry[account] > block.timestamp;
    }
}
