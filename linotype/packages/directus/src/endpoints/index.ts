
import fs from 'fs'
import path from 'path'
import glob from 'glob-promise'
import YAML from 'yaml'

export default (router) => {
	
  router.get('/', async (req, res) => {
    res.send({ 'linotype': 'v1.0.0'})
  })

  router.get('/config/blocks', async (req, res) => {
    const blocks = []
    const files = await glob( path.join(__dirname, `${process.env['LINOTYPE_FRONTEND_DIR']}/**/*.schema.yaml`) )
    for ( const file of files ) {
      const yamlFile = fs.readFileSync(file, 'utf8')
      blocks.push( YAML.parse(yamlFile) )
    }
    res.send(blocks)
  })

}