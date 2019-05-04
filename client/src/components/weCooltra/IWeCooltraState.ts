import { IUserModel } from "../../models/IUserModel";

export interface IWeCooltraState {
    navigationDrawerOpen: boolean;
    pageContent: string;
    user?: IUserModel;
    id_friend: number;
    name_friend: string;
}