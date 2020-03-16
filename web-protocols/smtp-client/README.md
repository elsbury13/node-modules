# SMTP Server

## How to run
in 1 tab
`node index.js`

in another tab
`node -e "process.stdin.pipe(require('net').connect(2525)).pipe(process.stdout)"`

type
`hello`
`mail from: me@me.com`
`rcpt to: you@example.com`
`data`
`hello there!`
`.`
`quit`

This will write data to the relevant mailbox directory

## How to run SMTP server / Client
From outside both `smtp-server` & `smtp-client`
open 1 terminal
run `node smtp-server`
open another terminal
run `node smtp-client`

in smtp-client terminal
enter email `you@example.com`
enter a message and press `Ctrl + D` to send

(We can also send multiple address, either by using `,` or `;`)
