# Handling big files with server

## Get Data & then run

`node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file`
`node index.js`
