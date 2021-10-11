"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.emp_present = exports.check_Emp_level = exports.ValidateData = exports.AddEmployeeData = exports.AddManagerData = void 0;
var fs = require("fs");
var uuid_1 = require("uuid");
var AddManagerData = /** @class */ (function () {
    function AddManagerData(name, emp_level, mobile, email, date) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.emp_level = emp_level;
        this.mobile = mobile;
        this.email = email;
        this.date = date;
    }
    AddManagerData.prototype.add = function () {
        var obj = {
            id: this.id,
            name: this.name,
            emp_level: this.emp_level,
            mobile: this.mobile,
            email: this.email,
            date: this.date
        };
        return obj;
    };
    return AddManagerData;
}());
exports.AddManagerData = AddManagerData;
var AddEmployeeData = /** @class */ (function (_super) {
    __extends(AddEmployeeData, _super);
    function AddEmployeeData(name, emp_level, mobile, email, date, managerId) {
        var _this = _super.call(this, name, emp_level, mobile, email, date) || this;
        _this.Mentor = "";
        _this.managerId = managerId;
        _this.Mentor = _this.find();
        return _this;
    }
    AddEmployeeData.prototype.find = function () {
        var name;
        var user = new Database();
        var data = user.getData();
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == this.managerId) {
                name = data[i].name;
            }
        }
        return name;
    };
    return AddEmployeeData;
}(AddManagerData));
exports.AddEmployeeData = AddEmployeeData;
//check user gives valid data or not
function ValidateData(args) {
    if ((typeof (args.id) == "string") && (typeof (args.name) == "string") && (typeof (args.emp_level) == "string") && (typeof (args.mobile) == "number")
        && (typeof (args.date) == "string") && ((typeof (args.managerId) == "string") || (args.managerId == undefined)) && (args.name != "") &&
        (args.emp_level != "") && (args.email != "") && (args.date != "") && (args.mobile != 0) && (validateMob(args))
        && (ValidateEmail(args))) {
        return true;
    }
    else {
        return false;
    }
}
exports.ValidateData = ValidateData;
//check email is valid or not
function ValidateEmail(args) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (args.email.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
}
// check mobile is valid or not
function validateMob(args) {
    if (args.mobile.toString().length == 10) {
        return true;
    }
    else {
        return false;
    }
}
// check employee level is valid or not
function check_Emp_level(args) {
    //console.log(args.emp_level)
    if ((args.emp_level == "Intern") || (args.emp_level == "Developer") || (args.emp_level == "Tester") || (args.emp_level == "Manager")) {
        return true;
    }
    else {
        return false;
    }
}
exports.check_Emp_level = check_Emp_level;
//check employee is present or not 
function emp_present(args) {
    if (args == null) {
        return true;
    }
    else {
        return false;
    }
}
exports.emp_present = emp_present;
//Read data and Write data
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.getData = function () {
        var data = fs.readFileSync("employee_data.js");
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
    };
    Database.prototype.saveData = function (data) {
        var stringifyData = JSON.stringify(data);
        fs.writeFileSync("employee_data.js", stringifyData);
    };
    return Database;
}());
exports.Database = Database;
