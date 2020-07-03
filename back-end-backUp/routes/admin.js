const express =  require('express')
const Admin = require('../controller/admin/adminCto')
const router = express.Router()

router.get('/all', async (req, res, next) => {
  res.json(await Admin.findAll())
});

module.exports = router;