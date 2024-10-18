import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CustomAlert(props) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const anchorOrigin = {
    vertical: isSmallScreen ? 'top' : 'top',
    horizontal: isSmallScreen ? 'left' : 'center',
  };
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
      autoHideDuration={5000}
      message={props.message}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      sx={{width:'250px'}}
      // action={action}
    />
  );
}