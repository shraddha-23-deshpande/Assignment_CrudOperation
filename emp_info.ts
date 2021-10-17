const fs = require("fs");
//import { AwaitKeyword } from "typescript";
import { v4 as uuidv4 } from "uuid";
export interface Employee {
    // [x: string]: any;
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
                 find(){
                    let name;
                    let data = fs.readFileSync("employee_data.js");
		            data = JSON.parse(data);
                    for(var i=0;i<data.length;i++){
                        if(data[i].id == this.managerId){
                            name =data[i].name  

                        }
                    }
                    //console.log(name)
                    return name;

                }

}   


//check user gives valid data or not
export function ValidateData(args: Employee): boolean {
  
    if ( (typeof(args.id)=="string")  && (typeof(args.name)=="string") && (typeof(args.emp_level)== "string") && (typeof(args.mobile) == "number")
        && (typeof(args.date) == "string") && ((typeof(args.managerId) == "string")|| (args.managerId == undefined))) {
         return true;
    }
    else{
        return false;
    }
}
// check if there is any missing field
export function MissingField(args: Employee):boolean{
    if((args.name != "") &&  (args.emp_level != "") && (args.email != "") && (args.date != "") ){
        return true;
    }
    else{
        return false;
    }
}


//check email is valid or not
export function ValidateEmail(email:string)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(email.match(mailformat))
{
return true;
}
else
{
return false;
}
} 

// check mobile is valid or not

export function validateMob(mobile:number){
    if(mobile.toString().length == 10){
        return true;
    }
    else{
        return false;
    }
}

// check employee level is valid or not
export function check_Emp_level(emp_level:string): boolean{
    //console.log(args.emp_level)
    if( (emp_level == "Intern") || (emp_level == "Developer") || (emp_level == "Tester") || (emp_level == "Manager")){
        return true;

    }
    else{
        return false;
    }
}


//Read data and Write data
       
export class Database
{
	async getData():Promise<any>{

            return new Promise(resolve => {
             //setTimeout(() => {
                (fs.readFile('employee_data.js', "utf-8",function read(err:any, data:any)  {
                        if (err) {
                            throw err;
                        }
                       resolve( JSON.parse(data))
                     } ));
                    });
          }
    async saveData(data:Employee):Promise<any>
	{
		const stringifyData = JSON.stringify(data);
		//fs.writeFileSync("employee_data.js", stringifyData);
        fs.writeFile('employee_data.js',stringifyData, function(err:any){
            if(err){
                throw err;
            }
        })
	}
}
