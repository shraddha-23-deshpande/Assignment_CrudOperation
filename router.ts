const express=require('express')
const router=express.Router()
const crudOp=require('./crudOp')

router.post('/add',crudOp.addEmp)
router.get('/all',crudOp.allEmp)
router.get('/find/:id',crudOp.findOne)
router.delete('/delete/:id',crudOp.deleteEmp)
router.patch('/update/:id',crudOp.updateEmp)
router.get('/findjunior/:id',crudOp.findJunior)

module.exports=router;