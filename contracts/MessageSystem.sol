// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract MessageSystem{

    enum Designation{None,HOD,facultiy}
    mapping(address => Designation) public members;
    
    //events to log the messages.
    event upMessageLog(address indexed _from,Designation indexed _senderDesignation,Designation _to, string message);
    event downMessageLog(address indexed _from,Designation indexed _senderDesignation,Designation _to, string message);
    event horizontalMessageLog(address indexed _from,Designation indexed _senderDesignation, Designation _to, string message);

    //add member function to add Hod/faculity.
    function addMember(address _address, Designation _isWho)public {
        members[_address] = _isWho;
    }

    // function for faculity to send messages to hods.
    function upMessage(address _address,string memory _message)public{
        // only faculities can call this function.
        require(members[_address] == Designation.facultiy);
        emit upMessageLog(_address,Designation.facultiy, Designation.HOD, _message);
    }

    //function for HOD to send messages to faculities.
    function downMessage(address _address,string memory _message)public {
        //only HODs can call this function.
        require(members[_address] == Designation.HOD);
        emit downMessageLog(_address,Designation.HOD, Designation.facultiy, _message);
    }
    
    //function for both hods and faculities, but at horizontal level not hierarchical level
    function horizontalMessage(address _address,string memory _message)public {
        //only hods and faculities can call this function.
        if(members[_address] == Designation.None){
            revert("Member not in organisation");
        }
        emit horizontalMessageLog(_address, members[_address], members[_address], _message);
    }

    //function to delete a member if he or she leaves the university.
    function deleteMember(address _address)public{
        members[_address] =Designation.None;
    }

    //test addresses:
    //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 - hod
    //0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 - faculity
    //0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db - faculity

}