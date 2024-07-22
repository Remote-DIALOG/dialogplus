import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {connect} from 'react-redux';
import {getNotes} from '../../reducers/notes';
import { addActionItems, saveCurrentSession } from '../../reducers/session';
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

// import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    wordWrap:"break-word"
  }));
class ActionItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            editable: false
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
        this.setState({editable:true})
    }
    handlFinish () {
        this.props.saveCurrentSession(this.props.current_session)
        this.props.nagivate('/client')
        disconnectSocket()

    }
    handleBackButton () {
        this.props.updateStage("discuss")
    }
    componentDidUpdate(previousProps, previousState) {
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
                      <Item key={index} elevation={3}>
                        <Box key={index} sx={{margin:"1%" , paddingTop:'1%'}} display="flex" flexDirection="row" justifyContent="space-between">
                            <Box>
                                {/* {this.state.editable ? <TextField id="outlined-required" defaultValue={items}/> :<Typography variant='h2' fontSize={{lg:22, md:18, sm:16, xs:16}}>{items}</Typography> } */}
                                <Typography variant='h2' fontSize={{lg:22, md:18, sm:16, xs:16}}>{items}</Typography>
                            </Box>
                            {/* <Box sx={{marginRight:"1%"}}>
                                <IconButton edge="end" aria-label="edit" onClick={(event) => {this.handleEdit(event, actionItemIndex, index)}}><EditIcon /></IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={(event) => {this.handleDelete(event, actionItemIndex, index)}}><DeleteIcon /></IconButton>
                            </Box> */}
                        </Box>
                              {/* <Typography variant='h2' fontSize={{lg:22, md:18, sm:16, xs:16}}>{items}</Typography>
                            </Box>
                              <Box display="flex" alignItem="left" width="100%">    
                               <IconButton edge="end" aria-label="edit"><EditIcon /></IconButton>
                                     <IconButton edge="end" aria-label="delete"><DeleteIcon /></IconButton>
                                </Box> */}
                          
                      </Item>
                    // <Item>
                    //     <List sx={{marginTop:"10px"}}>
                    //         <ListItem>
                    //             <ListItemText disableTypography>
                    //                 <Typography variant='h2' fontSize={{lg:22, md:18, sm:16, xs:16}}>{items}</Typography>
                    //             </ListItemText>
                    //             <Box display="flex" alignItem="center" width="100%">    
                    //                 <IconButton edge="end" aria-label="edit"><EditIcon /></IconButton>
                    //                 <IconButton edge="end" aria-label="delete"><DeleteIcon /></IconButton>
                    //             </Box>
                    //         </ListItem>
                    //     </List>
                    // </Item>
                    ))}
                    </>
            ))}
            {/* <Box sx={{marginTop:"1%", display:'flex', flexDirection:'column', alignItems:'left'}}> */}
            {/* <Box sx={{display:"flex", flexDirection: { xs: "column", md: "row"},ml:{md:"1%", xm:"5%"}, justifyContent:"space-evenly",fontFamily:"sans-serif", marginTop:"1%"}}> */}
              
               {/* {selectscale.map((row,index)=>(
                   <Box >{row.select === true ? (
                        <>
                            {row.actionitems.map((items) => (
                                 <List sx={{listStyleType: 'disc', listStylePosition: 'outside'}} >
                                 <ListItem sx={{ display: 'list-item'}}>
                                     <ListItemText disableTypography>
                                         <Typography variant='h2' fontSize={{lg:22, md:18, sm:16, xs:16}}>{items}</Typography>
                                     </ListItemText>
                                 </ListItem>
                             </List>
                            ))}
                        </>
                       ): null}
                   </Box>
               ))} */}
            {/* </Box> */}
            {/* </Box> */}
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
    addCurrentNotes, 
    updateStage
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionItems);