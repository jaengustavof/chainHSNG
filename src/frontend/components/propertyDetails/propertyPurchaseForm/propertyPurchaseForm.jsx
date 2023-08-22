import React from 'react';
import { useEffect, useContext, useState } from 'react';
import './propertyPurchaseForm.scss';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TokenIcon from '@mui/icons-material/Token';
import Context from '../../../context';
import chainHousingAbi from '../../../contractsData/chainHousing.json';
import chainHousingAddress from '../../../contractsData/chainHousing-address.json';
import Web3 from 'web3';

const marks = [
    {
      value: 0,
      label: '0',
    },
    {
        value: 70,
        label: '70%',
    },
    {
      value: 100,
      label: '100%',
    },
  ];

function valuetext(value) {
    return `${value}%`;
  }


const PropertyPurchaseForm = () => {

    const [totalPrice, setTotalPrice] = useState(0);
    const [monthRent, setMonthRent] = useState(0);
    const {chainHousing, provider,selectedProperty, userAccount} = useContext(Context);

    const web3 = new Web3(window.ethereum);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const buyProperty = async (propertyId, shares) => {
        try {
            const propertyIdNumber = parseInt(propertyId);
            const sharesNumber = parseInt(shares);

            const gasPrice = await web3.eth.getGasPrice(); // Get the current gas price
            const gasLimit = 300000; // Set an appropriate gas limit

            const contract = new web3.eth.Contract(chainHousingAbi.abi, chainHousingAddress.address);

            const transaction = await contract.methods.buyProperty(propertyIdNumber, sharesNumber).send({
                from: userAccount,
                gasPrice: gasPrice,
                gas: gasLimit
            });

            console.log('Transaction hash:', transaction.transactionHash);
            // Perform any further actions after the transaction, such as updating balances or UI state
        } catch (error) {
            console.error('Error buying property:', error);
        }
    };
    
    const onSubmit = (data) => {
        const propertyId = selectedProperty.propertyId;
        const shares = data.shares;
        
        buyProperty(propertyId.toString(), shares);
    }

    const optionChange = (e) => {
        const price = (selectedProperty.price).toString(); //TODO: Change to real value
        const rent = 1500; //TODO: Change to real value
        const pct = e.target.value;

        const pctPrice = (price*pct)/100;
        const pctRent = (rent*pct)/100;

        setTotalPrice(pctPrice);
        setMonthRent(pctRent);

    }

    
    return (
        <div className='property-form-container_form'>
            <p className='rental-price'><TokenIcon/> 1500 / mo</p>
            <p className='shares-available'>Availability</p>
            <Box sx={{ width: '70%', margin: 'auto' }}>
                <Slider
                    disabled
                    
                    aria-label="Custom marks"
                    defaultValue={70}
                    getAriaValueText={valuetext}
                    step={null}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} className='shares-form'>
                <select {...register("shares")} onChange={optionChange}>
                    <option value="">Select...</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                    <option value="40">40%</option>
                    <option value="50">50%</option>
                    <option value="60">60%</option>
                    <option value="70">70%</option>
                </select>
                <div className='shares-calc'>
                    <p>Total Price: <TokenIcon/> {totalPrice}</p>
                    <p>Monthly Income: <TokenIcon/> {monthRent}</p>
                </div>
                <input type="submit" className='buy-shares-button' value="Buy Shares" />
            </form>
        </div>

    );
}

export default PropertyPurchaseForm;
