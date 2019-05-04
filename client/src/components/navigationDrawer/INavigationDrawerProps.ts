import { IUserModel } from "../../models/IUserModel";

export interface INavigationDrawerProps {
    navigationDrawerOpen: boolean;
    user: IUserModel;
    changePage(text:string): void;
    toogleDrower(): void;
}