const securities = [
    {
        bearerAuth: [],
    },
];

module.exports = {
    get: {
        tags: ["Users"],
        parameters: [
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
                name: "status",
                in: "query",
                schema: {
                    type: "string",
                    enum: ["all", "completed", "incomplete"],
                },
            },
        ],
        security: securities,
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                results: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Todo",
                                    },
                                },
                                totalResults: {
                                    type: "number",
                                    example: 1,
                                },
                            },
                        },
                    },
                },
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
    post: {
        tags: ["Users"],
        security: securities,
        parameters: [
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
        ],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["title"],
                        properties: {
                            name: {
                                type: "string",
                                example: "My Todo",
                            },
                            isCompleted: {
                                type: "boolean",
                                example: false,
                            },
                        },
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Created",
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
};
