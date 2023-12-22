import status from './status'
import menu from './menu'
import blocks from './blocks'
import config from './config'
import page from './page'
import search from './search'
import sitemap from './sitemap'
import template from './template'

export default (router: any, params: any) => {
  status(router)
  config(router)
  blocks(router)
  template(router, params)
  page(router, params)
  menu(router, params)
  search(router, params)
  sitemap(router, params)
}