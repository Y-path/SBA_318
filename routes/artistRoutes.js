const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();


const artistsPath = path.join(__dirname, '../data', 'artists.json');
const worksPath = path.join(__dirname, '../data', 'works.json');
const detailsPath = path.join(__dirname, '../data', 'details.json');

router.get('/works/artist/:artistName', (req, res) => {
    const { artistName } = req.params;


    fs.readFile(artistsPath, 'utf8', (err, artistsData) => {
        if (err) return res.status(500).send('Error reading artists data');
    
        const artists = JSON.parse(artistsData);
        const artist = artists.find(a => a.name.toLowerCase() === artistName.toLowerCase());
    
        if (!artist) return res.status(404).send('Artist not found');

    fs.readFile(worksPath, 'utf8', (err, worksData) => {
        if (err) return res.status(500).send('Error reading works data');
      
        let works = JSON.parse(worksData).filter(work => work.artistId === artist.id);

    fs.readFile(detailsPath, 'utf8', (err, detailsData) => {
        if (err) return res.status(500).send('Error reading details data');
        
        const details = JSON.parse(detailsData).filter(details => works.some(work => work.artistId === details.id));

        
        res.render('artists', {
            artist: artist.name,
            works: works,
            details: details
          });
        });
      });
    });
  });     

  module.exports = router;