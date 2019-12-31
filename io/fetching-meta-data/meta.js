const fs = require('fs')
const path = require('path')
const tableaux = require('tableaux')

const write = tableaux(
  { name: 'Name', size: 20 },
  { name: 'Created', size: 30 },
  { name: 'DeviceId', size: 10 },
  { name: 'Mode', size: 8 },
  { name: 'Links', size: 8 },
  { name: 'Size', size: 6 }
)

// uses readdirSync to get array all all files and folders
// use map to create new array of objects containing file and the dir
// use map again on newly created object to pass to toMeta transformer
// foreach is used to pass each bit of data to output
function print (dir) {
  fs.readdirSync(dir)
    .map((file) => ({ file, dir }))
    .map(toMeta)
    .forEach(output)
  write.newline()
}

// take object with file property, stat the file and return data
// accepts object and breaks its file and dir properties into local variables
function toMeta ({ file, dir }) {
  const stats = fs.lstatSync(path.join(dir, file))
  var { birthtime, ino, mode, nlink, size } = stats
  birthtime = birthtime.toUTCString()
  mode = mode.toString(8)
  size += 'B'

  return {
    file,
    dir,
    info: [birthtime, ino, mode, nlink, size],
    isDir: stats.isDirectory(),
    isSymlink: stats.isSymbolicLink()
  }
}

// output info supplied by toMeta. Query and output summary of dir contents
function output ({ file, dir, info, isDir, isSymlink }) {
  if (isSymlink) {
    outputSymLink(file, dir, info)
    return
  }

  write(file, ...info)

  if (!isDir) {
    return
  }

  const p = path.join(dir, file)
  // writes unicode arrow to the terminal
  write.arrow()
  fs.readdirSync(p).forEach((f) => {
    const stats = fs.lstatSync(path.join(p, f))
    const style = stats.isDirectory() ? 'bold' : 'dim'

    if (stats.isSymbolicLink()) {
      f = '\u001b[33m' + f + '\u001b[0m'
    }

    write[style](f)
  })
  write.newline()
}

// uses ANSI escape to colour output
function outputSymLink (file, dir, info) {
  write('\u001b[33m' + file + '\u001b[0m', ...info)
  process.stdout.write('\u001b[33m')
  write.arrow(4)
  write.bold(fs.readlinkSync(path.join(dir, file)))
  process.stdout.write('\u001b[0m')
  write.newline()
}

// if arg value is false then use current working dir
print(process.argv[2] || '.')
