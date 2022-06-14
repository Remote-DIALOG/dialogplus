import { Avatar, CssBaseline } from '@mui/material';
import React from 'react';
class ClinicanRegistration extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{
                    marginTop:8,
                    display:"flex",
                    flexDirection:"column",
                    alignItems:'center'
                }}>
                    <Avatar sx={{m:1, bgcolor:"secondary.main"}}>
                        <LockOutlinedIcon/>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                    </Avatar>
                </Box>
            </Container>
        );
    }

}
export default ClinicanRegistration;