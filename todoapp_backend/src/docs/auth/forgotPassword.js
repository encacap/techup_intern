module.exports = {
    post: {
        tags: ["Auth"],
        operationId: "forgotPassword",
        parameters: [],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["email", "callback"],
                        properties: {
                            email: {
                                type: "string",
                                format: "email",
                                example: "user.email@gmail.com",
                            },
                            callback: {
                                type: "string",
                                description: "The callback URL when user click the link in reset password email.",
                                example: "https://example.com/forgot-password",
                            },
                        },
                    },
                },
            },
        },
        responses: {
            204: {
                description: "The reset password email has been sent.",
            },
            400: {
                $ref: "#/components/responses/BadRequest",
            },
            404: {
                $ref: "#/components/responses/NotFound",
            },
        },
    },
};
