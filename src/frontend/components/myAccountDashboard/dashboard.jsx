import React from 'react';
import Context from '../../context';
import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import './dashboard.scss'

const Dashboard = () => {

  const {userAccount, balance} = useContext(Context);

  return (
    <section id='admin-component'>
        <h1>userAccount: {userAccount}</h1>
        <h2>{balance} ETH</h2>
    </section>
  )
}

export default Dashboard