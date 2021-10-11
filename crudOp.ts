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

            let rest = employee.ValidateData(employees) //check information is valid or not.
            console.log(employees)
            console.log(rest)
            if(rest == false){
                res.send({
                    status: 400,
                    message:"Enter valid data",
                    response:null
                    })
                }
            else{

                let check = employee.check_Emp_level(employees) // check employee position is appropriate or not.
                if(check == false){
                        res.send({
                            status: 400,
                            message:"Enter employee position from only these options- Manager, Tester, Developer and Intern.",
                            response:null
                            })
                        }
                    else{

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
                                status: 201,
                                message :"Employee Added successfully",
                                response :emp
                            });
                            }
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
         console.log(data)
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
               let data = db.getData()
			    
               //find id
                let user = data.find((user: employee.Employee) => user.id == Id);
                let check = employee.emp_present(user)
                if(check == false)
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
            let data = db.getData()
            
            let user = data.find((user: employee.Employee) => user.id == Id);
            //console.log(user); 

           let check = employee.emp_present(user)
           if(check == true)
            {
			res.send({
                message: "Employee is not exist.",
			});
            }
          else{
        // var del = data.splice(user)
        // console.log(del);
            var filtered = data.filter(function(item: { id: string; }) { 
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
        let data = db.getData()

        //find info
        
        let user= data.findIndex((user: employee.Employee) => user.id == Id);
        //console.log(user); 
        let check = employee.emp_present(user)

        //if not found
        if(check == true)
        {
		res.send({
            message: "Employee is Not Exist.",
		});
        }
        else{
            
            data[user] ={...data[user],...empdata}  // replace data using spread operator

            let check = employee.ValidateData(data[user]) // check data is valid or not.
            if(check==false){
                res.send({
                    status: 400,
                    message:"enter valid data",
                    response:null
                    })
                }
            else{
                let check = employee.check_Emp_level(data[user])  //check employee level is appropriate or not
                if(check == false){
                    res.send({
                        status: 400,
                        message:"Enter employee position from only these options- Manager, Tester, Developer and Intern.",
                        response:null
                        })
                    }
                else{

                    //Save data
                db.saveData(data)
                
                
            	res.send({
                status:200,
				message: "employee data successfully Updated",
                resonse: data
    
			});
        }
        }

		}} catch (err) {
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
                 let data = db.getData()
                 var i;
                 let list:any=[];
                 for(i=0;i<data.length;i++){

                    if(data[i].managerId == Id){
                        list.push(data[i])
                    //     console.log(list)  
                    
                }   
                }
        
                //console.log(list);
                let check = employee.emp_present(list)
                if(check == false)
                {
                    res.send({
                        status:200,
                        message: "Employees who reports to managerId ${Id} are found.",
                        response: list,
                    });
                }
                else{
                    res.send({
                        status: 400,
                        message : "Employees who reports to managerId ${Id} are not found."
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
