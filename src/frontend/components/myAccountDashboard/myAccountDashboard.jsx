import React from 'react';
import Context from '../../context';
import { ethers } from 'ethers';
import { useState, useEffect, useContext } from 'react';
import './myAccountDashboard.scss'

import DashboardIcon from '@mui/icons-material/Dashboard';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PeopleIcon from '@mui/icons-material/People';
import TokenIcon from '@mui/icons-material/Token';

import MyAccountHome from './myAccountHome/myAccountHome';
import MyAccountTokens from './myAccountTokens/myAccountTokens'


const Dashboard = () => {

  

  const [selectedSection, setSelectedSection] =useState(<MyAccountHome/>);
    
    const sections = {
        home: <MyAccountHome/>,
        tokens : <MyAccountTokens/>
    }
  
    const changeSection = (section) => {
        setSelectedSection(sections[section])
    }


  return (
    <main id="admin-component">
      <aside className='ad-navbar'>
          <div className='ad-navbar_section' onClick={() => changeSection('home')}>
              <DashboardIcon style={{fontSize: '30px'}}/> 
              <h5>Dashboard</h5>
          </div>
          <div className='ad-navbar_section' onClick={() => changeSection('tokens')}>
              <TokenIcon style={{fontSize: '30px'}}/> 
              <h5>Tokens</h5>
          </div>
      </aside>
      <section className='ad-container'>
        {selectedSection}
      </section>
    </main>

  )
}

export default Dashboard