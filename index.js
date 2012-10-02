var spawn = require('child_process').spawn;
var through = require('through');
var split = require('event-stream').split;

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
    
    var ps = spawn('git', [ 'show', ref + ':' + file ]);
    var err = '';
    ps.stderr.on('data', function (buf) { err += buf });
    
    ps.on('exit', function (code) {
        if (code === 0) return;
        tr.emit('error', 'non-zero exit code ' + code + ': ' + err);
    });
    
    var tr = ps.stdout.pipe(through());
    return tr;
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
