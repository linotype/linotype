import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const blocks = getLinotypeConfig( path.resolve(process.cwd(), `./src/linotype/block`) )
  return blocks
})

const getLinotypeConfig = (dir: string): object[] => {
  const blocks: object[] = []
  if ( !fs.existsSync(dir) ) return []
  const files = fs.readdirSync(dir)
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(dir, files[i])
    const stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      const configLinotype = fs.readFileSync(`${filename}/config.yaml`, 'utf8')
      blocks.push( YAML.parse(configLinotype) )
    }
  }
  return blocks
}