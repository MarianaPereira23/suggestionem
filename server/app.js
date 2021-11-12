const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const ApiKey = '426827-suggesti-M6VY2QDY';

const fetcher = async url => {
  const data = await axios.get(url);
  return data.data;
};

const tasteDiveDataValidation = bandData => {
  if (!bandData.length) {
    return 'No results';
  }
  const bandsList = bandData.map(band => {
    if (band.Type !== 'music') {
      return 'No results';
    }
    return band.Name;
  });
  return bandsList;
};

const getMusicSuggestions = async (req, res) => {
  const bandName = req.url.replace('/', '');
  const url = `https://tastedive.com/api/similar?q=${bandName}&k=${ApiKey}`;
  const data = await fetcher(url);
  const musicSuggestions = data.Similar.Results;
  const bands = tasteDiveDataValidation(musicSuggestions, res);
  res.type('application/json');
  return res.status(200).send(bands);
};

const bandValidation = band => {
  const singleQuotePattern = /(')/g;
  const whiteSpacePattern = /\s/g;
  let bandName = band.replace('.', ' ')
    .replace(singleQuotePattern, '')
    .trim()
    .replace(whiteSpacePattern, '-')
    .toLowerCase();
  if (bandName === '30-seconds-to-mars') {
    bandName = 'thirty-seconds-to-mars';
  }
  if (bandName === 'motörhead') {
    bandName = 'motorhead';
  }
  return bandName;
};

const getMusics = async (req, res) => {
  const { bandName } = req.params;
  const band = bandValidation(bandName);
  const url = `https://api.deezer.com/artist/${band}`;
  const data = await fetcher(url);
  if (data.error) {
    return res.send('No results');
  }
  const tracklistUrl = data.tracklist.slice(0, -1);
  const bandPictureUrl = data.picture_medium;
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
  return res.status(200).send(artistInfo);
};

app.get('/:bandName', getMusicSuggestions);
app.get('/:bandName/musics', getMusics);

app.listen(4000);
