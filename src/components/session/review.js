import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from "@mui/material/List";
import { ListItemText } from '@mui/material';

import {saveCurrentSession,getPastSession} from '../../reducers/session'
import {connect} from 'react-redux';
import Result from './result';

class Review extends React.Component {
    constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this)
        this.setSession = this.setSession(this)
    }
    componentDidMount () {
        this.props.getPastSession({"clientid":this.props.clientinfo.clinetid})
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
                 <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                    <Box sx={{margin:2}}><Typography variant='h4'>{current_session[0].created_at}</Typography></Box>
                    <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleSelect}>
                        Discuss
                    </Button>
                </Box>
                <Box sx ={{marginTop:3, display:'flex', flexDirection:'row', justifyContent:'space-between', backgroundColor:"#202c2b17", }}>
                    <Stack direction="row" spacing={1}>   
                        <Chip label={this.props.current_session[0]['created_at']}/>
                          <Chip label={"Current Session"}/>
                        {this.props.session.past_session.map((row, index)=>(
                             <Chip label={row[0]['created_at']} onClick={this.setSession}/>
                        ))}
                    </Stack>
                </Box>
                <Box> 
                    <List component="nav" aria-labelledby="nested-list-subheader">
                        {this.props.session.scale.map((row, index)=>(
                            <Box key={index} sx={{display:'flex', flexDirection:"row", width: '100%', justifyContent:'space-around', borderBottom: 1}}>
                              <ListItemText primary={row} primaryTypographyProps={{'variant':'h6'}}/>
                              <Stack spacing={2} direction="column" sx={{marginTop:2, marginBottom:2}} alignItems="baseline">
                                <Result progress={(current_session[index].value/7)*100}/>
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
      getPastSession
  }
// export default connect(mapStateToProps, mapDispatchToProps)(Review);
export default connect(mapStateToProps, mapDispatchToProps)(Review);