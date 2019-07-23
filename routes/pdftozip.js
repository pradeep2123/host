var archiver = require('archiver');


const testFolder = "./pdf/test";

var output = fs.createWriteStream(__dirname + '/zip/example.zip');
var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
// output.on('end', function() {
//   console.log('Data has been drained');
// });
archive.on('error', function(err) {
  console.log(err)
  throw err;
});
archive.pipe(output);
// archive.directory('.pdf/test', 'new-test');

fs.readdir(testFolder, async(err, files) => {
  files.forEach(file => {
    console.log(file,path.extname(file),"ooo");
    var file1 = __dirname +'/pdf/test/'+file;
    archive.file(file1, { name: file });
  });
  await archive.finalize();
})


app.get('/download/reports', function(req, res){
    const file = `${__dirname}/zip/example.zip`;
    res.download(file); // Set disposition and send it.
});

