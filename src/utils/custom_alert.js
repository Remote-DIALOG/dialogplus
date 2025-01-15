import React, { Component } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default class CustomAlert extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose(event, reason) {
    if (reason !== 'clickaway') {
      this.setState({
        open: false
      });
    }
  }
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={this.props.message}
        action={
          <IconButton
            key="close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    )
  }
}
