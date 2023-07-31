import React from 'react';
import { useState } from 'react';
import './propertyPurchaseForm.scss';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TokenIcon from '@mui/icons-material/Token';
import Context from '../../../context';
import { useEffect, useContext } from 'react';

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
    const {selectedProperty} = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
    const onSubmit = (data) => console.log(data);

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
