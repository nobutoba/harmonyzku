// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// A simple smart contract with
//  1. number: A single state variable.
//  2. storeNumber: The setter method for the state variable.
//  3. retrieveNumber: The getter for the state variable. 
contract HelloWorld {

    // The only one state variable.
    uint public number;

    // The setter method of number. 
    function storeNumber(uint _number) public {
        number = _number;
    }

    // The getter method of number.
    function retrieveNumber() public view returns (uint _number) {
        _number = number;
    }
}
