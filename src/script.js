// The Ethereum smart contract address
const contractAddress = '0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690';

// The ABI (Application Binary Interface) of the smart contract

// const contractABI = require("../artifacts/contracts/MessageSystem.sol/MessageSystem.json");
const contractABI =[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "enum MessageSystem.Designation",
        "name": "_senderDesignation",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum MessageSystem.Designation",
        "name": "_to",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "downMessageLog",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "enum MessageSystem.Designation",
        "name": "_senderDesignation",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum MessageSystem.Designation",
        "name": "_to",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "horizontalMessageLog",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "enum MessageSystem.Designation",
        "name": "_senderDesignation",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum MessageSystem.Designation",
        "name": "_to",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "upMessageLog",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "enum MessageSystem.Designation",
        "name": "_isWho",
        "type": "uint8"
      }
    ],
    "name": "addMember",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "deleteMember",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "downMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "horizontalMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "members",
    "outputs": [
      {
        "internalType": "enum MessageSystem.Designation",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "upMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
console.log(contractABI.abi);

let provider;
let signer;
let contract;

// Function to connect to the wallet

async function connect() {
    if (window.ethereum) {
        try {
            // Request account access if needed
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);
            // Initialize ethers provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            // Create a connection to the smart contract
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            alert('Wallet connected');
        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet');
        }
    } else {
        alert('No wallet found');
    }
}

// Add event listener to connect button
let connectToWallet = document.querySelector("#connect");
connectToWallet.addEventListener("click", connect);

// Function to add a member to the smart contract
async function addMember() {
  //get the address and the designation of the member to be added
    const address = document.getElementById('addMemberAddress').value;
    const designation = document.getElementById('designation').value;

    try {
        const tx = await contract.addMember(address, designation);
        await tx.wait();
        alert('Member added successfully');
    } catch (error) {
        console.error(error);
        alert('Failed to add member');
    }
}

// Function to remove a member from the smart contract
async function removeMember() {
  //get the address of the member to be deleted.
	const address = document.getElementById('deleteMemberAddress').value;

	try {
		const tx = await contract.deleteMember(address);
		await tx.wait();
		alert("Member deleted successfully");
	} catch (error){
		console.log(error);
		alert("Failed to remove memeber");
	}
}

//function to check the designation of the address
async function checkMember(){
  //to get the member address
  const address = document.getElementById('memberAddress').value;

  try{
    const tx = await contract.members(address);
    console.log(tx);  
  }catch(error){
    alert(error);
  }
}

// Function to send an "up message" to the smart contract
async function sendUpMessage() {
    const address = document.getElementById('messageAddress').value;
    const message = document.getElementById('message').value;

    try {
        const tx = await contract.upMessage(address, message);
        await tx.wait();
        alert('Message sent successfully');
        
        console.log(`message from Faculity To Hod : ${message}`);
    } catch (error) {
        console.error(error);
        alert('Failed to send message');
    }
}

// Function to send a "down message" to the smart contract
async function sendDownMessage() {
    const address = document.getElementById('messageAddress').value;
    const message = document.getElementById('message').value;

    try {
        const tx = await contract.downMessage(address, message);
        await tx.wait();
        alert('Message sent successfully');
        
        console.log(`message from Hod To Faculity : ${message}`);
    } catch (error) {
        console.error(error);
        alert('Failed to send message');
    }
}

// Function to send a "horizontal message" to the smart contract
	async function sendHorizontalMessage() {
    const address = document.getElementById('messageAddress').value;
    const message = document.getElementById('message').value;

    try {
      

        // Get the sender's designation from the contract
        const senderDesignationIndex = await contract.members(address);
        const senderDesignation = getDesignationName(senderDesignationIndex);

        // Call the smart contract function to send a horizontal message
        const tx = await contract.horizontalMessage(address, message);
        await tx.wait();
        alert('Message sent successfully');
        //its a horizontal message so the designation of both sender and receiver will be same
        console.log(`Message from ${senderDesignation} to ${senderDesignation}: ${message}`);
    } catch (error) {
        console.error(error);
        alert('Failed to send message');
    }
}

// Helper function to convert designation index to name
function getDesignationName(index) {
    if (index === 1) return 'HOD';
    if (index === 2) return 'Faculty';
    return 'Unknown';
}



