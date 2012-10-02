# git-file

read file and directory data from a git repo as streams

# example

## stream a directory listing

``` js
var git = require('git-file');
var joinStream = require('join-stream');

var commit = process.argv[2];
var dir = process.argv[3];

git.list(commit, dir)
    .pipe(joinStream('\n'))
    .pipe(process.stdout)
;
```

## stream a file

``` js
var git = require('git-file');
var joinStream = require('join-stream');

var commit = process.argv[2];
var file = process.argv[3];

git.read(commit, file).pipe(process.stdout);
```

# methods

``` js
var git = require('git-file')
```

## git.list(ref, dir)

List the contents of a directory `dir` at the
[revision](http://www.kernel.org/pub/software/scm/git/docs/gitrevisions.html)
`ref`.

Returns a stream with a `'data'` event for each file where directories have a
trailing `'/'`.

## git.read(ref, file)

Return a stream with the contents of `file` at the
[revision](http://www.kernel.org/pub/software/scm/git/docs/gitrevisions.html)
`ref`.

# install

With [npm](https://npmjs.org) do:

```
npm install git-file
```
