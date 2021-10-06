const express = require('express')
const router=express.Router()
const fs = require("fs");
import { Request, Response } from "express";
import * as employee from "./emp_info";
import{add_Id,report} from "./emp_info";


router.post('/add', async(req : Request,res: Response) =>
{


       // "use strict";
      const  {  name, emp_level, mobile, email, date, managerId } = req.body;
      // const employee: Employee = req.body;
       //console.log(employee)
       //let add: employee.Employee = new employee.add_Id(name, emp_level, mobile, email, date)
    //    let add: employee.Employee = req.body;
    //    console.log(add)
       //let user = new Emp();
       //console.log(user)
    //    let emp;

       try{


            //let rest = employee.IsEmp(add)
      // console.log(rest);
            //if(rest==true){
          
			if(emp_level==="Manager")
			{
				var employees: employee.Employee = new employee.add_Id(name, emp_level, mobile, email, date)
                console.log(employees)
			}
			else 
			{
				var employees: employee.Employee = new employee.report(name, emp_level, mobile, email, date,managerId)
                console.log(employees)
			}

            let emp = fs.readFileSync("employee_data.js");
            emp = JSON.parse(emp);
            
            //console.log(employees);
            

            emp.push(employees);
            //Save data
            const stringifyData = JSON.stringify(emp);
            fs.writeFileSync("employee_data.js", stringifyData);
            // console.log(data);

            //res.send("successfully added");
            res.send({
                message :"Added successfully",
            });
            }
            // else{
            //    res.send({
            //    message:"enter valid data",
            //    response:null
            //    })
        //    }
    
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
            //let emp = new Emp()
            //console.log(Id);
            //let sm = user.IsId(Id)
            //console.log(sm);
            //if(sm==true){

			let data = fs.readFileSync("employee_data.js");
			data = JSON.parse(data);
			//console.log(emp);
			//find id
			//const employee = emp.filter((e: { id: any; })=> e.id == Id )
            let user = data.find((user: employee.Employee) => user.id == Id);
           let check = employee.present(user)
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
        //let obj = new Emp();
        let data = fs.readFileSync("employee_data.js");
		data = JSON.parse(data);
        //var num = parseInt(Id)
        
            let user = data.find((user: employee.Employee) => user.id == Id);
            //console.log(user); 
           //const employee = data.find((e: { id: any; })=> e.id == Id )

           let check = employee.present(user)
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

        let empdata=req.body
        const Id = req.params.id
        //console.log(employee.id);
        //let obj = new Emp();
        let data = fs.readFileSync("employee_data.js");
		data = JSON.parse(data);
        //var num = parseInt(Id)
        
        let user = data.findIndex((user: employee.Employee) => user.id == Id);
        //console.log(user); 
        let check = employee.present(user)
        if(check == true)
        {
		res.send({
            message: "employee is not present.",
		});
        }
        else{
            // if((empdata.name != undefined) && (empdata.name == "priya")){
            //     return true;

            data[user]={...data[user],...empdata}
            const stringifyData = JSON.stringify(data);
 			fs.writeFileSync("employee_data.js", stringifyData);

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
