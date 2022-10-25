import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slider from '@mui/material/Slider';
import { nanoid } from 'nanoid'
import CustomizedSwitches from './switch';
import { connect } from 'react-redux';
import {checkValue} from '../../reducers/session';
import '../../stylesheets/slider.css'
import {setValue} from '../../reducers/session';
function valuetext(value) {
    return `${value}`;
}

class Row extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open:false,
      defaultRating:10,
    }
    this.setOpen = this.setOpen.bind(this);   
  }
  setOpen() {
    this.setState({open:!this.state.open});
  }
  render () {
    return (
      <React.Fragment>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={nanoid()}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={this.setOpen}
            >
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>


          <TableCell component="th" scope="row"  >
            <Typography variant='h6'>{this.props.row}</Typography>
          </TableCell>

          <TableCell align="right">
            <Box sx={{ width: 300 }}>
              <Slider disabled value={()=>this.props.getDefaultValue(this.props.row)} 
              aria-labelledby='discrete-slider'
              valueLabelDisplay='auto' />
            </Box>
           </TableCell>
        </TableRow>


        <TableRow key={nanoid()}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  How satifised are you with your {this.props.row} ?
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                  <Box sx={{ width: '100%', justifyContent:'space-around'}}>
                    <Slider
                        aria-label="Custom marks"
                        defaultValue={1}
                        getAriaValueText={valuetext}
                        step={1}
                        min={1}
                        max={7}
                        marks={this.props.marks}
                        onChange={this.props.handleChange}
                        name={this.props.row}
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
}
const mapStateToProps = (state) => ({
  session:state.SessionReducer
})
const mapDispatchToProps = {
  checkValue,
  setValue
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Row)