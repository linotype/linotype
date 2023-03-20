const yaml = require('@rollup/plugin-yaml')
const importdir = require('rollup-plugin-dir-import')
// const copy = require('rollup-plugin-copy')

module.exports = {
  external: [ 'fs' ],
	plugins: [
    yaml(),
    importdir(),
    // copy({
    //   targets: [{
    //     src: `./src/*`,
    //     dest: `./../../../playground/backend/extensions/modules/linotype`,
    //   }]
    // })
  ],
};