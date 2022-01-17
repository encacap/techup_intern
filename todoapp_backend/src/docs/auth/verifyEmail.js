module.exports = {
    post: {
        tags: ["Auth"],
        operationId: "verifyEmail",
        parameters: [],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["token"],
                        properties: {
                            token: {
                                type: "string",
                                example:
                                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWRiZmM3NzZjMGI0ZDI1ZDYyZWVhNjQiLCJpYXQiOjE2NDE4MTM2NjIsImV4cCI6MTY0NDQwNTY2MiwidHlwZSI6InJlZnJlc2gifQ.c3PABiAA8gGd8eMKAnVZ8iUloFM6we7v1q3dETjkl10",
                            },
                        },
                    },
                },
            },
        },
        responses: {
            204: {
                description: "User's email has been verified.",
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
