import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import EditIcon from '@mui/icons-material/Edit';
import {connect} from 'react-redux';
import {setActionItems} from '../../reducers/client';
import {getSessionDates} from '../../reducers/client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AlertDialog from '../../utils/dialogbox';
import { CircularProgress } from '@mui/material';
import {initiateSocketConnection, join_room} from '../../reducers/socket';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {getNotes} from '../../reducers/actionitems';


class Client extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openDialog:false
        }
        this.handleSession = this.handleSession.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }
    componentDidMount () {
        let clientid = this.props.client.clientinfo.id
        this.props.getSessionDates({"clientid":clientid})
        this.props.getNotes({"emailid":this.props.userinfo.emailid})
        if (this.props.userinfo.category=='clinician') {
            initiateSocketConnection(this.props.userinfo.token)
            join_room(clientid)
        }
    }
    handleClick (id) {
        console.log(id)
        this.props.nagivate('/action')
    }
    handleSession() {
        this.props.nagivate('/previousactionitem')
    }
    handleExit () { 
        this.setState({openDialog:!this.state.openDialog})
    }
    render() {
        return(
        <Container maxWidth={false}>
            { this.props.client.isLoading? <CircularProgress sx={{marginTop:'10%', marginLeft:'50%'}}/> : 
                <div>
                <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box><Typography variant='h4'>{this.props.client.clientinfo.fullname}</Typography></Box>
                <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleSession} endIcon={<ArrowForwardIosIcon/>}>New Session</Button>
            </Box>
            <Box>
            {this.props.client.dates.length==0 ? <Typography sx={{textAlign:'center'}}>No Session Yet</Typography>: 
                <Table size="medium" padding='none'>
                <TableHead></TableHead>
                <TableBody>
                {this.props.client.dates.map((row, key) => (
                     <TableRow key={key}>
                         <TableCell style={{width: 50}}><ContentPasteIcon/></TableCell>
                         <TableCell align='left' style={{width:300, fontFamily:'sans-serif'}}><Typography>{row.replace(/['"]+/g, '')}</Typography></TableCell>
                         <TableCell><div onClick = {()=>this.handleClick(key)}><EditIcon/></div></TableCell>
                     </TableRow>
                 ))}
                 </TableBody>
             </Table>
            }
            </Box>
         <Box sx={{justifyContent:'flex-start'}}>
             <Button type="submit"
              variant="outlined"
              sx={{mt:2, pr:2, mr:3}}
              onClick={this.handleExit}
              startIcon={<Box sx={{marginTop:1}}><ArrowBackIosIcon/><ArrowBackIosIcon/></Box>}
              >
                 Exit
             </Button>
         </Box>
         <AlertDialog open={this.state.openDialog} nagivate={this.props.nagivate} handleExit = {this.handleExit}/> 
         </div>
        }
     </Container>
        );
    }

}
const mapStateToProps = (state) => ({
    client:state.ClientReducer,
    userinfo:state.loginReducer.userinfo,
    notes:state.ActionItemsReducer.notes,
  })
const mapDispatchToProps = {
    setActionItems,
    getSessionDates,
    getNotes
}
export default connect(mapStateToProps, mapDispatchToProps)(Client);
