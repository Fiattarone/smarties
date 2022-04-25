pragma solidity ^0.4.17; //version of solidity

contract Inbox {
    string public message; //declaring public message

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }
}
