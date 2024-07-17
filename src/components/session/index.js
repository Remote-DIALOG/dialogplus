import React from "react";
import List from "@mui/material/List";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Row from './row';
import {setCurrentSessionValue, setUserIdAndTime, saveCurrentSession, setopen,updateHelp, deleteHelp, updateStage} from '../../reducers/session'
import {connect} from 'react-redux';
import BasicAlerts from "../../utils/alert";
import {get_date} from '../../utils/get_date';
import {send_message, recive_message} from '../../reducers/socket';
import DyButton from "../../utils/button";
class Assessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errormessage:"",
      socket:null,
    }
    this.handleReview     = this.handleReview.bind(this)
    this.handleChanges    = this.handleChanges.bind(this)
    this.setOpen          = this.setOpen.bind(this)
    this.handleyes        = this.handleyes.bind(this);
    this.handleno         = this.handleno.bind(this);
    this.handleBackButton =  this.handleBackButton.bind(this)
    this.handleExitButton = this.handleExitButton.bind(this)
    
  }
  handleBackButton () {
    if (this.props.client.dates.length === 0) {
      this.props.nagivate('/client')
      return;
    }
    // this.props.nagivate('/summary')
    this.props.updateStage('summary')
  }
  setOpen(event, index) {
    // console.log("setOpen is called at index", index)
    if (index > 0 && index <= 10) {
      let previous_scale = this.props.session.current_session[index+1]
      console.log("-------->", previous_scale, index)
    }
    // let current_scale = this.props.session.current_session[index+2]
   
    let name = this.props.session.current_session[index+2].name;
    let open = !this.props.session.current_session[index+2].open;
    this.props.setopen({name, open})
    
  }
  handleyes (event,currentIndex) {
    let name = this.props.session.current_session[currentIndex+2].name;
    let open = !this.props.session.current_session[currentIndex+2].open;
    this.props.updateHelp({name:name})
    this.props.setopen({name, open})
    // if (currentIndex<10) {
    //   let nextname = this.props.session.current_session[currentIndex+3].name;
    //   // this.props.setopen({name:nextname, open:true})
    // }

  }
  handleno (event, currentIndex) {
    let name = this.props.session.current_session[currentIndex+2].name;
    let open = !this.props.session.current_session[currentIndex+2].open;
    this.props.deleteHelp({name:name})
    this.props.setopen({name, open})
    // if (currentIndex < 12) {
    //   let nextname = this.props.session.current_session[currentIndex+3].name;
    //   // this.props.setopen({name:nextname, open:true})
    // }
  }
  handleExitButton () {
    this.props.nagivate('/client')
  }
  componentDidMount () {
    // recive_message()
  }
  componentDidUpdate (previousProps, previousState) {
    recive_message()
    // if (JSON.stringify(previousProps.session.current_session)!==JSON.stringify(this.props.session.current_session)) {
    //   send_message({id:this.props.clientinfo.id, current_session:this.props.session.current_session}) 
      
    // }
  }
  handleReview() {
    let userId = this.props.clientinfo.id
    var today = get_date();
    this.props.setUserIdAndTime({userId, today})
    this.props.updateStage("review")
  }
  handleChanges(event, currentIndex) {
    let name = event.target.name
    let value = event.target.value
    this.props.setCurrentSessionValue({name, value})
  }
  render() {
    return (
      <Container maxWidth={false}>
        {this.state.errormessage.length > 0 &&<BasicAlerts message={this.state.errormessage}/>}
        { (this.props.session.current_session[13].clinicianID === null && this.props.userinfo.category==='client') ? <BasicAlerts message={"You are doing this alone Clinician is not present"}/> : null} 
        { (this.props.session.current_session[13].clinicianID !== null && this.props.userinfo.category==='client') ? <BasicAlerts message={"Clinician has joined the session"}/>: null} 
        <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
            <Box><DyButton buttonText="Back" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}/></Box>
            <Box><Typography variant='h2' fontSize={{lg:30, md:20, sm:20, xs:20}}   sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"10px"}}}>Assessment</Typography></Box>
            <Box><DyButton buttonText="Next" onClick={this.handleReview} endIcon={<ArrowForwardIosIcon/>}/></Box>
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
          <Button onClick={this.handleExitButton} type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }} startIcon={<div style={{marginTop:"4px", marginBottom:"-4px"}}><ArrowBackIosIcon/><ArrowBackIosIcon/></div>} >Exit</Button>
          <Box sx={{ mt: 3, mb: 2 }}><DyButton buttonText="Next" onClick={this.handleReview} endIcon={<ArrowForwardIosIcon/>}/></Box>
          {/* <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleReview} endIcon={<ArrowForwardIosIcon/>}>Next</Button> */}
        </Box>
        </Container>         
    );
  }
}
const mapStateToProps = (state) => ({
  session:state.SessionReducer,
  clientinfo:state.ClientReducer.clientinfo,
  client: state.ClientReducer,
  userinfo:state.loginReducer.userinfo
})
const mapDispatchToProps = {
  setCurrentSessionValue,
  setUserIdAndTime,
  saveCurrentSession,
  setopen,
  updateHelp,
  deleteHelp,
  updateStage
}
export default connect(mapStateToProps, mapDispatchToProps)(Assessment);
