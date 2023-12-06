import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {connect} from 'react-redux';
import {getNotes} from '../../reducers/notes';
import { saveCurrentSession } from '../../reducers/session';
import { sendNotes, reciveNotes} from '../../reducers/socket';
import { addCurrentNotes } from '../../reducers/notes';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { disconnectSocket } from '../../reducers/socket';

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
        disconnectSocket()

    }
    componentDidUpdate(previousProps, previousState) {
        reciveNotes()
        console.log(previousProps.notes)
        console.log(this.props.notes)
        if (previousProps.notes.length!==this.props.notes.length) {
            console.log("sending notes")
            sendNotes({id:this.props.clientinfo.id, notes:this.props.notes})
        }
        reciveNotes()

    }
    render () {
        let selectscale = this.props.current_session.filter(name => name.select===true)
        return (
            <Container maxWidth={false}>
            {/* <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}}>
                <Typography variant='h4'>Current action items</Typography>
                <Button variant="contained" onClick={this.handlFinish}>Finish</Button>
            </Box> */}
            <Box sx={{marginTop: 8,marginBottom: 3, display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box><Typography variant='h2'>Current action items</Typography></Box>
                <Box><Button  variant="contained" onClick={this.handlFinish} endIcon={<ArrowForwardIosIcon/>}>Next</Button></Box>
          </Box>
            <Box sx={{marginTop:10, display:'flex', flexDirection:'column', alignItems:'left'}}>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", fontFamily:"sans-serif"}}>
               {selectscale.map((row,index)=>(
                   
                   <Box >{row.actionitems.length >0 ? (
                        <Box>
                            <Typography variant="h5">{row.name}</Typography>
                            {row.actionitems.map((items) => (
                                <ul>
                                    <li>{items}</li>
                                </ul>
                            ))}
                        </Box>
                       ): null}
                   </Box>
               ))}
            </Box>
            </Box>
            {/* <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <FormDialog sessiontime={this.props.current_session[0].created_at.replace(/['"]+/g, '')}/>
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
            </Box>    */}
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    notes:state.NotesReducer.notes,
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