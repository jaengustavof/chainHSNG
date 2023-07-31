import React from 'react';
import Context from '../context';
import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import Dashboard from '../components/myAccountDashboard/dashboard';

const MyAccount = () =>{

    const {userAccount, setuserAccount,
        chainHousing, setChainHousing, 
        logged, setLogged, 
        provider, setProvider, 
        balance, setBalance, 
        signer, setSigner} = useContext(Context);


    // Obtenemos el balance
    provider.getBalance(userAccount).then((balance) => {
        // Convertimos el balance the Wei a ETH
        let etherBalance = ethers.utils.formatEther(balance);
        etherBalance = (+etherBalance).toFixed(2)
        setBalance(etherBalance);
        //console.log(`Balance of address ${userAccount}: ${etherBalance} ETH`);
    }).catch((err) => {
        console.error('Error:', err);
    });


    return (
        <Dashboard></Dashboard>
    )
}

export default MyAccount