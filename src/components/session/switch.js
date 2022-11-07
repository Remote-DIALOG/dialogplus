import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {connect} from 'react-redux';
import {updateSelectScale,deleteSelectScale} from '../../reducers/session'
function CustomizedSwitches(props) {
  const [yes, setyes] = React.useState(false);
  const [no, setno] = React.useState(false);

  const handleyes = (event) => {
    setyes(!yes)
    setno(false)
    for (var i = 2; i < props.session.current_session.length; i++) {
      if (props.session.current_session[i].name === props.rows) {
          props.updateSelectScale(props.session.current_session[i])
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
          return;
      }
    }
  }
  return (
    <FormGroup>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControlLabel control={<Checkbox onChange={handleyes} checked={yes}/>} label="Yes"/>
        <FormControlLabel control={<Checkbox onChange={handleno} checked={no}/>} label="No"/>
      </Stack>
    </FormGroup>
  );
}
const mapStateToProps = (state) => ({
  session:state.SessionReducer
})
const mapDispatchToProps = {
  updateSelectScale,
  deleteSelectScale
}
export default connect(mapStateToProps,mapDispatchToProps )(CustomizedSwitches);
