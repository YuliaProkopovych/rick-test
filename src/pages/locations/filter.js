import React, { useState } from 'react';

import Box from '@mui/system/Box';

import AccordionFilter from '../../UI/accordionFilters';
import TextFilter from '../../UI/textFilter';
import FilterButtons from '../../UI/filterButtons';

const textFilterStyles = {
  display: 'flex',
  alignItems: 'center',
  gap:'20px',
  minWidth: '350px',
  justifyContent: 'space-between',
}

function Filter({ onFilter }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  const handleTypeInput = (event) => {
    setType(event.target.value);
  };

  const handleDimensionInput = (event) => {
    setDimension(event.target.value);
  };

  const setFilter = () => {
    onFilter({ name, type, dimension });
  };

  const unsetFilter = () => {
    onFilter({ name: '', type: '', dimension: '' });
    setName('');
    setType('');
    setDimension('');
  }

  return (
    <AccordionFilter>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap:'20px' }}>
      <TextFilter styles={textFilterStyles} value={name} title="By name" onChange={handleNameInput} />
      <TextFilter styles={textFilterStyles} value={type} title="By type" onChange={handleTypeInput} />
      <TextFilter styles={textFilterStyles} value={dimension} title="By dimension" onChange={handleDimensionInput} />
    </Box>
    <FilterButtons setFilter={setFilter} unsetFilter={unsetFilter} />
    </AccordionFilter>
  );
}

export default Filter;
