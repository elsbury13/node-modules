# Simple HTTP Server

## How to run
In 1st tab
`node index.js` or `node terser-index.js` - to no longer parse querystrings

In 2nd tab
`curl http://localhost:8080/users?type=blue'

{"data": [{"id":2,"first_name":"Jane","last_name":"Smith","type":"blue"}]}

`curl http://localhost:8080/'

{"name": "my-test-server", "version": 0}
