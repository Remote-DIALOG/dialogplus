import React from 'react';
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
        <Box sx={{ p: 3 }}>
         {children}
        </Box>
     
    </div>
  );
}
export default TabPanel;