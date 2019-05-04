import { IUserModel } from "../../models/IUserModel";

export interface IWeCooltraState {
    navigationDrawerOpen: boolean;
    pageContent: string;
    user?: IUserModel;
}