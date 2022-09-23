import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';

function TextFilter({ title, value, onChange, styles }) {

  return (
    <Box sx={styles}>
      <Box><Typography>{title}</Typography></Box>
      <TextField size="small" variant="outlined" value={value} onChange={onChange}/>
    </Box>
  );
}

export default TextFilter;
