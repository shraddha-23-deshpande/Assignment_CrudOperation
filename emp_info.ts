
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import util from 'util';
import { response } from "express";
const readFile = util.promisify(fs.readFile);
export interface Employee {

    id: string;
    name: string;
    emp_level: string;
    mobile: number;
    email: string;
    date: string;
    managerId?: string | undefined;

}

export class Info implements Employee {

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
export class subInfo extends Info {

    managerId: string;
    constructor(name: string, emp_level: string, mobile: number, email: string, date: string, managerId: string) {
        super(name, emp_level, mobile, email, date);
        this.managerId = managerId;
    }

}


//check user gives valid data or not
export function ValidateData(args: Employee): string {

    let message: string = "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //console.log(args.name);
    if (!((typeof (args.id) == "string") && (typeof (args.name) == "string") && (typeof (args.emp_level) == "string") && (typeof (args.mobile) == "number")
        && (typeof (args.date) == "string") && ((typeof (args.managerId) == "string") || (args.managerId == undefined)) &&
        (args.name != "") && (args.emp_level != "") && (args.email != "") && (args.date != ""))) {

        message = message + "Plese enter valid data. "
    }

    if (!(args.email.match(mailformat))) {
        message = message + "Please enter valid mail. "
    }
    if (!(args.mobile.toString().length == 10)) {
        message = message + "Please enter valid mobile number. "
    }
    if (!((args.emp_level == "Intern") || (args.emp_level == "Developer") || (args.emp_level == "Tester") || (args.emp_level == "Manager"))) {
        message = message + "Enter employee position from only these options- Manager, Tester, Developer and Intern. "
    }
    //console.log(message)
    return message;



}

//Read data and Write data

export class Database {
    async getData(): Promise<Employee[]> {
        return new Promise((resolve,reject) => {
               (fs.readFile('employee_data.js', "utf-8",function read(err:any, data:any)  {
                       if (err) {
                           reject(err)
                       }
                      resolve( JSON.parse(data))
                    } ));
                   });

    }
    async saveData(data: Employee[]): Promise<void> {
        return new Promise((resolve,reject) => {
        const stringifyData = JSON.stringify(data);
        resolve(
        fs.writeFile('employee_data.js', stringifyData, function (err: any) {
            if (err) {
                reject( err);
            }
        })
        )
    });
}
}
