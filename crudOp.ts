import { Request, Response } from "express";
import * as employee from "./emp_info";
import { Database } from "./emp_info"


module.exports = {

    async addEmp(req: Request, res: Response) {

        const { name, emp_level, mobile, email, date, managerId } = req.body;

        try {

            if (emp_level === "Manager") {
                var employees: employee.Employee = new employee.Info(name, emp_level, mobile, email, date)

            }
            else {
                if (managerId != undefined) {
                    var employees: employee.Employee = new employee.subInfo(name, emp_level, mobile, email, date, managerId)
                }
                else {
                    res.send({
                        status: 201,
                        message: "Please provide manager Id",
                        response: null
                    });

                }

            }

            let valid_data: string = employee.ValidateData(employees) //check data is valid or not.
            if (valid_data == "") {

                //Read data
                let db = new Database()
                let data = await db.getData()

                data.push(employees);
                //Save data
                await db.saveData(data)

                res.send({
                    status: 201,
                    message: "Employee Added successfully",
                    response: data
                });
            }
            else {
                res.send({
                    status: 201,
                    message: valid_data,
                    response: null
                });
            }

        }


        catch (err) {
            res.send({
                message: `Error.`,
                response: null,
            });
        }
    },

    async allEmp(req: Request, res: Response) {

        try {
            let db = new Database()
            let data = await db.getData()
            //console.log(data)
            res.send({
                status: 200,
                message: "All Employee Info",
                response: data

            });
        }
        catch (err) {
            res.send({
                message: `Error.`,
                response: null,
            });
        }
    },

    async findEmp(req: Request, res: Response) {

        try {
            const Id = (req.params.id)

            let db = new Database()
            let data = await db.getData()

            let user = data.find((user: employee.Employee) => user.id == Id);
            if (user != null) {
                res.send({
                    status: 200,
                    message: "Employee Found.",
                    response: user,
                });
            }
            else {
                res.send({
                    status: 400,
                    message: "Employee is not Exist"
                });
            }
        }
        catch (err) {
            res.send({
                message: `Error.`,
                response: null,
            });
        }
    },

    async deleteEmp(req: Request, res: Response) {
        try {
            const Id = req.params.id

            let db = new Database()
            let data = await db.getData()

            let user = data.find((user: employee.Employee) => user.id == Id);

            if (user == null) {
                res.send({
                    message: "Employee is not exist.",
                });
            }
            else {
                var filtered = data.filter(function (item: { id: string; }) { /// delete data of employee
                    return item.id != Id;
                });


                //Save data
                db.saveData(filtered)

                res.send({
                    status: 200,
                    message: "employee deleted successfully.",
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

    },


    async updateEmp(req: Request, res: Response) {

        try {

            let empdata = req.body
            const Id = req.params.id

            let db = new Database()
            let data = await db.getData()


            let user = data.findIndex((user: employee.Employee) => user.id == Id);
            console.log(user);

            if (user == null) {
                res.send({
                    message: "Employee is Not Exist.",
                });
            }
            else {

                data[user] = { ...data[user], ...empdata }
                let valid_data = employee.ValidateData(data[user])
                if (valid_data == "") {
                    db.saveData(data)

                    res.send({
                        status: 200,
                        message: "employee data successfully Updated",
                        resonse: data
                    });
                }

                else {
                    res.send({
                        status: 201,
                        message: valid_data,
                        response: null
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



    },
    async findSubordinate(req: Request, res: Response) {
        try {
            const Id = (req.params.id)

            let db = new Database()
            let data = await db.getData()
            var i;
            let list: any = [];
            for (i = 0; i < data.length; i++) {

                if (data[i].managerId == Id) {
                    list.push(data[i])

                }
            }

            if (list.length > 0) {
                res.send({
                    status: 200,
                    message: `Employees who reports to  ${Id} managerId  are found.`,
                    response: list,
                });
            }
            else {
                res.send({
                    status: 400,
                    message: `Employees who reports to ${Id} managerId are not found.`
                });
            }
        }
        catch (err) {
            res.send({
                message: `Error.`,
                response: null,
            });
        }



    }

};
