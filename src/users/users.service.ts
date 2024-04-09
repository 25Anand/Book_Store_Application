import { Injectable } from "@nestjs/common";
import { IUser } from "./interface/user.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto, LoginDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { LOGIN_MSG } from "src/constant/constant";
import { sign,verify } from "jsonwebtoken";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User")
    private readonly userModel: Model<IUser>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 5);
      const userData = { ...createUserDto, password: hashedPassword };
      const newUser = new this.userModel(userData);
      const userSaved = await newUser.save();
      console.log(userSaved);
      return userSaved;
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const userExists: any = await this.findUserByEmail(loginDto.email);

      if (!userExists) {
        return LOGIN_MSG.NOT_EXIST;
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        userExists.password
      );

      if (!isPasswordValid) {
        return LOGIN_MSG.NOT_MATCH;
      }

      const userToken = await sign(
        {
          userId: userExists._id,
          email: userExists.email,
          role: userExists.userRole,
        },
        "BookStore",
        { expiresIn: "1h" }
      );

      const userSessionData = {
        email: userExists.email,
        Token: userToken,
      };

      // await this.redisService.setUserSession(
      //   `UserSession: ${userExists.email}`,
      //   JSON.stringify(userSessionData),
      //   86400
      // );

      return userToken;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async getUser(email:string){  
    try{
      const getUserData = await this.findUserByEmail(email);
      return getUserData
    }
    catch(error){
      throw error;
    }
  }
}
