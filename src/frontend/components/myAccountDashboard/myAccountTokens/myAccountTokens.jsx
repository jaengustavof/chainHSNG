import React from 'react';
import './myAccountTokens.scss';
import Context from '../../../context';
import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import TokenIcon from '@mui/icons-material/Token';
import ETH from '../../../assets/icons/eth-icon.png';
import TokensBuy from '../tokensBuy/tokensBuy';
import TokensSell from '../tokensSell/tokensSell'


const MyAccountTokens = () => {

    const {chainHousing, userAccount, balance, userTokenBalance, setUserTokenBalance, tokenPrice, setTokenPrice} = useContext(Context);

    const loadInfo = async () => {
        let tokenPrice = await chainHousing.getTokenPrice(1);
        let getUserTokenBalance = await chainHousing.myTokens();
        getUserTokenBalance = (+getUserTokenBalance).toFixed();

        let ethValue = ethers.utils.formatEther(tokenPrice);
        setTokenPrice(ethValue)
        setUserTokenBalance(getUserTokenBalance)
    }

    useEffect(() => {
        loadInfo();
        console.log(tokenPrice)
        
    }, []);

    return (
        <div className='ad-tokens'>
            <div className='ma-home_balance-container'>
                <div className='balance-info'><p>My Address: {userAccount}</p></div>
                <div className='balance-info'><TokenIcon style={{height: '20px'}}/> Tokens balance: {userTokenBalance} CHT   </div>
                <div className='balance-info'><img src={ETH} alt="ETH log" height='20px' /> My balance: {balance} ETH </div>
            </div>
            <div className='ad-tokens-exchange'>

                <div className='ad-tokens-exchange_buy'>
                    <TokensBuy/>
                </div>

                <div className='ad-tokens-exchange_sell'>
                    <TokensSell/>
                </div>
            </div>
        </div>
    );
}

export default MyAccountTokens;
