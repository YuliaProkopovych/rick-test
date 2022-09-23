import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

function AddEpisodeForm({ onEpisodeSave }) {
  const [episodeName, setEpisodeName] = useState('');

  const changeEpisodeName = (event) => {
    setEpisodeName(event.target.value);
  }

  const handleSave = () => {
    onEpisodeSave(episodeName);
    setEpisodeName('');
  }

  return (
    <Paper sx={{ p: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Box>
        <Typography align="left" gutterBottom>Add new episode:</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap:'20px' }}>
        <TextField size="small" variant="outlined" label="Episode name" onChange={changeEpisodeName} value={episodeName} />
        <Button variant="outlined" onClick={handleSave}>Save</Button>
      </Box>
    </Paper>
  );
}

function Watchlist() {
  const [episodesList, setEpisodesList] = useState([]);

  useEffect(() => {
    const episodes = JSON.parse(localStorage.getItem('Watchlist'));
    if (episodes) {
      setEpisodesList(episodes);
    }
  }, []);

  const getAllEpisodes = () => {

  }

  const saveEpisode = (episodeName) => {
    const newWatchlist = [...episodesList, { 'name': episodeName, 'watched': false }];
    localStorage.setItem('Watchlist', JSON.stringify(newWatchlist));
    setEpisodesList(newWatchlist);
  }

  const deleteEpisode = (name) => {
    const newWatchlist = episodesList.filter(episode => (episode.name !== name));
    localStorage.setItem('Watchlist', JSON.stringify(newWatchlist));
    setEpisodesList(newWatchlist);
  }

  const changeEpisodeStatus = (newStatus, episodeName) => {
    console.log(newStatus);
    const newWatchlist = episodesList.map(episode => {
      if(episode.name === episodeName) {
        return { 'name': episodeName, 'watched': newStatus }
      }
      return episode;
    });
    localStorage.setItem('Watchlist', JSON.stringify(newWatchlist));
    setEpisodesList(newWatchlist);
  }

  return (
    <Stack>
      <AddEpisodeForm onEpisodeSave={saveEpisode} />
      {episodesList.length === 0 ? (
        <Typography>Your watchlist is empty!</Typography>
      ) : (
        <List>
          {episodesList.map((episode) => (
            <ListItem
              secondaryAction={

                <IconButton edge="end" onClick={() => deleteEpisode(episode.name)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={episode.watched}
                  tabIndex={-1}
                  disableRipple
                  onChange={(event) => changeEpisodeStatus(event.target.checked, episode.name)}
                />
              </ListItemIcon>
              <ListItemText
                primary={episode.name}
              />
            </ListItem>
          ))}
        </List>
        )}
    </Stack>
  );
}

export default Watchlist;
