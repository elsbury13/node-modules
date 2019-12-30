# Managing Files

## Shows all files, directories & subdirectories 

`node meta.js`
`node meta.js my-folder`

## Checks if file exists 
`node check.js meta.js`
Returns "meta.js" does exist

`node check.js no-file`
Returns "no-file" does not exist

## Creates File
Creates a file and set UID and GID to nobody and sets 0 permissions
`node alterData.js test.js`

