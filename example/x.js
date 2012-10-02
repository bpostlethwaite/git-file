var gitFile = require('../');
var joinStream = require('join-stream');

var cmd = process.argv[2];
var commit = process.argv[3];
var file = process.argv[4];

var gf = gitFile(commit);

if (cmd === 'list') {
    gf.list(file)
        .pipe(joinStream('\n'))
        .pipe(process.stdout)
    ;
}
else if (cmd === 'read') {
    gf.read(file).pipe(process.stdout);
}
