/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { Signer } = require('ethers');
const { ethers } = require('hardhat');

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("chainHousing", function (){

    let ChainHousing;
    let chainHousing;
    let Token;
    let token;
    let deployer;
    let addr1;
    let addr2;
    let addrs;
    let feePct = 2;
    let feeExch = 1;
    let URI = "Sample Uri";
    
    beforeEach(async function(){
        ChainHousing = await ethers.getContractFactory("chainHousing");
        Token = await ethers.getContractFactory("ERC20Basic");
        [deployer, addr1, addr2, addrs] = await ethers.getSigners();
        token = await Token.deploy(0);
        chainHousing = await ChainHousing.deploy();
    });

    describe("Deployement", function () {
        it("Should track name and symbol of Token", async function(){

            const tokenName ="CHAINTOKEN";
            const tokenSymbol = "CHT";

            expect(await chainHousing.name()).equal(tokenName);
            expect(await chainHousing.symbol()).equal(tokenSymbol);
            
        });

        it("Should track contractOwner", async function(){
            expect(await chainHousing.contractOwner()).equal(deployer.address);
        });

        it("Should track tokens creation", async function() {
            const initialSupply = await chainHousing.balanceOf();
            const numTokens = 100;

            // Call the createTokens function as the owner
            await chainHousing.createTokens(numTokens);

            // Check if the total supply has increased by numTokens
            const newSupply = await chainHousing.balanceOf();
            expect(newSupply).equal(initialSupply.add(numTokens));

        })

    });

    // Test listProperty function
    describe("listProperty", function () {
        it("should add a new property to the sale and initialize its details", async function () {
        const contractBalance =  await chainHousing.balanceOf();
        const propertyName = "Sample Property";
        const location = "Sample Location";
        const image = "TestImage";
        const baths = "2";
        const rooms = "4"
        const m2 = 60;
        const price = 100;

        // llama a la funcion listProperty con los parametros establecido
        await chainHousing.connect(deployer).listProperty(propertyName, location, image, baths, rooms, m2, price);

        // Ingresamos la nueva propiedad en el mapping y comprobamos sus valores
        const newProperty = await chainHousing.Properties(1);
        expect(newProperty.propertyId).equal(1);
        expect(newProperty.name).equal(propertyName);
        expect(newProperty.location).equal(location);
        expect(newProperty.price).equal(price);
        expect(newProperty.baths).equal(baths);
        expect(newProperty.rooms).equal(rooms);
        expect(newProperty.m2).equal(m2);
        expect(newProperty.forSale).to.be.true;
        expect(newProperty.available).to.be.true;

        const imagesArray = await chainHousing.getPropertyImages(newProperty.propertyId);
        const ownersArray = await chainHousing.getPropertyOwners(newProperty.propertyId);

        expect(imagesArray[0]).equal(image);
        expect(ownersArray[0]).equal(deployer.address);

        // Verificar el ID de la propiedad en el array de propiedades
        const propertiesId = await chainHousing.showPropertiesId();
        expect(propertiesId[0]).to.deep.equal(newProperty.propertyId);

        //Confirmar que el contract owner posea el 100 de los shares
        const ownerShares = await chainHousing.getPropertyOwners(newProperty.propertyId);
        expect(ownerShares[0]).equal(deployer.address);

        // El balance de tokens del contrato debe haber aumentado en base al precio de la propiedad
        const contractBalanceAfterListing = await chainHousing.balanceOf();
        expect(contractBalanceAfterListing).equal(contractBalance.add(newProperty.price));

        });
    })

    // Test Comprar Tokens
    
    describe("buyTokens - sellTokens", function(){
        it("Should allow user to buy and sell tokens", async function() {

            // --- COMPRA DE TOKENS --- //

            await chainHousing.connect(deployer).createTokens(100);

            const contractInitialBalance = await chainHousing.connect(deployer).balanceOf();
            const clientInitialBalance = await chainHousing.connect(addr1).myTokens();
            const contractEthBalance = await chainHousing.getContractEthBalance();
            const numTokens = 90;
            const cost = await chainHousing.tokenPrice(numTokens);

            // Compra los tokens
            await chainHousing.connect(addr1).buyTokens(numTokens, { value: cost });

            // Obtenemos el balance del cliente y del contrato despues de la transaccion
            const clientBalanceBalanceAfterTrx = await chainHousing.connect(addr1).myTokens();
            const contractBalanceBalanceAfterTrx = await chainHousing.balanceOf();
            const contractEthBalanceAfterTrx  = await chainHousing.getContractEthBalance();

            //Debe aumentar 10 los tokens del usuario / restar 10 tokens al contract / aumentar el cost al balance ETH del contrato
            expect(clientBalanceBalanceAfterTrx).equal(clientInitialBalance.add(numTokens));
            expect(contractBalanceBalanceAfterTrx).equal(contractInitialBalance.sub(numTokens));
            expect(contractEthBalanceAfterTrx).equal(contractEthBalance.add(cost));


            // --- VENTA DE TOKENS --- //

            const clientBalanceBeforeSelling = await chainHousing.connect(addr1).myTokens();
            const contractBalanceBeforeSelling = await chainHousing.connect(deployer).balanceOf();
            const contractETHBalanceBeforeSelling = await chainHousing.getContractEthBalance();
            const tokensToSell = 10;
            const price = await chainHousing.tokenPrice(tokensToSell);
            const salesFee = (price.mul(feeExch)).div(100);
            const toReturn = price.sub(salesFee);

            await chainHousing.connect(addr1).sellTokens(tokensToSell);

            const clientBalanceAfterSelling = await chainHousing.connect(addr1).myTokens();
            const contractBalanceAfterSelling = await chainHousing.connect(deployer).balanceOf();
            const contractETHBalanceAfterSelling = await chainHousing.getContractEthBalance();

            expect(clientBalanceAfterSelling).equal(clientBalanceBeforeSelling.sub(tokensToSell));
            expect(contractBalanceAfterSelling).equal(contractBalanceBeforeSelling.add(tokensToSell));
            expect(contractETHBalanceAfterSelling).equal(contractETHBalanceBeforeSelling.sub(toReturn));

        })

    });

    //Test para comprar una propiedad
    
    describe("buyPorperty - sellProperty", function(){

        beforeEach(async function(){

            const propertyName = "Sample Property";
            const location = "Sample Location";
            const price = 100;

            // llama a la funcion listProperty con los parametros establecido
            await chainHousing.connect(deployer).listProperty(propertyName, location, price);

            //Aseguramos un balance de tokens minimo en el addr1
            const numTokens = 90;
            const cost = await chainHousing.tokenPrice(numTokens);
            await chainHousing.connect(addr1).buyTokens(numTokens, { value: cost });

        })

        it("Should allow to buy and sell shares from a property with tokens", async function() {

            //  ---- TEST DE COMPRA ----  //

            const ownerInitialBalance = await chainHousing.connect(deployer).balanceOf();
            const clientInitialBalance = await chainHousing.connect(addr1).myTokens();
            const newProperty = await chainHousing.Properties(1);
            const propertyId = newProperty.propertyId;
            const ownerInitialShares = await chainHousing.getClientShares(propertyId, deployer.address);
            const clientInitialShares = await chainHousing.getClientShares(propertyId, addr1.address);
            
            const shares = 10;
            const priceForShares = newProperty.price.toNumber()*shares/100

            //Compramos el 10% de la propiedad 1
            await chainHousing.connect(addr1).buyPorperty(propertyId, shares);

            //Obtenemos balances y acciones despues de la trx
            const clientBalanceAfterTrx = await chainHousing.connect(addr1).myTokens();
            const ownerBalanceAfterTrx = await chainHousing.connect(deployer).balanceOf();
            const ownerSharesAfterTrx = await chainHousing.getClientShares(propertyId, deployer.address);
            const clientSharesAfterTrx = await chainHousing.getClientShares(propertyId, addr1.address);

            expect(clientBalanceAfterTrx).equal(clientInitialBalance.sub(priceForShares));
            expect(ownerBalanceAfterTrx).equal(ownerInitialBalance.add(priceForShares));
            expect(ownerSharesAfterTrx).equal(ownerInitialShares.sub(shares));
            expect(clientSharesAfterTrx).equal(clientInitialShares.add(shares));
            

            //  ---- TEST DE VENTA ----  //

            const ownerBalanceBeforeSale = await chainHousing.connect(deployer).balanceOf();
            const clientBalanceBeforeSale = await chainHousing.connect(addr1).myTokens();
            const ownerSharesBeforeSale  = await chainHousing.getClientShares(propertyId, deployer.address);
            const clientSharesBeforeSale  = await chainHousing.getClientShares(propertyId, addr1.address);

            //addr1 vende el 10% de la propiedad
            await chainHousing.connect(addr1).sellProperty(propertyId, shares);

            const ownerBalanceAfterSale = await chainHousing.connect(deployer).balanceOf();
            const clientBalanceAfterSale = await chainHousing.connect(addr1).myTokens();
            const ownerSharesAfterSale  = await chainHousing.getClientShares(propertyId, deployer.address);
            const clientSharesAfterSale  = await chainHousing.getClientShares(propertyId, addr1.address);
            const salePriceForShares = newProperty.price.toNumber()*shares/100;
            let salesFee = (salePriceForShares*feePct)/100;

            //El fee es como minino 1 token
            if(salesFee < 1){
                salesFee = 1;
            }

            const totalToPay = salePriceForShares - salesFee;

            expect(ownerBalanceAfterSale).equal(ownerBalanceBeforeSale.sub(totalToPay));
            expect(clientBalanceAfterSale).equal(clientBalanceBeforeSale.add(totalToPay));
            expect(ownerSharesAfterSale).equal(ownerSharesBeforeSale.add(shares));
            expect(clientSharesAfterSale).equal(clientSharesBeforeSale.sub(shares));

        });
    });


});