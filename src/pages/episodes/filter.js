import React, { useState } from 'react';

import AccordionFilter from '../../UI/accordionFilters';
import TextFilter from '../../UI/textFilter';
import FilterButtons from '../../UI/filterButtons';

function Filter({ filterFunc }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const filterValue = event.target.value;
    setValue(filterValue);
  };

  const setFilter = () => {
    filterFunc(value);
  };

  const unsetFilter = () => {
    filterFunc('');
    setValue('');
  }

  return (
    <AccordionFilter>
      <TextFilter
        title="By name"
        value={value}
        onChange={handleChange}
        styles={{ display: 'flex', alignItems: 'center', gap:'20px' }}
      />
      <FilterButtons setFilter={setFilter} unsetFilter={unsetFilter} />
    </AccordionFilter>
  );
}

export default Filter;
