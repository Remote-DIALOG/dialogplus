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
        // let clientid = this.props.clientinfo.clinetid
        let clientid = 12
        this.props.getSessionDates({"clientid":clientid})
    }
    handleClick (id) {
        console.log(id)
        this.props.nagivate('/action')
    }
    handleSession() {
        console.log("session")
        this.props.nagivate('/session');
    }
    handleExit () {
        this.setState({openDialog:!this.state.openDialog})
    }
    render() {
        return(
        <Container maxWidth={false}>
                <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box><Typography variant='h4'>{this.props.clientinfo.fullname}</Typography></Box>
                <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleSession} endIcon={<ArrowForwardIosIcon/>}>New Session</Button>
            </Box>
            <Box>
             <Table size="medium" padding='none'>
                 <TableHead></TableHead>
                 <TableBody>
                     {this.props.date.map((row, key) => (
                     <TableRow key={key}>
                         <TableCell style={{width: 50}}><ContentPasteIcon/></TableCell>
                         <TableCell align='left' style={{width: 200}}>{row}</TableCell>
                         <TableCell><div onClick = {()=>this.handleClick(key)}><EditIcon/></div></TableCell>
                     </TableRow>
                 ))}
                 </TableBody>
             </Table>
         </Box>
         <Box sx={{justifyContent:'flex-start'}}>
             <Button type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={this.handleExit}
              startIcon={<div><ArrowBackIosIcon/><ArrowBackIosIcon/></div>}
              >
                 Exit
             </Button>
         </Box>
         <AlertDialog open={this.state.openDialog} nagivate={this.props.nagivate} handleExit = {this.handleExit}/>
     </Container>
        );
    }

}
const mapStateToProps = (state) => ({
    clientinfo:state.ClientReducer.clientinfo,
    date:state.ClientReducer.dates
  })
const mapDispatchToProps = {
    setActionItems,
    getSessionDates,
}
export default connect(mapStateToProps, mapDispatchToProps)(Client);
