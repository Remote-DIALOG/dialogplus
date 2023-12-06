import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from "@mui/material/List";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {send_message, recive_message} from '../../reducers/socket';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {saveCurrentSession,getPastSession, selectDomain} from '../../reducers/session'
import {connect} from 'react-redux';
import ProgressBarWithLabel from '../../utils/Progress'
import CustomAlert from '../../utils/alert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pastSession:"",
            flag:false,
            setIndex:null, 
            error:""
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.selectPastSession = this.selectPastSession.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
    }
    handleBackButton() {
        this.props.nagivate('/session')
    }
    handleCheckbox (event, index) {
        const current_session = this.props.current_session.slice(2)
        let selected_domain = current_session.filter(domian => domian.select === true)
        if (current_session[index].select === true) {
            this.props.selectDomain({name:current_session[index].name})
            return;
        }
        if (selected_domain.length >=3) {
            this.setState({error:"You can’t select more than 3 items"});
            return;

        }
        this.props.selectDomain({name:current_session[index].name})
    }
    componentDidMount () {
        this.props.getPastSession({"clientId":this.props.clientinfo.id})
    }
    componentDidUpdate (previousProps, previousState) {
        recive_message()
        if (JSON.stringify(previousProps.session.current_session)!==JSON.stringify(this.props.session.current_session)) {
          send_message({id:this.props.clientinfo.id, current_session:this.props.session.current_session}) 
        }
      }
    selectPastSession(event, index) {
       let pastsession = this.props.session.past_session[index]
       if (this.state.pastSession.length>0) {
           this.setState({pastSession:""});
           this.setState({setIndex:null})
           return;
       }
       this.setState({pastSession:pastsession})
       this.setState({setIndex:index})
    }
    handleSelect () {
        const current_session = this.props.current_session.slice(2)
        let selected_domain = current_session.filter(domian => domian.select === true)
        if (selected_domain.length < 3) {
            this.setState({error:"You have to select 3 select"});
            return;
        }
        this.props.nagivate('/discuss')
    }
    render () {
        const current_session = this.props.current_session.slice(2)
        return (
            <Container maxWidth={false}>
                 {this.state.error.length > 0 &&<CustomAlert message={this.state.error}/>}
                 <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                    <Box><Button  variant="contained" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}>Back</Button></Box>
                    <Box><Typography variant='h2' fontSize={{lg:30, md:20, sm:20, xs:20}}>Compare and Select</Typography></Box>
                    <Box><Button  variant="contained" onClick={this.handleSelect} endIcon={<ArrowForwardIosIcon/>}> Discuss</Button></Box>
                </Box>   
                <Box sx ={{marginTop:3, display:'flex', flexDirection:'row', justifyContent:'space-between', backgroundColor:"white", }}>
                    <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>   
                    {this.props.session.past_session.map((row, index)=>(
                        <Chip 
                            label={row[0]['created_at'].replace(/['"]+/g, '')} 
                            onClick={(event)=>{this.selectPastSession(event, index)}} 
                            sx={{backgroundColor : (this.state.setIndex === index ? 'orange': null), '&&:hover' :{backgroundColor:'#7d6e6d'}}}
                        />
                    ))}
                    <Chip label="Current session" sx={{background:"#1976d2"}}/>
                    </Stack>
                </Box>
                <Box> 
                    <List component="nav" aria-labelledby="nested-list-subheader">
                        {this.props.session.scale.map((row, index)=>(
                            <Box key={index} sx={{display:'flex', flexDirection:"row", width: '100%', justifyContent:'space-around', borderBottom: 1}}>
                                 <FormControlLabel control={<Checkbox onChange={(event)=>{this.handleCheckbox(event, index)}} checked={current_session[index].select}/>}/> 
                                    <Box sx={{width:"15%", flex:1, display:"flex", flexDirection:"row", alignItems:'center'}}>
                                        <Typography variant='h6'>{row}</Typography>
                                        {current_session[index].help===true ? <PriorityHighIcon color="primary"/> : null}
                                    </Box>
                                    <Stack spacing={2} sx={{flex:1, marginTop:'0.25%', marginRight:"10%", marginLeft:"30%", paddingTop:"1%", paddingBottom:"1%"}}>
                                        <Box>
                                            <ProgressBarWithLabel value={(current_session[index].value/7)*100} label={current_session[index].value} color='#2196f3'/>
                                        </Box>
                                        {this.state.pastSession==="" ? null:  <Box><ProgressBarWithLabel value={(this.state.pastSession[index+2].value/7)*100} label={this.state.pastSession[index+2].value} color='#FFA500'/></Box>}
                                    </Stack>
                            </Box>
                        ))}
                    </List>
                </Box>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    current_session:state.SessionReducer.current_session,
    session:state.SessionReducer,
    clientinfo:state.ClientReducer.clientinfo
  })
  const mapDispatchToProps = {
      saveCurrentSession,
      getPastSession,
      selectDomain
  }
// export default connect(mapStateToProps, mapDispatchToProps)(Review);
export default connect(mapStateToProps, mapDispatchToProps)(Review);