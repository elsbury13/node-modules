# Creates a tcp server

## Run
`node -e "process.stdin.pipe(net.connect(3000)).pipe(process.stdout)"`

### Disclaimer
Requires tcp-server to be running in a terminal
