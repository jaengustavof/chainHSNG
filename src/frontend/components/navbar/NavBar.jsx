import React from 'react';
import { Link  } from "react-router-dom";
import Context from '../../context';
import { useState, useEffect, useContext } from 'react';

import './nav-bar.scss';
import Logo from '../../assets/imgs/logo.svg';
import MetaIcon from '../../assets/icons/metamaskIcon.png'

const NavBar = ({ web3Handler }) => {

    const {userAccount, setuserAccount,
        chainHousing, setChainHousing, 
        logged, setLogged, 
        provider, setProvider, 
        balance, setBalance, 
        signer, setSigner} = useContext(Context);

    return (
        <nav>
            <div className='navContainer'>
                <Link className='logo-container' to="/">
                    <img src={Logo} alt="fake log" height='60px' />
                </Link>
                <div className='links-container'>
                    <Link className='link-item' to="/buy">Buy</Link>
                    <Link className='link-item' to="/sell">Sell</Link>
                    <Link className='link-item' to="/rent">Rent</Link>
                    <Link className='link-item' to="/admin">Admin</Link>
                </div>
                {logged ? (
                    <Link className='connect-wallet connected' to='/my-account'>
                        <img src={MetaIcon} alt="Meta Logo" height='30px' /> My Account
                    </Link>
                ) : (
                    <button className='connect-wallet' onClick={web3Handler}>
                        <span>Connect Wallet</span>
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
