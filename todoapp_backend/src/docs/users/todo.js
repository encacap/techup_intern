const securities = [
    {
        bearerAuth: [],
    },
];

const parameters = [
    {
        name: "userId",
        in: "path",
        required: true,
    },
    {
        name: "listId",
        in: "path",
    },
    {
        name: "todoId",
        in: "path",
        required: true,
    },
];

module.exports = {
    patch: {
        tags: ["Users"],
        security: securities,
        parameters,
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                example: "My Todo",
                            },
                            isComplete: {
                                type: "boolean",
                                example: true,
                            },
                        },
                    },
                },
            },
        },
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Todo",
                        },
                    },
                },
            },
            400: {
                $ref: "#/components/responses/BadRequest",
            },
            401: {
                $ref: "#/components/responses/Unauthorized",
            },
            403: {
                $ref: "#/components/responses/Forbidden",
            },
            404: {
                $ref: "#/components/responses/NotFound",
            },
        },
    },
    delete: {
        tags: ["Users"],
        security: securities,
        parameters,
        responses: {
            204: {
                description: "No Content",
            },
            401: {
                $ref: "#/components/responses/Unauthorized",
            },
            403: {
                $ref: "#/components/responses/Forbidden",
            },
            404: {
                $ref: "#/components/responses/NotFound",
            },
        },
    },
};
