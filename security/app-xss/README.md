# XSS (bad, not escaping the input)

## How to run
`node index.js`

## test with
`http://localhost:3000/?prev=/home&handoverToken=JZ2AHE3GVVDBAI9XFPOAV2T9&lang=en.`

This will display
ON FIRE!!! HELP!!!

## test with
`http://localhost:3000/?prev=%22%3E%3Cscri&handoverToken=pt%3Estat.innerHTML=%22it%27s%20all%20good...%3Cbr%3Erelax%20:)%22%3C&lang=script%3E%3Ca%20href=%22`

This will display
it's all good...
relax
