import React from 'react';
import Context from '../../../context';
import './myAccountHome.scss';
import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import TokenIcon from '@mui/icons-material/Token';
import ETH from '../../../assets/icons/eth-icon.png';
import Table from '../tableHome/homeTable'

const MyAccountHome = () => {
    const {chainHousing, userAccount, balance, userTokenBalance, setUserTokenBalance} = useContext(Context);

    const loadUserInfo = async () => {
        let getUserTokenBalance = await chainHousing.myTokens();
        getUserTokenBalance = (+getUserTokenBalance).toFixed();
        console.log('userAccount', getUserTokenBalance)
        setUserTokenBalance(getUserTokenBalance);
    }

    useEffect(() => {
  
        loadUserInfo();
       console.log('Test')
    }, []);

    return (
        <section className='ma-home'>
            <div className='ma-home_balance-container'>
                <div className='balance-info'><p>My Address: {userAccount}</p></div>
                <div className='balance-info'><TokenIcon style={{height: '20px'}}/> Tokens balance: {userTokenBalance} CHT   </div>
                <div className='balance-info'><img src={ETH} alt="ETH log" height='20px' /> My balance: {balance} ETH </div>
            </div>
            <div className='ma-home_property-list'>
                <h3>My Properties</h3>
                {/*<Table/>*/}
            </div>

        </section>
    );
}

export default MyAccountHome;
