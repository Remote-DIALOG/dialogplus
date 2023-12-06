import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function CustomAlert(props) {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { 
      return;
    }
    setOpen(false);
  };
  React.useEffect(() => {
    if (props.message.length > 0 ) {
      handleClick()
    }
  }, [props.message]);

  return (
      <Snackbar
      open={open}
      autoHideDuration={6000}
      message={props.message}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{width:'500px'}}
      // action={action}
    />
  );
}