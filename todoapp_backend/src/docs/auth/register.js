module.exports = {
    post: {
        tags: ["Auth"],
        operationId: "register",
        parameters: [],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["email", "password", "name"],
                        properties: {
                            email: {
                                type: "string",
                                format: "email",
                                example: "user.email@gmail.com",
                            },
                            password: {
                                type: "string",
                                example: "password",
                                description: "The user's password. Required to be at least 8 characters long.",
                            },
                            name: {
                                type: "string",
                                example: "John Doe",
                                description: "The user's name.",
                            },
                        },
                    },
                },
            },
        },
        responses: {
            201: {
                $ref: "#/components/responses/AuthInformation",
            },
            400: {
                $ref: "#/components/responses/BadRequest",
            },
        },
    },
};
