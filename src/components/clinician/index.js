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
import PersonIcon from '@mui/icons-material/Person';
import ADDClinet from './addClient';
import { connect } from "react-redux";
import {getClients} from '../../reducers/clinician';
import {getData} from '../../reducers/login';
import {setClientinfo} from '../../reducers/client';
import Paper from "@mui/material/Paper";
import FormDialog from '../client/addnotes';
import {styled} from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
    lineHeight: '60px',
    padding:'25px'
  }));
class Clinicican extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            rows:[]
        }
        this.openAddClinet = this.openAddClinet.bind(this)
        this.handlenavigation = this.handlenavigation.bind(this)
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
    openAddClinet () {
        this.setState({open:!this.state.open})
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
                   <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                    <Box sx={{margin:2}}><Typography variant='h4'>Clients</Typography></Box>
                    <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.openAddClinet}>New Client</Button>
                </Box>
                <Box>
                    <Table size="medium" padding="none" sx={{"& .MuiTableRow-root:hover": {backgroundColor: "#86b1db"}}}>
                        <TableHead></TableHead>
                        <TableBody>
                            {this.props.clinetList.map((row) => (
                            <TableRow key={row.id} onClick={this.handlenavigation} >
                                <TableCell sx={{width:100}}><PersonIcon/></TableCell>
                                <TableCell onClick={() => this.handlenavigation(row)} align='left'><Typography>{row.full_name}({row.username})</Typography></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Box>
            </Container>
            {form}
           </div>
        );
    }
}
const mapStateToProps = (state) => ({
    clinetList:state.clinicianReducer.clinetlist,
    userinfo:state.loginReducer.userinfo,
    notes:state.ActionItemsReducer.notes,
})
const mapDispatchToProps = {
    getClients,
    getData,
    setClientinfo
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Clinicican);
