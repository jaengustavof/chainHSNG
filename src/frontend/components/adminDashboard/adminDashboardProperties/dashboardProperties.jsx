import React from 'react';
import { useState, useEffect, useContext } from 'react';
import './dashboardProperties.scss';
import PropertiesTable from '../tableProperties/propertiesTable';
import Context from '../../../context';
import ETH from '../../../assets/icons/eth-icon.png';
import TokenIcon from '@mui/icons-material/Token';
import SearchInput from '../searchInputProperties/searchInput';
import AddPropertyModal from '../modalAddProperty/addProperyModal';

const DashboardProperties = () => {
    
    const { chainHousing, contractBalance, setContractBalance, tokenBalance, setTokenBalance, propertyList } = useContext(Context);

    return (
        <section className='db-properties'>
            <div className='db-properties_header'>
                <div className='balance-info'><TokenIcon style={{height: '20px'}}/> balance: {tokenBalance} CHT  </div>
                <div className='balance-info'><img src={ETH} alt="ETH log" height='20px' /> balance: {contractBalance} ETH </div>
            </div>
            
            <div className='db-properties_table-container'>
                <div className='add-button'>
                    <AddPropertyModal/>
                    <SearchInput/>
                </div>
                <PropertiesTable/>
            </div>
        </section>

    );
}

export default DashboardProperties;
