const { expect } = require("chai");
const { ethers } = require("hardhat");

// contract specific stuffs
/*
  - Tests need to written for:
    -
*/
describe("RFC Tests", function () {

  // it("Should return the new greeting once it's changed", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");

  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed();

  //   expect(await greeter.greet()).to.equal("Hello, world!");

  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();

  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });

  // it("Check bros", async function () {
  //   const Greeter = await ethers.getContractFactory("Greeter");

  //   const greeter = await Greeter.deploy("Hello, world!");
  //   await greeter.deployed(); // what?

  //   expect(await greeter.greet()).to.equal("Hello, world!");

  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();

  //   expect(await greeter.greet()).to.equal("Hola, mundo!");

  //   const bruhTx = await greeter.setGreeting("bro");
  //   await bruhTx.wait();

  //   expect(await greeter.text()).to.equal("bro");
  // });


  // writing a sample test for RFC

  // it("BaseURI Changes", async function() {
  //   const [owner] = await ethers.getSigners();
  //   const RFC = await ethers.getContractFactory("ResearchFundingClub3");

  //   const rfc = await RFC.deploy("https://manishgotame.com.np/");
  //   await rfc.deployed();

  //   var mintTX = await rfc.mint(1, {
  //     value: 1000000000000000
  //   });

  //   var userOwner = await rfc.tokensOfOwner(owner.address);

  //   for (var i=0; i < userOwner.length; i++) {
  //     var eachtokenId = userOwner[i].toString();

  //     const tokenURI = await rfc.tokenURI(parseInt(eachtokenId));
  //     console.log("first: ", tokenURI);
  //   }

  //   var changeURI = await rfc.setBaseURI("https://newone.com/");
  //   await changeURI.wait();

  //   var mintTX = await rfc.mint(1, {
  //     value: 1000000000000000
  //   });

  //   var userOwner = await rfc.tokensOfOwner(owner.address);

  //   for (var i=0; i < userOwner.length; i++) {
  //     var eachtokenId = userOwner[i].toString();

  //     const tokenURI = await rfc.tokenURI(parseInt(eachtokenId));
  //     console.log("changed uri: ",tokenURI);
  //   }

  //   var changeURI = await rfc.setBaseURI("https://openpastpaper.com/");
  //   await changeURI.wait();

  //   var mintTX = await rfc.mint(3, {
  //     value: 1000000000000000
  //   });

  //   var userOwner = await rfc.tokensOfOwner(owner.address);

  //   for (var i=0; i < userOwner.length; i++) {
  //     var eachtokenId = userOwner[i].toString();

  //     const tokenURI = await rfc.tokenURI(parseInt(eachtokenId));
  //     console.log("changed uri: ",tokenURI);
  //   }
  // });

  it("Single mint test", async function() {
    const [owner] = await ethers.getSigners();
    const RFC = await ethers.getContractFactory("ResearchFundingClub");

    const rfc = await RFC.deploy(120, "https://manishgotame.com.np/");
    await rfc.deployed(); 

    var testSupplyVal = 1;
    // mint single nft
    var mintTX = await rfc.mint(1, {
      value: 1000000000000000
    });
    await mintTX.wait();
    var totalSupplyTX = await rfc.totalSupply();
    var supplyNumber = parseInt(totalSupplyTX.toString());

    console.log(supplyNumber);
    expect(supplyNumber).to.equal(testSupplyVal); 

    var mintTX = await rfc.mint(1, {
      value: 1000000000000000
    });
    await mintTX.wait();
    var totalSupplyTX = await rfc.totalSupply();
    var supplyNumber = parseInt(totalSupplyTX.toString());

    console.log(supplyNumber);
  });


  // it("Testing Random number minting", async function() {
  //   const [owner] = await ethers.getSigners();
  //   const RFC = await ethers.getContractFactory("ResearchFundingClub");

  //   const rfc = await RFC.deploy("https://manishgotame.com.np/");
  //   await rfc.deployed();

  //   var testSupplyVal = 1;

  //   for (var i=0; i < 10; i++) {
  //     var mintTX = await rfc.mint(1, {
  //       value: 1000000000000000
  //     });
  //     await mintTX.wait();
  //     var totalSupplyTX = await rfc.totalSupply();
  //     var supplyNumber = parseInt(totalSupplyTX.toString());
  
  //     console.log(supplyNumber);
  //     expect(supplyNumber).to.equal(testSupplyVal);
  //     testSupplyVal++;
  //   }

  //   var mytokens = await rfc.tokensOfOwner(owner.address);
  //   console.log(mytokens);
  //   expect(mytokens)
  // });



  // it("Multi drop Mint testing", async function() {
  //   const [owner] = await ethers.getSigners();
  //   const RFC = await ethers.getContractFactory("ResearchFundingClub");

  //   const rfc = await RFC.deploy(120, "https://manishgotame.com.np/");
  //   var reveal = await rfc.deployed();

  //   var currentBaseUri = await rfc.baseTokenURI();
  //   console.log("curren uri: ", currentBaseUri);

  //   // mint all of them before changing the drop
  //   var testSupplyVal = 1;

  //   for (var i=0; i < 10; i++) {
  //     var mintTX = await rfc.mint(1, {
  //       value: 1000000000000000
  //     });
  //     await mintTX.wait();
  //     var totalSupplyTX = await rfc.totalSupply();
  //     var supplyNumber = parseInt(totalSupplyTX.toString());
  
  //     console.log(supplyNumber);
  //     expect(supplyNumber).to.equal(testSupplyVal);
  //     testSupplyVal++;
  //   }

  //   var userOwner = await rfc.tokensOfOwner(owner.address);
  //   // await rfc.reveal();
  //   for (var i=0; i < userOwner.length; i++) {
  //     var eachtokenId = userOwner[i].toString();

  //     const tokenURI = await rfc.tokenURI(parseInt(eachtokenId));
  //     console.log(eachtokenId, ": changed uri: ",tokenURI);
  //   }


  //   // new drop

  //   var newdrop = await rfc.newDrop(20, "https://newone.io/");

  //   var testSupplyVal = 11;

  //   for (var i=0; i < 10; i++) {
  //     var mintTX = await rfc.mint(1, {
  //       value: 1000000000000000
  //     });
  //     await mintTX.wait();
  //     var totalSupplyTX = await rfc.totalSupply();
  //     var supplyNumber = parseInt(totalSupplyTX.toString());
  
  //     console.log(supplyNumber);
  //     expect(supplyNumber).to.equal(testSupplyVal);
  //     testSupplyVal++;
  //   }

  //   console.log("==== not revealed ====");
  //   var userOwner = await rfc.tokensOfOwner(owner.address);
  //   // await rfc.reveal();

  //   for (var i=0; i < userOwner.length; i++) {
  //     var eachtokenId = userOwner[i].toString();

  //     const tokenURI = await rfc.tokenURI(parseInt(eachtokenId));
  //     console.log(eachtokenId, ": changed uri: ",tokenURI);
  //   }

  //   console.log("==== revealed ====");
  //   var userOwner = await rfc.tokensOfOwner(owner.address);
  //   var reveal = await rfc.reveal();

  //   for (var i=0; i < userOwner.length; i++) {
  //     var eachtokenId = userOwner[i].toString();

  //     const tokenURI = await rfc.tokenURI(parseInt(eachtokenId));
  //     console.log(eachtokenId, ": changed uri: ",tokenURI);
  //   }

  //   // third drop

  //   var newdrop = await rfc.newDrop(45, "https://whatthehellisthis.io/");

  //   var testSupplyVal = 21;

  //   for (var i=0; i < 20; i++) {
  //     var mintTX = await rfc.mint(1, {
  //       value: 1000000000000000
  //     });
  //     await mintTX.wait();
  //     var totalSupplyTX = await rfc.totalSupply();
  //     var supplyNumber = parseInt(totalSupplyTX.toString());
  
  //     console.log(supplyNumber);
  //     expect(supplyNumber).to.equal(testSupplyVal);
  //     testSupplyVal++;
  //   }

  //   var userOwner = await rfc.tokensOfOwner(owner.address);

  //   for (var i=0; i < userOwner.length; i++) {
  //     var eachtokenId = userOwner[i].toString();

  //     const tokenURI = await rfc.tokenURI(parseInt(eachtokenId));
  //     console.log(eachtokenId, ": changed uri: ",tokenURI);
  //   }

  //   var revealIt = await rfc.reveal();
  //   var userOwner = await rfc.tokensOfOwner(owner.address);

  //   for (var i=0; i < userOwner.length; i++) {
  //     var eachtokenId = userOwner[i].toString();

  //     const tokenURI = await rfc.tokenURI(parseInt(eachtokenId));
  //     console.log(eachtokenId, ": changed uri: ",tokenURI);
  //   }


  //   // ends here

  //   // var testSupplyVal = 1;

  //   // for (var i=0; i < 100; i++) {
  //   //   var mintTX = await rfc.mint(1, {
  //   //     value: 1000000000000000
  //   //   });
  //   //   await mintTX.wait();
  //   //   var totalSupplyTX = await rfc.totalSupply();
  //   //   var supplyNumber = parseInt(totalSupplyTX.toString());
  
  //   //   console.log(supplyNumber);
  //   //   expect(supplyNumber).to.equal(testSupplyVal);
  //   //   testSupplyVal++;
  //   // }
  // });

  /** 

  it("Multiple minting from single address", async function() {
    const [owner] = await ethers.getSigners();
    const RFC = await ethers.getContractFactory("ResearchFundingClub2");

    const rfc = await RFC.deploy("https://manishgotame.com.np/");
    await rfc.deployed();

    var mintTX = await rfc.mint(1, {
      value: 1000000000000000
    });

    await mintTX.wait();

    try {
      var mintTX = await rfc.mint(1, {
        value: 1000000000000000
      });
  
      await mintTX.wait();
    } catch (err) {}

    var userOwner = await rfc.tokensOfOwner(owner.address);
    var userOwner = userOwner.length;
    
    expect(userOwner).to.equal(1);
  });

  // incomplete

  it("Prevent mint after transferring NFT", async function() {
    const [owner] = await ethers.getSigners();
    const RFC = await ethers.getContractFactory("ResearchFundingClub2");

    const rfc = await RFC.deploy("https://manishgotame.com.np/");
    await rfc.deployed();

    var mintTX = await rfc.mint(1, {
      value: 1000000000000000
    });
  });

  */


  // iterative tests

  // var nums = [];
  // var success = [];

  // try {
  //   for (var i=0; i < 10; i++) {
  //     it("Testing Mint", async function() {
  //       const [owner] = await ethers.getSigners();
  //       const RFC = await ethers.getContractFactory("ResearchFundingClub");
    
  //       const rfc = await RFC.deploy("https://manishgotame.com.np/");
  //       await rfc.deployed();
    
  //       for (var i=1; i <=10; i++) {
  //         var randomNumber = await rfc.generateRandomNumber();
  //         var num = parseInt(randomNumber.toString());
  //         nums.push(num);
    
  //         console.log("minting: ",num);
  //         var mintTX = await rfc.mint({
  //           value: 1000000000000000
  //         });
  //         await mintTX.wait();
      
  //         // var randomNumber = await rfc.generateRandomNumber();
  //         // console.log("Returned number", randomNumber.toString());
  //         console.log(""); 
  //       }
    
  //       console.log("supply", await rfc.totalSupply().toString());
  //       console.log(nums.sort());

  //       success.push(nums);
  //       nums = [];
  //       // // mintTX = await rfc.mint(1, 2, {
  //       // //   value: 1000000000000000
  //       // // });
  //       // // await mintTX.wait();
    
  //       // var grn = [];
    
  //       // for (var i=0; i < 20; i++) {
  //       //   var genNumber = await rfc.generateRandomNumber();
  //       //   await genNumber.wait();
    
  //       //   var valueHEX = await rfc.currentRandomNumber();   
  //       //   var number = (valueHEX.toString());
  //       //   console.log(number);
  //       //   // console.log(value._hex);
  //       //   grn.push(number);
  //       // }
    
  //       // console.log(grn);
    
  //       // const mintTX2 = await rfc.mint(1, 2);
  //       // await mintTX2.deployed();
  //     });
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  



});

