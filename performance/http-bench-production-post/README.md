# Http Benchmarking in Production with POST

## Before (install load testing tool) & jade
`npm install -g autocannon`
`npm install -g jade`

## Run
`node server`

## Another tab
`autocannon -c 100 -m POST -H 'content-type=application/json' -b '{ "hello": "world"}' http://localhost:3000/echo`

Should see something like this
100 connections

┌─────────┬──────┬──────┬───────┬───────┬─────────┬─────────┬───────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%   │ Avg     │ Stdev   │ Max       │
├─────────┼──────┼──────┼───────┼───────┼─────────┼─────────┼───────────┤
│ Latency │ 5 ms │ 5 ms │ 7 ms  │ 12 ms │ 5.33 ms │ 2.33 ms │ 109.34 ms │
└─────────┴──────┴──────┴───────┴───────┴─────────┴─────────┴───────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬──────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg      │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┼─────────┤
│ Req/Sec   │ 10511   │ 10511   │ 18063   │ 18303   │ 17391.64 │ 2186.31 │ 10504   │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┼─────────┤
│ Bytes/Sec │ 4.39 MB │ 4.39 MB │ 7.55 MB │ 7.65 MB │ 7.27 MB  │ 915 kB  │ 4.39 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴──────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

0 2xx responses, 191302 non 2xx responses
191k requests in 11.05s, 80 MB read

### using the -i flag in post
If we wish to get our POST body from a file, autocannon supports this via the -i flag.
