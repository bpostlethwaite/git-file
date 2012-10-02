var gitFile = require('../');
var joinStream = require('join-stream');

var commit = process.argv[2];
var file = process.argv[3];

gitFile.read(commit, file).pipe(process.stdout);
