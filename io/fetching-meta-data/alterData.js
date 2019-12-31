// Creates a file and set UID and GID to nobody
// sets access to 000
const fs = require('fs')
const { execSync } = require('child_process')

const file = process.argv[2]
if (!file) {
  console.error('Specify a file')
  process.exit(1)
}
try {
  // check file existence. Try catch as accessSync throws
  fs.accessSync(file)
  console.error('File already ecists')
  process.exit(1)
} catch (e) {
  // No file? then create one
  makeIt()
}

function makeIt () {
  // use execSync to get nobody ID
  const nobody = Number(execSync('id -u nobody').toString().trim())
  // create empty file (fs.writeFileSync(file, ''))
  const fd = fs.openSync(file, 'w')
  // set permissions to 0
  fs.fchmodSync(fd, 0)
  // set to nobody
  fs.fchownSync(fd, nobody, nobody)
  console.log(file + ' created')
}
