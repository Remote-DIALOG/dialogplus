import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {connect} from "react-redux";
import Typography from '@mui/material/Typography';
class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progress:5
        }
    }
    render () {
        return (
        <Box sx={{ width: '25%', marginRight:'20%'}}>
            <LinearProgress 
            variant="determinate" 
            value={(this.props.progress/7)*100} 
            color={this.props.color}
            sx={{backgroundColor:'#f5f5f5'}}   
        />
        <Typography sx={{textAlign:'right', margin:'-14px'}}>{this.props.progress}</Typography>
        </Box>    
        )
    }
}
const mapStateToProps = (state) => ({
  session:state.SessionReducer.current_session
})
export default connect(mapStateToProps,null)(Result)
