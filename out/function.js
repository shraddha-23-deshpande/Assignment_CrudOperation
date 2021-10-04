"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emp = void 0;
var fs = require("fs");
var Emp = /** @class */ (function () {
    function Emp() {
    }
    Emp.prototype.IsEmp = function (args) {
        //console.log(args);
        //console.log(args.id);
        if ((typeof (args.id) == "string") && (typeof (args.name) == "string") && (typeof (args.emp_level) == "string") && (typeof (args.mobile) == "number")
            && (typeof (args.date) == "string")) {
            // console.log( typeof(args.id));
            //console.log(typeof(args.date));
            return true;
            // console.log(x.subtr(1)); // Error, 'subtr' does not exist on `string`
            // console.log(x.substr(1)); // OK
        }
        else {
            return false;
        }
    };
    Emp.prototype.present = function (args) {
        if (args == "") {
            return true;
        }
        else {
            return false;
        }
    };
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
    Emp.prototype.setName = function (name, newname) {
        //console.log(id);
        //console.log(newid);
        var data = fs.readFileSync("employee_data.js");
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].name);
            if (data[i].name == name) {
                data[i].name = newname;
                //Save data
                var stringifyData = JSON.stringify(data);
                fs.writeFileSync("employee_data.js", stringifyData);
                return true;
            }
        }
        return false;
    };
    Emp.prototype.setMob = function (mobile, newmob) {
        //console.log(id);
        //console.log(newid);
        var data = fs.readFileSync("employee_data.js");
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i].mobile)
            if (data[i].mobile == mobile) {
                data[i].mobile = newmob;
                //Save data
                var stringifyData = JSON.stringify(data);
                fs.writeFileSync("employee_data.js", stringifyData);
                return true;
            }
        }
        return false;
    };
    Emp.prototype.setlevel = function (emp_level, newlev) {
        //console.log(id);
        //console.log(newid);
        var data = fs.readFileSync("employee_data.js");
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].emp_level);
            if (data[i].emp_level == emp_level) {
                data[i].emp_level = newlev;
                //Save data
                var stringifyData = JSON.stringify(data);
                fs.writeFileSync("employee_data.js", stringifyData);
                return true;
            }
        }
        return false;
    };
    Emp.prototype.setEmail = function (email, newemail) {
        //console.log(id);
        //console.log(newid);
        var data = fs.readFileSync("employee_data.js");
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].email);
            if (data[i].email == email) {
                data[i].email = newemail;
                //Save data
                var stringifyData = JSON.stringify(data);
                fs.writeFileSync("employee_data.js", stringifyData);
                return true;
            }
        }
        return false;
    };
    Emp.prototype.setDate = function (date, newdate) {
        //console.log(id);
        //console.log(newid);
        var data = fs.readFileSync("employee_data.js");
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i].date)
            if (data[i].date == date) {
                data[i].date = newdate;
                //Save data
                var stringifyData = JSON.stringify(data);
                fs.writeFileSync("employee_data.js", stringifyData);
                return true;
            }
        }
        return false;
    };
    return Emp;
}());
exports.Emp = Emp;
