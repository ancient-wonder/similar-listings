# Seabnb: Similar Listings Module

> This is a module built with Reactjs that displays recommended listings similar to the current listing being viewed on a page.

## Related Projects

  - https://github.com/SeaBNB/reviews
  - https://github.com/SeaBNB/Bookings
  - https://github.com/SeaBNB/amenities
  - https://github.com/SeaBNB/moriah-proxy

## Table of Contents

1. [Usage](#Usage)
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
2. Add environment variables  
  Create a `.env` file  in the project's root directory, and add values for `PORT`, `DB_NAME`, `HOST`, and `PROXY_PORT`, and save.  
    Example:
    ```
    PORT=3003
    DB_NAME=similar_listings
    HOST=localhost
    PROXY_PORT=3000
    ```
3. Build project  
   `npm run build`  
4. In a separate terminal window, Run mongoDB daemon  
   `mongod`  
5. Seed database  
   `npm run db:seed`  

### Viewing the module

1. If mongod is not currently running, run it:  
   `mongod`
2. From within the root directory, start the server:  
   `npm start`  
3. From your browser, open the module:  
   `http://localhost:3003`
