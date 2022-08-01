import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
class ADDClinet extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log(this.props)
        return (
            <Dialog open={this.props.handles.open} onClose={this.props.handles.handleClose}>
                <DialogTitle>
                    <Grid container direction="row" justifyContent="space-between">New Clinet
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
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid> */}
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
                </DialogContent>
            </Dialog>
        );
    }
}
export default ADDClinet;