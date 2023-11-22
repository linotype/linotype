import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  
  const blockConfig = await readBody(event)
  
  const dir = path.resolve(process.cwd(), `./src/linotype/block/${blockConfig.id}`)
  if ( !fs.existsSync(dir) ) return { success: false, dir: dir }

  const blockConfigYaml = YAML.stringify(blockConfig)

  try {
    await fs.promises.writeFile(`${dir}/config.yaml`, blockConfigYaml);
  } catch (err) {
    console.log(err);
  }

  return { 
    success: true,
    dir: dir,
    config: blockConfig,
  }
})
