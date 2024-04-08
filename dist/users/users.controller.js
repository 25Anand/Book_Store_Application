"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_dto_1 = require("./dto/user.dto");
const constant_1 = require("../constant/constant");
const auth_guard_1 = require("../guard/auth.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signUp(response, createUserDto) {
        try {
            const userExists = await this.usersService.findUserByEmail(createUserDto.email);
            if (userExists) {
                return response.status(common_1.HttpStatus.CONFLICT).json({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: constant_1.RESPONSE_MSG.USER_ALREADY_EXIST,
                });
            }
            const user = await this.usersService.createUser(createUserDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: constant_1.RESPONSE_MSG.USER_CREATED,
                NewUser: user
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: constant_1.RESPONSE_MSG.USER_NOT_CREATED,
                error: error.message,
            });
        }
    }
    async login(response, loginOtpDto) {
        try {
            const { email, password } = loginOtpDto;
            const userLogin = await this.usersService.login(loginOtpDto);
            switch (userLogin) {
                case constant_1.LOGIN_MSG.NOT_MATCH:
                    return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: constant_1.LOGIN_MSG.NOT_MATCH,
                    });
                case constant_1.LOGIN_MSG.NOT_EXIST:
                    return response.status(common_1.HttpStatus.NOT_FOUND).json({
                        statusCode: common_1.HttpStatus.NOT_FOUND,
                        message: constant_1.LOGIN_MSG.NOT_EXIST,
                    });
                case constant_1.LOGIN_MSG.UNAUTHORIZED:
                    return response.status(common_1.HttpStatus.NOT_FOUND).json({
                        statusCode: common_1.HttpStatus.NOT_FOUND,
                        message: constant_1.LOGIN_MSG.UNAUTHORIZED,
                    });
                default:
                    return response.status(common_1.HttpStatus.CREATED).json({
                        statusCode: common_1.HttpStatus.CREATED,
                        message: constant_1.LOGIN_MSG.LOGIN_SUCCESS,
                        Token: userLogin,
                    });
            }
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: constant_1.LOGIN_MSG.LOGIN_FAILED,
                error: error.message,
            });
        }
    }
    async getUser(request, response) {
        try {
            const userData = request.user.email;
            console.log(userData);
            const user = await this.usersService.getUser(userData);
            console.log(user);
            return response.status(common_1.HttpStatus.OK).json({
                message: constant_1.RESPONSE_MSG.USER_DETAIL,
                NewUser: user
            });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map