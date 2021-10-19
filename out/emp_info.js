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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.ValidateData = exports.AddEmployeeData = exports.AddManagerData = void 0;
var fs = __importStar(require("fs"));
var uuid_1 = require("uuid");
var util_1 = __importDefault(require("util"));
var readFile = util_1.default.promisify(fs.readFile);
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
        _this.managerId = managerId;
        return _this;
    }
    return AddEmployeeData;
}(AddManagerData));
exports.AddEmployeeData = AddEmployeeData;
//check user gives valid data or not
function ValidateData(args) {
    var message = "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //console.log(args.name);
    if (!((typeof (args.id) == "string") && (typeof (args.name) == "string") && (typeof (args.emp_level) == "string") && (typeof (args.mobile) == "number")
        && (typeof (args.date) == "string") && ((typeof (args.managerId) == "string") || (args.managerId == undefined)) &&
        (args.name != "") && (args.emp_level != "") && (args.email != "") && (args.date != ""))) {
        message = message + "Plese enter valid data. ";
    }
    if (!(args.email.match(mailformat))) {
        message = message + "Please enter valid mail. ";
    }
    if (!(args.mobile.toString().length == 10)) {
        message = message + "Please enter valid mobile number. ";
    }
    if (!((args.emp_level == "Intern") || (args.emp_level == "Developer") || (args.emp_level == "Tester") || (args.emp_level == "Manager"))) {
        message = message + "Enter employee position from only these options- Manager, Tester, Developer and Intern. ";
    }
    //console.log(message)
    return message;
}
exports.ValidateData = ValidateData;
//Read data and Write data
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        (fs.readFile('employee_data.js', "utf-8", function read(err, data) {
                            if (err) {
                                reject(err);
                            }
                            resolve(JSON.parse(data));
                        }));
                    })];
            });
        });
    };
    Database.prototype.saveData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var stringifyData = JSON.stringify(data);
                        resolve(fs.writeFile('employee_data.js', stringifyData, function (err) {
                            if (err) {
                                reject(err);
                            }
                        }));
                    })];
            });
        });
    };
    return Database;
}());
exports.Database = Database;
