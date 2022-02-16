module.exports = {
    post: {
        tags: ["Auth"],
        operationId: "logout",
        parameters: [],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["refreshToken"],
                        properties: {
                            refreshToken: {
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
                description: "The user has been logged out.",
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
