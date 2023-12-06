import React from 'react';
import {connect} from 'react-redux';
import Typography from '@mui/material/Typography';
import {getSummary, clearsummary, clearnotes, getNotes} from '../../reducers/notes';
import Box from '@mui/material/Box';
import FormDialog  from './addnotes';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DyButton from '../../utils/button';
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
    lineHeight: '60px',
    padding:'25px'
  }));
class Items extends React.Component {
    constructor(props) {
        super(props)
        this.handleSession = this.handleSession.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    handleBackButton() {
        this.props.nagivate('/client')
    }
    componentDidMount() {
        let timestampe = this.props.notes.currentDate;
        let clientId = this.props.client.clientinfo.id;
        this.props.getSummary({clientId, timestampe});
        this.props.getNotes({clientId, timestampe});
    }
    componentWillUnmount (){
        this.props.clearsummary()
        this.props.clearnotes()
    } 
    handleSession() {
        this.props.nagivate('/session')
    }
    render () {
        let summary = this.props.notes.summary.slice(2)
        return (
               <Container maxWidth={false}>
                <Box sx={{marginTop: '1%',marginBottom: '3%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                   <Box>
                        <DyButton buttonText="Back" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}/></Box>
                        <Box><Typography variant='h4' fontSize={{lg:30, md:20, sm:20, xs:20}}>{this.props.notes.currentDate}</Typography></Box>
                        <Box><DyButton buttonText="New Session" onClick={this.handleSession} endIcon={<ArrowForwardIosIcon/>}/></Box>
               </Box>
               
              <Box sx={{display:"flex", flexDirection:"row", marginLeft: "25%", justifyContent:"space-evenly",fontFamily:"sans-serif", marginTop:"1%"}}>
               {summary.map((row,index)=>(
                   <Box>{row.actionitems.length >0 ? (
                        <Box sx={{}}>
                            <Typography variant="h5" fontSize={{lg:30, md:20, sm:20, xs:20}}>{row.name}</Typography>
                            {row.actionitems.map((items) => (
                                <ul>
                                    <li>{items}</li>
                                </ul>
                            ))}
                        </Box>
                       ): null}
                   </Box>
               ))}
            </Box>
           
          <Divider/>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:"3%"}}>
                <FormDialog sessiontime={this.props.notes.currentDate}/>
            </Box>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column'}}>
                {this.props.notes.notes.map((value, idx) => (
                    <Box sx={{width:'100%', justifyContent:'flex-end', padding:'10px'}} key={idx}>
                        <Item elevation={1} key={idx}>
                            <Typography variant='h6' fontSize={{lg:30, md:20, sm:20, xs:20}}>{value.created_at}</Typography>
                            <Typography variant='body' fontSize={{lg:30, md:20, sm:20, xs:20}}>{value.message}</Typography>
                        </Item>
                    </Box>
                ))}
            </Box> 
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    client:state.ClientReducer,
    notes:state.NotesReducer,
})
const mapDispatchToProps = {
    getSummary,
    clearsummary,
    clearnotes,
    getNotes
}
export default connect(mapStateToProps, mapDispatchToProps)(Items)
