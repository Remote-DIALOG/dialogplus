import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './tabpannel';
import TextField from '@mui/material/TextField';
import {addActionItems} from '../../reducers/session';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {send_message, recive_message} from '../../reducers/socket';
import ProgressBarWithLabel from '../../utils/Progress'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

 class Discuss extends React.Component {
     constructor(props) {
         super(props) 
         this.state = {
             index:0,
             actionitems:[{id:1, value:"", domain:""}],
             item:""
         }
         this.handleChange = this.handleChange.bind(this)
         this.addInput = this.addInput.bind(this);
         this.handleFinishButton = this.handleFinishButton.bind(this)
         this.handleKeyDown = this.handleKeyDown.bind(this)
         this.handleBackButton = this.handleBackButton.bind(this)
     }
     handleBackButton() {
         this.props.nagivate('/review')
     }
     handleKeyDown (event, idx) {
            const index = event.target.id;
            let selectscale = this.props.current_session.filter(name => name.select===true)
            let scale = selectscale[index]
            console.log(this.state.item)
            this.props.addActionItems({name:scale.name, actionitems:this.state.item})
            this.setState({item:""})  
     }
     handleChange (event) {
         event.preventDefault()
         console.log(event.target.value)
         this.setState({item:event.target.value})

     }
     addInput() {
         this.setState(prevState =>({
             actionitems:[...prevState.actionitems,{"value":"", "domain":""}]
         }))
     }

     handleFinishButton () {
        this.props.nagivate('/actionitems')
     }
     componentDidUpdate (previousProps, previousState) {
        recive_message()
        if (JSON.stringify(previousProps.session.current_session)!==JSON.stringify(this.props.session.current_session)) {
          send_message({id:this.props.clientinfo.id, current_session:this.props.session.current_session}) 
        }
      }
     render () {
        let selectscale = this.props.current_session.filter(name => name.select===true)
        return (
        <Container maxWidth={false}>
            <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box><Button  variant="contained" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}>Back</Button></Box>
                <Box><Typography variant='h2'>Discuss</Typography></Box>
                <Box><Button  variant="contained" onClick={this.handleFinishButton} endIcon={<ArrowForwardIosIcon/>}>Next</Button></Box>
            </Box>   
            <Tabs 
                sx={{'& .Mui-selected':{backgroundColor:"#1976d2"}, '& .Mui-disabled':{backgroundColor:"red"}}} 
                value={this.state.index} 
                onChange={(_, index) => this.setState({index})} 
                scrollButtons={false} 
                textColor="inherit" 
                variant="scrollable" 
                allowScrollButtonsMobile
            >
                {selectscale.map((data, index)=>(<Tab label={data.name} key={index} sx={{border:"1px solid", borderRadius:'5px'}}/>))}
            </Tabs>
            
            {selectscale.map((data, index)=>(
                <TabPanel value={this.state.index} index={index} sx={{border:"solid"}}>
                    <ProgressBarWithLabel value={(selectscale[this.state.index].value/7)*100} label={selectscale[this.state.index].value} color='#2196f3'/>
                        <ol type="1">
                            <li><Typography>Understanding</Typography></li>
                            <ul>
                                <li><Typography>Why this rating and not a lower one?</Typography></li>
                                <li><Typography>What is working?</Typography></li>
                            </ul>  
                            <li><Typography>Looking forward</Typography></li>
                                <ul>
                                    <li><Typography>Best case scenario?</Typography></li>
                                    <li><Typography>Smallest improvement?</Typography></li>
                                </ul>
                            <li><Typography>Considering options</Typography></li>
                                <ul>
                                    <li><Typography>What can the patient do?</Typography></li>
                                    <li><Typography>What can the clinician do?</Typography></li>
                                    <li><Typography>What others can do?</Typography></li>
                                </ul>
                            <li><Typography>Agreeing on actions</Typography></li>
                            <ul>
                                    <li><Typography>Decide together the key actions</Typography></li>
                            </ul>
                            <Box sx={{flexDirection:'row', position:'relative', paddingTop:"1%"}}>
                                <TextField
                                placeholder="Write actions here "
                                onChange={this.handleChange}
                                sx={{width:'50%'}}
                                id={index}
                                value={this.state.item}
                            /> 
                            <Button id={index} variant="contained" sx={{marginLeft:'0.5%',height: '55px',}} onClick={(event)=>(this.handleKeyDown(event, index))}>Add</Button>
                            </Box>
                            <ol type='1'>
                                {data.actionitems.map((text, idx)=>(
                                    <li><Typography>{text}</Typography></li>
                                ))}
                            </ol>
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
    clientinfo:state.ClientReducer.clientinfo,
})
const mapDispatchToProps = {
    addActionItems
}
export default connect(mapStateToProps, mapDispatchToProps)(Discuss);
