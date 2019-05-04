import { IEstadisticaModel } from "../models/IEstadisticaModel";
import { IUserModel } from "../models/IUserModel";

export default interface IService {
    retriveStatistics(user_id: number): Promise<IEstadisticaModel>;
    getUser(user_id:number): Promise<IUserModel>;
    getFriends(user_id: number): Promise<Array<IUserModel>>;
    createRelationship(my_user_id:number, your_user_id:number):Promise<string>;
}