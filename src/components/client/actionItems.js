import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {connect} from 'react-redux';
import {getNotes} from '../../reducers/notes';
import { addActionItems, saveCurrentSession, resetSession } from '../../reducers/session';
import { addCurrentNotes } from '../../reducers/notes';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { disconnectSocket } from '../../reducers/socket';
import DyButton from "../../utils/button";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import {updateStage} from '../../reducers/session'
import TextField from '@mui/material/TextField';

import DoneIcon from '@mui/icons-material/Done';
// import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    wordWrap:"break-word"
  }));
class ActionItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            editable:[]
        }
        this.handlFinish        = this.handlFinish.bind(this);
        this.handleBackButton   = this.handleBackButton.bind(this);
        this.handleEdit         = this.handleEdit.bind(this);
        this.handleDelete       = this.handleDelete.bind(this);
    }
    handleDelete (event, actionItemIndex, index) {
        let selectscale = this.props.current_session.filter(name => name.select===true)
        let scale = selectscale[index]

        console.log(actionItemIndex, index)
    }
    handleEdit (event, actionItemIndex, index) {
        console.log(actionItemIndex, index)
        // const newArray = this.state.editable.map((index) => [...index]);
        // newArray[index][actionItemIndex] = true
        // this.setState({editable:newArray})
    }
    handlFinish () {
        this.props.saveCurrentSession(this.props.current_session)
        this.props.nagivate('/client')
        disconnectSocket()
        this.props.resetSession()
    }
    handleBackButton () {
        let selectscale = this.props.current_session.filter(name => name.select===true)
        if (selectscale.length === 3) {
            this.props.updateStage("discuss3");
            return;
        }
        if (selectscale.length === 2) {
            this.props.updateStage("discuss2");
            return;
        }
        this.props.updateStage("discuss")
    }
    componentDidMount () {
        let selectscale = this.props.current_session.filter(name => name.select===true)
        let editable = []
        for (let i=0; i<selectscale.length;i++) {
            editable[i] = []
            for (let j=0;j<selectscale[i].actionitems.length;j++){
                
                editable[i][j] = false
            }
        }
        this.setState({editable:editable})
    }
    componentDidUpdate(previousProps, previousState) {
        // console.log("----", this.state.editable)
        // reciveNotes()
        // console.log(previousProps.notes)
        // console.log(this.props.notes)
        // if (previousProps.notes.length!==this.props.notes.length) {
        //     sendNotes({id:this.props.clientinfo.id, notes:this.props.notes})
        // }
        // reciveNotes()

    }
    render () {
        let selectscale = this.props.current_session.filter(name => name.select===true)
       
        return (
            <Container maxWidth={false}>
            <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box><DyButton buttonText="Back" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}/></Box>
                <Box><Typography variant='h2' fontSize={{lg:30, md:20, sm:20, xs:20}}  sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"10px"}}}>Review current action items</Typography></Box>
                <Box><DyButton buttonText="Finish" onClick={this.handlFinish} endIcon={<ArrowForwardIosIcon/>}/></Box>
          </Box>
          {selectscale.map( (row, index) => (
            <>
                {row.actionitems.map( (items, actionItemIndex) => (
                   
                      <Item key={actionItemIndex} elevation={3}>
                           
                           
                           <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: 2,marginBottom: 2}}>
                               {console.log(this.state.editable[index]) }
                            <Typography variant="h2" fontSize={{lg:28, md:26, sm:18, xs:18}} sx={{ flexGrow: 1 }}>{items}</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton aria-label="edit" onClick={(event)=>this.handleEdit(event, actionItemIndex, index )}><EditIcon /></IconButton>
                                    <IconButton aria-label="delete" onClick={(event)=>this.handleDelete(event, actionItemIndex, index)}><DeleteIcon /></IconButton>
                                </Box>
                            </Box>
                          {/* {!this.state.editable[index][actionItemIndex] ? (
                          <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: 2,marginBottom: 2}}>
                            <Typography variant="h2" fontSize={{lg:28, md:26, sm:18, xs:18}} sx={{ flexGrow: 1 }}>{items}</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton aria-label="edit" onClick={(event)=>this.handleEdit(event, actionItemIndex, index )}><EditIcon /></IconButton>
                                    <IconButton aria-label="delete" onClick={(event)=>this.handleDelete(event, actionItemIndex, index)}><DeleteIcon /></IconButton>
                                </Box>
                            </Box>)
                            : (
                            <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: 2,marginBottom: 2}}>
                                <TextField  label="Outlined"   defaultValue={items}/>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton aria-label="edit" onClick={(event)=>this.handleEdit(event, actionItemIndex, index )}><DoneIcon /></IconButton>
                                    <IconButton aria-label="delete" onClick={(event)=>this.handleDelete(event, actionItemIndex, index)}><DeleteIcon /></IconButton>
                                </Box>
                            </Box>
                            )    
                        } */}
                        
                          
                      </Item>
                    ))}
                    </>
            ))}
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
    addCurrentNotes, 
    updateStage,
    resetSession
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionItems);