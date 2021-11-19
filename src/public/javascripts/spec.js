
var spec =
{
    openapi: "3.0.0",    // Phiên bản Swagger UI
    info: {
        description:
            "Các thông tin mô tả về dự án và API",
        version: "1.0",    // Phiên bản API
        title: "Croma Hospital"
    },
    host: "localhost:3000",    // Server và port deploy API
    basePath: "/api",       // Đường dẫn tới API
    tags: [    // Danh sách các nhóm API: admin, users, images,...
        {
            name: "user",
            description: ""
        },
        {
            name: "Auth",
            description: ""
        },
        {
            name: "admin",                                   // Tên nhóm API
            description: "Các API về tài khoản quản trị",    // Mô tả về nhóm API
        }
    ],
    schemes: ["http", "https"],    // Sử dụng scheme gì? HTTP, HTTPS?
    paths: {
        "/user": {    // Đường dẫn. Kết hợp với host và basePath sẽ thành localhost:3000/api/v1/admin/
            get: {        // Phương thức gửi request: get, post, put, delete
                tags: ["user"],
                summary: "Get all users",
                description: "",
                operationId: "getAllUsers",
                produces: ["application/json"],       // Loại dữ liệu trả về
                responses: {
                    200: {
                        description: "Status: 200 SUCCESS",
                        schema: {
                            type: "array",
                            items: {
                               $ref: "#definitions/User"
                            }
                        }
                    },
                },
                security: [
                    
                ]
            }
        },
        "/": {
            get: {
                tags: ["Auth"],
                summary: "",
                description: "",
                responses: {
                    200: {

                    }
                }
            }
        },
        "/admin/": {    // Đường dẫn. Kết hợp với host và basePath sẽ thành localhost:3000/api/v1/admin/
            post: {        // Phương thức gửi request: get, post, put, delete
                tags: ["admin"],
                summary: "Tạo tài khoản admin",
                description: "",
                operationId: "createNewAdminAccount",
                consumes: ["multipart/form-data"],    // Loại dữ liệu gửi đi
                produces: ["application/json"],       // Loại dữ liệu trả về
                parameters: [               // Các tham số
                    {
                        "in": "formData",      // Tham số được gửi lên từ form
                        "name": "username",    // Tên tham số
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "username cho tài khoản admin mới"
                    },
                    {
                        "in": "formData",
                        "name": "password",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "password cho tài khoản admin mới"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED",
                    },
                },
                security: [
                    
                ]
            }
        },
    },
    securityDefinitions: {    // Thông tin về api key sử dụng để thực hiện request
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "headers"
        }
        // api_key: {
        //     type: "apiKey",      // Thuộc loại api key xác thực
        //     name: "api_key",     // Tên trường chứa api key xác thực
        //     in: "header",        // API key được để trong phần header của request
        // }
    },
    definitions: {            // Thông tin các đối tượng sẽ trả về
        User: {
            type: "object",
            properties: {
                _id:{
                    type: "string",
                },
                email: {
                    type: "string",
                },
                name: {
                    type: "string",
                },
                age: {
                    type: "integer",
                },
                address: {
                    type: "string",
                },
                role: {
                    type: "string"
                }
            }
        }
    }
};
