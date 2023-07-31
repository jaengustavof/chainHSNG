import React, { useState } from 'react';
import './adminDashboard.scss';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PeopleIcon from '@mui/icons-material/People';
import TokenIcon from '@mui/icons-material/Token';

import DashboardHome from './adminDashboardHome/dashboardHome';
import DashboardProperties from './adminDashboardProperties/dashboardProperties';
import DashboardClients from './adminDashboardClients/dashboardClients';
import DashboardTokens from './adminDashboardTokens/dashboardTokens';


const AdminDashboard = () => {

    const [selectedSection, setSelectedSection] =useState(<DashboardHome/>);
    
    const sections = {
        home: <DashboardHome/>,
        properties : <DashboardProperties/>,
        clients : <DashboardClients/>,
        tokens : <DashboardTokens/>
    }

    const changeSection = (section) => {
        setSelectedSection(sections[section])
    }

    return (
        <main id="admin-dashboard">
                <aside className='ad-navbar'>
                    <div className='ad-navbar_section' onClick={() => changeSection('home')}>
                        <DashboardIcon style={{fontSize: '30px'}}/> 
                        <h5>Dashboard</h5>
                    </div>
                    <div className='ad-navbar_section' onClick={() => changeSection('properties')}>
                        <MapsHomeWorkIcon style={{fontSize: '30px'}}/> 
                        <h5>Properties</h5>
                    </div>
                    <div className='ad-navbar_section' onClick={() => changeSection('clients')}>
                        <PeopleIcon style={{fontSize: '30px'}}/> 
                        <h5>Clients</h5>
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
    );
}

export default AdminDashboard;
