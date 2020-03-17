# Web App using Express

## How to run
`node index.js`

## To stop the running of the app
`lsof -i:3000`
`kill -9 [PID]`

## View
http://localhost:3000

## Test headers
`curl -I http://localhost:3000`

Will see
HTTP/1.1 200 OK
X-Powered-By: Express
X-Answer: 42
Content-Type: text/html; charset=utf-8
Content-Length: 226
ETag: W/"e2-olBsieaMz1W9hKepvcsDX9In8pw"
Date: Thu, 13 Apr 2017 19:40:01 GMT
Connection: keep-alive

With our `X-Answer` present
