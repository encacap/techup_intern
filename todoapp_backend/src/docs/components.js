const userOneId = "61dd2c266be196f789e266a2";
const listOneId = "61e155ad906390d9b5e1a3ca";
const todoOneId = "61e15d2a1009c3a3e3ec9619";

module.exports = {
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "The user's unique ID.",
                        example: userOneId,
                    },
                    name: {
                        type: "string",
                        description: "The user's name.",
                        example: "John Doe",
                    },
                    email: {
                        type: "string",
                        description: "The user's email address.",
                        example: "user.email@gmail.com",
                    },
                    isEmailVerified: {
                        type: "boolean",
                        description: "Whether the user's email address has been verified.",
                        example: true,
                    },
                },
            },

            Token: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                        description: "The JWT token.",
                    },
                    expires: {
                        type: "string",
                        format: "date-time",
                        description: "The time at which the token expires.",
                    },
                },
                example: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg",
                    expires: "2022-01-01T00:00:00.000Z",
                },
            },

            AuthTokens: {
                type: "object",
                properties: {
                    access: {
                        $ref: "#/components/schemas/Token",
                    },
                    refresh: {
                        $ref: "#/components/schemas/Token",
                    },
                },
            },

            List: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "The list's unique ID.",
                        example: listOneId,
                    },
                    name: {
                        type: "string",
                        description: "The list's name.",
                        example: "My List",
                    },
                    user: {
                        type: "string",
                        description: "The user's unique ID.",
                        example: userOneId,
                    },
                },
            },

            Todo: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "The unique identifier for a todo.",
                        example: todoOneId,
                    },
                    name: {
                        type: "string",
                        description: "The name of a todo.",
                        example: "Learn NodeJS",
                    },
                    isCompleted: {
                        type: "boolean",
                        description: "The status of a todo.",
                        example: false,
                        default: false,
                    },
                    user: {
                        type: "string",
                        description: "The user who created a todo.",
                        example: userOneId,
                    },
                    list: {
                        type: "string",
                        description: "The list of a todo.",
                        example: listOneId,
                    },
                },
            },

            Error: {
                type: "object",
                properties: {
                    code: {
                        type: "number",
                        description: "The error code.",
                        example: 400,
                    },
                    message: {
                        type: "string",
                        description: "The error message.",
                        example: "Bad Request",
                    },
                },
            },
        },
        responses: {
            BadRequest: {
                description: "The request was invalid.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        },
                        example: {
                            code: 400,
                            message: '"something" is required',
                        },
                    },
                },
            },
            Unauthorized: {
                description: "Unauthorized",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        },
                        example: {
                            code: 401,
                            message: "Unauthorized.",
                        },
                    },
                },
            },
            Forbidden: {
                description: "Forbidden",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        },
                        example: {
                            code: 403,
                            message: "Forbidden.",
                        },
                    },
                },
            },
            NotFound: {
                description: "Not Found",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        },
                        example: {
                            code: 404,
                            message: "Not Found.",
                        },
                    },
                },
            },
            AuthInformation: {
                description: "Authentication information.",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                user: {
                                    $ref: "#/components/schemas/User",
                                },
                                tokens: {
                                    $ref: "#/components/schemas/AuthTokens",
                                },
                            },
                        },
                    },
                },
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};
