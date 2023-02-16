import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {connect} from 'react-redux';
import Paper from '@mui/material/Paper';
import FormDialog from './addnotes';
import {styled} from '@mui/material/styles';
import {getNotes} from '../../reducers/notes';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../session/tabpannel';
import { saveCurrentSession } from '../../reducers/session';
import { sendNotes, reciveNotes} from '../../reducers/socket';
import { addCurrentNotes } from '../../reducers/notes';
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
    lineHeight: '60px',
    padding:'25px'
  }));
class ActionItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index:0,
        }
        this.handlFinish = this.handlFinish.bind(this)
    }
    handlFinish () {
        this.props.saveCurrentSession(this.props.current_session)
        this.props.nagivate('/client')
    }
    componentDidUpdate(previousProps, previousState) {
        console.log("new notes is getting props")
        reciveNotes()
        console.log(previousProps.notes)
        console.log(this.props.notes)
        if (previousProps.notes.length!=this.props.notes.length) {
            sendNotes({id:this.props.clientinfo.id, currentnotes:this.props.notes})
        }
        reciveNotes()

    }
    render () {
        let selectscale = this.props.current_session.filter(name => name.select===true)
        return (
            <Container maxWidth={false}>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}}>
                <Typography variant='h4'>Current action items</Typography>
                <Button variant="contained" onClick={this.handlFinish}>Finish</Button>
            </Box>
            <Box sx={{marginTop:10, display:'flex', flexDirection:'column', alignItems:'left'}}>
            <Tabs value={this.state.index} onChange={(_, index) => this.setState({index})} scrollButtons={false} indicatorColor="primary" textColor="inherit" variant="scrollable" scrollButtons allowScrollButtonsMobile>
                {selectscale.map((data, index)=>(<Tab label={data.name} key={index}/>))}
            </Tabs>
            {selectscale.map((data, index) => (
                <TabPanel value={this.state.index} index={index}>
                   <ol type='1'>
                                {data.actionitems.map((text, idx)=>(
                                    <li><Typography>{text}</Typography></li>
                                ))}
                            </ol>
                </TabPanel>
            ))}
            </Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <FormDialog addCurrentNotes={this.props.addCurrentNotes} sessiontime={this.props.current_session[0].created_at.replace(/['"]+/g, '')}/>
            </Box>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column'}}>
                {this.props.notes.map((value, idx) => (
                    <Box sx={{width:'100%', justifyContent:'flex-end', padding:'10px'}} key={idx}>
                        <Item elevation={1} key={idx}>
                            <Typography variant='h6'>{value.created_at}</Typography>
                            <Typography variant='body'>{value.message}</Typography>
                        </Item>
                    </Box>
                ))}
            </Box>   
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    notes:state.NotesReducer.currentnotes,
    userinfo:state.loginReducer.userinfo,
    current_session:state.SessionReducer.current_session,
    clientinfo:state.ClientReducer.clientinfo
})
const mapDispatchToProps = {
    getNotes,
    saveCurrentSession,
    addCurrentNotes
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionItems);