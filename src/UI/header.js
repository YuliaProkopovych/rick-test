import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'end', gap: '20px', backgroundColor: '#f0f0f0', p: '10px' }}>
      <Box
          component="img"
          sx={{
            height: 150,
            width: 150,
          }}
          alt='rick and morty'
          src='https://rickandmortyapi.com/api/character/avatar/19.jpeg'
        />

      <Typography
        variant="h1"
        sx={{
          color: '#333',
        }}
      >
        Rick and Morty
      </Typography>
    </Box>
  );
}

export default Header;
