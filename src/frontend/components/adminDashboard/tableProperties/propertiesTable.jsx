import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect, useContext } from 'react';
import Context from '../../../context';
import Web3 from 'web3';

const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },

  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({

    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },

  }));

  function createData(id, name, location, baths, rooms, m2, price, available) {
    return { id, name, location, baths, rooms, m2, price, available};
  }
  
  let rows = [];
  let resultTables = '';

  const PropertiesTable = () => {

  const { chainHousing, contractBalance, setContractBalance, tokenBalance, setTokenBalance, propertyList } = useContext(Context);
  const [tableRows, setTableRows] = useState(0)

  const web3 = new Web3(window.ethereum);

  const loadInfo = async () =>{

    let contractBalance = await web3.eth.getBalance(chainHousing.address)
        contractBalance = web3.utils.fromWei(contractBalance, 'ether');
    let tokenBalance = await chainHousing.balanceOf();

    contractBalance = (+contractBalance).toFixed(2);
    tokenBalance = (+tokenBalance).toFixed(2);

    setContractBalance(contractBalance);
    setTokenBalance(tokenBalance);

  }

  useEffect(() => {

    rows = []
    for(let property of propertyList) {
      rows = [...rows, createData(
        (+property.propertyId).toString(), 
        property.name, 
        property.location, 
        (property.baths).toString(),
        (property.rooms).toString(),
        (property.m2).toString(),
        (property.price).toString(),
        property.available
        )]
    }

    resultTables = rows.map((row) => (
      <StyledTableRow key={row.name}>
        <StyledTableCell component="th" scope="row">
          {row.id}
        </StyledTableCell>
        <StyledTableCell align="right">{row.name}</StyledTableCell>
        <StyledTableCell align="right">{row.location}</StyledTableCell>
        <StyledTableCell align="right">{row.baths}</StyledTableCell>
        <StyledTableCell align="right">{row.rooms}</StyledTableCell>
        <StyledTableCell align="right">{row.m2}</StyledTableCell>
        <StyledTableCell align="right">{row.price}</StyledTableCell>
        <StyledTableCell align="right">{row.available?'Available':'Not For Sale'}</StyledTableCell>
        <StyledTableCell align="right">
          <IconButton aria-label="edit" size="small">
              <EditIcon style={{color: '#FFAC12'}}/>
          </IconButton> 
        </StyledTableCell>
      </StyledTableRow>
    ))
    
    setTableRows(resultTables);
    loadInfo();
   
  }, [propertyList]);

    return (
        <TableContainer component={Paper}>
        
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Baths</StyledTableCell>
            <StyledTableCell align="right">Rooms</StyledTableCell>
            <StyledTableCell align="right">m2</StyledTableCell>
            <StyledTableCell align="right">For Sale</StyledTableCell>
            <StyledTableCell align="right">Available</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows} 
        </TableBody>  
      </Table>
    </TableContainer>
    );
}

export default PropertiesTable;
