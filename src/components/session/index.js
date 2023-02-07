import React from "react";
import List from "@mui/material/List";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Row from './row';
import {setCurrentSessionValue, setUserIdAndTime, saveCurrentSession, setopen,updateHelp, deleteHelp} from '../../reducers/session'
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
    }
    this.handleReview = this.handleReview.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
    this.setOpen = this.setOpen.bind(this)
    this.handleyes = this.handleyes.bind(this);
    this.handleno = this.handleno.bind(this);
    
  }
  setOpen(event, index) {
    let name = this.props.session.current_session[index+2].name;
    let open = !this.props.session.current_session[index+2].open;
    this.props.setopen({name, open})
    
  }
  handleyes (event,currentIndex) {
    let name = this.props.session.current_session[currentIndex+2].name;
    this.props.updateHelp({name:name})
  }
  handleno (event, currentIndex) {
    let name = this.props.session.current_session[currentIndex+2].name;
    this.props.deleteHelp({name:name})
   
  }

  componentDidMount () {
    let token = this.props.userinfo.token
    if (this.props.userinfo.category=='client') {
      initiateSocketConnection(token)
      join_room(this.props.userinfo.id)
    }
    recive_message()
  }
  componentDidUpdate (previousProps, previousState) {
    recive_message()
    if (JSON.stringify(previousProps.session.current_session)!==JSON.stringify(this.props.session.current_session)) {
      send_message({id:this.props.clientinfo.id, current_session:this.props.session.current_session}) 
      console.log("new props recvided", this.props.session.current_session)
    }
  }
  handleReview() {
    let userId = this.props.clientinfo.clinetid
    var today = get_date();
    this.props.setUserIdAndTime({userId, today})
    // this.props.saveCurrentSession(this.props.current_session).then(() =>{
    //   this.props.nagivate('/review')    
    // })
    this.props.nagivate('/review')    
  }
  handleChanges(event, currentIndex) {
    let name = event.target.name
    let value = event.target.value
    this.props.setCurrentSessionValue({name, value})
   // send_message({id:this.props.clientinfo.id, current_session:this.props.session.current_session}) 
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
              <Row 
              key={index} 
              row={row} 
              handleChanges={this.handleChanges} 
              value={this.props.session.current_session[index+2].value} 
              currentIndex={index} 
              setOpen={this.setOpen} 
              open={this.props.session.current_session[index+2].open} 
              handleno={this.handleno} 
              handleyes={this.handleyes}
              help={this.props.session.current_session[index+2].help}>
              </Row>
             
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
  saveCurrentSession,
  setopen,
  updateHelp,
  deleteHelp
}
export default connect(mapStateToProps, mapDispatchToProps)(Session);
