import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DyButton from '../../utils/button';
import {connect} from 'react-redux';
import {getNotes, clearsummary} from '../../reducers/notes';
import Paper from '@mui/material/Paper';
import {getSummary} from '../../reducers/notes'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/material/styles';
import { disconnectSocket } from '../../reducers/socket';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
    componentDidMount () {
        let clientId = this.props.client.clientinfo.id;
        let timestampe = "all"
        this.props.getSummary({clientId,timestampe})
    }
    componentWillUnmount (){
        this.props.clearsummary()
    }    
    render () {
        return (
            <Container maxWidth={false}>
                 <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                        <Box><DyButton buttonText="Back" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}/></Box>
                        <Box><Typography variant='h2'fontSize={{lg:30, md:20, sm:20, xs:20}}>Previous action items</Typography></Box>
                        <Box><DyButton buttonText="Next" onClick={()=>this.props.nagivate('/session')} endIcon={<><ArrowForwardIosIcon/></> }/></Box>
                    </Box>   
            <Box>
            <List style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
                {this.props.summary.map((row,index)=>(
                    <Box>
                         <Item key={index} elevation={2}>
                        <Box sx={{marginTop:"1%" , paddingTop:'3%'}}><Typography variant="h4" fontSize={{lg:30, md:20, sm:20, xs:20}}>{row[0].created_at}</Typography></Box>
                        <Box sx={{flexDirection:"column", display:"flex", justifyContent:"center", fontFamily:"sans-serif", marginTop:"1%"}}>
                           
                            { row[1].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="subheading">{row[1].name}</Typography> */}
                                    {row[1].actionitems.map((items)=>(
                                        // <ul> 
                                        //     <Typography><li>{items}</li></Typography>
                                        // </ul>
                                        <List  sx={{listStyleType: 'disc', listStylePosition: 'inside'}} >
                                            <ListItem sx={{ display: 'list-item', textAlign:"center" }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                            { row[2].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5">{row[2].name}</Typography> */}
                                    {row[2].actionitems.map((items)=>(
                                        // <ul><li>{items}</li></ul>
                                        <List sx={{listStyleType: 'disc', listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item', textAlign:"center"  }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                            { row[3].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5">{row[3].name}</Typography> */}
                                    {row[3].actionitems.map((items)=>(
                                        // <ul><li>{items}</li></ul>
                                        <List sx={{ listStyleType: 'disc', listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item', textAlign:"center" }}>
                                            {items}
                                        </ListItem>
                                    </List>
                                    ))}
                                </Box>) : null}
                            { row[4].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5">{row[4].name}</Typography> */}
                                    {row[4].actionitems.map((items)=>(
                                        // <ul><li>{items}</li></ul>
                                        <List sx={{listStyleType: 'disc', listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item', textAlign:"center"  }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                            { row[5].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5">{row[5].name}</Typography> */}
                                    {row[5].actionitems.map((items)=>(
                                        // <ul><li>{items}</li></ul>
                                        <List sx={{ listStyleType: 'disc',listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item', textAlign:"center" }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                            { row[6].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5">{row[6].name}</Typography> */}
                                    {row[6].actionitems.map((items)=>(
                                        // <ul><li>{items}</li></ul>
                                        <List sx={{ listStyleType: 'disc',listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item', textAlign:"center" }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                            { row[7].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5">{row[7].name}</Typography> */}
                                    {row[7].actionitems.map((items)=>(
                                        // <ul>{items}</ul>
                                        <List sx={{ listStyleType: 'disc',listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item', textAlign:"center" }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                            { row[8].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5" fontFamily="sans-serif">{row[8].name}</Typography> */}
                                    {row[8].actionitems.map((items)=>(
                                        // <ul><li>{items}</li></ul>
                                        <List sx={{ listStyleType: 'disc',listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item', textAlign:"center" }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                            { row[9].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5">{row[9].name}</Typography> */}
                                    {row[9].actionitems.map((items)=>(
                                        // <ul><li>{items}</li></ul>
                                        <List sx={{ listStyleType: 'disc',listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item',textAlign:"center"  }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                            { row[10].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5">{row[10].name}</Typography> */}
                                    {row[10].actionitems.map((items)=>(
                                        // <ul><li>{items}</li></ul>
                                        <List sx={{ listStyleType: 'disc',listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item' , textAlign:"center" }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                            { row[11].actionitems.length >0 ?(<Box>
                                    {/* <Typography variant="h5">{row[11].name}</Typography> */}
                                    {row[11].actionitems.map((items)=>(
                                        // <ul><li>{items}</li></ul>
                                        <List sx={{ listStyleType: 'disc',listStylePosition: 'inside'}}>
                                            <ListItem sx={{ display: 'list-item', textAlign:"center" }}>
                                                {items}
                                            </ListItem>
                                        </List>
                                    ))}
                                </Box>) : null}
                               
                        </Box>
                        </Item>
                    </Box>
                ))}
            </List>
            </Box>
            {/* <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <FormDialog addCurrentNotes={this.props.addPastNotes} sessiontime={this.props.sessiontime}/>
            </Box>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column'}}>
                {this.props.notes.map((value, idx) => (
                    <Box sx={{width:'100%', justifyContent:'flex-end', padding:'10px'}} key={idx}>
                        <Item elevation={1} key={idx}>
                            <Typography variant='h6'>{value.created_at}</Typography>
                            <Typography variant='body'>{value.message}</Typography>
                        </Item>
                    </Box>
                ))}
            </Box>    */}
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    notes:state.NotesReducer.pastnotes,
    summary:state.NotesReducer.summary,
    userinfo:state.loginReducer.userinfo,
    sessiontime:state.NotesReducer.currentDate,
    client:state.ClientReducer
})
const mapDispatchToProps = {
    getNotes,
    getSummary,
    clearsummary

}
export default connect(mapStateToProps, mapDispatchToProps)(Summary);