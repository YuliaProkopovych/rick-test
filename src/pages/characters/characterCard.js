import React, { useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import CharacterFullInfo from './fullInfo';

function CharacterCard({ character }) {
  const [showCHaracterDetails, setShowCharacterDetails] = useState(false);

  const { name, image, species, origin } = character;

  const displayFullInfo = () => {
    setShowCharacterDetails(true);
    console.log('click');
  }

  const CloseFullInfo = () => {
    setShowCharacterDetails(false);
  }

  return (
    <>
    <Card
      sx={{ cursor: 'pointer' }}
      onClick={displayFullInfo}
    >
      <CardMedia
        component="img"
        alt={name}
        height="200"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {`${species} from ${origin.name}`}
        </Typography>
      </CardContent>
    </Card>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showCHaracterDetails}
        onClick={CloseFullInfo}
      >
        <CharacterFullInfo info={character} />
    </Backdrop>
  </>
  );
}

export default CharacterCard;
