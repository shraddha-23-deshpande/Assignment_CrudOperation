const fs = require("fs");
import { AwaitKeyword } from "typescript";
import { v4 as uuidv4 } from "uuid";
export interface Employee {
    [x: string]: any;
    id: string ;
    name: string;
    emp_level: string;
    mobile: number;
    email:string;
    date: string;
    managerId?: string | undefined;
    
  }

export class AddManagerData implements Employee {

      id: string=uuidv4();
      name:string;
      emp_level:string;
      mobile:number;
      email:string;
      date:string;
      constructor(name:string,emp_level:string, mobile:number,email:string,date:string)
      {
          this.name=name;
          this.emp_level=emp_level;
          this.mobile=mobile;
          this.email=email
          this.date=date
      }
      add():Employee{
          let obj={
              id:this.id,
              name:this.name,
              emp_level:this.emp_level,
              mobile:this.mobile,
              email:this.email,
              date:this.date
          }
          return obj
      }
  }

export class AddEmployeeData extends AddManagerData implements Employee  {
  
			    Mentor:string= "";
				managerId:string;
				constructor(name:string,emp_level:string, mobile:number,email:string,date:string,managerId:string)
				{
					super(name,emp_level,mobile, email, date);
					this.managerId=managerId;
                    this.Mentor= this.find()
				}  
                find():string{
                    let name;
                    let user = new Database();
                    let data : Employee = user.getData()
                    for(var i=0;i<data.length;i++){
                        if(data[i].id == this.managerId){
                            name =data[i].name  

                        }
                    }
                    return name;

                }
				
	}


//check user gives valid data or not
export function ValidateData(args: Employee): boolean {
  
    if ( (typeof(args.id)=="string")&&(typeof(args.name)=="string") && (typeof(args.emp_level)== "string") && (typeof(args.mobile) == "number")
        && (typeof(args.date) == "string") && ((typeof(args.managerId) == "string")|| (args.managerId == undefined)) && (args.name != "") && 
        (args.emp_level != "") && (args.email != "") && (args.date != "") && (args.mobile != 0) && (validateMob(args))
         && (ValidateEmail(args)) )
    {
    return true;
    }
    else{
        return false;
    }
}

//check email is valid or not
function ValidateEmail(args:Employee)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(args.email.match(mailformat))
{
return true;
}
else
{
return false;
}
} 

// check mobile is valid or not

function validateMob(args:Employee){
    if(args.mobile.toString().length == 10){
        return true;
    }
    else{
        return false;
    }
}

// check employee level is valid or not
export function check_Emp_level(args:Employee): boolean{
    //console.log(args.emp_level)
    if( (args.emp_level == "Intern") || (args.emp_level == "Developer") || (args.emp_level == "Tester") || (args.emp_level == "Manager")){
        return true;

    }
    else{
        return false;
    }
}

 //check employee is present or not 
export function emp_present(args:Employee): boolean{
  if(args == null)
  {
      return true;
  }
  else{
      return false;
  }
}

//Read data and Write data
       
export class Database
{
	getData():Employee{


        let data = fs.readFileSync("employee_data.js");
		return JSON.parse(data);

    //     const readFile = (file: string) =>{
    //         return new Promise((resolve,reject)=>
            
	// 	 fs.readFile(file,"utf-8",(err:any,data:string)=>{
    //          if(err != null){
    //              reject(err);
    //              return;
    //          }
    //          resolve(data)
    //         })
	// 	//return JSON.parse(data);
	// )}
    // console.log(data)
    // return data
    //     let content:any ;
    //  fs.readFile('employee_data.js', "utf-8",function read(err:any, data:any)  {
    //     if (err) {
    //         throw err;
    //     }
    //     content = data;
       
    // }); 
    // return content;




}
	saveData(data:Employee):any
	{
		const stringifyData = JSON.stringify(data);
		fs.writeFileSync("employee_data.js", stringifyData);
	}
}

