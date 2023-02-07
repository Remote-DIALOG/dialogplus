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
import TableFooter from '@mui/material/TableFooter';
import Result from './result';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import TabPanel from './tabpannel';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
 class Discuss extends React.Component {
     constructor(props) {
         super(props) 
         this.state = {
             index:0
         }
         this.handleChange = this.handleChange.bind(this)
         this.handleFinishButton = this.handleFinishButton.bind(this)
     }
     handleChange (event) {
         console.log("handle chnage")
     }
     handleFinishButton () {
        this.props.nagivate('/client')
     }
     render () {
         let selectscale = this.props.current_session.filter(name => name.select===true)
        return (
        <Container maxWidth={false}>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box sx={{margin:2}}><Typography variant='h4'>Discuss</Typography></Box>
                <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleFinishButton}>Finish</Button>
            </Box>
            <Tabs value={this.state.index} onChange={(_, index) => this.setState({index})} scrollButtons={false} indicatorColor="primary" textColor="inherit" variant="scrollable" scrollButtons allowScrollButtonsMobile>
                {selectscale.map((data, index)=>(<Tab label={data.name} key={index}/>))}
            </Tabs>
            
            {selectscale.map((data, index)=>(
                <TabPanel value={this.state.index} index={index}>
                    <LinearProgress variant="determinate" value={(selectscale[this.state.index].value/7)*100}/>
                        <ol type="1">
                            <li><Typography>Understanding</Typography></li>
                            <ul>
                                <li>Why is this rating and not a lower one?</li>
                                <li>What is working</li>
                            </ul>  
                            <li>Looking forward</li>
                                <ul>
                                    <li>Best case scenario?</li>
                                    <li>Smallest improvement</li>
                                </ul>
                            <li>Considering options</li>
                                <ul>
                                    <li>What can the patient do?</li>
                                    <li>What can the clinician do?</li>
                                    <li>What others can do</li>
                                </ul>
                            <li>Agreeing on actions    
                                <IconButton aria-label="add" onClick={this.handleChange}>
                                <AddIcon />
                                </IconButton>
                            </li>
                            
                        </ol>
                </TabPanel>
               
            ))}
          
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
