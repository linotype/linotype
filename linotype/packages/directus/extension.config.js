const yaml = require('@rollup/plugin-yaml')
const importdir = require('rollup-plugin-dir-import')
// const copy = require('rollup-plugin-copy')
const autoExternal = require('rollup-plugin-auto-external')

module.exports = {
  external: [ 'fs' ],
	plugins: [
    yaml(),
    importdir(),
    autoExternal(),
    // copy({
    //   targets: [{
    //     src: `./src/*`,
    //     dest: `./../../../playground/backend/extensions/modules/linotype`,
    //   }]
    // })
  ],
};