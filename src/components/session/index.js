import React from "react";
import List from "@mui/material/List";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Row from './row';
import {setCurrentSessionValue, setUserIdAndTime, saveCurrentSession} from '../../reducers/session'
import {connect} from 'react-redux';
import BasicAlerts from "../../utils/alert";
import {get_date} from '../../utils/get_date';
import {initiateSocketConnection, join_room, send_message, recive_message} from '../../reducers/socket';
class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errormessage:"",
      socket:null,
      open:[false,false,false,false,false,false,false,false,false,false,false]
    }
    this.handleReview = this.handleReview.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
    this.setOpen = this.setOpen.bind(this)
    this.setClose = this.setClose.bind(this);
    
  }
  setClose (index) {
    let copy = this.state.open
    copy[index]=false
    this.setState({open:copy})
  }
  setOpen(index) {
    let copy = this.state.open
    copy[index]=!copy[index]
    this.setState({open:copy})
  }
  componentDidMount () {
    let token = this.props.userinfo.token
    if (this.props.userinfo.category=='client') {
      initiateSocketConnection(token)
      join_room(this.props.userinfo.id)
    }
    recive_message()
  }
  componentDidUpdate () {
    recive_message()
  }
  handleReview() {
    let userId = this.props.clientinfo.clinetid
    var today = get_date();
    this.props.setUserIdAndTime({userId, today})
    this.props.saveCurrentSession(this.props.current_session).then(() =>{
      this.props.nagivate('/review')    
    })
  }
  handleChanges(event, currentIndex) {
    let name = event.target.name
    let value = event.target.value
    this.props.setCurrentSessionValue({name, value})
    this.setClose(currentIndex)
    this.setOpen(currentIndex+1)
    send_message({id:this.props.clientinfo.id,name, value}) 
  }
  render() {
    return (
      <Container maxWidth={false}>
        {this.state.errormessage.length > 0 &&<BasicAlerts message={this.state.errormessage}/>}
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
          <Box sx={{margin:2}}><Typography variant='h4'>Assessment</Typography></Box>
            <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleReview} endIcon={<ArrowForwardIosIcon/>}>Next</Button>
          </Box>
          <List component="nav" aria-labelledby="nested-list-subheader">
            {this.props.session.scale.map((row, index)=>(
              <Row key={index} row={row} handleChanges={this.handleChanges} value={this.props.session.current_session[index+2].value} currentIndex={index} setOpen={this.setOpen} open={this.state.open[index]}></Row>
            ))}
        </List>
        <Box sx={{width:"100%", justifyContent:"space-between", display:"flex"}}>
          <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }} startIcon={<div><ArrowBackIosIcon/><ArrowBackIosIcon/></div>}>Exit</Button>
          <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleReview} endIcon={<ArrowForwardIosIcon/>}>Next</Button>
        </Box>
        </Container>         
    );
  }
}
const mapStateToProps = (state) => ({
  session:state.SessionReducer,
  clientinfo:state.ClientReducer.clientinfo,
  userinfo:state.loginReducer.userinfo
})
const mapDispatchToProps = {
  setCurrentSessionValue,
  setUserIdAndTime,
  saveCurrentSession
}
export default connect(mapStateToProps, mapDispatchToProps)(Session);
