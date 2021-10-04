import { v4 as uuidv4 } from "uuid";
export class add_Id{

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
    jsonOut():any{
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
