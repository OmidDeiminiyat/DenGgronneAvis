import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from './EmailInput.module.scss';

export function BasicTextFields() {
  return (
    <Box
      component="form"  
      noValidate
      autoComplete="off" className={style.textfield}
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" /> <button>Tilneld</button>
    </Box>
  );
}
