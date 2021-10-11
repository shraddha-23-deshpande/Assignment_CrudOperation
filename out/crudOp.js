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
var emp_info_1 = require("./emp_info");
router.post('/add', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, emp_level, mobile, email, date, managerId, employees, employees, rest, check, emp, stringifyData;
    return __generator(this, function (_b) {
        _a = req.body, name = _a.name, emp_level = _a.emp_level, mobile = _a.mobile, email = _a.email, date = _a.date, managerId = _a.managerId;
        try {
            if (emp_level === "Manager") {
                employees = new employee.AddManagerData(name, emp_level, mobile, email, date);
                // console.log(employees)
            }
            else {
                employees = new employee.AddEmployeeData(name, emp_level, mobile, email, date, managerId);
                //console.log(employees)
            }
            rest = employee.ValidateData(employees) //check information is valid or not.
            ;
            console.log(employees);
            console.log(rest);
            if (rest == false) {
                res.send({
                    status: 400,
                    message: "Enter valid data",
                    response: null
                });
            }
            else {
                check = employee.check_Emp_level(employees) // check employee position is appropriate or not.
                ;
                if (check == false) {
                    res.send({
                        status: 400,
                        message: "Enter employee position from only these options- Manager, Tester, Developer and Intern.",
                        response: null
                    });
                }
                else {
                    emp = fs.readFileSync("employee_data.js");
                    emp = JSON.parse(emp);
                    //console.log(employees);
                    emp.push(employees);
                    stringifyData = JSON.stringify(emp);
                    fs.writeFileSync("employee_data.js", stringifyData);
                    // console.log(data);
                    //res.send("successfully added");
                    res.send({
                        status: 201,
                        message: "Employee Added successfully",
                        response: emp
                    });
                }
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
router.get('/all', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                db = new emp_info_1.Database();
                return [4 /*yield*/, db.getData()];
            case 1:
                data = _a.sent();
                console.log(data);
                res.send({
                    status: 200,
                    message: "All Employee Info",
                    response: data
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.send({
                    message: "Error.",
                    response: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/find/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id_1, db, data, user, check;
    return __generator(this, function (_a) {
        try {
            Id_1 = (req.params.id);
            db = new emp_info_1.Database();
            data = db.getData();
            user = data.find(function (user) { return user.id == Id_1; });
            check = employee.emp_present(user);
            if (check == false) {
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
                message: "Error.",
                response: null,
            });
        }
        return [2 /*return*/];
    });
}); });
router.delete('/delete/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id_2, db, data, user, check, filtered;
    return __generator(this, function (_a) {
        try {
            Id_2 = req.params.id;
            db = new emp_info_1.Database();
            data = db.getData();
            user = data.find(function (user) { return user.id == Id_2; });
            check = employee.emp_present(user);
            if (check == true) {
                res.send({
                    message: "Employee is not exist.",
                });
            }
            else {
                filtered = data.filter(function (item) {
                    return item.id != Id_2;
                });
                //Save data
                db.saveData(filtered);
                res.send({
                    status: 200,
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
    var empdata, Id_3, db, data, user, check, check_1, check_2;
    return __generator(this, function (_a) {
        try {
            empdata = req.body;
            Id_3 = req.params.id;
            db = new emp_info_1.Database();
            data = db.getData();
            user = data.findIndex(function (user) { return user.id == Id_3; });
            check = employee.emp_present(user);
            //if not found
            if (check == true) {
                res.send({
                    message: "Employee is Not Exist.",
                });
            }
            else {
                data[user] = __assign(__assign({}, data[user]), empdata); // replace data using spread operator
                check_1 = employee.ValidateData(data[user]) // check data is valid or not.
                ;
                if (check_1 == false) {
                    res.send({
                        status: 400,
                        message: "enter valid data",
                        response: null
                    });
                }
                else {
                    check_2 = employee.check_Emp_level(data[user]) //check employee level is appropriate or not
                    ;
                    if (check_2 == false) {
                        res.send({
                            status: 400,
                            message: "Enter employee position from only these options- Manager, Tester, Developer and Intern.",
                            response: null
                        });
                    }
                    else {
                        //Save data
                        db.saveData(data);
                        res.send({
                            status: 200,
                            message: "employee data successfully Updated",
                            resonse: data
                        });
                    }
                }
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
router.get('/findListJunior/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, db, data, i, list, check;
    return __generator(this, function (_a) {
        try {
            Id = (req.params.id);
            db = new emp_info_1.Database();
            data = db.getData();
            list = [];
            for (i = 0; i < data.length; i++) {
                if (data[i].managerId == Id) {
                    list.push(data[i]);
                    //     console.log(list)  
                }
            }
            check = employee.emp_present(list);
            if (check == false) {
                res.send({
                    status: 200,
                    message: "Employees who reports to managerId ${Id} are found.",
                    response: list,
                });
            }
            else {
                res.send({
                    status: 400,
                    message: "Employees who reports to managerId ${Id} are not found."
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
module.exports = router;
