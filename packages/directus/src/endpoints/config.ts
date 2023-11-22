export default (router: any) => {
	
  router.get('/config', async (req: any, res: any) => {
    res.send({
      env: {
        public: {
          LINOTYPE_FRONTEND_URL: process.env['LINOTYPE_FRONTEND_URL']
        }
      }
    })
  })

}
