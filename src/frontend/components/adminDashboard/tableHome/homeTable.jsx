import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    return { id, name, location, baths, rooms, m2, price, available };
  }
  
  const rows = [
    createData(1, 'Prop 1', 'Fake address', 1, 2, 60, 180000, '30%'),
    createData(1, 'Prop 1', 'Fake address', 1, 2, 60, 180000, '30%'),
    createData(1, 'Prop 1', 'Fake address', 1, 2, 60, 180000, '30%'),
    createData(1, 'Prop 1', 'Fake address', 1, 2, 60, 180000, '30%'),
    createData(1, 'Prop 1', 'Fake address', 1, 2, 60, 180000, '30%'),
  ];

const HomeTable = () => {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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
              <StyledTableCell align="right">{row.available}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default HomeTable;
