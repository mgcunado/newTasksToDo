import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty({"message" : "Name field cannot be empty"})
  name: string;
  surname?: string;
  phone?: string;
  birthday?: Date;
  website?: string;
  occupation?: string;
}
