import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {  
  event.node.res.setHeader('Content-Type', 'text/plain')
  return `User-agent: *`
})
