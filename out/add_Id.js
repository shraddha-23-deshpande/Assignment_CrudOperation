"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_Id = void 0;
var uuid_1 = require("uuid");
var add_Id = /** @class */ (function () {
    function add_Id(name, emp_level, mobile, email, date) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.emp_level = emp_level;
        this.mobile = mobile;
        this.email = email;
        this.date = date;
    }
    add_Id.prototype.jsonOut = function () {
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
