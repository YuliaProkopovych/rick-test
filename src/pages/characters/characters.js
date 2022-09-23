import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import CharacterCard from './characterCard';
import Filter from './filter';

const getCharactersData = async (page, filterObj) => {
  console.log(filterObj);
  let url = `https://rickandmortyapi.com/api/character?page=${page}`;

  if(Object.keys(filterObj).length !== 0) {
    let filterString = '';
    for (let key in filterObj) {
      if(filterObj[key] !== '') {
        filterString = `${filterString}&${key}=${encodeURIComponent(filterObj[key])}`;
      }
    }
    url = `${url}${filterString}`
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    const charactersData = { pages: data?.info.pages, characters: data?.results, error: ''};
    return charactersData;
  } else {
    let error = 'Oops! We are having some problems. Please try again later!'
    if (response.status === 404 && Object.keys(filterObj).length !== 0) {
      error = 'Looks like there\'s no characters matching your filter criteria!'
    }
    return { pages: 1, characters: [], error };
  }
}

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [filterObject, setFilterObject] = useState({});
  const [error, setError] = useState('');

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filterCharacters = ( filterObj ) => {
    setFilterObject(filterObj);
  }

  useEffect(() => {
    async function getCharacters() {
      const data = await getCharactersData(page, filterObject);
      const { characters, pages, error } = data;
      setError(error);
      setCharacters(characters);
      setPagesNumber(pages);
    }
    getCharacters();
  }, [page, filterObject]);

  return (
    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <Filter onFilter={filterCharacters} />
      {error === '' ? (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, 260px)',
            justifyContent: 'center',
          }}
        >
          {characters.map((character) => (
            <CharacterCard character={character} />
          ))}
        </Box>
      ) : (
        <Box>
          <Typography>{error}</Typography>
        </Box>
      )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px'  }}>
        <Pagination count={pagesNumber} page={page} onChange={handleChange} />
      </Box>
    </Stack>
  );
}

export default Characters;
