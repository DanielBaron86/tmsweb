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

export interface CreateUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  userTypeId: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse{
    token: string;
    userProfile: UserResource;
    refreshToken: string;
}
