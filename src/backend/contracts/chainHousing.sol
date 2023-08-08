// SPDX-License-Identifier: MIT
pragma solidity >0.4.4 <0.8.20;
pragma experimental ABIEncoderV2;
import "./ERC20.sol";

contract chainHousing{
    
    // --------------------------------- DECLARACIONES INICIALES ---------------------------------
    
    // Instancia del contato token
    ERC20Basic private token;
    
    // Direccion de Owner
    address payable public contractOwner;
    uint currentExchange;
    uint itemCount;
    uint sellPct;
    uint exchPct;
    
    // Constructor 
    constructor () {
        token = new ERC20Basic(0);
        contractOwner = payable(msg.sender);
        currentExchange = 530000000000000 wei;
        sellPct = 2;
        exchPct = 1;
    }

    // Estructura de datos para almacenar pripiedades
    struct property {
        uint256 propertyId;
        string name;
        string location;
        string[] images;
        uint baths;
        uint rooms;
        uint m2;
        uint price;
        bool forSale; //si hay participaciones disponibles
        bool available; //Si est'a dada de alta o no
        address[] owners;
    }

    //Guardo todas las propiedades en un mapping
    mapping(uint256 => property) public Properties; 

    //Array conlas properties ids
    uint256[] propertiesId;

    //Shares de cada propiedad - uint: propertyId // address - clientAddress // amount shares
    mapping(uint => mapping(address => uint)) public clientSharesOfProperty;

    // Estructura de datos para almacenar a los clientes
    struct client {
        //Ids de sus propiedades
        uint[] propertiesOwned;
        uint token_balance;
    }

    //Mapping de registro de clientes
    mapping(address => client) public Clients;

    function name() public view returns (string memory){
        return token.name();
    }

    function symbol() public view returns (string memory){
        return token.symbol();
    }

    function getContractEthBalance() public view returns (uint256) {
        uint bal = address(this).balance / 1 ether;
        return bal;
    }

    function getClientEthBalance(address _address) public view returns (uint256) {
        return _address.balance;
    }

    function getContractAddress() public view returns(address){
        return address(this);
    }

    function getClientShares(uint _propId, address _addr) public view returns(uint){
        return clientSharesOfProperty[_propId][_addr];
    }


    // --------------------------------- GESTION DE TOKENS ---------------------------------

    // Funcion para generar mas tokens 
    function createTokens(uint _numTokens) public OwnerOnly(msg.sender) {
        token.increaseTotalSuply(_numTokens);
    }

    // Balance de tokens del contrato
    function balanceOf() public view returns (uint) {
        return token.balanceOf(address(this));
    }
    
    // Balance de una cuenta
    function myTokens() public view returns (uint){
        return token.balanceOf(msg.sender);
    }

    // Modificar la cotizacion manualmente
    function setManualExchange(uint _newExchange) public OwnerOnly(msg.sender){
        uint newExchange = _newExchange;
        uint oneWei = 1 wei;
        currentExchange = newExchange * oneWei;
    }

    // Obtener la cotizacion actual
    function getTokenPrice(uint _tokens) public view returns(uint) {
        return _tokens*currentExchange;
    }

    // Funcion para establecer el precio del token
    function tokenPrice(uint _numTokens) public view returns(uint) {
        return _numTokens*currentExchange;
    }


    // Comprar Tokens
    function buyTokens(uint _numTokens) public payable {
        // Establecer el precio de los Tokens
        uint cost = tokenPrice(_numTokens);
        // Se evalua el dinero que el cliente paga por los Tokens
        require (msg.value >= cost, "Insuficient funds.");
        // Diferencia de lo que el cliente paga
        uint returnValue = msg.value - cost;
        // Retornar el excedente de pago
        payable(msg.sender).transfer(returnValue);
        // Obtencion del numero de tokens disponibles
        uint Balance = balanceOf();
        require(_numTokens <= Balance, "Not enough tokens available");
        // Se transfiere el numero de tokens al cliente
        token.transfer_realEstate(address(this), msg.sender, _numTokens);
        // Registro de tokens comprados
        Clients[msg.sender].token_balance += _numTokens;
    }

    // Vender Tokens
    function sellTokens(uint _numTokens)public payable {
        require(_numTokens > 0, "No tokes to sell");
        // Evalua si el cliente tiene suficientes tokens
        require(myTokens()>= _numTokens, "You dont have enough tokens");
        // Precio a pagar por los tokens
        uint price = tokenPrice(_numTokens);
        //calculamos el 1% de tasa de cmbio
        uint exchangeFee = (price*exchPct)/100;
        //Obtenemos el total a devolver
        uint toReturn = price - exchangeFee;
        // Se transfiere el numero de tokens al cliente
        token.transfer_realEstate(msg.sender, address(this),_numTokens);
        // Devolucion de los ethers al cliente 
        payable(msg.sender).transfer(toReturn);
         // Registro de tokens vendidos
        Clients[msg.sender].token_balance -= _numTokens;
    }


    // --------------------------------- FUNCIONES DEL CONTRATO ---------------------------------

    // Agregar una nueva propiedad a la venta
    function listProperty(string memory _name, string memory _location, string memory _img, uint _baths, uint _rooms, uint _mts, uint _price) public OwnerOnly(contractOwner) {
        itemCount++;
        property memory newProperty = property({
            propertyId: itemCount,
            name: _name,
            location: _location,
            images: new string[](1),
            baths: _baths,
            rooms: _rooms,
            m2: _mts,
            price: _price,
            forSale: true,
            available: true,
            owners: new address[](1)
        });
        //agregamos la imagen
        newProperty.images[0] = _img;
        //el primer owner es siempre el contractOwner
        newProperty.owners[0] = contractOwner;
        //agrega al mapping
        Properties[newProperty.propertyId] = newProperty;
        //agrega al array de propiedades
        propertiesId.push(newProperty.propertyId);
        //asigna el 100% de los shares al contractOwner
        clientSharesOfProperty[newProperty.propertyId][contractOwner] = 100;
        //minteo nuevos tokens de acuerdo al precio de la propiedad
        createTokens(newProperty.price);
    }

    // Elimina Propiedad
    function removeProperty(uint _propertyId) public OwnerOnly(contractOwner){
        require(clientSharesOfProperty[_propertyId][contractOwner] == 100, "There are other investors that owns the propery");
        Properties[_propertyId].available = false;
    }
 
    // Comprar una propiedad
    function buyPorperty(uint _propertyId, uint _shares) public {
        // Confirmar que la propiedad existe
        require(checkProperty(_propertyId), "The property ID is incorrect or does note exists");
        //Confirmar que la propiedad est'a disponible
        require(Properties[_propertyId].available, "This property has been removed from market");
        //Confirmar que hay shares disponibles
        require(Properties[_propertyId].forSale, "Property is not for sale");
        //obtener el precio de la propiedad
        uint totalAmount = (Properties[_propertyId].price*_shares)/100;
        // Verificamos que el usuario tenga esa cantidad de tokens
        require(myTokens() >= totalAmount, "You don't have enough tokens");
        // transfiere los tokens a la direccion del contrato
        token.transfer_realEstate(msg.sender, address(this), totalAmount);

        //Agregamos al nuevo inversor y su participacion en la propiedad
        Properties[_propertyId].owners.push(msg.sender);
        clientSharesOfProperty[_propertyId][msg.sender] += _shares;

        // quitamos la participacion del nuevo inversor al contract owner
        uint ownerShares = clientSharesOfProperty[_propertyId][contractOwner];
        clientSharesOfProperty[_propertyId][contractOwner] = ownerShares - _shares;

        // Actualizamos el balance del cliente
        Clients[msg.sender].token_balance -= totalAmount;

        //Si el owner ya no tiene participacion, entonces la propiedad ya no esta a la venta
        if(clientSharesOfProperty[_propertyId][contractOwner] == 0){
            Properties[_propertyId].forSale = false;
        }
        
    }

    // Vender propiedad
    function sellProperty(uint _propertyId, uint _shares) public {
        uint sellerShares = clientSharesOfProperty[_propertyId][msg.sender];
        require(sellerShares > 0, "You don't own this property");
        require(sellerShares >= _shares, "You don't own those many shares");

        //Calculamos el importe total de acuerdo a su participacion
        uint totalAmount = (Properties[_propertyId].price*_shares)/100;

        //Si el 2% es menor a 1 cobramos 1 token
        uint salesFee = (totalAmount*sellPct)/100;
        if(salesFee < 1){
            salesFee = 1;
        }

        //Se calcula el importe total a devolver
        uint totalToPay = totalAmount - salesFee;

        //actualizamos los shares
        clientSharesOfProperty[_propertyId][msg.sender] -= _shares;
        clientSharesOfProperty[_propertyId][contractOwner] += _shares;

         // transfiere los tokens a la direccion del msg.sender
        token.transfer_realEstate(address(this), msg.sender, totalToPay);
        
        // Actualizamos el balance del cliente
        Clients[msg.sender].token_balance += totalToPay;

        // Si el owner vuelve a tener participacion en una propiedad que ya estaba vendida, se vuelve a publicar
        if(Properties[_propertyId].forSale = false && clientSharesOfProperty[_propertyId][contractOwner] > 0){
            Properties[_propertyId].forSale = true;
        }

        // Si el msg.sender ya no tiene acciones de la propiedad, lo eliminamos como owner en el array
        if(clientSharesOfProperty[_propertyId][msg.sender] < 1){
            removeOwner(msg.sender, _propertyId);
        }
        
    }

    function showPropertiesId () view public returns(uint[] memory) {
        return propertiesId;
    }

    //Muestra todas las propiedades
    function getAllProperties() public view returns (property[] memory) {
        uint256 totalProperties = propertiesId.length;
        property[] memory allProperties = new property[](totalProperties);

        for (uint256 i = 0; i < totalProperties; i++) {
            uint256 propertyId = propertiesId[i];
            allProperties[i] = Properties[propertyId];
        }

        return allProperties;
    }

    // Obtener todos los duenos de una propiedad
    function getPropertyOwners(uint256 propertyId) public view returns (address[] memory) {
        require(Properties[propertyId].propertyId != 0, "Property does not exist");
        return Properties[propertyId].owners;
    }

    function getPropertyImages(uint propertyId) public view returns(string[] memory){
        require(Properties[propertyId].propertyId != 0, "Property does not exist");
        return Properties[propertyId].images;
    }

    function addPropertyImage(uint propertyId, string memory _newImage) public OwnerOnly(contractOwner) {
        require(Properties[propertyId].propertyId != 0, "Property does not exist");
        Properties[propertyId].images.push(_newImage);
    }

    // Comprobar que el id exista en el array propertiesId
    function checkProperty(uint _propertyId) public view returns (bool){

        for (uint i = 0; i < propertiesId.length; i++) {
            if (propertiesId[i] == _propertyId) {
                return true; 
            }
        }
        return false; 
    }

    // Remove property owner from Array
    function removeOwner(address owner, uint _propestyId) public{
        //Empujamos el index a la ultima posicion del Properties[_propestyId].owners
        for(uint i = 0; i < Properties[_propestyId].owners.length-1; i++){
            if(Properties[_propestyId].owners[i] == owner) {
                Properties[_propestyId].owners[i] = Properties[_propestyId].owners[i + 1];
            }
            
        }
        Properties[_propestyId].owners.pop();
    }

    modifier OwnerOnly (address _address) {
        require(_address == contractOwner, "Only contract owner can perform this action.");
        _;
    }

}