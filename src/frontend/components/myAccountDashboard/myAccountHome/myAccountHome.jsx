import React from 'react';
import Context from '../../../context';
import './myAccountHome.scss';
import { useState, useEffect, useContext } from 'react';
import TokenIcon from '@mui/icons-material/Token';
import ETH from '../../../assets/icons/eth-icon.png';
import Table from '../tableHome/homeTable'
import { ContactlessOutlined } from '@mui/icons-material';

const MyAccountHome = () => {

    const {chainHousing, userAccount, balance, userTokenBalance, setUserTokenBalance, propertyList} = useContext(Context);
    const [ownedProps, setOwnedProps] = useState([]);

    const loadUserInfo = async () => {

        let getUserTokenBalance = await chainHousing.connect(userAccount).myTokens();
        getUserTokenBalance = (+getUserTokenBalance).toFixed();
        setUserTokenBalance(getUserTokenBalance);

        const myProps = propertyList.filter((prop) => {
            for(let owners of prop.owners){
                 if(owners.toLowerCase() === userAccount.toLowerCase()){
                     return prop;
                 }
            }
        });

        setOwnedProps(myProps)

    }

    useEffect(() => {
        loadUserInfo();
    }, [balance, userAccount]);

    return (
        <section className='ma-home'>
            <div className='ma-home_balance-container'>
                <div className='balance-info'><p>My Address: {userAccount}</p></div>
                <div className='balance-info'><TokenIcon style={{height: '20px'}}/> Tokens balance: {userTokenBalance} CHT   </div>
                <div className='balance-info'><img src={ETH} alt="ETH log" height='20px' /> My balance: {balance} ETH </div>
            </div>
            <div className='ma-home_property-list'>
                <h3>My Properties</h3>
                {ownedProps.length>0? <Table props={ownedProps}/>: <h2>You have no properties</h2> }
                {/*<Table/>*/}
            </div>
        </section>
    );
}

export default MyAccountHome;
