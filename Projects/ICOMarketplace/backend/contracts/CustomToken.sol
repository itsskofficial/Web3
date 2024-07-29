// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20{
    constructor() ERC20("itsskofficial", "SK") {
        _mint(msg.msg.sender, 50000 ** 18);
    }
}