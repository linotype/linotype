import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import fetch from 'node-fetch'

export default (router: any) => {
	
  router.get('/blocks', async (req: any, res: any) => {
    let blocks: object[]|undefined = []
    if ( process.env['LINOTYPE_FRONTEND_URL'] ) {
      const response = await fetch(`${process.env['LINOTYPE_FRONTEND_URL']}/linotype`)
      blocks = await response.json() as object[]
    } else if ( process.env['LINOTYPE_FRONTEND_DIR'] ) {
      blocks = fromDirectory( path.join(__dirname, `${process.env['LINOTYPE_FRONTEND_DIR']}`), '.schema.yaml')
    }
    res.send(blocks)
  })

}

const fromDirectory = (startPath: string, filter: string, blocks: object[] = []): object[] => {
  if (!fs.existsSync(startPath)) {
      console.log("no dir ", startPath)
      return []
  }
  var files = fs.readdirSync(startPath)
  for (var i = 0; i < files.length; i++) {
      var filename = path.join(startPath, files[i] as any)
      var stat = fs.lstatSync(filename)
      if (stat.isDirectory()) {
        fromDirectory(filename, filter, blocks)
      } else if (filename.endsWith(filter)) {
          const yamlFile = fs.readFileSync(filename, 'utf8')
          blocks.push( YAML.parse(yamlFile) )
      }
  }
  return blocks
}