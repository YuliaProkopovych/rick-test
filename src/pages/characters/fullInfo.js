import React from 'react';

import Box from '@mui/system/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function CharacterFullInfo({ info }) {
  return (
    <Paper>
      <Box sx={{
        display: 'flex',
        p: '10px',
        flexDirection: { xs: 'column', sm: 'row' },
      }}>
        <Box
          component="img"
          sx={{
            height: 300,
            width: 300,
            maxHeight: { xs: 300, md: 300 },
            maxWidth: { xs: 300, md: 300 },
          }}
          alt={info.name}
          src={info.image}
        />
        <Box sx={{ maxWidth: '300px'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', p: '20px' }}>
            <Typography variant="h5" component="div">{info.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {info.species}
              {info.type !== '' && `, ${info.type}` }
              {info.gender !== 'unknown' ? ` (${info.gender})` : ' (gender unknown)'}
              {info.origin.name !== 'unknown' ? ` from ${info.origin.name}` : ', origin unknown'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vital status: {info.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {info.location.name !== 'unknown' && `Last known location: ${info.location.name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Appears in {info.episode.length} episode{info.episode.length !== 1 && 's'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default CharacterFullInfo;
