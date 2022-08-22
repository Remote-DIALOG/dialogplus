import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Slider from '@mui/material/Slider';

const scale = ["Mental health", "Physical health", "Job situation", "Accommodation", "Leisure activities", "Relationship with partner/family", "Friendship", "Personal safety", "Medication", "Practical help", "Meetings"]

class Review extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div>
                 <Container maxWidth={false}>
                    <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                    <Box sx={{margin:2}}><Typography variant='h4'>Review</Typography></Box>
                    <Button  variant="contained"sx={{ mt: 3, mb: 2 }}>Select</Button>
                </Box>
                <Box sx ={{marginTop:3, display:'flex', flexDirection:'row', justifyContent:'space-between', backgroundColor:"#202c2b17", }}>
                    <Stack direction="row" spacing={1}>
                    <Chip label="Wed, 20 Oct 2021"  />
                    <Chip label="Fri, 29 Oct 2021"  />
                    <Chip label="current"  />
                </Stack>
                </Box>
                <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            {scale.map((row) => (<TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
                                    <Slider disabled defaultValue={30} aria-label="Disabled slider" />
                                    <Slider disabled defaultValue={50} aria-label="Disabled slider" />
                                </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Box>
                </Container>
            </div>
        );
    }
}
export default Review;