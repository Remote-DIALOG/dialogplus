import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {connect} from 'react-redux';
import {getNotes} from '../../reducers/notes';
import { addActionItems, saveCurrentSession, resetSession, deleteActionItem, editActionItem } from '../../reducers/session';
import { addCurrentNotes } from '../../reducers/notes';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { disconnectSocket } from '../../reducers/socket';
import DyButton from "../../utils/button";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {updateStage} from '../../reducers/session'
import TextField from '@mui/material/TextField';
import {send_message, recive_message} from '../../reducers/socket';

import DoneIcon from '@mui/icons-material/Done';
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
            actionItems:[],
            text:""
        }
        this.handlFinish        = this.handlFinish.bind(this);
        this.handleBackButton   = this.handleBackButton.bind(this);
        this.handleEdit         = this.handleEdit.bind(this);
        this.handleDelete       = this.handleDelete.bind(this);
        this.handleDone         = this.handleDone.bind(this);
        this.handleTextChange   = this.handleTextChange.bind(this)
    }

    handleDone(event, name, index){
        let updateItems;
        const newArray = this.state.actionItems.map((item)=>{
            if (item.name===name && item.actionItemIndex===index) {
                updateItems = item
                return {...item, editable:false}
            }
            return item
        })
        this.setState({actionItems:newArray})
        this.props.editActionItem(updateItems)
    }    
    handleDelete (event, name, index) {
        const newArray = this.state.actionItems
        let ind = -1
        console.log(name, index, this.state.actionItems)
        for (let i=0;i<this.state.actionItems.length;i++){
            if (this.state.actionItems[i].name===name && this.state.actionItems[i].actionItemIndex==index){
                ind = i
                break
            }
        }
        newArray.splice(ind, 1);
        this.setState({actionItems:newArray})
        this.props.deleteActionItem({name, index})
    }
    handleEdit (event, name, index) {
        const newArray = this.state.actionItems.map((item)=>{
            if (item.name===name && item.actionItemIndex===index) {
                return {...item, editable:true}
            }
            return item
        })
        this.setState({actionItems:newArray})
        
    }
    handleTextChange(event,name, index) {
        const newArray = this.state.actionItems.map((items)=>{
            if (items.name===name && items.actionItemIndex===index) {
                return {...items, item:event.target.value}
            }
            return items
        })
        this.setState({actionItems:newArray})
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
        let selectscale = this.props.session.current_session.filter(name => name.select===true)
        let actionItems = []
        for (let i=0; i<selectscale.length;i++) {
            for (let j=0;j<selectscale[i].actionitems.length;j++){
                let temp = {
                    "item":selectscale[i].actionitems[j],
                    "name":selectscale[i].name,
                    "actionItemIndex":j,
                    "editable":false
                }
              
                actionItems.push(temp)
            }
        }
        this.setState({actionItems:actionItems})
    }
    componentDidUpdate(previousProps, previousState) { 
        recive_message()
        if (JSON.stringify(previousProps.session.current_session)!==JSON.stringify(this.props.session.current_session)) {
          send_message({id:this.props.clientinfo.id, current_session:this.props.session.current_session})
          let selectscale = this.props.current_session.filter(name => name.select===true)
          let actionItems = []
          for (let i=0; i<selectscale.length;i++) {
              for (let j=0;j<selectscale[i].actionitems.length;j++){
                  let temp = {
                      "item":selectscale[i].actionitems[j],
                      "name":selectscale[i].name,
                      "actionItemIndex":j,
                      "editable":false
                  }
                
                  actionItems.push(temp)
              }
          }
          this.setState({actionItems:actionItems})
        }
        
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
        return (
          
            <Container maxWidth={false}>
            <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box><DyButton buttonText="Back" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}/></Box>
                <Box><Typography variant='h2' fontSize={{lg:30, md:20, sm:20, xs:20}}  sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"10px"}}}>Review current action items</Typography></Box>
                <Box><DyButton buttonText="Finish" onClick={this.handlFinish} endIcon={<ArrowForwardIosIcon/>}/></Box>
          </Box>
          {this.state.actionItems.map((items, index)=>(
              <>
              {items.editable ? (
                   <Item key={index} elevation={3}>
                  <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: 2,marginBottom: 2}}>
                  <TextField  fullWidth={true} defaultValue={items.item} onChange={(event)=>this.handleTextChange(event, items.name, items.actionItemIndex )}/>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton aria-label="dones" onClick={(event)=>this.handleDone(event, items.name, items.actionItemIndex)}><DoneIcon /></IconButton>
                      <IconButton aria-label="delete" onClick={(event)=>this.handleDelete(event,  items.name, items.actionItemIndex)}><DeleteIcon /></IconButton>
                  </Box>
              </Box>
              </Item>
              ): (
                    <Item key={index} elevation={3}>
                    <Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: 2,marginBottom: 2}}>
                    <Typography variant="h2" fontSize={{lg:28, md:26, sm:18, xs:18}} sx={{ flexGrow: 1 }}>{items.item}</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton aria-label="edit" onClick={(event)=>this.handleEdit(event, items.name, items.actionItemIndex )}><EditIcon /></IconButton>
                            <IconButton aria-label="delete" onClick={(event)=>this.handleDelete(event, items.name, items.actionItemIndex)}><DeleteIcon /></IconButton>
                        </Box>
                    </Box>
                 </Item>
              )}
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
    clientinfo:state.ClientReducer.clientinfo,
    session:state.SessionReducer
})
const mapDispatchToProps = {
    getNotes,
    saveCurrentSession,
    addCurrentNotes, 
    updateStage,
    resetSession,
    deleteActionItem, 
    editActionItem
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionItems);