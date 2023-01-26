import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {connect} from 'react-redux';
import {updateSelectScale,deleteSelectScale} from '../../reducers/session';
import {selectscale, deselectscale} from '../../reducers/socket';
function CustomizedSwitches(props) {
  const [yes, setyes] = React.useState(false);
  const [no, setno] = React.useState(false);
  React.useEffect(()=>{
    let current_session = props.session.current_session;
    let current_index = props.currentIndex;
    if (current_session[current_index+2].help==null) {
      setno(false)
      setno(false)
    }
    if (current_session[current_index+2].help==true){
      setyes(true)
      setno(false)
    }
    else {
      setyes(false)
      setno(true)
    }
  },[])
  const handleyes = (event) => {
    setyes(!yes)
    setno(false)
    
    for (var i = 2; i < props.session.current_session.length; i++) {
      if (props.session.current_session[i].name === props.rows) {
          props.updateSelectScale(props.session.current_session[i])
          let data = JSON.parse(JSON.stringify(props.session.current_session[i]));
          data.id = props.clientinfo.clientid
          selectscale(data)
          return;
      }
    }
  };
  const handleno = (event) => {
    setyes(false)
    setno(!no)
    for (var i = 2; i < props.session.current_session.length; i++) {
      if (props.session.current_session[i].name === props.rows) {
          props.deleteSelectScale(props.session.current_session[i])
          let data = JSON.parse(JSON.stringify(props.session.current_session[i]));
          data.id = props.clientinfo.clientid
          deleteSelectScale(data)
          return;
      }
    }
  }
  return (
    
  );
}
const mapStateToProps = (state) => ({
  session:state.SessionReducer,
  clientinfo:state.ClientReducer.clientinfo
})
const mapDispatchToProps = {
  updateSelectScale,
  deleteSelectScale
}
export default connect(mapStateToProps,mapDispatchToProps )(CustomizedSwitches);
