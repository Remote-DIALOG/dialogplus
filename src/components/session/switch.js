import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CustomizedSwitches() {
  const [yes, setyes] = React.useState(false);
  const [no, setno] = React.useState(false);

  const handleChange = (event) => {
    console.log(event)
    // setChecked(event.target.checked);
  };
  return (
    <FormGroup>
      <Stack direction="row" spacing={1} alignItems="center">
      <FormControlLabel control={<Checkbox onChange={handleChange}/>} label="Yes"/>
        <FormControlLabel control={<Checkbox onChange={handleChange}/>} label="No"/>
      </Stack>
    </FormGroup>
  );
}
