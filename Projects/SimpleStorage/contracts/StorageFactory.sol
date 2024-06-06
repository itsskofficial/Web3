// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "./SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage public simpleStorage;
    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorageContract() public {
        simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function storageFactoryStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        // we need address and the abi of the contract to interact with it
        simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
    }

    function storageFactoryGet(uint256 _simpleStorageIndex) public view returns(uint256) {
        return simpleStorageArray[_simpleStorageIndex].retrieve();
    }
}