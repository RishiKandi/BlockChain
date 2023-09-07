const mysql = require("mysql2");

const express = require("express");

const bodyparser = require("body-parser");

const { ethers, JsonRpcProvider } = require('ethers');

// const manufactureabi = require('./manifacturerabi');

 

 

var app= express();

//Configuring express server

app.use(bodyparser.json());

 

//MySQL details

var mysqlConnection = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "admin@123",

    database: "supplychain",

    multipleStatements: true,

});

 

mysqlConnection.connect((err) => {

    if (!err) console.log("Connection Established Successfully");

    else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));

});

 

//quicknode url

const node = 'https://neat-damp-general.matic-testnet.discover.quiknode.pro/f9d254bd6d1f17ab2e20a1bb2446a973c57890da/';

//const node = 'wss://20.58.166.39/8545';

 

const provider = new JsonRpcProvider(node);

 

const tokenAdress = '0xd1EAE6f9A1F524E2C373bB28aE8dF0c11a06CA82'; //shiba enu 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE
                      

//const tokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; //USDC

 

const tokenAbi =  [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "BuyNew",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "supplierName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "manufacturerName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "productCost",
				"type": "uint256"
			}
		],
		"name": "ProductDetails",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Mid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Mname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Memailid",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Maddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "Mdate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "MwalletAddress",
						"type": "address"
					}
				],
				"indexed": false,
				"internalType": "struct supplychain.Manufacturer",
				"name": "newManufacturer",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "newManufacturer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "manufacturerIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "supplierIndex",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct supplychain.Product",
				"name": "newProduct",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "newProduct",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Sid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Sname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Semailid",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Saddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "Sdate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "SwalletAddress",
						"type": "address"
					}
				],
				"indexed": false,
				"internalType": "struct supplychain.Supplier",
				"name": "newSupplier",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "newSupplier",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Uid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Uname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Uaddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Uemail",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "Uregisterdate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "Uwallet",
						"type": "address"
					}
				],
				"indexed": false,
				"internalType": "struct supplychain.User",
				"name": "newUser",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "newuser",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "buyProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_Mname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Memailid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Maddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_Mdate",
				"type": "uint256"
			}
		],
		"name": "createManufacturer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_manufacturerIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_supplierIndex",
				"type": "uint256"
			}
		],
		"name": "createProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_sname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_semailid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_saddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_sdate",
				"type": "uint256"
			}
		],
		"name": "createSupplier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_Uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Uaddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Uemail",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_Uregisterdate",
				"type": "uint256"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllManufacturers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Mid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Mname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Memailid",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Maddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "Mdate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "MwalletAddress",
						"type": "address"
					}
				],
				"internalType": "struct supplychain.Manufacturer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "manufacturerIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "supplierIndex",
						"type": "uint256"
					}
				],
				"internalType": "struct supplychain.Product[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSupplier",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Sid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Sname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Semailid",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Saddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "Sdate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "SwalletAddress",
						"type": "address"
					}
				],
				"internalType": "struct supplychain.Supplier[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getManufacturer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Mid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Mname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Memailid",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Maddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "Mdate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "MwalletAddress",
						"type": "address"
					}
				],
				"internalType": "struct supplychain.Manufacturer",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getProduct",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "manufacturerIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "supplierIndex",
						"type": "uint256"
					}
				],
				"internalType": "struct supplychain.Product",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productId",
				"type": "uint256"
			}
		],
		"name": "getProductDetailsByName",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "manufacturerIndex",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "supplierIndex",
						"type": "uint256"
					}
				],
				"internalType": "struct supplychain.Product",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getSupplier",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Sid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Sname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Semailid",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Saddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "Sdate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "SwalletAddress",
						"type": "address"
					}
				],
				"internalType": "struct supplychain.Supplier",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "m1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Mid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Mname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Memailid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Maddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Mdate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "MwalletAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "manufacturerarr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Mid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Mname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Memailid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Maddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Mdate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "MwalletAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "p1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "manufacturerIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "supplierIndex",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "productArr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "manufacturerIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "supplierIndex",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Sid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Sname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Semailid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Saddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Sdate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "SwalletAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "supplierarr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Sid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Sname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Semailid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Saddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Sdate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "SwalletAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "u1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Uid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Uaddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Uemail",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Uregisterdate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "Uwallet",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userarr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Uid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Uaddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Uemail",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Uregisterdate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "Uwallet",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


