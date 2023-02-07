import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from "@mui/material/List";
import { ListItemText } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {initiateSocketConnection, join_room, send_message, recive_message} from '../../reducers/socket';

import {saveCurrentSession,getPastSession, selectDomain} from '../../reducers/session'
import {connect} from 'react-redux';
import Result from './result';

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this)
        this.setSession = this.setSession(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }
    handleCheckbox (event, index) {
        const current_session = this.props.current_session.slice(2)
        this.props.selectDomain({name:current_session[index].name})
    }
    componentDidMount () {
        this.props.getPastSession({"clientid":this.props.clientinfo.clinetid})
    }
    componentDidUpdate (previousProps, previousState) {
        recive_message()
        if (JSON.stringify(previousProps.session.current_session)!==JSON.stringify(this.props.session.current_session)) {
          send_message({id:this.props.clientinfo.id, current_session:this.props.session.current_session}) 
          console.log("new props recvided", this.props.session.current_session)
        }
      }
    setSession(event) {
       console.log("chip is clicked")
    }
    handleSelect () {
        this.props.nagivate('/discuss')
    }
    render () {
        const current_session = this.props.current_session.slice(2)
        // console.log(current_session)
        return (
            <div>
                 <Container maxWidth={false}>
                 <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between', textAlign:'center'}}>
                    <Box sx={{margin:2}}><Typography variant='h4'>Current Session</Typography></Box>
                    <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleSelect}>
                        Discuss
                    </Button>
                </Box>
                <Box sx ={{marginTop:3, display:'flex', flexDirection:'row', justifyContent:'space-between', backgroundColor:"#202c2b17", }}>
                    <Stack direction="row" spacing={1}>   
                      
                        {this.props.session.past_session.map((row, index)=>(
                            <Chip label={row[0]['created_at']} onClick={this.setSession}/>
                        ))}
                    </Stack>
                </Box>
                <Box> 
                    <List component="nav" aria-labelledby="nested-list-subheader">
                        {this.props.session.scale.map((row, index)=>(
                            <Box key={index} sx={{display:'flex', flexDirection:"row", width: '100%', justifyContent:'space-around', borderBottom: 1}}>
                                 <FormControlLabel control={<Checkbox onChange={(event)=>{this.handleCheckbox(event, index)}} checked={current_session[index].select}/>}/> 
                                    <ListItemText primary={row} primaryTypographyProps={{'variant':'h6'}}/>
                                    <Stack spacing={2} direction="column" sx={{marginTop:2, marginBottom:2}} alignItems="baseline">
                                    <Box>
                                        {current_session[index].help ?  <Result progress={(current_session[index].value/7)*100} color={"secondary"}/> :<Result progress={(current_session[index].value/7)*100} color={"primary"}/>}
                                    </Box>
                                    <Result progress={0}/> 
                                 </Stack> 
                            </Box>
                        ))}
                    </List>
                </Box>
                </Container>
            </div>
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