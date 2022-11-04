import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {connect} from 'react-redux';
import Result from './result';

class Discuss extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {
        // this.props.saveCurrentSession(this.props.current_session)

    }
    render () {
        let select_scale = this.props.session.select_scale
        return (
            <div>
                 <Container maxWidth={false}>
                 <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                    <Box sx={{margin:2}}><Typography variant='h4'>Discuss</Typography></Box>
                    <Button  variant="contained"sx={{ mt: 3, mb: 2 }}>Finish</Button>
                </Box>
                {select_scale.map((row,index)=>(
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottom: 1}} key={index}>
                        <Typography variant='h6'>{row.name}</Typography>
                        <Box sx={{marginTop:2}}><Result progress={(row.value/7)*100}></Result></Box>
                    </Box>
                ))}
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    current_session:state.SessionReducer.current_session,
    session:state.SessionReducer,
  })
  const mapDispatchToProps = {
  }
export default connect(mapStateToProps, mapDispatchToProps)(Discuss);