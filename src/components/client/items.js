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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DyButton from '../../utils/button';
import { CircularProgress } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';


const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
    lineHeight: '60px',
    padding:'25px',
    wordWrap:"break-word"
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
        console.log("will mount")
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
        let summary = this.props.notes.sessionsummary.slice(0,-2)
        summary  = summary.reverse()
        return (
               <Container maxWidth={false}>
                   { this.props.client.isLoading? <CircularProgress sx={{marginTop:'10%', marginLeft:'50%'}}/> : (<>
                    <Box sx={{marginTop: '1%',marginBottom: '3%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                        <Box><DyButton buttonText="Back" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}/></Box>
                        <Typography variant='h2' fontSize={{lg:30, md:20, sm:20, xs:20}} sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"5px"}}}>{this.props.notes.currentDate}</Typography>

                        <Box><DyButton buttonText="New Session" onClick={this.handleSession} endIcon={<ArrowForwardIosIcon/>}/></Box>
                    </Box>
                    <Item>
                    {summary.map((row,  index) => (
                        <>
                         {row.actionitems.length > 0 ? (
                            <>
                                {row.actionitems.map((items, i) => (
                                     <List sx={{listStyleType: 'disc', listStylePosition: 'outside'}}  ml={{md:"3%", xs:"3%"}}>
                                        <ListItem sx={{ display: 'list-item'}}>
                                            <ListItemText disableTypography>
                                                <Typography variant='h2' fontSize={{lg:22, md:18, sm:16, xs:16}}>{items}</Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                ))}
                            </>
                            ):  null}
                        </>
                    ))} 
                     </Item>
                <Divider/>  
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:"3%"}}>
                    <FormDialog sessiontime={this.props.notes.currentDate}/>
                </Box>
                <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column'}}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography variant='h2' fontSize={{lg:28, md:26, sm:18, xs:18}} sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"10px"}}}>Notes section</Typography>
                    </Box>
                        {this.props.notes.notes.map((value, idx) => (
                            <Box sx={{width:'100%', justifyContent:'flex-end', padding:'10px'}} key={idx}>
                                <Item elevation={1} key={idx}>
                                    <Typography fontSize={{lg:20, md:18, sm:18, xs:18}}>{value.created_at}</Typography>
                                    <Typography fontSize={{lg:16, md:16, sm:16, xs:16}}>{value.message}</Typography>
                                </Item>
                            </Box>
                        ))}
                    </Box> 
                </>)}
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
