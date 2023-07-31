import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Context from '../context';
import { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import NavBar from './navbar/NavBar';
import Footer from './footer/Footer'
import Home from '../pages/home';
import Buy from '../pages/buy';
import Sell from '../pages/sell';
import Rent from '../pages/rent';
import Admin from '../pages/admin';
import MyAccount from '../pages/myAccount';
import Property from '../pages/property'

import chainHousingAbi from '../contractsData/chainHousing.json';
import chainHousingAddress from '../contractsData/chainHousing-address.json';

 
function App() {

  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);
  const [provider, setProvider] = useState();
  const [balance, setBalance] = useState();
  const [signer, setSigner] = useState();
  const [userAccount, setuserAccount] = useState();
  const [chainHousing, setChainHousing] = useState({});
  const [contractBalance, setContractBalance] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');
  const [propertyList, setPropertyList] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();

  const web3Handler = async () => {

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setuserAccount(accounts[0]);
    
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
    setProvider(provider);
    
    const signer = provider.getSigner();
    setSigner(signer);
    
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setuserAccount(accounts[0]);
      await web3Handler();
    })

    loadContracts(signer);
    
  }

  const loadContracts = async (signer) => {
    const chainHousing = new ethers.Contract(chainHousingAddress.address, chainHousingAbi.abi, signer);
    setChainHousing(chainHousing);
    setLogged('logged', true);
  }
  

  return (
    <Context.Provider value={{ userAccount, setuserAccount,
                                chainHousing, setChainHousing, 
                                logged, setLogged, 
                                provider, setProvider, 
                                balance, setBalance, 
                                signer, setSigner,
                                contractBalance, setContractBalance,
                                tokenBalance, setTokenBalance,
                                propertyList, setPropertyList,
                                selectedProperty, setSelectedProperty}}>
    <BrowserRouter>
        <div className='App'>
          <NavBar web3Handler={web3Handler} account={userAccount} />
          <Routes>
            <Route path="/" element={<Home chainHousing={chainHousing}/>} />
            <Route path="/buy" element={<Buy />}/>
            <Route path="/sell" element={<Sell />}/>
            <Route path="/rent" element={<Rent />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/my-account" element={<MyAccount/>}/>
            <Route path="/property" element={<Property/>}/>
          </Routes>
          <Footer/>
        </div>
    </BrowserRouter>
   </Context.Provider>
  );
}

export default App;