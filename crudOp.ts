const express = require('express')
const router=express.Router()
const fs = require("fs");
// import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import * as employee from "./emp_info";
import {Database} from "./emp_info"


router.post('/add', async(req : Request,res: Response) =>
{

    const  {  name, emp_level, mobile, email, date, managerId } = req.body;

     try{
        
          if(emp_level==="Manager")
          {
              var employees: employee.Employee = new employee.AddManagerData(name, emp_level, mobile, email, date)
              // console.log(employees)
          }
          else 
          {
              var employees: employee.Employee = new employee.AddEmployeeData(name, emp_level, mobile, email, date,managerId)
              //console.log(employees)
          }

            let valid_data = employee.ValidateData(employees) //check information is valid or not.
            let missing = employee.MissingField(employees) // check if there is missing field
            let valid_emp_level = employee.check_Emp_level(emp_level) // check if employee_level is appropriate or not
            let valid_mobile = employee.validateMob(mobile) //check mobile number
            let valid_email = employee.ValidateEmail(email) // check email

            if((valid_data== true) && (missing==true) && (valid_emp_level==true) && (valid_mobile==true) && (valid_email==true)) //if everything is fine
            {
                //Read data
                let db = new Database()
                let data = await db.getData()
                            
                data.push(employees);
                //Save data
                await db.saveData(data)

                // console.log(data);

                res.send({
                        status: 201,
                        message :"Employee Added successfully",
                        response :data
                         });
                }
                else{
                    let message ="";
                    if(valid_data == false){
                        message = message + "Please Enter Valid Data. "
                    }
                    if(valid_email == false){
                        message = message + "Please Enter Valid Email. "
                    }
                    if(valid_mobile == false){
                        message = message + "Please Enter Valid Mobile Number. "
                    }
                    if(valid_emp_level == false){
                        message = message + "Enter employee position from only these options- Manager, Tester, Developer and Intern. "
                    }
                    if(missing == false){
                        message = message + "Please Enter Missing Fields."
                    }
                    res.send({
                        status: 201,
                        message : message,
                        response :null
                         });
                }

    }
    

    catch (err) {
            res.send({
            message: `Error.`,
            response: null,
        });
    }
})

 router.get('/all', async(req:Request,res: Response) =>{
      

    try {
         let db = new Database()
         let data = await db.getData()
         //console.log(data)
        res.send({
            status:200,
            message :"All Employee Info",
            response: data
            
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
			    const Id =  (req.params.id)
                //console.log(Id);

                //Get All Data
               let db = new Database()
               let data = await db.getData()
			    
               //find id
                let user = data.find((user: employee.Employee) => user.id == Id);
                //let check = employee.emp_present(user)
                if(user != null)
                {
                    res.send({
                        status:200,
                        message: "Employee Found.",
                        response: user,
                    });
                }
                else{
                    res.send({
                        status: 400,
                        message : "Employee is not Exist"
                    });
                }
		    }
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
        
            //Get all data
            let db = new Database()
            let data = await db.getData()
            
            let user = data.find((user: employee.Employee) => user.id == Id); // find user
            //console.log(user); 

           //let check = employee.emp_present(user)
           if(user == null)
            {
			res.send({
                message: "Employee is not exist.",
			});
            }
          else{
        // var del = data.splice(user)
        // console.log(del);
            var filtered = data.filter(function(item: { id: string; }) { /// delete data of employee
             return item.id != Id;  
           });


           //Save data
           db.saveData(filtered)

              res.send({
                  status:200,
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
    
            //Get all data
            let db = new Database()
            let data = await db.getData()
    
            //find info
            
            let user= data.findIndex((user: employee.Employee) => user.id == Id);
            console.log(user); 
    
            //if not found
            if(user == null)
            {
            res.send({
                message: "Employee is Not Exist.",
            });
            }
            else{
                
                data[user] ={...data[user],...empdata}  // replace data using spread operator
                console.log(data[user]);
                let valid_data = employee.ValidateData(data[user]) //check information is valid or not.
             //console.log(valid_data);
                let missing = employee.MissingField(data[user]) // check if there is missing field
                let valid_emp_level = employee.check_Emp_level(data[user].emp_level)// check if employee_level is appropriate or not
                let valid_mobile = employee.validateMob(data[user].mobile) //check mobile number
                let valid_email = employee.ValidateEmail(data[user].email) // check email

                if((valid_data== true) && (missing==true) && (valid_emp_level==true) && (valid_mobile==true) && (valid_email==true)) //if everything is fine
                {
                    //save data
                    db.saveData(data)
            
                    res.send({
                    status:200,
                    message: "employee data successfully Updated",
                    resonse: data
                    });
                }

            else{
                let message ="";
                    if(valid_data == false){
                        message = message + "Please Enter Valid Data. "
                    }
                    if(valid_email == false){
                        message = message + "Please Enter Valid Email. "
                    }
                    if(valid_mobile == false){
                        message = message + "Please Enter Valid Mobile Number. "
                    }
                    if(valid_emp_level == false){
                        message = message + "Enter employee position from only these options- Manager, Tester, Developer and Intern. "
                    }
                    if(missing == false){
                        message = message + "Please Enter Missing Fields."
                    }
                    res.send({
                        status: 201,
                        message : message,
                        response :null
                    });
                }
                
                
            }
            }
    
     catch (err) {
            // console.log(err)
            res.send({
                message: `Error.`,
                response: null,
            });
            }
    
            
        
})

router.get('/findListJunior/:id', async(req: Request,res: Response) =>{
    try{
                 const Id =  (req.params.id)
                 //console.log(Id);
               
                //Get all data
                 let db = new Database()
                 let data = await db.getData()
                 var i;
                 let list:any=[];
                 for(i=0;i<data.length;i++){

                    if(data[i].managerId == Id){
                        list.push(data[i])
                    //     console.log(list)  
                    
                }   
                }
        
                //console.log(list);
                
                if(list != null)
                {
                    res.send({
                        status:200,
                        message: "Employees who reports to  given managerId  are found.",
                        response: list,
                    });
                }
                else{
                    res.send({
                        status: 400,
                        message : "Employees who reports to given managerId are not found."
                    });
                }
		    }
         catch (err) {
			    res.send({
                    message: `Error.`,
                    response: null,
                });
		    }
                


    })

 module.exports = router
