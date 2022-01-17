const parameters = [
    {
        name: "userId",
        in: "path",
        required: true,
    },
    {
        name: "listId",
        in: "path",
        required: true,
    },
];

module.exports = {
    patch: {
        tags: ["Users"],
        operationId: "updateUserList",
        security: [
            {
                bearerAuth: [],
            },
        ],
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
                                example: "My List",
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
                            $ref: "#/components/schemas/List",
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
        operationId: "deleteUserList",
        security: [
            {
                bearerAuth: [],
            },
        ],
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
