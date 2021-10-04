const express = require('express')
const router=express.Router()
const fs = require("fs");
import { Request, Response } from "express";
import {Emp} from './function';
import { add_Id } from "./add_Id";
import {Employee} from "./emp_info";


router.post('/add', async(req : Request,res: Response) =>
{


       // "use strict";
      const  {  name, emp_level, mobile, email, date } = req.body;
      // const employee: Employee = req.body;
       //console.log(employee)
       let add: Employee= new add_Id(name, emp_level, mobile, email, date);
       let user = new Emp();
       //console.log(user)

       try{
       let rest = user.IsEmp(add)
      // console.log(rest);
       if(rest==true){
        let emp = fs.readFileSync("employee_data.js");
        emp = JSON.parse(emp);
        
        emp.push(add);
        //Save data
        const stringifyData = JSON.stringify(emp);
        fs.writeFileSync("employee_data.js", stringifyData);
       // console.log(data);

        //res.send("successfully added");
        res.send({
            message :"Added successfully",
        });
    }
    else{
        res.send({
            message:"enter valid data",
            response:null
        })
    }
    }
     catch (err) {
        res.send({
            message: `Error.`,
            response: null,
        });
    }
 })

 router.get('/all', (req:Request,res: Response) =>{
      

    try {
        let emp = fs.readFileSync("employee_data.js");
        emp = JSON.parse(emp);
        res.send({
            message :"All Employee Info",
            response: emp
        });
        } 
    catch (err) {
        res.send({
            message: `Error.`,
            response: null,
        });
    }
})

router.get('/find/:id', async(req: Request,res: Response) =>{
      
        try {
			//Get data
			const Id =  (req.params.id)
            let emp = new Emp()
            //console.log(Id);
            //let sm = user.IsId(Id)
            //console.log(sm);
            //if(sm==true){

			let data = fs.readFileSync("employee_data.js");
			data = JSON.parse(data);
			//console.log(emp);
			//find id
			//const employee = emp.filter((e: { id: any; })=> e.id == Id )
            let user = data.find((user: Employee) => user.id == Id);
           let check = emp.present(user)
           if(check == false)
            {
			res.send({
                message: "founded.",
				response: user,
			});
            }
        else{
            res.send({
                message : "data not present"
            })
        }
    //     const Id = await (req.params.id)	
		}
		//console.log(employee)
         catch (err) {
			res.send({
                message: `Error.`,
                response: null,
            });
		}
})
router.delete('/delete/:id',async(req: Request,res: Response)=>{
    try{
        const Id = req.params.id
        let obj = new Emp();
        let data = fs.readFileSync("employee_data.js");
		data = JSON.parse(data);
        //var num = parseInt(Id)
        
            let user = data.find((user: Employee) => user.id == Id);
            //console.log(user); 
           //const employee = data.find((e: { id: any; })=> e.id == Id )
           let check = obj.present(user)
           if(check == true)
            {
			res.send({
                message: "employee is not present.",
			});
            }
          else{
        // var del = data.splice(user)
        // console.log(del);
            var filtered = data.filter(function(item: { id: string; }) { 
             return item.id != Id;  
           });
           //Save data
			const stringifyData = JSON.stringify(filtered);
			fs.writeFileSync("employee_data.js", stringifyData);
              res.send({
                message : "employee deleted successfully.",
                response: filtered
              })
            }

		}
		catch (err) {
			res.send({
                message: `Error.`,
                response: null,
            });
		}

})

router.patch('/update/:id',async(req: Request,res:Response)=>{

    try{

        var employee=req.body
        const Id = req.params.id
        //console.log(employee.id);
        let obj = new Emp();
        let data = fs.readFileSync("employee_data.js");
		data = JSON.parse(data);
        //var num = parseInt(Id)
        
        let user = data.find((user: Employee) => user.id == Id);
        console.log(user); 
        let check = obj.present(user)
        if(check == true)
        {
		res.send({
            message: "employee is not present.",
		});
        }
        else{
            // if(employee.id != undefined){
            // obj.setId(user.id,employee.id); 
            // if(result==true){
            //     res.send({
            //         message: "id is updated successfully.",
            //     });
            // }
            // console.log("id updated successfully")
            // }
            if(employee.name != undefined){
            obj.setName(user.name,employee.name);
            console.log("name is updated successfully")
                // if(result==true){
                //     res.send({
                        
                //         message: "id is updated successfully.",
                //     });

                // }
            }
            if(employee.mobile != undefined){
                obj.setMob(user.mobile,employee.mobile)
                console.log("mobile is updated successfully")
            }
            if(employee.emp_level != undefined){
                obj.setlevel(user.emp_level,employee.emp_level)
                console.log("emp_level is updated successfully")
            }
            if(employee.email != undefined){
                obj.setEmail(user.email,employee.email)
                console.log("email is updated successfully")
            }
            if(employee.date != undefined){
                obj.setDate(user.date_of_join,employee.date_of_join)
                console.log("date is updated successfully")
            }
            //emp.push(user); 

            	res.send({
				message: "employee data successfully Updated"
    
			});

		}} catch (err) {
		// console.log(err)
        res.send({
            message: `Error.`,
            response: null,
        });
		}
    
})

 module.exports = router
