import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { connect } from 'react-redux';
import {checkValue} from '../../reducers/session';
import '../../stylesheets/slider.css'
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Result from './result';
function valuetext(value) {
    return `${value}`;
}
class Row extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open:false,
      progress:0,
    }
    
  }
  componentDidUpdate (previousProps, previousState) {
    if (previousProps.session.current_session!=this.props.session.current_session) {
        let current_value = this.props.session.current_session.find(scale => scale.name===this.props.row)
        if (current_value!=undefined && current_value.value>0) {
            let percent = (current_value.value/7)*100
            this.setState({progress:percent})
        }
    }
}
  render () {
    return (
      <div>
        <ListItem button onClick={(event)=>this.props.setOpen(event,this.props.currentIndex)} divider>
          {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          <ListItemText primary={this.props.row} primaryTypographyProps={{'variant':'h6'}}/>
          {!this.props.open ? <Result progress={this.state.progress}/>: null}
        </ListItem>
        <Collapse 
          key={this.props.key}
          in={this.props.open}
          timeout='auto'
          unmountOnExit
          >
            <Box sx={{ width: '100%', justifyContent:'space-around'}}>
              <Typography variant='h6'>How satisfied are you with your {this.props.row}?</Typography>
              <Slider
                key={`slider-${this.props.value}`}
                aria-label="Custom marks"
                defaultValue={this.props.value}
                getAriaValueText={valuetext}
                step={1}
                min={1}
                max={7}
                marks={this.props.session.marks}
                onChange={(event)=>this.props.handleChanges(event,this.props.currentIndex)}
                name={this.props.row}
                sx={{width:'95%', marginLeft:5}}
              />
            </Box>
            <Box sx={{width:'100%', justifyContent:'flex-end', display:'flex'}}>
                <Typography>Do you need more help in this area?</Typography>
              </Box>
              <Box sx={{width:'100%', justifyContent:'flex-end', display:'flex'}}>
                <FormGroup>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FormControlLabel control={<Checkbox onChange={(event)=>{this.props.handleyes(event,this.props.currentIndex)}} checked={this.props.help}/>} label="Yes"/>
                    <FormControlLabel control={<Checkbox onChange={(event)=>{this.props.handleno(event,this.props.currentIndex)}} checked={!this.props.help}/>} label="No"/>
                  </Stack>
                </FormGroup>
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