import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
            Add new Notes
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Add new notes</DialogTitle>
        <DialogContent>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
        />
      </div>
    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add notes</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
