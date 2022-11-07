import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {connect} from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import TableFooter from '@mui/material/TableFooter';
import Result from './result';
 class Discuss extends React.Component {
     constructor(props) {
         super(props) 
         this.state = {
             rowsPerPage : 1,
             pages: 0
         }
         this.handleChangePage = this.handleChangePage.bind(this)
         this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
     }
     handleChangePage (event, newPage) {
         this.setState({pages:newPage})
     }
     handleChangeRowsPerPage (event) {
        this.setState({rowPerPage: parseInt(event.target.value, 10)});
        this.setState({pages:0});
      };
     render () {
        let rows = this.props.session.select_scale 
        let rowsPerPage  = this.state.rowsPerPage
        let page = this.state.pages
        const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

        return (
        <Container maxWidth={false}>
            <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'row', justifyContent:'space-between'}}>
                <Box sx={{margin:2}}><Typography variant='h4'>Discuss</Typography></Box>
                <Button  variant="contained"sx={{ mt: 3, mb: 2 }}>Finish</Button>
            </Box>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                    {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
                        <Box>
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                <Typography variant='h5'> {row.name}</Typography>
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                <Typography variant='h5'>{row.value}</Typography>
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                <Result progress={(row.value/7)*100}/>
                            </TableCell>
                        </TableRow>
                        <TableRow scope='column'>
                            <TableCell style={{width: '100%'}} align='center'>
                                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <Typography variant='h5'>Understanding</Typography>
                                    <List sx = {{listStyleType: 'disc', pl: 2, '& .MuiListItem-root': {display: 'list-item',},}}>
                                        <ListItem>
                                            Why is this rating and not a lower one?
                                        </ListItem>
                                        <ListItem>
                                            What is working?
                                        </ListItem>
                                    </List>
                                    <Typography variant='h5'>Looking forward</Typography>
                                    <List sx = {{listStyleType: 'disc', pl: 2, '& .MuiListItem-root': {display: 'list-item',},}}>
                                        <ListItem>
                                            Best case scenario
                                        </ListItem>
                                        <ListItem>
                                            Smallest improvement
                                        </ListItem>
                                    </List>
                                    <Typography variant='h5'>Considering options</Typography>
                                    <List sx = {{listStyleType: 'disc', pl: 2, '& .MuiListItem-root': {display: 'list-item',},}}>
                                        <ListItem>
                                          What can the patient do?
                                        </ListItem>
                                        <ListItem>
                                           What can the clinician do?
                                        </ListItem>
                                        <ListItem>
                                            What can others do?
                                        </ListItem>
                                    </List>
                                    <Typography variant='h5'>Agreeing on action</Typography>
                                    
                                </Box>
                            </TableCell>
                        </TableRow>
                    </Box>
                    ))}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[1]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={this.handleChangePage}
                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
    </Container>
  );
}
}
const mapStateToProps = (state) => ({
    current_session:state.SessionReducer.current_session,
    session:state.SessionReducer,
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Discuss);
