# XSS (param validation)

## How to run
`node index.js`

## test with
`http://localhost:3000/?prev=%22%3E%3Cscri&handoverToken=pt%3Estat.innerHTML=%22it%27s%20all%20good...%3Cbr%3Erelax%20:)%22%3C&lang=script%3E%3Ca%20href=%22`

This will display
Unprocessable Entity

## test with
`http://localhost:3000/?prev=javasc&handoverToken=ript:alert(%27hi%27)`

This will display
When Back to Control HQ is clicked on, it wil execute javascript

This is because the parameters still fit in the constraints.
