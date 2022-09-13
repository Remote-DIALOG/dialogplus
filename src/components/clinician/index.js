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
// Generate Order Data
function createData(id, name) {
    return { id, name};
  }
  
  const rows = [
    createData(0,'Elvis Presley',),
    createData(1,'Paul McCartney',),
    createData(2, 'Tom Scholz'),
    createData(3,'Michael Jackson'),
    createData(4,'Bruce Springsteen'),
  ];
  
class Clinicican extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            rows:[]
        }
        this.openAddClinet = this.openAddClinet.bind(this)
    }
    componentDidMount() {
        let username = {username:"suyog@gmail.com"}
        console.log("clicinican did mount")
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
                    <Table size="medium" padding="none">
                        <TableHead></TableHead>
                        <TableBody>
                            {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{padding:"0px"}}><PersonIcon/></TableCell>
                                <TableCell>{row.name}</TableCell>
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
    userinfo:state.clinicianReducer.clinetlist
})
const mapDispatchToProps = {
    getClients

}
export default connect(mapStateToProps, mapDispatchToProps)(Clinicican);
