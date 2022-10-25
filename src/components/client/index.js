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
class Client extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleSession = this.handleSession.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick (id) {
        console.log(id)
        this.props.nagivate('/action')

    }
    handleSession() {
        console.log("session")
        this.props.nagivate('/session');
    }
    componentDidMount () {
        // this.props.getSessionDates()
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
                     {this.props.date.map((row) => (
                     <TableRow key={row.id}>
                         <TableCell style={{width: 50}}><ContentPasteIcon/></TableCell>
                         <TableCell align='left' style={{width: 200}}>{row.name}</TableCell>
                         <TableCell><div onClick = {()=>this.handleClick(row.id)}><EditIcon/></div></TableCell>
                     </TableRow>
                 ))}
                 </TableBody>
             </Table>
         </Box>
         <Box sx={{justifyContent:'flex-start'}}>
             <Button type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>this.props.nagivate('/')}
              startIcon={<div><ArrowBackIosIcon/><ArrowBackIosIcon/></div>}
              >
                 Exit
             </Button>
         </Box>
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
    getSessionDates
}
export default connect(mapStateToProps, mapDispatchToProps)(Client);
