"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var fs = require("fs");
var employee = __importStar(require("./emp_info"));
router.post('/add', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, emp_level, mobile, email, date, managerId, employees, employees, emp, stringifyData;
    return __generator(this, function (_b) {
        _a = req.body, name = _a.name, emp_level = _a.emp_level, mobile = _a.mobile, email = _a.email, date = _a.date, managerId = _a.managerId;
        // const employee: Employee = req.body;
        //console.log(employee)
        //let add: employee.Employee = new employee.add_Id(name, emp_level, mobile, email, date)
        //    let add: employee.Employee = req.body;
        //    console.log(add)
        //let user = new Emp();
        //console.log(user)
        //    let emp;
        try {
            //let rest = employee.IsEmp(add)
            // console.log(rest);
            //if(rest==true){
            if (emp_level === "Manager") {
                employees = new employee.add_Id(name, emp_level, mobile, email, date);
                console.log(employees);
            }
            else {
                employees = new employee.report(name, emp_level, mobile, email, date, managerId);
                console.log(employees);
            }
            emp = fs.readFileSync("employee_data.js");
            emp = JSON.parse(emp);
            //console.log(employees);
            emp.push(employees);
            stringifyData = JSON.stringify(emp);
            fs.writeFileSync("employee_data.js", stringifyData);
            // console.log(data);
            //res.send("successfully added");
            res.send({
                message: "Added successfully",
            });
        }
        // else{
        //    res.send({
        //    message:"enter valid data",
        //    response:null
        //    })
        //    }
        catch (err) {
            res.send({
                message: "Error.",
                response: null,
            });
        }
        return [2 /*return*/];
    });
}); });
router.get('/all', function (req, res) {
    try {
        var emp = fs.readFileSync("employee_data.js");
        emp = JSON.parse(emp);
        res.send({
            message: "All Employee Info",
            response: emp
        });
    }
    catch (err) {
        res.send({
            message: "Error.",
            response: null,
        });
    }
});
router.get('/find/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id_1, data, user, check;
    return __generator(this, function (_a) {
        try {
            Id_1 = (req.params.id);
            data = fs.readFileSync("employee_data.js");
            data = JSON.parse(data);
            user = data.find(function (user) { return user.id == Id_1; });
            check = employee.present(user);
            if (check == false) {
                res.send({
                    message: "founded.",
                    response: user,
                });
            }
            else {
                res.send({
                    message: "data not present"
                });
            }
            //     const Id = await (req.params.id)	
        }
        //console.log(employee)
        catch (err) {
            res.send({
                message: "Error.",
                response: null,
            });
        }
        return [2 /*return*/];
    });
}); });
router.delete('/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id_2, data, user, check, filtered, stringifyData;
    return __generator(this, function (_a) {
        try {
            Id_2 = req.params.id;
            data = fs.readFileSync("employee_data.js");
            data = JSON.parse(data);
            user = data.find(function (user) { return user.id == Id_2; });
            check = employee.present(user);
            if (check == true) {
                res.send({
                    message: "employee is not present.",
                });
            }
            else {
                filtered = data.filter(function (item) {
                    return item.id != Id_2;
                });
                stringifyData = JSON.stringify(filtered);
                fs.writeFileSync("employee_data.js", stringifyData);
                res.send({
                    message: "employee deleted successfully.",
                    response: filtered
                });
            }
        }
        catch (err) {
            res.send({
                message: "Error.",
                response: null,
            });
        }
        return [2 /*return*/];
    });
}); });
router.patch('/update/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empdata, Id_3, data, user, check, stringifyData;
    return __generator(this, function (_a) {
        try {
            empdata = req.body;
            Id_3 = req.params.id;
            data = fs.readFileSync("employee_data.js");
            data = JSON.parse(data);
            user = data.findIndex(function (user) { return user.id == Id_3; });
            check = employee.present(user);
            if (check == true) {
                res.send({
                    message: "employee is not present.",
                });
            }
            else {
                // if((empdata.name != undefined) && (empdata.name == "priya")){
                //     return true;
                data[user] = __assign(__assign({}, data[user]), empdata);
                stringifyData = JSON.stringify(data);
                fs.writeFileSync("employee_data.js", stringifyData);
                res.send({
                    message: "employee data successfully Updated"
                });
            }
        }
        catch (err) {
            // console.log(err)
            res.send({
                message: "Error.",
                response: null,
            });
        }
        return [2 /*return*/];
    });
}); });
module.exports = router;
