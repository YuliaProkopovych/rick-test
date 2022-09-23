import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Filter from './filter';


const getEpisodesData = async (page, filterValue) => {

  let url = `https://rickandmortyapi.com/api/episode?page=${page}`;
  if(filterValue) {
    url = `${url}&name=${encodeURIComponent(filterValue)}`
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    const episodesData = { pages: data?.info.pages, episodes: data?.results, error: ''};

    return episodesData;
  } else {
    let error = 'Oops! We are having some problems. Please try again later!'
    if (response.status === 404 && filterValue !== '') {
      error = 'Looks like there\'s no episodes matching your filter criteria!'
    }
    return { pages: 1, episodes: [], error };
  }
}

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [pagesNumber, setPagesNumber] = useState(1);
  const [nameFilter, setNameFilter] = useState('');

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filterByName = async (filterValue) => {
    setNameFilter(filterValue);
  }

  useEffect(() => {
    async function getEpisodes() {
      const data = await getEpisodesData(page, nameFilter);
      const { episodes, pages, error } = data;
      setError(error);
      setEpisodes(episodes);
      setPagesNumber(pages);
    }
    getEpisodes();
  }, [page, nameFilter]);

  return (
    <Stack spacing={2}>
      <Filter filterFunc={filterByName} />
      {error === '' ? (
        <TableContainer component={Paper}>
          <Table aria-label="episodes table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Air date</TableCell>
                <TableCell align="center">Episode code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {episodes.map((episode) => (
                <TableRow
                  key={episode.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {episode.name}
                  </TableCell>
                  <TableCell align="center">{episode.air_date}</TableCell>
                  <TableCell align="center">{episode.episode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography>{error}</Typography>
        </Box>
      ) }
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
        <Pagination count={pagesNumber} page={page} onChange={handleChange} />
      </Box>
    </Stack>
  );
}

export default Episodes;
