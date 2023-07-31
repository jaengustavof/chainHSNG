import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './listingfilters.scss'


const HomeListingFilters = () => {

    const [looking, setLooking] = useState('');
    const [location, setlocation] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');

    const handleLooking = (event) => {
        setLooking(event.target.value);
    };

    const handleLocation = (event) => {
        setlocation(event.target.value);
    }

    const handleType = (event) => {
        setType(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    return (
      <div className='form-control-container'>
        <FormControl sx={{ m: 1, minWidth: '22%', bgcolor: '#FFFFFF'  }}>
          <InputLabel id="lookingFor">Looking For</InputLabel>
          <Select
            labelId="lookingFor"
            id="looking"
            value={looking}
            label="Looking For"
            onChange={handleLooking}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

        </FormControl>
        <FormControl sx={{ m: 1, minWidth: '22%', bgcolor: '#FFFFFF'  }}>
            <InputLabel id="searchLocation">Location</InputLabel>
          <Select
            labelId="searchLocation"
            id="location"
            value={location}
            label="Location"
            onChange={handleLocation}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: '22%', bgcolor: '#FFFFFF' }}>
            <InputLabel id="propertyType">Property Type</InputLabel>
          <Select
            labelId="propertyType"
            id="type"
            value={type}
            label="Property Type"
            onChange={handleType}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: '22%', bgcolor: '#FFFFFF' }}>
            <InputLabel id="propertyPrice">Price</InputLabel>
          <Select
            labelId="propertyPrice"
            id="price"
            value={price}
            label="price"
            onChange={handlePrice}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
}

export default HomeListingFilters;
