module.exports = {
    post: {
        tags: ["Auth"],
        operationId: "resetPassword",
        parameters: [],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["token", "password", "passwordConfirmation"],
                        properties: {
                            token: {
                                type: "string",
                                example:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWRiZmM3NzZjMGI0ZDI1ZDYyZWVhNjQiLCJpYXQiOjE2NDE4MTM2NjIsImV4cCI6MTY0NDQwNTY2MiwidHlwZSI6InJlZnJlc2gifQ.c3PABiAA8gGd8eMKAnVZ8iUloFM6we7v1q3dETjkl10",
                            },
                            password: {
                                type: "string",
                                description: "The new password. Must be at least 8 characters long.",
                                example: "password",
                            },
                            passwordConfirmation: {
                                type: "string",
                                description: "The new password confirmation.",
                                example: "password",
                            },
                        },
                    },
                },
            },
        },
        responses: {
            204: {
                description: "The user's password has been reset.",
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
