import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {connect} from 'react-redux';
import Paper from '@mui/material/Paper';
import FormDialog from './addnotes';
import {styled} from '@mui/material/styles';
import {getNotes} from '../../reducers/actionitems';
const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'left',
  lineHeight: '60px',
  padding:'25px'
}));
class ActionItems extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let data = {
            "emailid": this.props.userinfo.emailid
        }
        this.props.getNotes(data)
    }
    render () {
        return (
            <Container maxWidth={false}>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}}>
                <Typography variant='h4'>Previous action items</Typography>
                <Button variant="contained" onClick={()=>this.props.nagivate('/client')}>Finish</Button>
            </Box>
            <Box sx={{ flexGrow: 1}}>
                <Grid container spacing={2}>
                    {/* <Paper elevation={2}> */}
                    <Grid item xs={4}>
                       <Typography variant='h5'>Job Situation</Typography>
                       <List sx={{ listStyleType: 'disc' }}>
                            <ListItem sx={{ display: 'list-item' }}>Item 1</ListItem>
                            <ListItem sx={{ display: 'list-item' }}>Item 2</ListItem>
                        </List>
                    </Grid>
                    {/* </Paper> */}
                    {/* <Paper elevation={2}> */}
                    <Grid item xs={4}>
                       <Typography variant='h5'>FriendShip</Typography>
                       <List sx={{ listStyleType: 'disc' }}>
                            <ListItem sx={{ display: 'list-item' }}>Item 1</ListItem>
                            <ListItem sx={{ display: 'list-item' }}>Item 2</ListItem>
                        </List>
                    </Grid>
                    {/* </Paper> */}
                    {/* <Paper elevation={2}> */}
                    <Grid item xs={4}>
                       <Typography variant='h5'>Medication</Typography>
                       <List sx={{ listStyleType: 'disc' }}>
                            <ListItem sx={{ display: 'list-item' }}>Item 1</ListItem>
                            <ListItem sx={{ display: 'list-item' }}>Item 2</ListItem>
                        </List>
                    </Grid>
                    {/* </Paper> */}
                </Grid>
            </Box>
            <Box sx={{marginTop:10, display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant='h5'>Notes</Typography>
                <Box sx={{marginTop:5}}><FormDialog/></Box>
            </Box>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column'}}>
                {this.props.notes.map((value, idx) => (
                    <Box sx={{width:'100%', justifyContent:'flex-end', padding:'10px'}}>
                        <Item elevation={1} key={idx}>
                            <Typography variant='h6'>{value.created_at}</Typography>
                            <Typography variant='body'>{value.message}</Typography>
                        </Item>
                    </Box>
                ))}
            </Box>   
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    notes:state.ActionItemsReducer.notes,
    userinfo:state.loginReducer.userinfo
})
const mapDispatchToProps = {
    getNotes
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionItems);