import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormDialog from './addnotes';
class ActionItems extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <Container maxWidth={false}>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}}>
                <Typography variant='h4'>Previous action items</Typography>
                <Button variant="contained">Finish</Button>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                       <Typography variant='h5'>Job Situation</Typography>
                       <List sx={{ listStyleType: 'disc' }}>
                            <ListItem sx={{ display: 'list-item' }}>Item 1</ListItem>
                            <ListItem sx={{ display: 'list-item' }}>Item 2</ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={4}>
                       <Typography variant='h5'>FriendShip</Typography>
                       <List sx={{ listStyleType: 'disc' }}>
                            <ListItem sx={{ display: 'list-item' }}>Item 1</ListItem>
                            <ListItem sx={{ display: 'list-item' }}>Item 2</ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={4}>
                       <Typography variant='h5'>Medication</Typography>
                       <List sx={{ listStyleType: 'disc' }}>
                            <ListItem sx={{ display: 'list-item' }}>Item 1</ListItem>
                            <ListItem sx={{ display: 'list-item' }}>Item 2</ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{marginTop:10, display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant='h5'>Notes</Typography>
                <Box sx={{marginTop:5}}><FormDialog/></Box>
            </Box>
            
            </Container>
        );
    }
}
export default ActionItems;