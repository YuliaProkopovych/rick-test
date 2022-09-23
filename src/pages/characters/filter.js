import React, { useState } from 'react';

import Box from '@mui/system/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import AccordionFilter from '../../UI/accordionFilters';
import TextFilter from '../../UI/textFilter';
import FilterButtons from '../../UI/filterButtons';

const formLabelStyles = {
  color: 'rgba(0, 0, 0, 0.87)',
}

const formControlStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap:'20px',
}

function Filter({ onFilter }) {
  const [species, setSpecies] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  const genders = ['Male', 'Female', 'Genderless', 'unknown'];
  const statuses = ['Alive', 'Dead', 'unknown'];

  const handleInput = (event) => {
    setSpecies(event.target.value);
  };

  const setFilter = () => {
    let filterObject = { 'species': species };
    filterObject['status'] = selectedStatus === 'All' ? '' : selectedStatus;
    filterObject['gender'] = selectedGender === 'All' ? '' : selectedGender;
    onFilter(filterObject);
  };

  const unsetFilter = () => {
    setSpecies('');
    setSelectedStatus('All');
    setSelectedGender('All');
    onFilter({ species: '', gender: '', status: '' });
  }

  const handleStatusFilter = (event) => {
    setSelectedStatus(event.target.value);
  }

  const handleGenderFilter = (event) => {
    setSelectedGender(event.target.value);
  }

  return (
    <AccordionFilter>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap:'20px' }}>
        <TextFilter
          styles={{ display: 'flex', alignItems: 'center', gap:'20px' }}
          title="By species"
          value={species}
          onChange={handleInput}
        />
        <FormControl sx={formControlStyles}>
          <FormLabel sx={formLabelStyles} id="gender-radio-buttons">By gender:</FormLabel>
          <RadioGroup
            aria-labelledby="filter-by-gender"
            name="gender"
            sx={{ display: 'flex', flexDirection: 'row' }}
            value={selectedGender}
            onChange={handleGenderFilter}
          >
            { genders.map((gender) => (
              <FormControlLabel value={gender} control={<Radio />} label={gender} />
            ))}
            <FormControlLabel value="All" control={<Radio />} label="All" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={formControlStyles}>
          <FormLabel sx={formLabelStyles} id="status-radio-buttons">By status:</FormLabel>
          <RadioGroup
            aria-labelledby="filter-by-status"
            name="status"
            sx={{ display: 'flex', flexDirection: 'row' }}
            value={selectedStatus}
            onChange={handleStatusFilter}
          >
            { statuses.map((status) => (
              <FormControlLabel value={status} control={<Radio />} label={status} />
            ))}
            <FormControlLabel value="All" control={<Radio />} label="All" />
          </RadioGroup>
        </FormControl>
        <FilterButtons setFilter={setFilter} unsetFilter={unsetFilter} />
      </Box>
    </AccordionFilter>
  );
}

export default Filter;
