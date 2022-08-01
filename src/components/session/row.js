import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slider from '@mui/material/Slider';
import CustomizedSwitches from './switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

  function valuetext(value) {
    return `${value}`;
  }
export default function Row(props) {
    const { row , index, marks} = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row}
          </TableCell>
          <TableCell align="right">
            <Box sx={{ width: 300 }}>
              <Slider disabled defaultValue={index+5} aria-label="Default" />
            </Box>
           </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  How much are you satifised with your {row}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                  </TableHead>
                  <TableBody>
                  <Box sx={{ width: '100%', justifyContent:'space-around'}}>

                                  <Slider
                                    aria-label="Custom marks"
                                    defaultValue={1}
                                    getAriaValueText={valuetext}
                                    step={1}
                                    min={1}
                                    max={7}
                                    marks={marks}
                                  />
                                </Box>
                  <Box sx={{width:'100%', justifyContent:'flex-end', display:'flex'}}>
                    <Typography>Do you need more help in this area?</Typography>
                  </Box>
                  <Box sx={{width:'100%', justifyContent:'flex-end', display:'flex'}}>
                  <CustomizedSwitches/>
                  </Box>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  