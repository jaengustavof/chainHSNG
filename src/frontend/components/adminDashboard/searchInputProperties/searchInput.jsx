import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const houses = [
    {name: 'example 1'},
    {name: 'example 2'},
    {name: 'example 3'},
    {name: 'example 4'},
    {name: 'example 5'}

  ];

const SearchInput = () => {
    return (
        <Stack spacing={2} sx={{ width: 300 }}>

            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={houses.map((option) => option.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search property"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                  style={{background: 'white'}}
                />
              )}
            />
        </Stack>
      );
}

export default SearchInput;
