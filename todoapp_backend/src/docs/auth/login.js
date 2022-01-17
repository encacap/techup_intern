module.exports = {
    post: {
        tags: ["Auth"],
        operationId: "login",
        parameters: [],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["email", "password"],
                        properties: {
                            email: {
                                type: "string",
                                format: "email",
                                example: "user.email@gmail.com",
                            },
                            password: {
                                type: "string",
                                example: "password",
                            },
                        },
                    },
                },
            },
        },
        responses: {
            200: {
                $ref: "#/components/responses/AuthInformation",
            },
            400: {
                $ref: "#/components/responses/BadRequest",
            },
            401: {
                $ref: "#/components/responses/Unauthorized",
            },
        },
    },
};
