import { Controller, Post, Body, Res, HttpStatus, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto,LoginDto } from "./dto/user.dto";
import { RESPONSE_MSG ,LOGIN_MSG} from "src/constant/constant";
import { AuthGuard } from "src/guard/auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  async signUp(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const userExists = await this.usersService.findUserByEmail(
        createUserDto.email
      );

      if (userExists) {
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: RESPONSE_MSG.USER_ALREADY_EXIST,
        });
      }

      const user = await this.usersService.createUser(createUserDto);

      return response.status(HttpStatus.CREATED).json({
        message: RESPONSE_MSG.USER_CREATED,
        NewUser: user
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: RESPONSE_MSG.USER_NOT_CREATED,
        error: error.message,
      });
    }
  }

  @Post("login")
  async login(@Res() response, @Body() loginOtpDto: LoginDto) {
    try{
      const { email, password } = loginOtpDto;
      const userLogin = await this.usersService.login(loginOtpDto);

      switch (userLogin) {
        case LOGIN_MSG.NOT_MATCH:
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: LOGIN_MSG.NOT_MATCH,
          });
        case LOGIN_MSG.NOT_EXIST:
          return response.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: LOGIN_MSG.NOT_EXIST,
          });
        case LOGIN_MSG.UNAUTHORIZED:
          return response.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: LOGIN_MSG.UNAUTHORIZED,
          });
        default:
          return response.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: LOGIN_MSG.LOGIN_SUCCESS,
            Token: userLogin,
          });
    }
  }
    catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: LOGIN_MSG.LOGIN_FAILED,
        error: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUser(@Req() request, @Res() response) {
    try{
      const userData = request.user.email;
      console.log(userData)
      const user = await this.usersService.getUser(userData);
      console.log(user)
      return response.status(HttpStatus.OK).json({
        message: RESPONSE_MSG.USER_DETAIL,
        NewUser: user
      });
    }
    catch(error){
      throw error;
    }
  }
}
