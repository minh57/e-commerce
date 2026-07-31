'use client'
import { Modal,Box,Typography,TextField,Button,Select,MenuItem,InputLabel,FormControl} from "@mui/material";
import { supabase } from "@/utils/supabase";
import React, { useState, useEffect } from 'react';

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
  alignItems: 'center',
  flexDirection: 'column',
  '& > :not(style)': { m: 1 }
};

const CustomModal = ({open,handleClose,columns,handleInputChange,handleSubmit,formData,primaryKey,isEdit}) =>{  

    return(
        <>
                    <Modal
                open ={open}
                onClose = {handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">

                <Box sx={style}
                    component='form'>   
                        <Typography>
                            {isEdit ? 'Sửa' : 'Thêm'}
                        </Typography>
                        {
                            columns.filter((col) => col.field !== 'id').map((col,i) => {
                                return(
                                    <Box key={i}>
                                    <TextField
                                    onChange={(e) => handleInputChange(e)}
                                    name={col.field} label={col.label} value={formData[col.field]} />
                                    </Box>
                                );
                            })
                        }
                    
                    <Button onClick={handleSubmit} sx={{
                        backgroundColor: 'blue',
                        color: 'white'
                    }}>Lưu</Button>
                </Box>
            </Modal>
        </>
    );
}




export default CustomModal;

