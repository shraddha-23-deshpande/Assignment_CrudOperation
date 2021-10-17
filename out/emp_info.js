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
exports.Database = exports.check_Emp_level = exports.validateMob = exports.ValidateEmail = exports.MissingField = exports.ValidateData = exports.AddEmployeeData = exports.AddManagerData = void 0;
var fs = require("fs");
//import { AwaitKeyword } from "typescript";
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
        var data = fs.readFileSync("employee_data.js");
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == this.managerId) {
                name = data[i].name;
            }
        }
        //console.log(name)
        return name;
    };
    return AddEmployeeData;
}(AddManagerData));
exports.AddEmployeeData = AddEmployeeData;
//check user gives valid data or not
function ValidateData(args) {
    if ((typeof (args.id) == "string") && (typeof (args.name) == "string") && (typeof (args.emp_level) == "string") && (typeof (args.mobile) == "number")
        && (typeof (args.date) == "string") && ((typeof (args.managerId) == "string") || (args.managerId == undefined))) {
        return true;
    }
    else {
        return false;
    }
}
exports.ValidateData = ValidateData;
// check if there is any missing field
function MissingField(args) {
    if ((args.name != "") && (args.emp_level != "") && (args.email != "") && (args.date != "")) {
        return true;
    }
    else {
        return false;
    }
}
exports.MissingField = MissingField;
//check email is valid or not
function ValidateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
}
exports.ValidateEmail = ValidateEmail;
// check mobile is valid or not
function validateMob(mobile) {
    if (mobile.toString().length == 10) {
        return true;
    }
    else {
        return false;
    }
}
exports.validateMob = validateMob;
// check employee level is valid or not
function check_Emp_level(emp_level) {
    //console.log(args.emp_level)
    if ((emp_level == "Intern") || (emp_level == "Developer") || (emp_level == "Tester") || (emp_level == "Manager")) {
        return true;
    }
    else {
        return false;
    }
}
exports.check_Emp_level = check_Emp_level;
//Read data and Write data
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        //setTimeout(() => {
                        (fs.readFile('employee_data.js', "utf-8", function read(err, data) {
                            if (err) {
                                throw err;
                            }
                            resolve(JSON.parse(data));
                        }));
                    })];
            });
        });
    };
    Database.prototype.saveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var stringifyData;
            return __generator(this, function (_a) {
                stringifyData = JSON.stringify(data);
                //fs.writeFileSync("employee_data.js", stringifyData);
                fs.writeFile('employee_data.js', stringifyData, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return Database;
}());
exports.Database = Database;
