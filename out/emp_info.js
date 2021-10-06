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
exports.report = exports.add_Id = exports.present = exports.IsEmp = void 0;
var fs = require("fs");
var uuid_1 = require("uuid");
function IsEmp(args) {
    //console.log(args);
    if ((typeof (args.managerId) == "string") || (typeof (args.managerId) == undefined)) {
        console.log("true");
    }
    else {
        console.log("false");
    }
    if ((typeof (args.id) == "string") && (typeof (args.name) == "string") && (typeof (args.emp_level) == "string") && (typeof (args.mobile) == "number")
        && (typeof (args.date) == "string") && ((typeof (args.managerId) == "string") || (typeof (args.managerId) == undefined))) {
        // console.log( typeof(args.id));
        //console.log(typeof(args.date));
        return true;
        // console.log(x.subtr(1)); // 
        // console.log(x.substr(1)); // 
    }
    else {
        return false;
    }
}
exports.IsEmp = IsEmp;
function present(args) {
    if (args == null) {
        return true;
    }
    else {
        return false;
    }
}
exports.present = present;
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
var add_Id = /** @class */ (function () {
    function add_Id(name, emp_level, mobile, email, date) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.emp_level = emp_level;
        this.mobile = mobile;
        this.email = email;
        this.date = date;
    }
    add_Id.prototype.add = function () {
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
    return add_Id;
}());
exports.add_Id = add_Id;
var report = /** @class */ (function (_super) {
    __extends(report, _super);
    function report(name, emp_level, mobile, email, date, managerId) {
        var _this = _super.call(this, name, emp_level, mobile, email, date) || this;
        _this.Mentor = "Manager";
        _this.managerId = managerId;
        return _this;
    }
    return report;
}(add_Id));
exports.report = report;
