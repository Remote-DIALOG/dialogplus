import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import TabPanel from './tabpannel';
import TextField from '@mui/material/TextField';
import {addActionItems} from '../../reducers/session';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {send_message, recive_message} from '../../reducers/socket';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {updateStage} from '../../reducers/session'
import 'react-tabs/style/react-tabs.css';
import DyButton from "../../utils/button";
import Tooltip from '@mui/material/Tooltip';
import '../../utils/style.css'

function valueLabelFormat(value) {
    if (value===1) return "totally dissatisfied"
    if (value===2) return "very dissatisfied"
    if (value===3) return "fairly dissatisfied"
    if (value===4) return "in the middle"
    if (value===5) return "fairly satisfied"
    if (value===6) return "very satisfied"
    if (value===7) return "totally satisfied"
  }
 class Discuss2 extends React.Component {
     constructor(props) {
         super(props) 
         this.state = {
             index:0,
             actionitems:[{id:1, value:"", domain:""}],
             item:"",
             page:2,
         }
         this.handleChange          = this.handleChange.bind(this)
         this.addInput              = this.addInput.bind(this);
         this.handleFinishButton    = this.handleFinishButton.bind(this)
         this.handleKeyDown         = this.handleKeyDown.bind(this)
         this.handleBackButton      = this.handleBackButton.bind(this)
         this.handlePageChange      = this.handlePageChange.bind(this)
     }
     handleBackButton() {
         this.props.updateStage("discuss")
        //  this.props.nagivate('/review')

     }
     handlePageChange(event, value) {
         this.setState({page:value})
     }
     handleKeyDown (event, idx) {
            const index = event.target.id;
            let selectscale = this.props.current_session.filter(name => name.select===true)
            let scale = selectscale[index]
            this.props.addActionItems({name:scale.name, actionitems:this.state.item})
            this.setState({item:""})  
     }
     handleChange (event) {
         event.preventDefault()
         this.setState({item:event.target.value})
     }
     addInput() {
         this.setState(prevState =>({
             actionitems:[...prevState.actionitems,{"value":"", "domain":""}]
         }))
     }

     handleFinishButton () {
        let selectscale = this.props.current_session.filter(name => name.select===true)
        console.log(selectscale.length, this.state.index)
        if (selectscale.length >= 3 ) {
            this.props.updateStage("discuss3")
        }
        else {
            this.props.updateStage("actionitems")
        }
        // this.props.updateStage("discuss3")
        // this.props.nagivate('/actionitems')
     }
     componentDidUpdate (previousProps, previousState) {
        recive_message()
        if (JSON.stringify(previousProps.session.current_session)!==JSON.stringify(this.props.session.current_session)) {
          send_message({id:this.props.clientinfo.id, current_session:this.props.session.current_session}) 
        }
      }
     render () {
        let selectscale = this.props.current_session.filter(name => name.select===true)
        let data = selectscale[1]
        return (
        <Container maxWidth={false}>
            <Box sx={{marginTop: '1%',marginBottom: '1%', display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box><DyButton buttonText="Back" onClick={this.handleBackButton} startIcon={<ArrowBackIosIcon/>}/></Box>
                <Box>
                    <Typography variant='h2' fontSize={{lg:30, md:20, sm:20, xs:20}}  sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"10px"}}}>Discuss (2 of {selectscale.length})</Typography>
                </Box>
                <Box><DyButton buttonText="Next" onClick={this.handleFinishButton} endIcon={<ArrowForwardIosIcon/>}/></Box>
            </Box>   
            <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant='h2' fontSize={{lg:28, md:18, sm:18, xs:18}}   sx={{marginLeft:{xs:'10px', sm:'10px'}, marginTop:{xs:"10px"}}}>{data.name}</Typography>
            </Box>
            <div>
                <div style={{marginRight:"45%", display:"flex", flexDirection:"row", marginTop:"2%"}}>
                    <div style={{width:"100%"}}>
                        <div className="progress">
                            <div className="progress-bar" style={{ width: `${(data.value/7)*100}%`, backgroundColor:'#2196f3'}}>
                                <Tooltip title= {valueLabelFormat(data.value)} placement="top" enterTouchDelay={0}>
                                    <div className="progress-label" style={{backgroundColor:'#2196f3'}}>{data.value}</div>
                                </Tooltip>
                            </div>
                        </div>       
                    </div>
                </div>
            </div>
            <ol type="1">
                <Typography><li>Understanding</li></Typography>
                    <ul>
                        <li><Typography>Why this rating and not a lower one?</Typography></li>
                        <li><Typography>What is working?</Typography></li>
                    </ul>  
                <Typography><li>Looking forward</li></Typography>
                    <ul>
                        <li><Typography>Best case scenario?</Typography></li>
                        <li><Typography>Smallest improvement?</Typography></li>
                    </ul>
                <Typography><li>Considering options</li></Typography>
                    <ul>
                        <li><Typography>What can the patient do?</Typography></li>
                        <li><Typography>What can the clinician do?</Typography></li>
                        <li><Typography>What others can do?</Typography></li>
                    </ul>
                    <Typography><li>Agreeing on actions</li> </Typography>
                    <ul>
                        <li><Typography>Decide together the key actions</Typography></li>
                    </ul>
                    <Box sx={{flexDirection:'row', position:'relative', paddingTop:"1%", marginBottom:"1.2%"}}>
                        <TextField
                                placeholder="Write actions here "
                                onChange={this.handleChange}
                                sx={{width:'50%'}}
                                id={this.state.page-1}
                                value={this.state.item}
                        /> 
                        <Button id={this.state.page-1} variant="contained" sx={{marginLeft:'0.5%',height: '55px',}} onClick={(event)=>(this.handleKeyDown(event, this.state.page-1))}>Add</Button>
                    </Box>
                    <ul>
                        {data.actionitems.map((text, idx)=>(
                            <li><Typography sx={{marginTop:"0.5%"}}>{text}</Typography></li>
                        ))}
                    </ul>
            </ol>
            <Box>
            </Box>
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
    addActionItems,
    updateStage
}
export default connect(mapStateToProps, mapDispatchToProps)(Discuss2);
