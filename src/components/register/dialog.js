import React from 'react';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
class DialogBox extends React.Component {
    render () {
        return (
        <div>
                <Container component="main">
                    <Box>
                        <Dialog open={this.props.data.openDialog}>
                            <DialogTitle>Register As</DialogTitle>
                            <DialogContent>
                            <FormControl
                                required
                                error={this.props.data.error.iserror}
                                component="fieldset"
                                sx={{ m: 3 }}
                                variant="standard"
                            >
                            <FormLabel component="legend">Pick One</FormLabel>
                                    <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={this.props.data.client} onChange={e=>this.props.data.handleChange('client',e)} name="client" />}
                                        label="Client"
                                    />
                                    <FormControlLabel control={<Checkbox checked={this.props.data.clinican} onChange={e=>this.props.data.handleChange('clinican',e)} name="clinican" />}
                                        label="Clinician"
                                    />
                                    </FormGroup>
                                
                                {this.props.data.error.iserror ? <FormHelperText>{this.props.data.error.message}</FormHelperText>:null}
                            </FormControl>
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.data.setUsertype}>Select</Button>
                        </DialogActions>
                    </Dialog>
                    </Box>
                </Container>
            </div>
        );
    }
 }
export default DialogBox