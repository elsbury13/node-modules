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
