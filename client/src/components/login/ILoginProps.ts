import { IUserModel } from "../../models/IUserModel";

export interface ILoginProps {
    loginUser(user: IUserModel): void;
}