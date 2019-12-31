# Watching Files Using chokidar

## Watches directory

`node watcher.js my-folder/`

## Test 
```
cd my-folder
echo "test" > my-file.txt
chmod 700 my-file.txt
echo "more" >> my-file.txt
rm my-file.txt
cd my-subfolder
echo "deep" > deep.txt
rm deep.txt
cd ..
rm -rf my-subfolder
mkdir my-subfolder
```
