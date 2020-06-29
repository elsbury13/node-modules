# Web App using Express and postables
This example is for demonstration purposes only! Never place user input directly into HTML output in production without sanitizing it first. Otherwise, we make ourselves vulnerable to XSS attacks.

## How to run
`node index.js`

## Change to Production
`NODE_ENV=production node index.js`

## To stop the running of the app
`lsof -i:3000`
`kill -9 [PID]`

## View
http://localhost:3000
