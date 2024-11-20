const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const error = require("../utilities/error");

const artistsPath = path.join(__dirname, "../data", "artists.json");
const worksPath = path.join(__dirname, "../data", "works.json");
const detailsPath = path.join(__dirname, "../data", "details.json");

// GET

router
.get("/works/artist/:artistName", (req, res) => {
    const { artistName } = req.params;

    fs.readFile(artistsPath,(err, artistsData) => {
        if (err) return res.status(500).send('Error reading artists data');
    
        const artists = JSON.parse(artistsData);
        const artist = artists.find(a => a.name.toLowerCase() === artistName.toLowerCase());
    
        if (!artist) return next(error(404,"Artist not found"));

    fs.readFile(worksPath, (err, worksData) => {
        if (err) return next(error(500,"Error reading works data"));
      
        let works = JSON.parse(worksData).filter(work => work.artistId === artist.id);

    fs.readFile(detailsPath, (err, detailsData) => {
        if (err) return next(error(500,"Error reading details data"));
        
        const details = JSON.parse(detailsData).filter(details => works.some(work => work.artistId === details.id));
        
        res.render("artists", {
            artist: artist.name,
            works: works,
            details: details
     });
    });
  });
    });
  });  

// POST 

router
.post("/artist", (req, res) => {
  const { name, movement } = req.body;

fs.readFile(artistsPath, (err, artistsData) => {
  if (err) return next(error(500,"Error reading artists data"));

  const artists = JSON.parse(artistsData);
  const newArtist = {
    id: artists.length + 1,
    name,
    movement
    
  };
  artists.push(newArtist);

  fs.writeFile(artistsPath, JSON.stringify(artists, null, 2), (err) => {
    if (err) return next(error(500,"Error saving artists data")); 
    
  });
});
});
router
.post("/details", (req, res) => {
  const { artistName, born, died, activeYears, nationality, artMovement, field, wikipedia } = req.body;

fs.readFile(detailsPath, (err, detailsData) => {
  if (err) return next(error(500,"Error reading artists data"));

  const details = JSON.parse(detailsData);
  const newDetail = {
    id: details.length + 1, 
    artistName,
    born,
    died,
    activeYears,
    nationality,
    artMovement,
    field,
    wikipedia,
    workId: details.length + 1
      
    };
    
  details.push(newDetail);
  // console.log(newDetail);
  fs.writeFile(detailsPath, JSON.stringify(details, null, 2), (err) => {
    if (err) return next(error(500,"Error saving details data")); 
    
  });
});
}); 

// PATCH

router
.patch("/details/:id", (req, res) => {
  const detailId = parseInt(req.params.id); 
  const updates = req.body; 
  
  fs.readFile(detailsPath, (err, detailsData) => {
      if (err) return next(error(500,"Error reading details data"));

      let details = JSON.parse(detailsData); 
      
      const detailIndex = details.findIndex(d => d.id === detailId);

      if (detailIndex === -1) {
          return next(error(404,"Details not found"));
      }
      
      let detail = details[detailIndex];
      
      for (let key in updates) {
          if (detail.hasOwnProperty(key)) {
              detail[key] = updates[key];
          }
      }
      
      details[detailIndex] = detail; 
      fs.writeFile(detailsPath, JSON.stringify(details, null, 2), (err) => {
          if (err) return next(error(500,"Error saving details data"));
          res.status(200).json(detail); 
      });
  });
});

// DELETE

router
.delete("/details/:id", (req, res, next) => {
  const detailId = parseInt(req.params.id); 
  
  fs.readFile(detailsPath, (err, detailsData) => {
      if (err) return next(error(500, "Error reading details data"));

      let details;
      try {
          details = JSON.parse(detailsData); 
      } catch (parseErr) {
          return next(error(500, "Error parsing details data"));
      }
      
      const filteredDetails = details.filter(d => d.id !== detailId);
      
      if (filteredDetails.length === details.length) {
          return next(error(404, "Details not found"));
      }
      
      fs.writeFile(detailsPath, JSON.stringify(filteredDetails, null, 2), (err) => {
          if (err) return next(error(500, "Error saving details data"));
          
          res.status(200).json({ message: "Artist details for this ID have been deleted." });
      });
  });
});

module.exports = router;


// Everything I could not get to work is below

//   const detailId = parseInt(req.params.id); 
     
//   fs.readFile(detailsPath, (err, detailsData) => {
//       if (err) return next(error(500,"Error reading details data"));

//       let details = JSON.parse(detailsData); 
      
//       const detailIndex = details.findIndex(d => d.id === detailId);

//       if (detailIndex === -1) {
//           return next(error(404,"Details not found"));
//       }
      
//       let detail = details[detailIndex];
                  
//       details[detailIndex] = detail; 
//       if (detailIndex !== -1) {
//           details.splice(detailIndex, 1);
//           res.status(200).json({ message: `Artist ${detailId} has been deleted.`});
//         } else {
//            return next(error(404,`Artist ${detailId} not found`));
        
//  } 
// });
// });

// router
// .delete("/details/:id", (req, res) => {
// const detailId = parseInt(req.params.id);

// fs.readFile(detailsPath, (err, detailsData) => {
//   if (err) return next(error(500,"Error reading details data"));

//   let details = JSON.parse(detailsData); 

// const detailIndex = details.findIndex(d => d.id === detailId); 

// } else if (detailIndex !== -1) {
//   details.splice(detailIndex, 1);
//   res.status(200).json({ message: `Artist ${detailId} has been deleted.`});
// } else {
//    return next(error(404,`Artist ${detailId} not found`));

// });
// });
// });

//    const updates = req.body; 
  
//   fs.readFile(detailsPath, (err, detailsData) => {
//       if (err) return next(error(500,"Error reading details data"));

//       const artistId = req.params.id;
//       const updatedData = req.body;

//       res.status(200).json(updatedArtist);
//   } catch (err) {
//       console.error(err);
//    
//   }
// });

// router.delete('/artist/:artistName', (req, res) => {
//   const { artistName } = req.params;

//     const artistIndex = artists.findIndex(a => a.name.toLowerCase() === artistName.toLowerCase());

//     if (artistIndex === -1) return res.status(404).send('Artist not found');

// router.put('/artist/:artistName', (req, res) => {
//   const { artistName } = req.params;
//   const { details } = req.body;

//     const artists = JSON.parse(artistsData);
//     const artistIndex = artists.findIndex(a => a.name.toLowerCase() === artistName.toLowerCase());

//     if (artistIndex === -1) return res.status(404).send('Artist not found');

//   });
// });

  



  