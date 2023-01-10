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
import { ContentPasteSearch } from "@mui/icons-material";
class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: ["Mental health", "Physical health", "Job situation", "Accommodation", "Leisure activities", "Relationship with partner/family", "Friendship", "Personal safety", "Medication", "Practical help", "Meetings"],
      current_session: {
        "created_at":"",
        "created_by":16,
        "Mental health": 0,
        "Physical health": 0,
        "Job situation": 0,
        "Accommodation": 0,
        "Leisure activities":0,
        "Relationship":0,
        "Friendship":0,
        "Personal safety": 0,
        "Medication":0,
        "Practical help":0,
        "Meetings":0
      },
      errormessage:"",
      socket:null
    }
    this.handleReview = this.handleReview.bind(this)
    this.handleChanges = this.handleChanges.bind(this)
  }
  componentDidMount () {
    let token = this.props.userinfo.token
    if (this.props.userinfo.category=='client') {
      initiateSocketConnection(token)
      join_room(this.props.userinfo.id)
    }
  }
  componentDidUpdate () {
    recive_message()
    // this.forceUpdate()
  }
  handleReview() {
    let userId = this.props.clientinfo.clinetid
    var today = get_date();
    this.props.setUserIdAndTime({userId, today})
    this.props.saveCurrentSession(this.props.current_session).then(() =>{
      this.props.nagivate('/review')    
    })
  }
  handleChanges(event) {
    let name = event.target.name
    let value = event.target.value
    this.props.setCurrentSessionValue({name, value})
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
              <Row key={index} row={row} handleChanges={this.handleChanges} value={this.props.session.current_session[index+2].value}></Row>

            ))}
        </List>
        <Box sx={{width:"100%", justifyContent:"space-between", display:"flex"}}>
          <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }} startIcon={<div><ArrowBackIosIcon/><ArrowBackIosIcon/></div>}>Exit</Button>
          <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleReview} endIcon={<ArrowForwardIosIcon/>}>Review</Button>
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
