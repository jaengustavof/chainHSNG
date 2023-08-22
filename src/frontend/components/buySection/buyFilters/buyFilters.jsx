import React, { useState, useRef, useEffect } from 'react';
import './buyFilters.scss';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const BuyFilters = () => {

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRooms, setMinRooms] = useState('');
    const [maxRooms, setMaxRooms] = useState('');
    const [size, setSize] = useState([20, 250])
    const [minSize, setMinSize] = useState(20);
    const [maxSize, setMaxSize] = useState(250);
    const minSizeInput = useRef(null);
    const maxSizeInput = useRef(null);

    useEffect(() => {
        minSizeInput.current.childNodes[0].value = minSize;
        maxSizeInput.current.childNodes[0].value = maxSize;
    }, []);

    /*Price*/
    const handleMin = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMax = (event) => {
        setMaxPrice(event.target.value);
    };
    /*Price End*/

    /*Rooms*/
    const handleMinRooms = (event) => {
        setMinRooms(event.target.value);
    };

    const handleMaxRooms = (event) => {
        setMaxRooms(event.target.value);
    };
    /*Rooms End*/

    /*Size*/

    const handleSize = (event, newValue) => {
        setSize(newValue);
        minSizeInput.current.childNodes[0].value = newValue[0];
        maxSizeInput.current.childNodes[0].value = newValue[1];
        setMinSize(newValue[0]);
        setMaxSize(newValue[1]);
    };

    const handleChangeMin = (event) =>{

        let newValue = event.target.value < 0? 0: event.target.value

        setSize([newValue, maxSize]);
        setMinSize(newValue);
        minSizeInput.current.childNodes[0].value = newValue;
    }

    const handleChangeMax = (event) => {

        let newValue = event.target.value < 0? 0: event.target.value
        console.log()
        setSize([minSize , newValue]);
        setMaxSize(newValue);

        maxSizeInput.current.childNodes[0].value = newValue;
    }
    /*Size End*/

    return (
        <section className='buy-section-filters'>

            <div className='buy-section-filters_container'>
                <p className='filter-name'>Map</p>
                <div className='filter-container'>
                    <div className='map-container'>
                        <MapsHomeWorkIcon style={{fontSize: '40px'}}/>
                    </div>
                </div>
            </div>

            <div className='buy-section-filters_container'>
                <p className='filter-name'>Price</p>
                <div className='filter-container'>
                    <FormControl size='small' className='formControl50pct'>
                        <InputLabel id="min-price">Min.</InputLabel>
                        <Select
                            labelId="min-price"
                            id="min-price-select"
                            value={minPrice}
                            label="Min Price"
                            onChange={handleMin}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={5000}>5000</MenuItem>
                            <MenuItem value={10000}>10000</MenuItem>
                            <MenuItem value={15000}>15000</MenuItem>
                            <MenuItem value={20000}>20000</MenuItem>
                            <MenuItem value={25000}>25000</MenuItem>
                            <MenuItem value={35000}>35000</MenuItem>
                            <MenuItem value={40000}>40000</MenuItem>
                            <MenuItem value={45000}>45000</MenuItem>

                        </Select>
                    </FormControl>

                    <FormControl size='small' className='formControl50pct'>
                        <InputLabel id="max-price">Max.</InputLabel>
                        <Select
                            labelId="max-price"
                            id="max-price-select"
                            value={maxPrice}
                            label="Min Price"
                            onChange={handleMax}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={5000}>5000</MenuItem>
                            <MenuItem value={10000}>10000</MenuItem>
                            <MenuItem value={15000}>15000</MenuItem>
                            <MenuItem value={20000}>20000</MenuItem>
                            <MenuItem value={25000}>25000</MenuItem>
                            <MenuItem value={35000}>35000</MenuItem>
                            <MenuItem value={40000}>40000</MenuItem>
                            <MenuItem value={45000}>45000</MenuItem>

                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className='buy-section-filters_container'>
                <p className='filter-name'>Rooms</p>
                <div className='filter-container'>
                    <FormControl size='small' className='formControl50pct'>
                        <InputLabel id="min-rooms">Min.</InputLabel>
                        <Select
                            labelId="min-rooms"
                            id="min-rooms-select"
                            value={minRooms}
                            label="Min Rooms"
                            onChange={handleMinRooms}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>

                        </Select>
                    </FormControl>

                    <FormControl size='small' className='formControl50pct'>
                        <InputLabel id="min-rooms">Max.</InputLabel>
                        <Select
                            labelId="max-rooms"
                            id="max-rooms-select"
                            value={maxRooms}
                            label="Max Rooms"
                            onChange={handleMaxRooms}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>

                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className='buy-section-filters_container'>
                <p className='filter-name'>Size</p>
                <div className='filter-container column'>
                <Box style={{width:'80%', margin: 'auto'}}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={size}
                        max={500}
                        onChange={handleSize}
                        valueLabelDisplay="auto"
                        className='size-slider'
                        style={{color: '#FFAC12'}}
                        
                    />
                </Box>
                <div className='filter-container'>
                <FormControl size='small' className='formControl50pct'>
                    <OutlinedInput
                        id="outlined-adornment-mts-min"
                        endAdornment={<InputAdornment position="end">m2</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'mts',
                        }}
                        placeholder='Min'
                        ref={minSizeInput}
                        onChange={handleChangeMin}
                    />
                </FormControl>
                <FormControl size='small' className='formControl50pct'>
                    <OutlinedInput
                        id="outlined-adornment-mts-max"
                        endAdornment={<InputAdornment position="end" size="small">m2</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'mts',
                        }}
                        placeholder='Max'
                        ref={maxSizeInput}
                        onChange={handleChangeMax}
                    />
                </FormControl>
                </div>
                </div>
            </div>

        </section>
    );
}

export default BuyFilters;
