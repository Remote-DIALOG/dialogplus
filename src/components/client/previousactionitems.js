import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {connect} from 'react-redux';
import FormDialog from './addnotes';
import {getNotes} from '../../reducers/actionitems';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
    lineHeight: '60px',
    padding:'25px'
  }));
class PreviousActionItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                <Button variant="contained" onClick={()=>this.props.nagivate('/session')}>Next</Button>
            </Box>
            <Box sx={{marginTop:10, display:'flex', flexDirection:'column', alignItems:'left'}}>
            </Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}><FormDialog/></Box>
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
export default connect(mapStateToProps, mapDispatchToProps)(PreviousActionItems);