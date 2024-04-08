import { IsEmail, IsNotEmpty, IsString, IsIn, MinLength, MaxLength} from 'class-validator';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
    @MaxLength(30)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
    @MaxLength(12)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Author', 'Admin', 'Retail Users'])
  userRole: 'Author' | 'Admin' | 'Retail Users';
}

export class LoginDto {
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @IsNotEmpty()
  password: string;

}