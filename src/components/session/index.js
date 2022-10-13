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
import {setValue} from '../../reducers/session';
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
          session:[]
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (event) {
      var data = JSON.parse(JSON.stringify({scale:event.target.name, rating:event.target.value}));
      this.props.setValue(data)
    }
    render () {
        return (
            <div>
              <Container maxWidth={false}>
                <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                  <Box sx={{margin:2}}><Typography variant='h4'>Assessment</Typography></Box>
                  <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={()=>console.log("review is clickec")}>Review</Button>
                </Box>
                <Box>
                  <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                      <TableBody>
                        {scale.map((row, index)=> (
                          <Row row={row} key={index} index={index} marks={marks} handleChange={this.handleChange}/>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box sx={{width:"100%", justifyContent:"space-between", display:"flex"}}>
                  <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Exit</Button>
                </Box>
              </Container>                
         </div>
        );
    }
}
const mapStateToProps = (state) => ({
  seesion:state.loginReducer.session
})
const mapDispatchToProps = {
  setValue

}
export default connect(mapStateToProps, mapDispatchToProps)(Session);
