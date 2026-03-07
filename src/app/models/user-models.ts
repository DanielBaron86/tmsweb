export interface UserResource {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  userTypeId: number;
  createdDate: Date | null;
  updatedDate: Date | null;
}

export interface EditUser {
  email: string;
  firstName: string;
  lastName: string;
  userTypeId: string;
}
export interface CreateUser extends EditUser {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  userProfile: UserResource;
  refreshToken: string;
}

export interface LoginModel  {
  email: string;
  password: string;
  rememberMe: boolean;
}
