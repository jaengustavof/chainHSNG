import React, {useContext, useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Context from '../../../context';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import chainHousingAbi from '../../../contractsData/chainHousing.json';
import chainHousingAddress from '../../../contractsData/chainHousing-address.json';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center'
};

const HomeTable = ({props}) => {

  const {chainHousing, userAccount} = useContext(Context);
  const [thisRows, setThisRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const web3 = new Web3(window.ethereum);

  const rows = []
  
  function createData(id, name, location, baths, rooms, m2, price, available) {
    return { id, name, location, baths, rooms, m2, price, available };
  }

  const getShares = async (propertyId, userAccount) => {
    const getMyShares = await chainHousing.connect(userAccount).getClientShares(propertyId, userAccount);
    return getMyShares;
  }
  
  const fetchRows = async () => {
    const rowsPromises = props.map(async (prop) => {
      const shares = await getShares(prop.propertyId.toNumber(), userAccount);
      rows.push(createData(
        prop.propertyId.toNumber(),
        prop.name,
        prop.location,
        prop.baths.toNumber(),
        prop.rooms.toNumber(),
        prop.m2.toNumber(),
        shares.toNumber(),
        prop.price.toNumber() * 0.10

      ))

      setThisRows(rows)

    });
  };

  const sellProperty = async (propID, shares) => {
    try {

      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = 300000;
      const contract = new web3.eth.Contract(chainHousingAbi.abi, chainHousingAddress.address);

      const transaction = await contract.methods.sellProperty(propID, shares).send({
        from: userAccount,
        gasPrice: gasPrice,
        gas: gasLimit
    });

    console.log('Transaction hash:', transaction.transactionHash);
    
    } catch (error) {
      console.error('Error buying property:', error);
    }
  }

  useEffect(() => {
    fetchRows();
    console.log(thisRows)
  }, [chainHousing, userAccount, props]);

    return  (
      <>
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
            <StyledTableCell align="right">% Owned</StyledTableCell>
            <StyledTableCell align="right">Market Value</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {thisRows.map((row) => (
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
              <StyledTableCell align="right"><Button onClick={handleOpen} style={{color: '#FFAC12'}}><SettingsIcon/></Button></StyledTableCell>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h2>{row.name}</h2>
                  <h3>{row.location}</h3>
                  <h2>{row.available}</h2>
                  <Button variant="contained" color="success" onClick={()=>{sellProperty(row.id, row.price)}}>Sell this Asset</Button>
                  <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                </Box>
              </Modal>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    <div>
    
      
    </div>
      </>
    
    );
}

export default HomeTable;
