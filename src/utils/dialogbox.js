import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { logout } from '../reducers/login';
import {connect} from 'react-redux'
function AlertDialog(props) {
  const handleClose = () => {
    props.handleExit()
    //   console.log("handle close in dialoog")
    // setOpen(false);
  };
  const handleYes = () => {
      props.logout()
      props.nagivate('/')
      props.handleExit()
      console.log("handle yes in dialogbox")
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you wish to logout?"}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapDispatchToProps = {
    logout
}
export default connect(null, mapDispatchToProps)(AlertDialog)
