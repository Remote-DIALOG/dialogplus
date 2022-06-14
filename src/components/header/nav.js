import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed'>
          <Container maxWidth="xl">
          <Toolbar>
            <Typography variant='h6' noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'BlinkMacSystemFont',
              fontWeight: 1000,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >Dialog+</Typography>
          </Toolbar>
          </Container>
        </AppBar>
        </Box>
        );
    }
}
export default NavBar