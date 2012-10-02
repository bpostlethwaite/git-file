var spawn = require('child_process').spawn;
var through = require('through');
var split = require('event-stream').split;
var run = require('comandante');

exports = module.exports = function (ref) {
    return {
        list : readDir.bind(null, ref),
        read : readFile.bind(null, ref),
    };
};

exports.list = readDir;
exports.read = readFile;

function show (ref, file) {
    if (file === '.') file = './';
    return run('git', [ 'show', ref + ':' + file ]);
}

function readFile (ref, file) {
    return show(ref, file);
}

function readDir (ref, dir) {
    var num = 0;
    var tr = through(function (line) {
        if (num === 0) {
            if (line !== 'tree ' + ref + ':' + dir
            && line !== 'tree ' + ref + ':' + dir + '/') {
                this.emit('error', ref + ':' + dir + ' is not a directory');
            }
        }
        else if (num === 1) {
            if (line !== '') {
                this.emit('error',
                    'unexpected data reading directory: ' + line
                );
            }
        }
        else this.emit('data', line);
        
        num ++;
    });
    return show(ref, dir).pipe(split()).pipe(tr);
}
