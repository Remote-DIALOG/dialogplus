import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {connect} from "react-redux";
class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progress:5
        }
    }
    // componentDidUpdate (previousProps, previousState) {
    //     if (previousProps.current_session!=this.props.session) {
    //         let current_value = this.props.session.find(scale => scale.name===this.props.row)
    //         if (current_value!=undefined && current_value.value>0) {
    //             let progress = (current_value.value/7)*100
    //             // console.log(progress)
    //             this.setState({progress:progress})
    //         }

    //     }
    // }
    render () {
        return (
            <Box sx={{ width: '300px', marginRight:'300px' }}>
                <LinearProgress variant="determinate" value={this.props.progress} />
            </Box>
        )
    }
}
const mapStateToProps = (state) => ({
  session:state.SessionReducer.current_session
})
export default connect(mapStateToProps,null)(Result)