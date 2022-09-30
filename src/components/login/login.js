import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { connect } from "react-redux";
import {getData} from '../../reducers/login';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            error: '',
            username:'',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(event) {
        // this.setState({event.target.id:event.target.value})
        if (event.target.id == "username") {
           this.setState({username:event.target.value})
        }
        if (event.target.id == "password") {
            this.setState({password:event.target.value})
        }

    }
    handleSubmit (event) {
        event.preventDefault();
        let userinfo = {
            "username": this.state.username,
            "password": this.state.password
        }
        this.props.getData(userinfo)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userinfo.category == 'clinician') {
            this.props.nagivate('/clinician')

        }
        else{
            this.props.nagivate('/')
        }
    }
    render () {
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    <Box component="form"  onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
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
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                        Sign In
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                    </Box>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    userinfo:state.loginReducer.userinfo
})
const mapDispatchToProps = {
    getData

}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
// export default Login;