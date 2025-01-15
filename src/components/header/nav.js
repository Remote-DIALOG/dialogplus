import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {connect} from 'react-redux';
import {logout} from '../../reducers/login';
import AlertDialog from '../../utils/dialogbox';
import SelectDate from './SelectDate';
import Avatar from '@mui/material/Avatar';
import GroupIcon from '@mui/icons-material/Group';
class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openMenu: false,
          anchorEl:null,
          openDialog:false,
          selectDateDialog:false
        }
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlelogout = this.handlelogout.bind(this);
        this.handlexportData = this.handlexportData.bind(this);
    }
    handlexportData (event) {
      
      if (event.key === "Escape") {
        console.log("select date escape press")
        this.setState({selectDateDialog:false})
      }
      this.setState({selectDateDialog:!this.state.selectDateDialog})

    }
    handleMenu(event) {
      this.setState({anchorEl:event.currentTarget})
      //setTimeout(() =>  this.setState({anchorEl:event.currentTarget}), 1) 
    }
    handleClose () {
      //setTimeout(() => this.setState({anchorEl:null}), 1) 
      this.setState({anchorEl:null})
      this.props.nagivate('/profile')
    }
    handlelogout () {
      this.setState({openDialog:!this.state.openDialog})
    }
    render () {
        return (
          <div>
          <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar disableGutters>
            <Typography
            variant="h6"
            noWrap
            component="a"
            href={"/"+this.props.userinfo.category}
            sx={{
              ml: 2,
              flexGrow:1,
              // display: { xs: 'none', md: 'flex' },
              fontFamily: 'sans-serif',
              fontWeight: 500,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             DIALOG+
          </Typography>
              {/* <Typography variant="h6" component="a" sx={{ flexGrow: 1 }} href="#app-bar-with-responsive-menu">
                DIALOG+
              </Typography> */}
              {
                this.props.current_session[13].clinicianID && (
                  <GroupIcon/>
                )
              }
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
                {}<MenuItem onClick={this.handlexportData}>Export Data as Pdf</MenuItem>
              </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <AlertDialog open={this.state.openDialog} nagivate={this.props.nagivate} handleExit = {this.handlelogout}/> 
          <SelectDate close={this.handlexportData} open={this.state.selectDateDialog}/>
        </Box>
        </div>
        );
    }
}
const mapStateToProps = (state) => ({
  islogin:state.loginReducer.isLogin,
  current_session:state.SessionReducer.current_session,
  userinfo:state.loginReducer.userinfo
})
const mapDispatchToProps = {
  logout

}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)