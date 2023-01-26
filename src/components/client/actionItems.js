import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {connect} from 'react-redux';
import Paper from '@mui/material/Paper';
import FormDialog from './addnotes';
import {styled} from '@mui/material/styles';
import {getNotes} from '../../reducers/actionitems';
class ActionItems extends React.Component {
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
                <Typography variant='h4'>Current action items</Typography>
                <Button variant="contained" onClick={()=>this.props.nagivate('/client')}>Finish</Button>
            </Box>
            <Box sx={{marginTop:10, display:'flex', flexDirection:'column', alignItems:'left'}}>
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