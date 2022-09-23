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

const getLocationsData = async (page, filterObj) => {
  let url = `https://rickandmortyapi.com/api/location?page=${page}`;
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
    const locationsData = { pages: data?.info.pages, locations: data?.results, error: ''};
    return locationsData;
  } else {
    let error = 'Oops! We are having some problems. Please try again later!'
    if (response.status === 404 && filterObj.keys.length !== 0) {
      error = 'Looks like there\'s no locations matching your filter criteria!'
    }
    return { pages: 1, locations: [], error };
  }
}

function Locations() {
  const [error, setError] = useState('');
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(1);
  const [filterObject, setFilterObject] = useState({});

  const changePage = (event, value) => {
    setPage(value);
  };

  const filterLocations = ( filterObj ) => {
    setFilterObject(filterObj);
  }

  useEffect(() => {
    async function getLocations() {
      const data = await getLocationsData(page, filterObject);
      const { locations, pages, error } = data;
      setLocations(locations);
      setError(error);
      setPagesNumber(pages);
    }
    getLocations();
  }, [page, filterObject]);

  return (
    <Stack>
      <Box xs={{ flexGrow: '1' }}>
      <Filter onFilter={filterLocations} />
      {error === '' ? (
        <TableContainer component={Paper}>
          <Table aria-label="locations table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Dimension</TableCell>
                <TableCell align="center">Number of residents</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location) => (
                <TableRow
                  key={location.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{location.name}</TableCell>
                  <TableCell align="center">{location.type}</TableCell>
                  <TableCell align="center">{location.dimension}</TableCell>
                  <TableCell align="center">{location.residents.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography>{error}</Typography>
        </Box>
      )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
        <Pagination count={pagesNumber} page={page} onChange={changePage} />
      </Box>
    </Stack>
  );
}

export default Locations;
