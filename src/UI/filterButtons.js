import React from 'react';

import Box from '@mui/system/Box';
import Button from '@mui/material/Button';

function FilterButtons({ setFilter, unsetFilter }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: '20px', maxWidth: '350px'  }}>
      <Button variant="outlined" onClick={setFilter}>Filter</Button>
      <Button variant="outlined" onClick={unsetFilter}>Unset</Button>
    </Box>
  );
}

export default FilterButtons;
