import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DyButton from '../../utils/button';
import {connect} from 'react-redux';
import {getNotes, clearsummary} from '../../reducers/notes';
import Paper from '@mui/material/Paper';
import {getSummary, getFullSummary} from '../../reducers/notes'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/material/styles';
import { disconnectSocket } from '../../reducers/socket';
import Stack from '@mui/material/Stack';
import { updateStage } from '../../reducers/session';
import {initiateSocketConnection, join_room} from '../../reducers/socket';
import { CircularProgress } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    wordWrap:"break-word"
  }));
class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleBackButton = this.handleBackButton.bind(this);
    }
    handleBackButton() {
        this.props.nagivate('/client')
        disconnectSocket()
    }
    componentWillMount () {
        console.log("")
        let clientId = this.props.client.clientinfo.id;
        // this.props.getSummary({clientId,timestampe})
        this.props.getFullSummary({clientId})

        let clientid = this.props.client.clientinfo.id
        initiateSocketConnection(this.props.userinfo.token)
        join_room(clientid)
    }
    componentWillUnmount (){
        this.props.clearsummary()
    }    
    render () {
        return (
            <Container maxWidth={false}>
                { this.props.isLoading? <CircularProgress sx={{marginTop:'10%', marginLeft:'50%'}}/> : (<div>
                 <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                        <Box><DyButton buttonText="Back" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}/></Box>
                        <Box>
                        <Typography variant='h2' fontSize={{lg:30, md:20, sm:20, xs:20}} sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"10px"}}}>Previous action items</Typography>
                        </Box>
                        <Box><DyButton buttonText="Next" onClick={()=>this.props.updateStage('assessment')} endIcon={<><ArrowForwardIosIcon/></> }/></Box>
                    </Box>
            <Box>
            <List style={{ display: 'flex', flexDirection: 'column', padding: 0, }}>
                {this.props.summary.map((row,index)=>(
                    <Box key={index}>
                        <Item key={index} elevation={3}>
                        <Box key={index} sx={{marginTop:"1%" , paddingTop:'1%'}}>
                            <Typography variant="h2" fontSize={{lg:28, md:26, sm:18, xs:18}}>{row[0].created_at}</Typography></Box>
                            {row[1].actionitem.length >0 ? (
                                <Box>
                                    {row[1].actionitem.map((items)=>(
                                        <List  component={Stack} sx={{listStyleType: 'disc', listStylePosition: 'outside'}} ml={{md:"3%", xs:"9%"}}>
                                            <ListItem sx={{ display: 'list-item'}}>
                                                <ListItemText disableTypography>
                                                    <Typography  variant='h2' fontSize={{lg:22, md:18, sm:16, xs:16}}>{items}</Typography>
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) :
                                <List  component={Stack} sx={{listStyleType: 'disc', listStylePosition: 'outside'}} ml={{md:"2%", xs:"2%"}}>
                                    <ListItem sx={{ display: 'list-item'}}>
                                    <ListItemText disableTypography>
                                                <Typography  variant='h2' fontSize={{lg:22, md:18, sm:16, xs:16}}>No action items</Typography>
                                            </ListItemText>
                                    </ListItem>
                                </List>
                            }

                        </Item>
                    </Box>
                ))}
            </List>
            </Box>
            <Box><br/><br/></Box>
            </div>)}
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    notes:state.NotesReducer.pastnotes,
    summary:state.NotesReducer.summary,
    userinfo:state.loginReducer.userinfo,
    sessiontime:state.NotesReducer.currentDate,
    client:state.ClientReducer,
    current_session:state.SessionReducer.current_session,
    isLoading:state.NotesReducer.isLoading
})
const mapDispatchToProps = {
    getNotes,
    getSummary,
    clearsummary,
    updateStage,
    getFullSummary,

}
export default connect(mapStateToProps, mapDispatchToProps)(Summary);