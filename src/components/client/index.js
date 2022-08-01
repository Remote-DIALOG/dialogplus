import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
function createData(id, name) {
    return { id, name};
}
const rows = [
    createData(0,'Friday, 29 oct 2021',),
    createData(1,'Wednesday, 20 oct 2021',),
    createData(2, 'Thursday, 14 oct 2021'),
    createData(3,'Monday,4 oct 2021'),
    createData(4,'Friday, 29 sept 2021'),
];
  
class Client extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <Container maxWidth={false}>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
             <Box><Typography variant='h4'>Elvis Presley</Typography></Box>
             <Button  variant="contained"sx={{ mt: 3, mb: 2 }} onClick={this.openAddClinet}>New Seesion</Button>
         </Box>
         <Box>
             <Table size="medium" padding='none'>
                 <TableHead></TableHead>
                 <TableBody>
                     {rows.map((row) => (
                     <TableRow key={row.id}>
                         <TableCell><ContentPasteIcon/></TableCell>
                         <TableCell align='left'>{row.name}</TableCell>
                     </TableRow>
                 ))}
                 </TableBody>
             </Table>
         </Box>
         <Box sx={{justifyContent:'flex-start'}}>
             <Button type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
                 Exit
             </Button>
         </Box>
     </Container>
        );
    }

}
export default Client;
