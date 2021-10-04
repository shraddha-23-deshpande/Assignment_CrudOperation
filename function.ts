//import { randomUUID } from "crypto";
import {employee, Employee} from "./emp_info";
const fs = require("fs");
export class Emp{
  
  IsEmp(args: Employee): boolean {
      //console.log(args);
      //console.log(args.id);
    
     if ( (typeof(args.id)=="string")&&(typeof(args.name)=="string") && (typeof(args.emp_level)== "string") && (typeof(args.mobile) == "number")
     && (typeof(args.date) == "string"))
    { 
       // console.log( typeof(args.id));
        //console.log(typeof(args.date));

        return true;
        // console.log(x.subtr(1)); // Error, 'subtr' does not exist on `string`
        // console.log(x.substr(1)); // OK
    }
    else{
        return false;
    }
}


    present(args:string): boolean{
        if(args == "")
        {
            return true;
        }
        else{
            return false;
        }
    }

    // setId(id:Employee, newid:Employee): boolean {
    //     //console.log(id);
    //     //console.log(newid);
    //     let data = fs.readFileSync("employee_data.js");
		// data = JSON.parse(data);
    //     for (var i = 0; i < data.length; i++) {
    //         console.log(data[i].id)
    //       if (data[i].id == id) {
    //         data[i].id = newid;
    //         //Save data
		// 	const stringifyData = JSON.stringify(data);
		// 	fs.writeFileSync("employee_data.js", stringifyData);
    //         return true;
    //       }
    //     }
    //     return false;
    //   }
      setName(name:Employee, newname:Employee): boolean {
        //console.log(id);
        //console.log(newid);
        let data = fs.readFileSync("employee_data.js");
		    data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].name)
          if (data[i].name == name) {
            data[i].name = newname;
            //Save data
			const stringifyData = JSON.stringify(data);
			fs.writeFileSync("employee_data.js", stringifyData);
            return true;
          }
        }
        return false;
      }

    setMob(mobile:Employee, newmob:Employee): boolean {
        //console.log(id);
        //console.log(newid);
      let data = fs.readFileSync("employee_data.js");
		  data = JSON.parse(data);
      for (var i = 0; i < data.length; i++)
       {
            //console.log(data[i].mobile)
        if (data[i].mobile == mobile) 
        {
            data[i].mobile = newmob;
            //Save data
			      const stringifyData = JSON.stringify(data);
			      fs.writeFileSync("employee_data.js", stringifyData);
            return true;
        }
      }
        return false;
      }

      setlevel(emp_level:Employee, newlev:Employee): boolean {
        //console.log(id);
        //console.log(newid);
        let data = fs.readFileSync("employee_data.js");
		data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].emp_level)
          if (data[i].emp_level == emp_level) {
            data[i].emp_level = newlev;
            //Save data
			const stringifyData = JSON.stringify(data);
			fs.writeFileSync("employee_data.js", stringifyData);
            return true;
          }
        }
        return false;
      }

      setEmail(email:Employee, newemail:Employee): boolean {
        //console.log(id);
        //console.log(newid);
        let data = fs.readFileSync("employee_data.js");
		    data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].email)
          if (data[i].email == email) {
            data[i].email = newemail;
            //Save data
			      const stringifyData = JSON.stringify(data);
			      fs.writeFileSync("employee_data.js", stringifyData);
            return true;
          }
        }
        return false;
      }

      setDate(date:Employee, newdate:Employee): boolean {
        //console.log(id);
        //console.log(newid);
        let data = fs.readFileSync("employee_data.js");
		    data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i].date)
          if (data[i].date == date) {
            data[i].date = newdate;
            //Save data
			  const stringifyData = JSON.stringify(data);
			  fs.writeFileSync("employee_data.js", stringifyData);
            return true;
          }
        }
        return false;
      }



 }

