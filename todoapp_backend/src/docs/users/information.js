module.exports = {
    get: {
        tags: ["Users"],
        operationId: "getUserInformation",
        parameters: [
            {
                name: "userId",
                in: "path",
                required: true,
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ],
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/User",
                        },
                    },
                },
            },
            401: {
                $ref: "#/components/responses/Unauthorized",
            },
            404: {
                $ref: "#/components/responses/NotFound",
            },
        },
    },
};
