export interface UserResource {
    Id: number;
    Username: string;
    Email: string;
    FirstName: string;
    LastName: string;
    UserTypeId: number;
    CreatedDate: Date | null;
    UpdatedDate: Date | null;
}

export interface LoginResponse{
    token: string;
    userProfile: UserResource;
}
