# Http Benchmarking

## Before (install load testing tool) & jade
`npm install -g autocannon`

## Before (install load testing tool)
`npm install -g jade`

## Run
`node server`

## Another tab
`autocannon -c 100 http://localhost:3000/hello`

Should see something like this
┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 3 ms │ 4 ms │ 5 ms  │ 8 ms │ 4.05 ms │ 1.26 ms │ 62.78 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬──────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg      │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┼─────────┤
│ Req/Sec   │ 16095   │ 16095   │ 23455   │ 23535   │ 22734.19 │ 2103.29 │ 16095   │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┼─────────┤
│ Bytes/Sec │ 6.73 MB │ 6.73 MB │ 9.81 MB │ 9.84 MB │ 9.5 MB   │ 879 kB  │ 6.73 MB │

Req/Bytes counts sampled once per second.

0 2xx responses, 250064 non 2xx responses
250k requests in 11.05s, 105 MB read

### -c 100 command
The -c 100 flag instructs autocannon to open 100 sockets and connect them to our server.

### -d 20 command
Duration defaults to 10 seconds but can be specified with the -d flag, followed by a number representing the amount of seconds to run the load test for. For instance -d 20 will load the server for 20 seconds.
