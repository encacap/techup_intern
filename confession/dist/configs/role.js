"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRights = exports.roles = void 0;
const allRoles = {
    user: [],
    admin: ["getConfessions", "manageConfessions"],
};
const roles = Object.keys(allRoles);
exports.roles = roles;
const rolesRights = new Map(Object.entries(allRoles));
exports.rolesRights = rolesRights;
//# sourceMappingURL=role.js.map