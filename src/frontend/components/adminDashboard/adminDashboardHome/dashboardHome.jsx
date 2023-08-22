import React from 'react';
import { useState, useEffect, useContext } from 'react';
import './dashboardHome.scss';
import Context from '../../../context';
import Web3 from 'web3';
import ETH from '../../../assets/icons/eth-icon.png';
import TokenIcon from '@mui/icons-material/Token';
import PropertiesTable from '../tableProperties/propertiesTable';
import { PieChart } from '@mui/x-charts/PieChart';


const DashboardHome = () => {
    
    const [contractAddress, setContractAddress] = useState('');

    const { chainHousing, contractBalance, setContractBalance, tokenBalance, setTokenBalance, propertyList, setPropertyList } = useContext(Context);
    
    const web3 = new Web3(window.ethereum);

    const loadInfo = async () =>{

        let tokenBalance = await chainHousing.balanceOf();
        let contractAddress = await chainHousing.getContractAddress();
        let property = await chainHousing.getAllProperties();
        let contractBalance = await web3.eth.getBalance(chainHousing.address)
        contractBalance = web3.utils.fromWei(contractBalance, 'ether');
        tokenBalance = (+tokenBalance).toFixed(2);

        setContractBalance(contractBalance);
        setTokenBalance(tokenBalance);
        setContractAddress(contractAddress);
        setPropertyList(property) ;
    }

    useEffect(() => {
        loadInfo();
    }, []);

    return (
        <section className="db-home">

            <div className='db-home_balance-container'>
                <div className='balance-info'>Contract address: {contractAddress} </div>
                <div className='balance-info'><TokenIcon style={{height: '20px'}}/> balance: {tokenBalance} CHT   </div>
                <div className='balance-info'><img src={ETH} alt="ETH log" height='20px' /> balance: {contractBalance} ETH </div>
            </div>
            <div className='db-home_property-resume'>
                <div className='card30'>
                    <p className='card30_text'>Total Properties</p>
                    <h4>5</h4>
                </div>
                <div className='card30'>
                    <p className='card30_text'>Properties for Sale</p>
                    <h4>5</h4>
                </div>
                <div className='card30'>
                    <p className='card30_text'>Properties for Rent</p>
                    <h4>N/A</h4>
                </div>
            </div>
            <div className='db-home_property-list'>
                <PropertiesTable/>
            </div>
            <div className='db-home_property-value'>
                <div className='property-value'>
                    <p className='property-value_text'>Total Net Worth:</p>
                    <h3><TokenIcon style={{height: '40px'}}/> 900000</h3>
                    <h3><img src={ETH} alt="ETH log" height='40px' /> 472.44</h3>
                </div>
                <div className='property-value'>
                    <PieChart
                        series={[
                            {
                            data: [
                                { id: 0, value: 70, label: 'Sold', color: 'teal' },
                                { id: 1, value: 30, label: 'Available', color: 'dodgerblue'  },
                            ],
                            innerRadius: 16,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -180,
                            endAngle: 180,
                            cx: 150,
                            cy: 96,
                            },
                        ]}
                        width={400}
                        height={220}
                        />
                </div>
                <div className='property-value'>
                <PieChart
                        series={[
                            {
                            data: [
                                { id: 0, value: 85, label: 'Rented', color: 'teal' },
                                { id: 1, value: 15, label: 'Available', color: 'dodgerblue'  },
                            ],
                            innerRadius: 16,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -180,
                            endAngle: 180,
                            cx: 150,
                            cy: 96,
                            },
                        ]}
                        width={400}
                        height={220}
                        />
                </div>
            </div>
        </section>
    );
}

export default DashboardHome;
