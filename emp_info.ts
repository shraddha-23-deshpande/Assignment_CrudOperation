const fs = require("fs");
import { v4 as uuidv4 } from "uuid";
export interface Employee {
    id: string ;
    name: string;
    emp_level: string;
    mobile: number;
    email:string;
    date: string;
    managerId?: string;
  }
  export function IsEmp(args: Employee): boolean {
    //console.log(args);
    //console.log(args.id);
  
   if ( (typeof(args.id)=="string")&&(typeof(args.name)=="string") && (typeof(args.emp_level)== "string") && (typeof(args.mobile) == "number")
   && (typeof(args.date) == "string") &&(typeof (args.managerId)== "string"|| undefined))
  { 
     // console.log( typeof(args.id));
      //console.log(typeof(args.date));

      return true;
      // console.log(x.subtr(1)); // 
      // console.log(x.substr(1)); // 
  }
  else{
      return false;
  }
}
  
export function present(args:Employee): boolean{
  if(args == null)
  {
      return true;
  }
  else{
      return false;
  }
}


// export function setAll(prev:Employee, Employeenew:Employee){
//   let data = fs.readFileSync("employee_data.js");
// 	data = JSON.parse(data);
//   for (var i = 0; i < data.length; i++) {
//     //console.log(data[i].name)
//     //console.log(prev.name);
//    // console.log(Employeenew.name);
//       if( (prev.name != undefined) && (data[i].name == prev.name)) {
//           data[i].name = Employeenew.name;
//           console.log(prev.name);
//           // console.log(Employeenew.name);
//       }

//       if( (prev.mobile != undefined) && (data[i].mob == prev.mobile)){
//         data[i].mob = Employeenew.mobile; 
//         console.log(prev.mobile)
//       }
      
//       if( (prev.email != undefined) && (data[i].email == prev.email)){
//         data[i].email = Employeenew.email; 
//         console.log(prev.email)
//       }

      
//       if( (prev.emp_level != undefined) && (data[i].emp_level == prev.emp_level)){
//         data[i].emp_level = Employeenew.emp_level; 
//         console.log(prev.emp_level)
//       }

      
//       if( (prev.date != undefined) && (data[i].date == prev.date)){
//         data[i].date = Employeenew.date; 
//         console.log(prev.date)
//       }



//       const stringifyData = JSON.stringify(data);
// 			fs.writeFileSync("employee_data.js", stringifyData);
//       console.log(data);
//     }

  

    //   if (prev.mobile != null) {
        
    //   if( data[i].mobile == prev.mobile) {
    //         data[i].mobile = Employeenew.mobile;
    //     }
    //   }

    //     const stringifyData = JSON.stringify(data);
		// 	fs.writeFileSync("employee_data.js", stringifyData);
    //   console.log(data);
  
    //  }

    export class add_Id implements Employee {

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

export class report extends add_Id implements Employee  {
  
				readonly manager:string="Manager";
				managerId:string;
				constructor(name:string,emp_level:string, mobile:number,email:string,date:string,managerId:string)
				{
					super(name,emp_level,mobile, email, date);
					this.managerId=managerId;
				}  
				
	}

 
