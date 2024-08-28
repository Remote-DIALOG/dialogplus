import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { connect } from 'react-redux';
import { checkValue } from '../../reducers/session';
import '../../stylesheets/slider.css';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ProgressBarWithLabel from '../../utils/Progress';
import Tooltip from '@mui/material/Tooltip';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  if (value === 0) return "Not rated";
  if (value === 1) return "Totally dissatisfied";
  if (value === 2) return "Very dissatisfied";
  if (value === 3) return "Fairly dissatisfied";
  if (value === 4) return "In the middle";
  if (value === 5) return "Fairly satisfied";
  if (value === 6) return "Very satisfied";
  if (value === 7) return "Totally satisfied";
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      progress: 0,
      errorMessage: '',
      showErrorDialog: false,
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.session.current_session !== this.props.session.current_session) {
      let current_value = this.props.session.current_session.find(scale => scale.name === this.props.row);
      if (current_value && current_value.open === true) {
        this.setState({ open: true });
      }
      if (current_value && current_value.open === false) {
        this.setState({ open: false });
      }
      if (current_value && current_value.value > 0) {
        let percent = current_value.value;
        this.setState({ progress: percent });
      }
    }
  }
  render() {
    let yes = this.props.help;
    let no = this.props.help === null ? false : !this.props.help;

    return (
      <div>
       
        <ListItem button onClick={(event)=>this.props.setOpen(event,this.props.currentIndex)}  divider>
          {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          <ListItemText primary={
            this.props.help === true ? (
              <Box sx={{ flexDirection: 'row', display: "flex", paddingRight: 0 }}>
                <Typography variant='h6' fontSize={{ lg: 20, md: 18, sm: 14, xs: 14 }}>{this.props.row}</Typography>
                <Tooltip title="Help Needed" placement="top" enterTouchDelay={0}><PriorityHighIcon color="primary" /></Tooltip>
              </Box>
            ) : <Typography variant='h6'>{this.props.row}</Typography>
          }
            primaryTypographyProps={{ 'variant': 'h6' }}
          />
          {!this.props.open ?
            <Box sx={{ width: '25%', marginRight: '5%', marginTop: '0.5%' }}>
              {this.props.value === 0 ? <ProgressBarWithLabel value={(this.props.value / 7) * 100} label={this.props.value} color='#bdbdbd' /> : <ProgressBarWithLabel value={(this.props.value / 7) * 100} label={this.props.value} color='#2196f3' />}
            </Box>
            : null
          }
        </ListItem>
        <Collapse
          key={this.props.key}
          in={this.props.open}
          timeout='auto'
          unmountOnExit
        >
          <Box sx={{ width: '100%', justifyContent: 'space-around' }}>
            <Typography variant='body1' fontSize={{ lg: 28, md: 26, sm: 18, xs: 18 }} sx={{ marginLeft: "3%" }}>How satisfied are you with your {this.props.row.toLowerCase()}?</Typography>
            <Box mt={{ xs: "5%", md: "2%" }}>
              <Slider
                key={`slider-${this.props.value}`}
                aria-label="Custom marks"
                defaultValue={this.props.value}
                getAriaValueText={valuetext}
                step={1}
                min={0}
                max={7}
                marks={this.props.session.marks}
                onChange={(event) => this.props.handleChanges(event, this.props.currentIndex)}
                name={this.props.row}
                sx={{ width: '95%', marginLeft: '3%' }}
                valueLabelDisplay='on'
                valueLabelFormat={valueLabelFormat}
              />
            </Box>
          </Box>

          <Box sx={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
            <Typography fontSize={{ lg: 25, md: 16, sm: 16, xs: 16 }}>Do you need more help in this area?</Typography>
          </Box>
          <Box sx={{ width: '100%', justifyContent: 'flex-end', display: 'flex' }}>
            <FormGroup>
              <Stack direction="row" spacing={1} alignItems="center">
                <FormControlLabel control={<Checkbox onChange={(event) => {this.props.handleyes(event,this.props.currentIndex) }} checked={yes} />} label="Yes" />
                <FormControlLabel control={<Checkbox onChange={(event) => {this.props.handleno(event,this.props.currentIndex) }} checked={no} />} label="No" />
              </Stack>
            </FormGroup>
          </Box>
          <Dialog open={this.props.showErrorDialog}onClose={this.props.handleCloseErrorDialog}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please complete the first field before proceeding.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCloseErrorDialog}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.SessionReducer
})

const mapDispatchToProps = {
  checkValue,
}

export default connect(mapStateToProps, mapDispatchToProps)(Row);
