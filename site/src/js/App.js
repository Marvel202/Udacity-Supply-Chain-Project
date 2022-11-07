App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",
    
    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = ""
        App.retailerID = ""
        App.consumerID = ""

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                // await window.ethereum.enable();
               await window.ethereum.request({
                    method: "eth_requestAccounts",
                })
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
      
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }

        App.getMetaskAccountID();
        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];
          
        })
    },

    initSupplyChain: async function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        var accounts = await web3.eth.getAccounts();
        web3.eth.defaultAccount = await accounts[0];
        
 
        /// JSONfy the smart contracts
       await $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            const contractId = web3.eth.net.getId().then(res => SupplyChainArtifact.networks[res])
            console.log(Object.keys(SupplyChainArtifact.networks)[0])
            Object.keys(SupplyChainArtifact.networks)[0] == 5 ? contractId.then(function(result){
                $("#loadedAddr").text("Contract address: https://goerli.etherscan.io/address/"+result.address);
                }) : contractId.then(function(result){$("#loadedAddr").text("Contract address: " + result.address)
            })
        
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();
            return App.bindEvents();
        })
    },


    bindEvents: function() {
   
        $(document).on('click', App.handleButtonClick);
        $('#harvestInfo').on('change',App.setHarvestInfo);
    },


    handleButtonClick: async function(event) {
        event.preventDefault();
        App.getMetaskAccountID();
        App.readForm();
        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);
        web3 = new Web3(App.web3Provider);
        console.log("tx count",await web3.eth.getTransactionCount(App.metamaskAccountID))
        switch(processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            case 11:
                return await App.addRole(event);
                break;
            }
    },

    addRole: async function(event) {

            event.preventDefault();
            selectElement = await document.querySelector('#roles');
         
            output = selectElement.value;
            console.log("selctedval", output)
            text = selectElement.options[selectElement.selectedIndex].text;
            const instance = await App.contracts.SupplyChain.deployed()
    
            // id = await $('#roleId').val()
            document.querySelector('.output').textContent = text;
            var result;
            web3 = new Web3(App.web3Provider);
            console.log("tx count",await web3.eth.getTransactionCount(App.metamaskAccountID))

            switch(output) {
                case "originFarmerID":
                    App.originFarmerID = await $('#roleId').val();
                    isFarmer = await instance.isFarmer(App.originFarmerID)
                    console.log("isFarmer",isFarmer)
                    try {
                        result = await instance.addFarmer(App.originFarmerID, {from: App.metamaskAccountID});
                        console.log("result", result)
                        return result;
                    }
                    catch(err) {
                     console.log(err.message);
                     };
                    break;

                case "distributorID":
                    App.distributorID = await $('#roleId').val();
                    isDistributor = await instance.isDistributor(App.distributorID)
                    try {
                        result = await instance.addDistributor(App.distributorID, {from: App.metamaskAccountID});
                        return result;
                    }
                        catch(err) {
                        console.log(err.message);
                    }
                    break;
                case "retailerID":
                    App.retailerID = await $('#roleId').val();
                    isRetailer = await instance.isRetailer(App.retailerID)

                    try {
                        result = await instance.addRetailer(App.retailerID, {from: App.metamaskAccountID});
                        return result;
                    }
                        catch(err) {
                        console.log(err.message);
                    }
                    break;
             
                case "consumerID":
                   App.consumerID = await $('#roleId').val(); 
                   isConsumer = await instance.isConsumer(App.consumerID)
                   try {
                    result = await instance.addConsumer(App.consumerID, {from: App.metamaskAccountID});
                    return result;
                     }
                    catch(err) {
                    console.log(err.message);
                    }
                    break;
            } 
            $("#ftc-item").text(result);
    },

    setHarvestInfo: async function() {
        
        var upc =  $("#upc").val();
        const instance = await App.contracts.SupplyChain.deployed()
       await instance.fetchItemBufferOne(upc).then(res => $("#ownerID").val(res.ownerID));
    }, 

    harvestItem: async function(event) {
        var result;
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        App.originFarmerID =  await App.metamaskAccountID
        const instance = await App.contracts.SupplyChain.deployed()
        // await App.readForm();
        try {
            result = await instance.harvestItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes,
                {from: await App.originFarmerID})
                return result;
            } catch(err) {console.log(err.message);}
        $("#ftc-item").text(result);
        },
    
        processItem: async function(event) {
            event.preventDefault();
            var processId = parseInt($(event.target).data('id'));
            const instance = await App.contracts.SupplyChain.deployed()
            var result;
            try {
                result = await instance.processItem(App.upc, {from: App.metamaskAccountID});
                return result;
            }  catch(err) {console.log(err.message);}
            $("#ftc-item").text(result);
        },

    packItem: async function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed()
        var result;
        try {
            result = await instance.packItem(App.upc, {from: App.metamaskAccountID})
            return result;

        } catch(err) {console.log(err.message);}
            $("#ftc-item").text(result);

    },

    sellItem: async function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed()
        var result;
        try {
            result = await instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
            return result;
     }  catch(err) {console.log(err.message);}
     $("#ftc-item").text(result);
    },
    

    buyItem: async function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed()
        var result;
        try {
            const walletValue = web3.utils.toWei(String(2), "ether");
            result = await instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
            return result;
            } catch(err) {console.log(err.message);}
     $("#ftc-item").text(result);
    },
    

    shipItem: async function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed()
        var result;
        try {
            result = await instance.shipItem(App.upc, {from: App.metamaskAccountID});
            return result;
     }  catch(err) {console.log(err.message);}
     $("#ftc-item").text(result);
    },

    receiveItem: async function(event){
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed()
        var result;
        try {
            result = await instance.receiveItem(App.upc, {from: App.metamaskAccountID});
            return result;
     }  catch(err) {console.log(err.message);}
     $("#ftc-item").text(result);
    },

    purchaseItem: async function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed()
        var result;
        try {
            result = await instance.purchaseItem(App.upc, {from: App.metamaskAccountID});
            return result;
            }  
        catch(err) {console.log(err.message);}
            $("#ftc-item").text(result);
            },

    fetchItemBufferOne: function () {
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
