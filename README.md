# SBA 318 (Express Server Application)

## Description

This is an API for viewing artists works and details. It also allows for posting, editing, and deleting of artist details.  Additionally, it includes a form to sign up for email communication.

## Technology Used

HTML, CSS, JavaScript, Node, Express, EJS

## Installation and Methods

Files can be opened directly from my Github repository which is located here: https://github.com/Y-path/SBA_318

GET

The application runs by passing an artist name in the following query parameter: http://localhost:3000/api/works/artist/:artistName

artistName must be full name, first and last, separated by a space. It is not case sensitive. ex. /api/works/artist/Vincent van Gogh

There are currenty only 5 artists in the database, they are:

Vincent van Gogh,

Remedios Varo,

Claude Monet,

Jackson Pollock,

Mark Rothko

POST

Route for posting a new artist is: /api/artist

Accepted parameters for posting a new artist are: 

"name": ""

"movement": ""

Route for posting new artist details is: /api/details

Accepted parameters for posting new details are:

"artistName":

"born":

"died":

"activeYears":

"nationality":

"artMovement":

"field":

"wikipedia":

PATCH

Route for adding new artist details to existing artist is: api/details/:id

Accepted parameters for patching new details are:

"anything here":

DELETE

Route for deleting all artist details is: api/details/:id

This removes all details for specified artist ID

## Authors

John Nordloh

## License

This project is not licensed.

## Acknowledgements

https://www.w3schools.com/

https://developer.mozilla.org/

https://stackoverflow.com/

https://www.geeksforgeeks.org/

https://www.wikiart.org/

Google

Javascript Crash Course - book

Gradient effect forked and modified from fullpage.js

## Project Status

This project is complete and should function as intended.  The email will not actually sign the user up for any email communication because this is a test project.   
