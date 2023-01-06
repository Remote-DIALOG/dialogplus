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
import { CommentSection} from 'react-comments-section'
import 'react-comments-section/dist/index.css'
const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'left',
  lineHeight: '60px',
  padding:'25px'
}));
class ActionItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                  userId: '01a',
                  comId: '012',
                  fullName: 'Suyog Pipliwal',
                  text: 'This is by Suyog Pipliwal! ',
                  avatarUrl:'https://ui-avatars.com/api/name=Suyog&background=random',
                  replies: []
                },
                {
                  userId: '02b',
                  comId: '017',
                  fullName: 'Pat',
                  avatarUrl:'https://ui-avatars.com/api/name=Pat&background=random',
                  text: 'This is by Sir',
                  
                  replies: []
                }
              ]
        }
    }
    componentDidMount() {
        let data = {
            "emailid": this.props.userinfo.emailid
        }
        this.props.getNotes(data)
    }
    onSubmitAction = (data) => {
        console.log('this comment was posted!',data)
      }
    
      customNoComment = () => <div className='no-com'>No comments wohoooo!</div>
    render () {
        return (
            <Container maxWidth={false}>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}}>
                <Typography variant='h4'>Previous action items</Typography>
                <Button variant="contained" onClick={()=>this.props.nagivate('/client')}>Finish</Button>
            </Box>
            <Box sx={{marginTop:10, display:'flex', flexDirection:'column', alignItems:'left'}}>
                <Typography variant='h5'>Notes</Typography>
                <CommentSection
                    currentUser={{
                        currentUserId: '01a',
                        currentUserImg:'https://ui-avatars.com/api/name=Suyog&background=random', 
                        currentUserFullName: 'Suyog Pipliwal'
                    }}
                    commentData={this.state.data}
                    onSubmitAction={(data) => this.onSubmitAction(data)}
                    customNoComment={() => this.customNoComment()}
                    logIn={{
                        loginLink: 'http://localhost:3001/',
                        signupLink: 'http://localhost:3001/'
                    }}
                />
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