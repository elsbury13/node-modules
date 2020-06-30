# Malicious input

## How to run
`node index.js`

## Another tab
`curl http://localhost:3000/?msg=hello`
Should see
`HELLO`

## Or to use just node
`node -e "require('http').get('http://localhost:3000/?msg=hello', (res) => res.pipe(process.stdout))"`



## How to run (fixed for Denial of Service attack)
`node index-fixed.js`

## Another tab
`curl -g http://localhost:3000/?msg[]=hello`
Should see
`HELLO`

## Or to use just node
`node -e "require('http').get('http://localhost:3000/?msg[]=hello', (res) => res.pipe(process.stdout))"`



## How to run buffer
`node index-buffer.js`

## Another tab
`curl -H "Content-Type: application/json" -X POST -d '{"cmd": "add", "friend": 10240}' http://127.0.0.1:3000`


## How to run buffer fixed with catching errors
`node index-buffer-fixed.js`

## Another tab
`curl -H "Content-Type: application/json" -X POST -d '{"cmd": "add", "friend": 10240}' http://127.0.0.1:3000`
will return
{"ok": false}
