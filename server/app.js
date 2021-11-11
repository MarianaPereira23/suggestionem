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
  // const bandsMock = ['Band A', 'Band B', 'Band C', 'Band D', 'Band E', 'Band F'];
  res.type('application/json');
  return res.status(200).send(bands);
};

const getMusics = async (req, res) => {
  const whitePattern = /\s/g;
  const pattern = /'/g;
  const bandName = req.params.bandName.replace(whitePattern, '-').replace(pattern, '');
  const url = `https://api.deezer.com/artist/${bandName}`;
  const data = await fetcher(url);
  if (data.error) {
    return res.send('No results');
  }
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
  // const mockArtistInfo = {
  //   name: 'Temp',
  //   picture: 'https://picsum.photos/200/300',
  //   topTracks: ['1', '2', '3', '4', '5'],
  // };
  res.type('application/json');
  return res.status(200).send(artistInfo);
};

// routes/middlewares

app.get('/:bandName', getMusicSuggestions);
app.get('/:bandName/musics', getMusics);

app.listen(4000);
