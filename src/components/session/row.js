import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';

import Slider from '@mui/material/Slider';
import CheckboxesGroup from './switch';
import { connect } from 'react-redux';
import {checkValue} from '../../reducers/session';
import '../../stylesheets/slider.css'
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import Result from './result';
function valuetext(value) {
    return `${value}`;
}

class Row extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open:false,
      progress:0
    }
    this.setOpen = this.setOpen.bind(this);   
  }
  setOpen() {
    this.setState({open:!this.state.open});
  }
  componentDidUpdate (previousProps, previousState) {
    if (previousProps.session.current_session!=this.props.session.current_session) {
        let current_value = this.props.session.current_session.find(scale => scale.name===this.props.row)
        if (current_value!=undefined && current_value.value>0) {
            let percent = (current_value.value/7)*100
            // console.log(percent)
            this.setState({progress:percent})
        }
    }
}
  render () {
    // console.log("------->", this.props.value, this.props.row)
    return (
      <div>
        <ListItem button onClick={this.setOpen} divider>
          {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          <ListItemText primary={this.props.row} primaryTypographyProps={{'variant':'h6'}}/>
          <Result progress={this.state.progress}/>
        </ListItem>
        <Collapse 
          key={this.props.key}
          in={this.state.open}
          timeout='auto'
          unmountOnExit
          >
            <Box sx={{ width: '100%', justifyContent:'space-around'}}>
              <Typography variant='h6'>How satisfied are you with your {this.props.row}?</Typography>
              <Slider
                aria-label="Custom marks"
                defaultValue={this.props.value}
                getAriaValueText={valuetext}
                step={1}
                min={1}
                max={7}
                marks={this.props.session.marks}
                onChange={this.props.handleChanges}
                name={this.props.row}
                sx={{width:'95%', marginLeft:5}}
              />
            </Box>
            <Box sx={{width:'100%', justifyContent:'flex-end', display:'flex'}}>
                <Typography>Do you need more help in this area?</Typography>
              </Box>
              <Box sx={{width:'100%', justifyContent:'flex-end', display:'flex'}}>
                <CheckboxesGroup rows={this.props.row}/>
            </Box>
        </Collapse>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  session:state.SessionReducer
})
const mapDispatchToProps = {
  checkValue,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Row)