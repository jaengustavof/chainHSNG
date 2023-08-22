import React, { useState, useContext }  from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Context from '../../../context';
import TokenIcon from '@mui/icons-material/Token';
import Web3 from 'web3';
import ETH from '../../../assets/icons/eth-icon.png';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import chainHousingAbi from '../../../contractsData/chainHousing.json';
import chainHousingAddress from '../../../contractsData/chainHousing-address.json';


const TokensSell = () => {

    const { register, handleSubmit, resetField, formState: { errors } } = useForm();
    const {chainHousing, tokenPrice, setTokenPrice, userAccount, setUserTokenBalance, contractAddress} = useContext(Context);

    const [ chtToEthAmount, setChtToEthAmount ] = useState();
    const [ ethToChtAmount, setEthToChtAmount ] = useState();

    const web3 = new Web3(window.ethereum);

    const calcCht = (e) => {
        setEthToChtAmount(e.target.value)
        const total = e.target.value / (tokenPrice*0.99)
        setChtToEthAmount(total)
    }

    const calcEth = (e) => {
        setChtToEthAmount(e.target.value)
        const total = e.target.value * (tokenPrice*0.99);
        setEthToChtAmount(total);
    }

    const handleClick = () => {
        resetField("ethers");
        resetField("chtTokens")
        setEthToChtAmount('');
        setChtToEthAmount('');
    }

    const onSubmit = (data) => {

    };

    
    const sellTokens = async () => {
        
        
        try {
            const tokens = chtToEthAmount.toString();
            let ethAmountWei = web3.utils.toWei((ethToChtAmount*0.01), 'ether'); // 1% comision por cambio de tokens
            console.log(ethAmountWei)
            ethAmountWei = web3.utils.numberToHex(ethAmountWei)
            console.log(ethAmountWei)
            console.log(104940000000000000)
            const gasPrice = await web3.eth.getGasPrice();
            const gasLimit = 300000;
    
            const contract = new web3.eth.Contract(chainHousingAbi.abi, chainHousingAddress.address);
    
            const transaction = await contract.methods.sellTokens(tokens).send({
                from: userAccount,
                value: 104940000000000000,
                gasPrice: gasPrice,
                gas: gasLimit

                
            });
            
            let myNewBalance = await chainHousing.myTokens();
            let userBalance = await chainHousing
            myNewBalance = (+myNewBalance).toFixed();
            console.log('myNewBalance', myNewBalance);
            setUserTokenBalance(myNewBalance);
            console.log('Transaction hash:', transaction.transactionHash);
        } catch (error) {
            console.error('Error selling tokens:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3 style={{textAlign: "center", marginBottom: '20px'}}>Sell Tokens</h3>
            <div className='form-container'>
                
                <div className='input-container'>
                    <TokenIcon style={{fontSize: '50px'}}/>
                    {/* include validation with required or other standard HTML validation rules */}
                    <input onClick={handleClick} type="number" placeholder='CHT' {...register("chtTokens", { required: false })} value={chtToEthAmount || ''} onChange={(event) => calcEth(event)} />
                    {/* errors will return when field validation fails  */}
                    {errors.chtTokens && <span>This field is required</span>}
                </div>   

                <ChangeCircleIcon style={{fontSize: '30px', color: '#aaaaaa'}}/>

                <div className='input-container'>
                    <img src={ETH} alt='ethers icon' style={{height: '50px'}}/>
                    <input onClick={handleClick} type="number" placeholder='ETH' {...register("ethers", { required: false })} value={ethToChtAmount || ''} onChange={(event) => calcCht(event)}/>
                    {/* errors will return when field validation fails  */}
                    {errors.ethers && <span>This field is required</span>}
                </div>

            </div>

            <div className='rate-container'>
                <h5>Rate of Exchange</h5>
                <p>1 CHT<span> = </span> {(tokenPrice*0.99)} ETH </p>
            </div>
            <input type="submit" className='submit-button' value="Sell Tokens" onClick={()=> sellTokens(chtToEthAmount, ethToChtAmount, userAccount)}/>
        </form>
    );
}

export default TokensSell;
