module.exports = {
    get: {
        tags: ["Users"],
        operationId: "getUserLists",
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
                            type: "object",
                            properties: {
                                results: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/List",
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
        },
    },
    post: {
        tags: ["Users"],
        operationId: "createUserList",
        security: [
            {
                bearerAuth: [],
            },
        ],
        parameters: [
            {
                name: "userId",
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
                        required: ["name"],
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
        },
    },
};
