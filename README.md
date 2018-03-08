# Seabnb: Similar Listings Module

> This is a module built with Reactjs that displays recommended listings similar to the current listing being viewed on a page.

## Related Projects

  - https://github.com/SeaBNB/reviews
  - https://github.com/SeaBNB/Bookings
  - https://github.com/SeaBNB/amenities
  - https://github.com/SeaBNB/moriah-proxy

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Navigating to root url in browser (`http://localhost:3003/`) will display similar listings based on a random valid id number.  

> You can alternatively navigate to `http://localhost:3003/listings/:id`, where id is an integer between 0 and 199 (inclusive). This will show the specific recommendations associated with that listing id.

## Requirements

- Node ^9.5.0 (An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm))

## Development

### Setup

From within the root directory:

1. Install dependencies  
   `npm install`  
2. Add environment variables. Create a `.env` file  in the project's root directory, and add values for the following, and save:  
   - `PORT` (port to serve up this module)
   - `DB_NAME`
   - `HOST`
   - `PROXY_PORT` (port where your proxy server will be located)  
   - Example:
     ```
     PORT=3003
     DB_NAME=similar_listings
     HOST=localhost
     PROXY_PORT=3000
     ```
3. Build project  
   `npm run build` (or `npm run build:watch` to watch for client-side changes)  
4. In a separate terminal window, Run mongoDB daemon (if not already running) 
   `mongod`  
5. Seed database  
   `npm run db:seed`  

### Viewing the module on its own

1. If mongod is not currently running, run it:  
   `mongod`
2. From within the root directory, start the server:  
   `npm start` (or `npm run start:watch` to watch for server-side changes ) 
3. From your browser, open the module:  
   `http://localhost:3003` or `http://localhost:PORT` where PORT is whatever you set as the module's port
   
### Integrating into a proxy server

1. Complete steps 1 and 2 from [Viewing the module on its own](#viewing-the-module-on-its-own)
2. In your proxy server html file, add the following wherever appropriate (PORT should be the port you set as the module's port):
   - `<link href="http://localhost:PORT/dist/bundle.css" rel="stylesheet">`
   - `<script src="http://localhost:PORT/dist/bundle.js"></script>`
   - Use `ReactDom.render` to render the `SimilarListings` react component, and pass in an `id` prop. For example:
     ```
     ReactDOM.render(
       React.createElement(SimilarListings, { id: listingId }),
       document.getElementById('similar-listings'),
     );
     ```
