import * as React from 'react';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

const DyButton = ({ buttonText, onClick, startIcon, endIcon }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  
  const buttonStyle = {
    fontSize: isSmallScreen ? '10px' : '14px',
    width: isSmallScreen ? '90px' : '150px',
    padding: isSmallScreen ? '10px' : '12px'
    
  };

  return (
    <Button
      variant="contained"
      color="primary"
      sx={buttonStyle}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {buttonText}
    </Button>
  );
};

export default DyButton;
