module.exports = {
    post: {
        tags: ["Auth"],
        operationId: "sendVerificationEmail",
        security: [{ bearerAuth: [] }],
        parameters: [],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["callback"],
                        properties: {
                            callback: {
                                type: "string",
                                description: "The callback URL when user click the link in verification email.",
                                format: "url",
                                example: "https://example.com/verify",
                            },
                        },
                    },
                },
            },
        },
        responses: {
            204: {
                description: "The verification email has been sent.",
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
