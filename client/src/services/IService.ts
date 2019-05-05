import { IEstadisticaModel } from "../models/IEstadisticaModel";
import { IUserModel } from "../models/IUserModel";
import { ILogroModel } from "../models/ILogroModel";
import { IPersonaProps } from "office-ui-fabric-react/lib/Persona";

export default interface IService {
    retriveStatistics(user_id: number): Promise<IEstadisticaModel>;
    getAllAchivements(): Promise<Array<ILogroModel>>;
    getUser(user_id:number): Promise<IUserModel>;
    searchUser(prefix_id:number): Promise<Array<IPersonaProps>>;
    getFriends(user_id: number): Promise<Array<IUserModel>>;
    createRelationship(my_user_id:number, your_user_id:string):Promise<string>;
}