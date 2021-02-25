const middleware = {}

middleware['hidestatusbar'] = require('../middleware/hidestatusbar.js')
middleware['hidestatusbar'] = middleware['hidestatusbar'].default || middleware['hidestatusbar']

export default middleware
