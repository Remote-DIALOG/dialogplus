import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {connect} from 'react-redux';
import {logout} from '../../reducers/login';
import AlertDialog from '../../utils/dialogbox';
class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openMenu: false,
          anchorEl:null,
          openDialog:false
        }
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlelogout = this.handlelogout.bind(this);
    }
    handleMenu(event) {
      console.log('handle menu')
      this.setState({anchorEl:event.currentTarget})
    }
    handleClose () {
      console.log('handle close')
      this.setState({anchorEl:null})
    }
    handlelogout () {
      this.setState({openDialog:!this.state.openDialog})
    }
    render () {
        return (
          <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                DIALOG+
              </Typography>
              {this.props.islogin && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                <AccountCircle />
              </IconButton>
                  <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handlelogout}>Logout</MenuItem>
              </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <AlertDialog open={this.state.openDialog} nagivate={this.props.nagivate} handleExit = {this.handlelogout}/> 
        </Box>
        );
    }
}
const mapStateToProps = (state) => ({
  islogin:state.loginReducer.isLogin
})
const mapDispatchToProps = {
  logout

}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)