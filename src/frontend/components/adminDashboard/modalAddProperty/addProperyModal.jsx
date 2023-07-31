import React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect, useContext } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddPropertyForm from '../formAddProperty/addProperyForm'

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
  };

const AddPropertyModal = () => {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <Button variant="contained" color="success" style={{height: '56px', padding: '0 30px'}} onClick={handleOpen}>
            <AddCircleIcon style={{marginRight: '10px'}}/> ADD
        </Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
            <Fade in={open}>
            <Box sx={style}>
                    <div onClick={handleClose}>X</div>
                    <AddPropertyForm handleClose={handleClose}/>
            </Box>
            </Fade>
        </Modal>
        </>
    );
}

export default AddPropertyModal;
