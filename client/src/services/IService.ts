import { IEstadisticaModel } from "../models/IEstadisticaModel";

export default interface IService {
    retriveStatistics(user_id: number): Promise<IEstadisticaModel>;
}