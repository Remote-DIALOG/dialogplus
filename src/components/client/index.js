import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import DyButton from '../../utils/button'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {connect} from 'react-redux';
import {setActionItems} from '../../reducers/client';
import {getSessionDates} from '../../reducers/client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonIcon from '@mui/icons-material/Person';
import AlertDialog from '../../utils/dialogbox';
import { CircularProgress } from '@mui/material';
import {initiateSocketConnection, join_room} from '../../reducers/socket';
import {getNotes, setDate} from '../../reducers/notes';
import {updateStage} from '../../reducers/session';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

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
        initiateSocketConnection(this.props.userinfo.token)
        join_room(clientid) 
        // if (this.props.userinfo.category === 'clinician') {
        //     initiateSocketConnection(this.props.userinfo.token)
        //     join_room(clientid) 
        // }
    }
    handleClick (id) {
        this.props.setDate(this.props.client.dates[id].date.replace(/['"]+/g, ''))
        this.props.nagivate('/items')
    }
    handleSession() {
        if (this.props.client.dates.length ===0) {
            this.props.nagivate('/session')
            this.props.updateStage('assessment')
            return;
        }
        this.props.nagivate('/session')
        this.props.updateStage('summary')
        // this.props.nagivate('/summary')
    }
    handleExit () { 
        if (this.props.userinfo.category === 'clinician') {
            this.props.nagivate('/clinician')
            return;
        }
        this.setState({openDialog:!this.state.openDialog})
    }
    render() {
        return(
        <Container maxWidth={false}>
            { this.props.client.isLoading? <CircularProgress sx={{marginTop:'10%', marginLeft:'50%'}}/> : 
                <div>
                   <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                        {
                        this.props.userinfo.category === 'clinician' ? 
                        (<Box><DyButton buttonText="Back" onClick={this.handleExit} startIcon={<ArrowBackIosIcon/>}/></Box>): 
                        (
                            <Box>
                                <Button 
                                    type="submit" 
                                    variant="outlined"  
                                    onClick={this.handleExit} 
                                    startIcon={<Box sx={{marginTop:'10px', marginBottom:"0px", ml:"0px"}}><ArrowBackIosIcon/></Box>}
                                    sx={{fontSize:{xs:'10px', md:'14px'}}}
                                >
                                    logout
                                </Button>
                            </Box>
                            )
                        }
                        <Box sx={{paddingTop:{xs:"5%", md:'0px'}}}>
                        <Typography variant='h2' fontSize={{lg:30, md:20, sm:20, xs:20}}  sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"5px"}}}>{this.props.client.clientinfo.full_name}</Typography>
                            {/* <Typography variant='h4'fontSize={{lg:30, md:20, sm:18, xs:18}} sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"5px"}}}>{this.props.client.clientinfo.full_name}</Typography> */}
                        </Box>
                        <Box><DyButton buttonText="New Session"onClick={this.handleSession} endIcon={<ArrowForwardIosIcon/>}/></Box>
                    </Box>   
            <Box>
            <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant='h2' fontSize={{lg:28, md:26, sm:18, xs:18}}   sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"10px"}}}>List of sessions with you</Typography>
                {/* <Typography variant='h6'>List of sessions with you</Typography> */}
            </Box>
            {this.props.client.dates.length === 0 ? <Typography sx={{textAlign:'center'}}>No Session Yet</Typography>: 
                <Table size="medium" padding='none' sx={{"& .MuiTableRow-root:hover": {backgroundColor: "#86b1db"}}}>
                <TableHead></TableHead>
                <TableBody>
                {this.props.client.dates.map((row, key) => (
                     <TableRow key={key} onClick = {()=>(this.handleClick(key))}>
                         <TableCell style={{width: 50}}>
                         {row.clinicianId != null ? <PeopleAltIcon/>: <PersonIcon/>}
                        </TableCell>
                         <TableCell align='left' style={{fontFamily:'sans-serif'}}>
                             <Typography>{row.date.replace(/['"]+/g, '')}</Typography>
                        </TableCell>
                     </TableRow>
                 ))}
                 </TableBody>
             </Table>
            }
            </Box>
        {!this.props.userinfo.category === 'client' ? ( <Box sx={{justifyContent:'flex-start'}}>
             <Button type="submit" variant="outlined" sx={{mt:2, pr:4, mr:2}} onClick={this.handleExit} startIcon={<Box sx={{marginTop:1}}><ArrowBackIosIcon/><ArrowBackIosIcon/></Box>}>
                logout
             </Button> 
         </Box>): null}
        
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
})
const mapDispatchToProps = {
    setActionItems,
    getSessionDates,
    getNotes,
    setDate,
    updateStage
}
export default connect(mapStateToProps, mapDispatchToProps)(Client);
