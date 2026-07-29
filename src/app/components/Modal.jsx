import { Modal,Box,Typography,TextField,Button,Select,MenuItem,InputLabel} from "@mui/material";
import { supabase } from "@/utils/supabase";

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

const renderInput = async (formData,col,i) =>{
    console.log(col.type)
    if(col.type === 'select'){
        const response = await supabase
            .from(col.foreignTable)
            .select('*')
        
        const {data,error} = response;
        console.log(data);
        return(
            <>
                <InputLabel id="demo-simple-select-outlined-label">{col.label}</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={col.field}
                    label={col.label}>
                            {
                                data.map((dt) => {
                                    return(
                                        <MenuItem value={dt.id}>{dt.name}</MenuItem>
                                    )
                                })
                            }
                    </Select>
            </>
        )
    }
    else{
        return(
            <TextField key={i}
                id={col.field}
                label={col.label}  
                name={col.field}
                value={formData[col.field]}
                onChange = {(e) => handleInputChange(e)}
            />
        )
    }
}

const CustomModal = ({open,handleClose,columns,handleInputChange,handleSubmit,formData,primaryKey}) =>{
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
                            {formData.id === '' ? 'Thêm' : 'Sửa'}
                        </Typography>
                    {
                        columns.filter((col) => col.field != 'id').map((col,i) => {
                            return renderInput(formData,col,i);
                            // return(

                            //     <TextField key={i}
                            //         id={item.field}
                            //         label={item.label}  
                            //         name={item.field}
                            //         value={formData[item.field]}
                            //         onChange = {(e) => handleInputChange(e)}
                            //     />
                            // )
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