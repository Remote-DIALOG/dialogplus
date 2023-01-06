import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import {addNewNotes} from '../../reducers/actionitems';
import {addNotes} from '../../reducers/actionitems';
import {connect} from 'react-redux';
import {get_date} from '../../utils/get_date'
function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  
  
  const handleSubmit = () => {
    // console.log(value);
    let notes = {
      "createdby": props.userinfo.emailid,
      "message" : value,
      "created_at": get_date()
    }
    props.addNewNotes(notes)
    props.addNotes(notes);
    setValue('');
    handleClose()
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <div>
      <Button variant="contained" onClick={handleClickOpen}>
            Add new Notes
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Add new notes</DialogTitle>
        <DialogContent>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '70ch' },}} noValidate autoComplete="off">
          <div>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              maxRows={4}
              value={value}
              onChange={handleChange}
            />
          </div>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Add notes</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </div>
      
    </div>
  );
}
const mapStateToProps = (state) => ({
  userinfo:state.loginReducer.userinfo,
  notes:state.ClientReducer.notes
})
const mapDispatchToProps = {
  addNewNotes,
  addNotes
}
export default connect(mapStateToProps,mapDispatchToProps)(FormDialog);
