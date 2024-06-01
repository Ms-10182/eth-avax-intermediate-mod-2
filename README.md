# Message System
This fullstack code is made from the proper message communtication between different bodies of an organisation, here in this code university is taken as example, here hod can send message to faculities , faculity to Hods, faculity to faculities and Hod to Hods.
## Description
### Smart contract part
This contract is written in Solidity language, a programming language used for developing smart contracts on the Ethereum blockchain. In smart contract first we have ```enum Designation``` which will tell the designation of the members. ```members``` is a state variable to store the designation of members. ```addMember()``` adds a member with its designation. ```upMessage()``` can only called by faculities to send message to hod and ```downMessage()``` can be called by hod only to send message to faculities. ```horizontalMessage()``` can be called by both but to send message to the same level no hierarchical level. ```deleteMember()``` will delete the existing member.
### Front end part
```index.html``` and ```styles.css``` is used to create and design the structure and look of the front end and script.js is used for the logic purpose. In js file we have contract address, abi. Using this with ethers.js we get create the provider, signer and contract. then ```connect()``` is used to connect the wallet. and rest all the functions are connected with the solidity functions. ```checkMember()``` is used to get the designation of the member from blockchain and ```getDesignationName()``` provides the name of the designation for its integer value.  

## Getting Started

### Executing program

To run this program, First create a directory , switch to that directory and open it in vs code. In terminal run the following commands:
1)

## Authors

Mayank Sharma  
[@Mayank](https://www.linkedin.com/in/mayank-sharma-078278243/)


## License

This MyToken is licensed under the MIT License 
