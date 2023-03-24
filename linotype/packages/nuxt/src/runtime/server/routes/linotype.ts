// import { useRuntimeConfig } from '#imports'
import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  
  // const config = useRuntimeConfig()
  
  const blocks = fromDirectory( path.resolve(process.cwd(), `./src/linotype/block`), '.schema.yaml')
  console.log(path.resolve(process.cwd(), `~/linotype/block`))
  return blocks
  
})

const fromDirectory = (startPath: string, filter: string, blocks: string[] = []) => {
  if (!fs.existsSync(startPath)) {
      console.log("no dir ", startPath)
      return
  }
  const files = fs.readdirSync(startPath)
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i])
    const stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      fromDirectory(filename, filter, blocks)
    } else if (filename.endsWith(filter)) {
        const yamlFile = fs.readFileSync(filename, 'utf8')
        blocks.push( YAML.parse(yamlFile) )
    }
  }
  return blocks
}