import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
// import {selectScale} from '../../reducers/session'
import {connect} from 'react-redux';
import Result from './result';
import {updateStage} from '../../reducers/session';

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked:[ ...Array(11).keys() ].map((i) => false)
        }
        this.handleChange = this.handleChange.bind(this);
        this.hanleDiscuss = this.hanleDiscuss.bind(this);
    }
    handleChange (index) {
        let check = this.state.checked
        check[index] = true
        this.setState({checked:check})
    }
    hanleDiscuss () {
        const current_session = this.props.current_session.slice(2)
        let select_scale = [];
        for (var i =0; i<this.state.checked.length;i++) {
            if (this.state.checked[i]) {
                select_scale.push(current_session[i])
            }
        }
        console.log(select_scale)
        this.props.selectScale(select_scale);
        this.props.updateStage("discuss")

    }
    render () {
        const current_session = this.props.current_session.slice(2)
        return (
            <div>
                 <Container maxWidth={false}>
                 <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                    <Box sx={{margin:2}}><Typography variant='h4'>Select</Typography></Box>
                    <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.hanleDiscuss}>Discuss</Button>
                </Box>
                {current_session.map((row, index)=>(
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottom: 1}} key={index}>
                         <Checkbox checked={this.state.checked[index]} onChange={()=>this.handleChange(index)} inputProps={{ 'aria-label': 'controlled' }}/>
                        <Typography variant='h6'>{row.name}</Typography>
                        <Box sx={{marginTop:2}}><Result progress={(row.value/7)*100}></Result></Box>
                    </Box>
                ))}
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    current_session:state.SessionReducer.current_session,
    session:state.SessionReducer,
  })
  const mapDispatchToProps = {
    updateStage
    // selectScale
  }
export default connect(mapStateToProps, mapDispatchToProps)(Select);