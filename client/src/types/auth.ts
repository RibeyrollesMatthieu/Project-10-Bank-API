import { User } from '@types_/user';

interface Response {
  status: number;
  message: string;
}

export interface SigninResponse extends Response {
  body?: { token: string };
}

export interface GetProfileResponse extends Response {
  body?: User;
}

export interface EditProfileResponse extends Response {
  body?: Omit<User, 'email' | 'password'>;
}
