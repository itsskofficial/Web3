// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract SimpleStorage {
    // bool hasFavouriteNumber = true;
    // string favouriteNumberInText = "Five";
    // int256 favouriteInt = -5;
    // address myAddress = 0x18f6D5C9b2eF0105250cf5173f46b1d472934885;
    // bytes32 favouriteBytes = "cat";

    struct People {
        uint256 favouriteNumber;
        string name;
    }

    uint256 public favouriteNumber = 5;
    People public person = People({favouriteNumber: 2, name: "Sarthak"});
    People[] public  people; // array
    mapping(string => uint256) public nameToFavouriteNumber;

    function store(uint256 _favouriteNumber) public virtual  {
        favouriteNumber = _favouriteNumber;
        retrieve(); // costs gas as called by a gas function
    }

    // view and pure functions don't cost gas
    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    // function to add a person to the array 
    function addPerson(string memory _name, uint256 _favouriteNumber) public  {
        people.push(People(_favouriteNumber, _name));
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
} 