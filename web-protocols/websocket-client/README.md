# Websocket Client

## How to run
Run `node server.js` in a tab in directory websocket-app

Run `node index.js` in another tab in this directory

Type `Hello` in this directory tab

-- Connected --

-> Hello
<= Hello
=> Websockets!

## How to get errors
Try running `node index.js` without `node server.js`
Should see an error

-- Error --
Error: connect ECONNREFUSED 127.0.0.1:8080
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1128:14)
-- Disconnected --

## How to run other websocket servers
Run `node index.js ws://echo.websocket.org` in this directory

Type `echo :)`

-- Connected --

-> echo :)
<= echo :)
=> echo :)
