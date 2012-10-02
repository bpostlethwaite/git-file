var gitFile = require('../');
var joinStream = require('join-stream');

gitFile.list(process.argv[2], process.argv[3])
    .pipe(joinStream('\n'))
    .pipe(process.stdout)
;
