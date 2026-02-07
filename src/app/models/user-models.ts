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

export interface LoginResponse{
    token: string;
    userProfile: UserResource;
    refreshToken: string;
}
