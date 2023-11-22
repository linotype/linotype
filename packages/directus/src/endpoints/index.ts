
export default (router: any) => {
	
  router.get('/', async (req: any, res: any) => {
    res.send({ 'linotype': 'v1.0.0'})
  })

}
