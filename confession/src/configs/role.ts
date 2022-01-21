const allRoles = {
    user: [],
    admin: ["getConfessions", "manageConfessions"],
};

const roles = Object.keys(allRoles);
const rolesRights = new Map(Object.entries(allRoles));

export { roles, rolesRights };
