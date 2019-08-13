# worker-loader-test

Aims to reproduce an issue with thread-loader, worker-loader and vue-cli
to help the maintainers isolate the cause.

## Project setup

```
npm install

npm run build
```

The raw webpack config can be investigated with `vue inspect`, e.g.

```
npx vue inspect > raw-config.js
```

## Error

When attempting to build the project, it ends up throwing the following error:
```

ERROR  Failed to compile with 1 errors

 error  in ./src/example.worker.js

Module build failed (from ./node_modules/thread-loader/dist/cjs.js):
Thread Loader (Worker 0)
Cannot read property 'createChildCompiler' of undefined
    at PoolWorker.fromErrorObj (/home/wanecek/work/worker-loader-test/node_modules/thread-loader/dist/WorkerPool.js:258:12)
    at Object.pitch (/home/wanecek/work/worker-loader-test/node_modules/worker-loader/dist/index.js:83:39)

 @ ./src/main.js 13:0-29
 @ multi ./src/main.js

```

This is resolved by adding `parallel: false` to the root of the config. While
this works, it's a dirty fix that degrades performance.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
