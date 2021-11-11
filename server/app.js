const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const ApiKey = '426827-suggesti-M6VY2QDY';

const fetcher = async url => {
  const data = await axios.get(url);
  return data.data;
};

const getMusicSuggestions = async (req, res) => {
  const bandName = req.url.replace('/', '');
  const url = `https://tastedive.com/api/similar?q=${bandName}&k=${ApiKey}`;
  const data = await fetcher(url);
  const musicSuggestions = data.Similar.Results;
  if (!musicSuggestions.length) {
    return res.sendStatus(404);
  }
  const bands = musicSuggestions.map(band => {
    if (band.Type !== 'music') {
      return res.sendStatus(404);
    }
    return band.Name;
  });
  res.type('application/json');
  return res.status(200).send(bands);
};

const getMusics = async (req, res) => {
  const bandName = req.params.bandName.replace(' ', '-');
  const url = `https://api.deezer.com/artist/${bandName}`;
  const data = await fetcher(url);
  const tracklistUrl = data.tracklist.slice(0, -1);
  const bandPictureUrl = data.picture;
  const { name } = data;
  const topTracksData = await fetcher(tracklistUrl);
  const tracksData = topTracksData.data;
  const tracks = tracksData.map(track => track.title_short);
  const artistInfo = {
    name,
    picture: bandPictureUrl,
    topTracks: tracks,
  };
  res.type('application/json');
  res.status(200).send(artistInfo);
};

// routes/middlewares

app.get('/:bandName', getMusicSuggestions);
app.get('/:bandName/musics', getMusics);

app.listen(4000);
