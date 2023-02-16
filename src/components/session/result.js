import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {connect} from "react-redux";
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-bootstrap/ProgressBar';
class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progress:5
        }
    }
    render () {
        return (
        <Box sx={{ width: '300px', marginRight:'300px' }}>
            <LinearProgress variant="determinate" value={(this.props.progress/7)*100} color={this.props.color}/>
        </Box>    
        )
    }
}
const mapStateToProps = (state) => ({
  session:state.SessionReducer.current_session
})
export default connect(mapStateToProps,null)(Result)

