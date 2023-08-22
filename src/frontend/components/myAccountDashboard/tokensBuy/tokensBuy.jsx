import React, { useState, useContext } from 'react';
import Context from '../../../context';
import { useForm, SubmitHandler } from "react-hook-form";
import TokenIcon from '@mui/icons-material/Token';
import Web3 from 'web3';
import ETH from '../../../assets/icons/eth-icon.png';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import chainHousingAbi from '../../../contractsData/chainHousing.json';
import chainHousingAddress from '../../../contractsData/chainHousing-address.json';


const TokensBuy = () => {

    const { register, handleSubmit, resetField, formState: { errors } } = useForm();
    const {chainHousing, tokenPrice, setTokenPrice, provider, userAccount, setUserTokenBalance} = useContext(Context);

    const [ ethToChtAmount, setEthToChtAmount ] = useState();
    const [ chtToEthAmount, setChtToEthAmount ] = useState();

    const web3 = new Web3(window.ethereum);

    const calcCht = (e) => {
        setEthToChtAmount(e.target.value)
        const total = e.target.value / tokenPrice
        setChtToEthAmount(total)
    }

    const calcEth = (e) => {
        setChtToEthAmount(e.target.value)
        const total = e.target.value * tokenPrice;
        setEthToChtAmount(total);
    }

    const handleClick = () => {
        resetField("ethers");
        resetField("chtTokens")
        setEthToChtAmount('');
        setChtToEthAmount('');
    }

    const onSubmit = (data) => {
    }
    
    const buyTokens = async () => {
        try {
            const tokens = chtToEthAmount.toString(); 
            const ethAmountWei = web3.utils.toWei(ethToChtAmount.toString(), 'ether'); 

            const gasPrice = await web3.eth.getGasPrice(); // Get the current gas price
            const gasLimit = 300000; // Set an appropriate gas limit
 
            const contract = new web3.eth.Contract(chainHousingAbi.abi, chainHousingAddress.address);

            const transaction = await contract.methods.buyTokens(tokens).send({
                from: userAccount, 
                value: ethAmountWei,
                gasPrice: gasPrice, 
                gas: gasLimit  
            });

            let myNewBalance = await chainHousing.myTokens();
            myNewBalance = (+myNewBalance).toFixed();
            console.log('myNewBalance', myNewBalance)
            setUserTokenBalance(myNewBalance);
            console.log('Transaction hash:', transaction.transactionHash);
        } catch (error) {
            console.error('Error buying tokens:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <h3 style={{textAlign: "center", marginBottom: '20px'}}>Buy Tokens</h3>
            <div className='form-container'>

                <div className='input-container'>
                    <img src={ETH} alt='ethers icon' style={{height: '50px'}}/>
                    <input type="number" placeholder='ETH' {...register("ethers", { required: false })} value={ethToChtAmount || ''} onClick={handleClick} onChange={(event) => calcCht(event)}/>
                    {/* errors will return when field validation fails  */}
                    {errors.ethers && <span>This field is required</span>}
                </div>

                <ChangeCircleIcon style={{fontSize: '30px', color: '#aaaaaa'}}/>
        
                <div className='input-container'>
                    <TokenIcon style={{fontSize: '50px'}}/>
                    {/* include validation with required or other standard HTML validation rules */}
                    <input type="number" placeholder='CHT' {...register("chtTokens", { required: false })} value={chtToEthAmount || ''} onClick={handleClick} onChange={(event) => calcEth(event)} />
                    {/* errors will return when field validation fails  */}
                    {errors.chtTokens && <span>This field is required</span>}
                </div>   

            </div>

            <div className='rate-container'>
                <h5>Rate of Exchange</h5>
                <p>{tokenPrice} ETH<span> = </span> 1 CHT</p>
            </div>
            <input type="submit" className='submit-button' value="Buy Tokens" onClick={()=> buyTokens(chtToEthAmount)}/>
        </form>
        )
}

export default TokensBuy;
