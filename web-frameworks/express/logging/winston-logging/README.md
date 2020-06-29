# Web App using Express with winston logging

## How to run
`node index.js`

## Change to Production
This will remove styling, as static assets are served in development mode
and link tag will generate 404 as it tries to go to public/styles.css

`NODE_ENV=production node index.js`

## To stop the running of the app
`lsof -i:3000`
`kill -9 [PID]`

## View
http://localhost:3000
