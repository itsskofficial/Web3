// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract Call {
    address public s_address;
    uint256 public s_amount;

    function transfer(address _address, uint256 _amount) public {
        s_address = _address;
        s_amount = _amount;
    }

    function getSelector() public pure returns (bytes4) {
        bytes4 selector = bytes4(keccak256(bytes("transfer(address,uint256)")));
        return selector;    
    }

    function getDataToCallTransferWithSelector(address _address, uint256 _amount) public pure returns (bytes memory) {
        bytes memory data = abi.encodeWithSelector(getSelector(), _address, _amount);
        return data;
    }

    function getDataToCallTransferWithSignature(address _address, uint256 _amount) public pure returns (bytes memory) {
        bytes memory data = abi.encodeWithSignature("transfer(address,uint256)", _address, _amount);
        return data;
    }

    function callTransfer(address _address, uint256 _amount) public returns (bytes4, bool) {
        (bool success, bytes memory data) = address(this).call(getDataToCallTransferWithSelector(_address, _amount));
        return (bytes4(data), success);
    }
}