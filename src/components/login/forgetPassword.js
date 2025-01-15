import React from'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import API from '../../utils/api'
import CustomAlert from '../../utils/alert';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
class Forgetpassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:"",
            password:"",
            isloading:false,
            msg:"",
            sucess:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
     handleChange (event){
        event.persist();
        if (event.target.id === "username") {
            this.setState({username:event.target.value})
        }
        if (event.target.id === "password") {
            this.setState({password:event.target.value})
        }
     }
    async handleSubmit (event) {
        event.preventDefault()
        this.setState({isloading:true})
        const payload = {
            "username":this.state.username,
            "newPassword":this.state.password
        }
        try {
            const {data} = await API.post('/users/resetPassword', payload);
            this.setState({msg:data.message})
        }catch(error) {
            this.setState({msg:error.response.data.message})
        } finally {
            this.setState({isloading:false})
        }

    }
    render () {
    return (
        <Container component="main" maxWidth="xs">
            {this.state.msg.length > 0 &&<CustomAlert message={this.state.msg}/>}
                    <CssBaseline />
                    <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                          Forget Your Password?
                        </Typography>
                        <Typography variant="body">
                          Please Enter your username and New Password
                        </Typography>
                    <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField 
                            margin="normal" 
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        
                        <LoadingButton 
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={this.state.isloading}>
                            Submit
                        </LoadingButton>
                        <Grid container>
                             <Grid item>
                                <Link href="/" variant="body2">
                                    {"Already have account? Sign In"}
                                </Link>
                            </Grid> 
                        </Grid>
                    </Box>
                    </Box>
                </Container>
    )
    }
}
export default(Forgetpassword);