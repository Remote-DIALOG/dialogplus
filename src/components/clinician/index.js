import React from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ADDClinet from './addClient';
import { connect } from "react-redux";
import {getClients} from '../../reducers/clinician';
import {getData} from '../../reducers/login';
import {setClientinfo} from '../../reducers/client';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AlertDialog from '../../utils/dialogbox';
import DyButton from '../../utils/button'
import FolderIcon from '@mui/icons-material/Folder';
class Clinicican extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            rows:[]
        }
        this.openAddClinet = this.openAddClinet.bind(this)
        this.handlenavigation = this.handlenavigation.bind(this)
        this.handleExit = this.handleExit.bind(this)
    }
    handlenavigation (row) {
        if (row.id!==undefined) {
            this.props.setClientinfo(row)
            this.props.nagivate('/client')
        }
    }
    componentDidMount() {
            let username = { 
                "username":this.props.userinfo.username
            }
            this.props.getClients(username)
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.clinetList.length===this.props.clinetList.length) {
            console.log("condition is trigerred for updating this client list------------>")
            return;
        }
        let username = { 
            "username":this.props.userinfo.username
        }
        this.props.getClients(username)
    }
    openAddClinet () {
        this.setState({open:!this.state.open})
    }
    handleExit () { 
        this.setState({openDialog:!this.state.openDialog})
    }
    render () {
        let props = {
            open:this.state.open,
            handleClose:this.openAddClinet
        }
        let form = <ADDClinet handles={props}/>
        return (
           <div>
               <Container maxWidth={false}>
                   
                <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                        <Box><DyButton  buttonText="Logout" onClick={this.handleExit} startIcon={<ArrowBackIosIcon/>}></DyButton></Box>
                        <Box><Typography variant='h2' fontSize={{lg:30, md:20, sm:20, xs:20}}  sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"10px"}}}>Clients</Typography></Box>
                        <Box><DyButton buttonText="New Client" onClick={this.openAddClinet}></DyButton></Box>
                    </Box>   
                <Box>
                    <Table size="medium" padding="none" sx={{"& .MuiTableRow-root:hover": {backgroundColor: "#86b1db"}}}>
                        <TableHead></TableHead>
                        <TableBody>
                            {this.props.clinetList.map((row) => (
                            <TableRow key={row.id} onClick={() => this.handlenavigation(row)} >
                                <TableCell sx={{width:50}}><FolderIcon/></TableCell>
                                <TableCell align='left'><Typography>{row.full_name}({row.username})</Typography></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Box>
                <AlertDialog open={this.state.openDialog} nagivate={this.props.nagivate} handleExit = {this.handleExit}/> 
            </Container>
            {form}
           </div>
        );
    }
}
const mapStateToProps = (state) => ({
    clinetList:state.clinicianReducer.clinetlist,
    userinfo:state.loginReducer.userinfo,
    notes:state.NotesReducer.notes,
})
const mapDispatchToProps = {
    getClients,
    getData,
    setClientinfo
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Clinicican);
