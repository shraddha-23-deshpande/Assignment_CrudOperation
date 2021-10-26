const express = require('express')
const router = express.Router()
const crudOp = require('./crudOp')

router.get('/allData', crudOp.allEmp)
router.get('/findEmployee/:id', crudOp.findEmp)
router.get('/findSubordinate/:id', crudOp.findSubordinate)
router.post('/addEmployee', crudOp.addEmp)
router.delete('/deleteEmployee/:id', crudOp.deleteEmp)
router.patch('/updateEmployee/:id', crudOp.updateEmp)


module.exports = router;