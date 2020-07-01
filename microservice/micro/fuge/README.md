# Fuge

## Before
`npm install -g fuge`

## Enter Fuge shell
`fuge shell fuge.yml`

### find services and their statuses
`ps`

### start all services
`start all`

### stop all services
`stop all`

### exit fuge shell
`exit`

### Shell passthrough
`ps aux | grep -i node`
`netstat -an | grep -i listen`

## View
`http://localhost:3000/add`

## Enter Fuge shell for debugging
`fuge shell fuge2.yml`

### Debug adderservice with fuge
`debug adderservice`
