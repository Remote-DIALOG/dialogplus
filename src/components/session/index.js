import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Row from './row';
import { connect } from "react-redux";
import {setValue, saveCurrentSession} from '../../reducers/session';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const marks = [
  { name:"totally dissatisifies",
    value: 1,
    label: '1',
  },
  {
    name: "very dissatisifies",
    value: 2,
    label: '2',
  },
  {
    name:"fairly dissatisifies",
    value: 3,
    label: '3',
  },
  { name:"in the middle",
    value: 4,
    label: '4',
  },
  { name:"in the middle",
  value: 4,
  label: '4',
  },  
  { name:"fairly satisfied",
  value: 5,
  label: '5',
  },  
  { name:"very satifised",
  value: 6,
  label: '6',
  },  
  { name:"totally satisfied",
  value: 7,
  label: '7',
  }
];
const scale = ["Mental health", "Physical health", "Job situation", "Accommodation", "Leisure activities", "Relationship with partner/family", "Friendship", "Personal safety", "Medication", "Practical help", "Meetings"]

class Session extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          session: [
            {"created_at":""},
            {"created_by":this.props.clientInfo.clinetid||16},
            {"Mental health": 0},
            {"Physical health": 0},
            {"Job situation": 0},
            {"Accommodation": 0},
            {"Leisure activities":0},
            {"Relationship":0},
            {"Friendship":0},
            {"Personal safety": 0},
            {"Medication":0},
            {"Practical help":0},
            {"Meetings":0}
          ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleReview = this.handleReview.bind(this);
        this.getDefaultValue = this.getDefaultValue.bind(this);
    }
    getDefaultValue(row) {
      for (var i in this.state.session) {
        for (var j in this.state.session[i]) {
          if (j === row) { 
            console.log('get default is called')
            console.log(this.state.session[i][j])
            return this.state.session[i][j]
          }
        }
      }
      return 0
    }
    handleReview (){
      this.state.session[0]['created_at']=new Date().toLocaleString(); 
      this.forceUpdate()
      this.props.setValue(this.state.session);
      // this.props.saveCurrentSession(this.state.session)
      this.props.nagivate('/review')
    }
    handleChange (event) {
      var data = JSON.parse(JSON.stringify({scale:event.target.name, rating:event.target.value}));
      for (var i in this.state.session) {
        for (var j in this.state.session[i]) {
          if (j === data.scale){
            var rating = data.rating
            this.state.session[i][j] = rating;
            this.forceUpdate()
          }
        }
      }
    }
    render () {
        return (
            <div>
              <Container maxWidth={false}>
                <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                  <Box sx={{margin:2}}><Typography variant='h4'>Assessment</Typography></Box>
                  <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleReview} endIcon={<ArrowForwardIosIcon/>}>Review</Button>
                </Box>
                <Box>
                  <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                      <TableBody>
                        {scale.map((row, index)=> (
                          <Row row={row} key={index} index={index} marks={marks} handleChange={this.handleChange} getDefaultValue={this.getDefaultValue}/>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box sx={{width:"100%", justifyContent:"space-between", display:"flex"}}>
                  <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }} startIcon={<div><ArrowBackIosIcon/><ArrowBackIosIcon/></div>}>Exit</Button>
                  <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.handleReview} endIcon={<ArrowForwardIosIcon/>}>Review</Button>
                  
                </Box>
              </Container>                
         </div>
        );
    }
}
const mapStateToProps = (state) => ({
  seesion:state.loginReducer.session,
  clientInfo:state.ClientReducer.clientinfo
})
const mapDispatchToProps = {
  setValue,
  saveCurrentSession

}
export default connect(mapStateToProps, mapDispatchToProps)(Session);
