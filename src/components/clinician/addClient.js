import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { connect } from "react-redux";
import { addClinet, setClinet} from '../../reducers/clinician';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
class ADDClinet extends React.Component {
    constructor(props){
        super(props)
        this.state={
          firstname:"",
          lastname:"",
          email:"",
          password:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generatePassword = this.generatePassword.bind(this);
    }
    handleChange (event) {
      console.log(event.target.id)
      if (event.target.id === "firstName") {
        this.setState({firstname:event.target.value})
      }
     if (event.target.id ===  "lastName") {
         this.setState({lastname:event.target.value})
      }
     if (event.target.id === "email") {
      this.setState({email:event.target.value})
      }
    }
    generatePassword() {
    
    }
    handleSubmit(e) {
      this.generatePassword()
      let data = {
        clinicianId: this.props.userinfo.id, 
        fullname: this.state.firstname + " " +this.state.lastname,
        email: this.state.email,
        password:Math.random().toString(36).slice(2, 10)
      }
      let clientinfo = {
        username:this.state.email,
        full_name:this.state.firstname + " " +this.state.lastname,
      }
      this.props.setClinet(clientinfo)
      this.props.addClinet(data);
      this.setState({password: data.password})
      e.preventDefault()
      // this.props.handles.handleClose()
      
    }
    render() {
        return (
            <Dialog open={this.props.handles.open} onClose={this.props.handles.handleClose}>
                <DialogTitle>
                    <Grid container direction="row" justifyContent="space-between">New Client
                    <IconButton aria-label="close" onClick={this.props.handles.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={this.state.firstname}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Create New Client
            </Button>
          </Box>
          {this.props.error_message.length > 0 &&<Typography>{this.props.error_message} and the password is <strong>{this.state.password}</strong></Typography>}
          {/* {this.state.password.length > 0 &&<Typography>The genereated password is <strong>{this.state.password}</strong></Typography>} */}
                </DialogContent>
            </Dialog>
        );
    }
}
const mapStateToProps = (state) => ({
  clinetList:state.clinicianReducer.clinetlist,
  error_message:state.clinicianReducer.message,
  userinfo:state.loginReducer.userinfo
})
const mapDispatchToProps = {
  addClinet,
  setClinet

}
export default connect(mapStateToProps, mapDispatchToProps)(ADDClinet);