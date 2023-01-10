import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@mui/icons-material/Add';
import TableFooter from '@mui/material/TableFooter';
import Result from './result';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import TabPanel from './tabpannel';

 class Discuss extends React.Component {
     constructor(props) {
         super(props) 
         this.state = {
             index:0
         }
         this.handleChange = this.handleChange.bind(this)
         this.handleFinishButton = this.handleFinishButton.bind(this)
     }
     handleChange () {

     }
     handleFinishButton () {
        this.props.nagivate('/client')
     }
     render () {
         let selectscale = this.props.current_session.filter(name => name.help==="yes")
         let content_array = [<h1>First Tab</h1>, <h1>Second Tab</h1>, <h1>Third Tab</h1>];
        return (
        <Container maxWidth={false}>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box sx={{margin:2}}><Typography variant='h4'>Discuss</Typography></Box>
                <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleFinishButton}>Finish</Button>
            </Box>
            <Tabs
                value={this.state.index}
                onChange={(_, index) => this.setState({index})}
                scrollButtons={false}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
            >
                {selectscale.map((data, index)=>(
                   
                    <Tab label={data.name} key={index}/>
                   
                   
                   
                ))}
            </Tabs>
   
    </Container>
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
