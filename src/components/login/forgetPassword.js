import React from'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import BasicAlerts from '../../utils/alert';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { connect } from "react-redux";
import {getData} from '../../reducers/login';
import {getClientInfo} from '../../reducers/client';
import {logout} from '../../reducers/login';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

function Forgetpassword(props) {
    const [username, setusername] = React.useState("");
    const [isloading, setloading] = React.useState(false);
    const [isvaliduser, setvaliduser] = React.useState(false);
    const handleChange = (event) => {
        event.persist();
        setusername(event.target.value);
    };
    const handleSubmit = (event) => {
        event.persist();
        console.log(username)

    }
    return (
        <Box sx={{width:'100%'}}>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'left', marginLeft:'10%', marginTop:"10%"}}>
                <Typography  variant="h5">
                    Forget  Your Password?
                </Typography>
                <Paper elevation={1} sx={{width:'75%' ,marginTop:3}}>
                    <Box sx={{marginTop:3, marginLeft:5, width:'80%'}}><Typography variant='h6' >Lost your password? Please enter your username or email address.</Typography>
                        <Box component="form"  onSubmit={handleSubmit} noValidate sx={{marginTop:5}}>
                            <TextField 
                                required
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                variant="standard"
                                value={username}
                                onChange={handleChange}
                                style={{width:'70%'}}
                            />
                            <Box sx={{width:'15%'}}>
                                <LoadingButton 
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2 }}
                                    loading={isloading}>
                                    Confirm
                                </LoadingButton>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}
export default Forgetpassword;