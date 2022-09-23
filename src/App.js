import './App.css';

import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Tab from '@mui/material/Tab';
import { TabPanel, TabContext, TabList } from '@mui/lab';

import React, { useState } from 'react';

import Characters from './pages/characters/characters';
import Episodes from './pages/episodes/episodes';
import Locations from './pages/locations/locations';
import Watchlist from './pages/watchlist/watchlist';
import Header from './UI/header';

const panelStyles = {
  backgroundColor: '#f0f0f0'
}

function App() {
  const [tabNumber, setTabNumber] = useState('0');

  const handleChange = (event, newValue) => {
    setTabNumber(newValue);
  }

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100%" }}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
        <Header />
        <TabContext value={tabNumber}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
            <TabList onChange={handleChange}>
              <Tab label="Characters" value="0" />
              <Tab label="Episodes" value="1" />
              <Tab label="Locations" value="2" />
              <Tab label="Watchlist" value="3" />
            </TabList>
          </Box>
          <TabPanel sx={panelStyles} value='0'>
            <Characters />
          </TabPanel>
          <TabPanel sx={panelStyles} value='1'>
            <Episodes />
          </TabPanel>
          <TabPanel sx={panelStyles} value='2'>
            <Locations />
          </TabPanel>
          <TabPanel sx={panelStyles} value='3'>
            <Watchlist />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}

export default App;
