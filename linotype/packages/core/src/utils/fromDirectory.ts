import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

const fromDirectory = (startPath: string, filter: string, blocks: string[] = []) => {
  if (!fs.existsSync(startPath)) {
      console.log("no dir ", startPath);
      return;
  }
  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
      var filename = path.join(startPath, files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        fromDirectory(filename, filter, blocks);
      } else if (filename.endsWith(filter)) {
          const yamlFile = fs.readFileSync(filename, 'utf8')
          blocks.push( YAML.parse(yamlFile) )
      };
  }
  return blocks
};

export default fromDirectory
// module.exports = exports['default']