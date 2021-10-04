
export interface Employee {
    id: string ;
    name: string;
    emp_level: string;
    mobile: number;
    email:string;
    date: string;
  }
  
  
  export const employee: Employee[] = [
        {
            id: "123",
            name:"SD",
            emp_level:"Intern",
             mobile:897665,
             email:"sd@",
            date:"23 sep 2018"
        },
    ];
    // // class Parent
      // 		{				
      // 			id:number;
      // 			name:string;
      // 			contact:number;
      // 			email:string;
      // 			level:string;
      // 			constructor(id:number,name:string,contact:number,email:string,level:string)
      // 			{
      // 				this.id=id;
      // 				this.name=name;
      // 				this.emp_level=level;
      // 				this.mob=mob;
      // 				this.email=email;
      // 			}
      // 			j
      // 			let obj={
      // 					id:this.id,
      // 					name:this.name,
      // 					mob:this.contact,
      // 					email:this.email,
      // 					emp_level:this.level
      // 				}
      // 				return obj
      // 			}
      // 		}
  //   class Child extends Parent {
    
      // setName(name: string): any {
    
      //   this.name = name;
    
  //     }
    
  //     getName(): string {
    
  //       return this.name;
    
  //     }
    
  //   }
    
  //   let a1 = new Child();
    
  //   a1.setName("shraddha");
    
  //   console.log(a1.getName());