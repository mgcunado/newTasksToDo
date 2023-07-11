import { IsDefined, IsString } from 'class-validator';
import { Profile } from '../profile.entity';

export class UserUpdate {
  @IsDefined()
  @IsString()
  username?: string;
  email?: string;
  password?: string;
  profile?: Profile;
}