const contract = new ethers.Contract(tokenAdress, tokenAbi, provider);

 

async function main() {

    //const decimals = await contract.decimals();

    contract.on("newManufacturer", (from, to, data) => {

        try {

            console.log("New Manufacturer Added: ", from, to, data);

            const [Mid, Mname, Memailid, Maddress, Mdate, MwalletAddress] = to;

            // Define the SQL query

            const query = `

            INSERT INTO manufacturer (Mid, Mname, Memailid, Maddress, Mdate, MwalletAddress)

            VALUES (?, ?, ?, ?, ?, ?);

            `;

            console.log("query", query);

              // Execute the query with the data

      mysqlConnection.query(

        query,

        [Mid, Mname, Memailid, Maddress, Mdate.toString(), MwalletAddress],

        (err, results) => {

          if (err) {

            console.error("Error inserting data into the table:", err);

          } else {

            console.log("Manufacturer added", results);

          }

        }

      );

    } catch (error) {

      console.error(error);

    }

  });

 

  contract.on("newProduct", (from, to, data) => {

    try {

      console.log("New Product Added: ", from, to, data);

      const [productId, name, price, quantity,owner] = to;

      // Define the SQL query

      const query = `

      INSERT INTO product (productId, name, price, quantity,owner)

      VALUES (?, ?, ?, ?,?);

    `;

      console.log("query", query);

      // Execute the query with the data

      mysqlConnection.query(

        query,

        [productId, name, price, quantity,owner],

        (err, results) => {

          if (err) {

            console.error("Error inserting data into the table:", err);

          } else {

            console.log("Product added:", results);

          }

        }

      );

    } catch (error) {

      console.error(error);

    }

  });

 

  contract.on("newSupplier", (from, to, data) => {

    try {

      console.log("New Supplier Added: ", from, to, data);

      const [Sid, Sname, Semailid, Saddress, Sdate, SwalletAddress] = to;

      // Define the SQL query

      const query = `

      INSERT INTO supplier (Sid, Sname, Semailid, Saddress, Sdate, SwalletAddress)

      VALUES (?, ?, ?, ?, ?, ?);

    `;

      console.log("query", query);

      // Execute the query with the data

      mysqlConnection.query(

        query,

        [Sid, Sname, Semailid, Saddress, Sdate, SwalletAddress],

        (err, results) => {

          if (err) {

            console.error("Error inserting data into the table:", err);

          } else {

            console.log("supplier added:", results);

          }

        }

      );

    } catch (error) {

      console.error(error);

    }

  });




  contract.on("newuser", (from, to, data) => {

    try {

        console.log("New User Added: ", from, to, data);

        const [Uid, Uname, Uaddress,Uemail, Uregisterdate, Uwallet] = to;

        // Define the SQL query

        const query = `

        INSERT INTO user (Uid, Uname, Uaddress, Uemail, Uregisterdate, Uwallet)

        VALUES (?, ?, ?, ?, ?, ?);

        `;

        console.log("query", query);

          // Execute the query with the data

  mysqlConnection.query(

    query,

    [Uid, Uname, Uaddress,Uemail, Uregisterdate.toString(), Uwallet],

    (err, results) => {

      if (err) {

        console.error("Error inserting data into the table:", err);

      } else {

        console.log("User added", results);

      }

    }

  );

} catch (error) {

  console.error(error);

}

});

contract.on("BuyNew", (from, to, data) => {

    try {

        console.log("Owner Exchanged: ", from, to, data);

        const productId = from;
        const owner=to;
        const timestamp=data;

        // Define the SQL query

        const query = `

        UPDATE product SET owner = "${owner}" WHERE productId = "${productId}" ;

        `;

        console.log("query", query);

          // Execute the query with the data

  mysqlConnection.query(

    query,

    (err, results) => {

      if (err) {

        console.error("Error inserting data into the table:", err);

      } else {

        console.log("User added", results);

      }

    }

  );

} catch (error) {

  console.error(error);

}

});


}

 

main();

 

/*

 

EtherJS Web3js

to connect - RPC Url - Quicknode

Smart Contract Address : Remix to Metamask -

ABI - Remix only after deployment of smart contract

Functions defined in the smart contract

Listen to the Events

 

*/