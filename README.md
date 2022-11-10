## Supply Chain - Coffee Beans

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow of Coffee Beans between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

This DAPP proves the authenticity of ownership of product from its origin, farmer, through consumer with immutable record on Ethereum Blockchain.  Both frontend and backend are decentralised to warrant a 24/7 operation. 

## Getting Start

Create a new directory as project folder and install all requisite npm packages (as listed in package.json):
	
	```
	$ git clone https://github.com/Marvel202/Udacity-Supply-Chain-Project.git
	cd project-6
	npm install
	```
	
### Libraries
Basic libraries for this repository can be installed via **npm install** <<library name>> and they are installed either under global or local environment.
 
1. Global envirnoment
	
	- Truffle v5.6.2 (core: 5.6.2)
	- Solidity - 0.6.0 (solc-js)
	- Node v16.17.0


2. Local environment
	- web3.js v1.8.0
	- ganache-cli v6.12.2
	- dotenv v16.0.3
	- truffle/hdwallet-provider@2.0.17

3. Other libraries
	- npm link sol2uml --only=production (for generating class UML automatically)


4. Decentralized Backend and Frontend
	This DApp is built on Ethereum network which stores record for public access. Transaction record including the DApp program code (smart contract) once deployed are immutable.  Please Goerli Test Network which is the network this DApp is running on.  
	Frontend of DApp was deployed using IPFS gateway and file storage system.  IPFS is a decentralized web hosting service. The site can be up and running 24/7.


### Launch Ganache

5. For a pre-determined development environment, please use: 

	ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"


	Your terminal should look something like this:

	![truffle test](images/test_wallets.png)

### Truffle - Compile, Migrate & Test 
	
6. In a separate terminal window, Compile smart contracts:

	```
	truffle compile
	```

	Your terminal should look something like this:

	![truffle test](images/truffle_compile.png)

	This will create the smart contract artifacts in folder ```build\contracts```.

	Migrate smart contracts to the locally running blockchain, ganache-cli:

	```
	truffle migrate
	```

	Your terminal should look something like this:

	![truffle test](images/truffle_migrate.png)

	### Test smart contracts:

	```
	truffle test
	```

	All 10 tests should pass.

	![truffle test](images/truffle_test.png)

	In a separate terminal window, launch the DApp:

	```
	npm run dev
	```

	In a separate terminal window, Compile smart contracts:

	```
	truffle compile
	```

	Your terminal should look something like this:

	![truffle test](images/truffle_compile.png)

	This will create the smart contract artifacts in folder ```build\contracts```.

	Migrate smart contracts to the locally running blockchain, ganache-cli:

	```
	truffle migrate
	```

	Your terminal should look something like this:

	![truffle test](images/truffle_migrate.png)

	Test smart contracts:

	```
	truffle test
	```

	All 10 tests should pass.

	![truffle test](images/truffle_test.png)

	In a separate terminal window, launch the DApp:

	```
	npm run dev
	```
### UML
This Coffee Bean DApp is a platform for the following participants:

	a) Farmer;
	b) Distributor;
	c) Retailer; and
	d) Consumer 

Accounts from the above categories approved by smart contract of the platform can participate in transacting on this platform. DApp records the stages of transaction as well as the ownerID of the product.  
	
The architect of DApp and its relevant business logic are illustrated in these UML for ease of reference.  

1. Activity Diagram </br> </br>
![Activity](images/UML/ActivitySC.png)
2. Sequence Diagram </br> </br>
![Sequence](images/UML/SC_Sequence.png)	
3. State Diagram </br> </br>
![State](images/UML/SC_state.png)
4. Class Diagram </br> </br>
![Class](images/UML/classDiagram.png)
	
## Built With

	* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
	* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
	to make the web faster, safer, and more open.
	* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole 		lot easier.

## Final Output
Etherscan : https://goerli.etherscan.io/address/0x3F8Ee2517c2b68E9721cA0eaAF64e7992457656a
	</br>
IPFS (UI) : https://ipfs.io/ipns/k51qzi5uqu5dld2eef4i1m3jiingwf01w1169sh53utjw0j3m8tpnc4zbg7tgu/

Transaction record.

| State of an Item        | Etherscan record           | Participant |
| ------------- |:--------------------------------------------------------------------:| :--------:|
| Harvested      | 0x4e82e0027cc6589fa1fce4bc27a6b50dccde6ca236ec2f5de222dfd817624ec7 | Farmer|
| Processed      | 0x64e9bbd43a2543dbfd0f40e9997a50d4c6799dac78594f81909e0179e83f2237| Farmer |
| Packed | 0x826e249c911aa5bb3461377da30c28089f866427be11f56d69d915978a35b88b | Farmer |
| ForSale |0xd3be4b0a77f5d060f814ff61cbfd6d06b394aa9e31d2c6f92009605750ca08ba | Farmer |
| Sold | 0xd91aeb58ed1f5c6f9b48cff0024d87d2d19853803c1505c47036efbba55633e0   | Distributor |
| Shipped | 0xdf8080a5b7927b59f26514673c9149f0cb66994a847a49daf39d922e7b0dc405 | Distributor |
| Received | 0x5f19806e1b62b5b65ac2c101d7eec71aef5687cdbe1c26750257f28cb778f433 | Retailer |
| Bought|0x2f5a3f17e9e679528d5744f0b487cd5e1bce0ae5f57ed8a510a84691ee03ec4d | Consumer |



## Authors

See also the list of [contributors](https://github.com/your/project/contributors.md) who participated in this project.

## Acknowledgments

	* Solidity
	* Ganache-cli
	* Truffle
	* IPFS
