import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';
// import Paper from '@mui/material/Paper';
// import TableCell from '@mui/material/TableCell';
// import TableRow from '@mui/material/TableRow';
// import Slider from '@mui/material/Slider';
import {connect} from 'react-redux';
class Review extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div>
                 <Container maxWidth={false}>
                 <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                    <Box sx={{margin:2}}><Typography variant='h4'>Review</Typography></Box>
                    <Button  variant="contained"sx={{ mt: 3, mb: 2 }}>Select</Button>
                </Box>
                <Box sx ={{marginTop:3, display:'flex', flexDirection:'row', justifyContent:'space-between', backgroundColor:"#202c2b17", }}>
                    <Stack direction="row" spacing={1}>   
                        <Chip label={this.props.current_session[0]['created_at']}/>
                    </Stack>
                </Box>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    current_session:state.SessionReducer.current_session
  })
  const mapDispatchToProps = {

  }
// export default connect(mapStateToProps, mapDispatchToProps)(Review);
export default connect(mapStateToProps, mapDispatchToProps)(Review);