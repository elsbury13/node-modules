# Flamegraph

## Before (install flamegraph globally)
`npm install -g 0x`

## Run using globally installed 0x executable
`0x server.js`

### Another tab
`autocannon -c 100 http://localhost:3000/hello`

Should see
Running 10s test @ http://localhost:3000/hello
100 connections

┌─────────┬───────┬───────┬────────┬─────────┬───────────┬───────────┬────────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5%  │ 99%     │ Avg       │ Stdev     │ Max        │
├─────────┼───────┼───────┼────────┼─────────┼───────────┼───────────┼────────────┤
│ Latency │ 85 ms │ 98 ms │ 171 ms │ 1039 ms │ 117.53 ms │ 133.08 ms │ 1577.74 ms │
└─────────┴───────┴───────┴────────┴─────────┴───────────┴───────────┴────────────┘
┌───────────┬─────────┬─────────┬────────┬────────┬────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%    │ 97.5%  │ Avg    │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼────────┼─────────┤
│ Req/Sec   │ 13      │ 13      │ 957    │ 1075   │ 844.3  │ 320.13 │ 13      │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼────────┼─────────┤
│ Bytes/Sec │ 4.56 kB │ 4.56 kB │ 336 kB │ 377 kB │ 296 kB │ 112 kB │ 4.56 kB │
└───────────┴─────────┴─────────┴────────┴────────┴────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.

8k requests in 10.05s, 2.96 MB read

### When benchmarking finishes
Hit Ctrl + C in the server terminal. This will cause 0x to begin converting captured stacks into a flamegraph.

When the flamegraph has been generated a long URL will be printed to the terminal:


## Running in production
`NODE_ENV=production 0x server`

### Another tab
`autocannon -c 100 http://localhost:3000/hello`

Should see
Running 10s test @ http://localhost:3000/hello
100 connections

### When benchmarking finishes
Hit Ctrl + C in the server terminal. This will cause 0x to begin converting captured stacks into a flamegraph.

When the flamegraph has been generated a long URL will be printed to the terminal:
